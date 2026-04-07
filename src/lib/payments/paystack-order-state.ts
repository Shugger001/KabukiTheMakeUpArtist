import type { SupabaseClient } from "@supabase/supabase-js";

type VerifyInput = {
  reference: string;
  amountMinor: number | null;
  currency: string | null;
  metadata: Record<string, unknown> | null;
  paid: boolean;
  eventType: "redirect_verify" | "webhook_charge_success" | "webhook_charge_failed";
  eventId?: string | null;
};

const terminalStatuses = new Set(["paid", "failed", "cancelled"]);

function appendAuditLog(
  existing: Record<string, unknown> | null,
  entry: Record<string, unknown>,
): Record<string, unknown> {
  const prev = existing && typeof existing === "object" ? existing : {};
  const arr = Array.isArray(prev.payment_events) ? prev.payment_events : [];
  return { ...prev, payment_events: [...arr, entry].slice(-20) };
}

/**
 * Applies verified payment result to an order in an idempotent way.
 */
export async function applyPaystackVerification(
  admin: SupabaseClient,
  input: VerifyInput,
): Promise<{ ok: boolean; reason?: string; orderId?: string }> {
  const { data: order, error } = await admin
    .from("orders")
    .select("id, total, currency, status, metadata")
    .eq("paystack_reference", input.reference)
    .maybeSingle();

  if (error) return { ok: false, reason: error.message };
  if (!order) return { ok: false, reason: "Order not found for reference." };

  const totalMinor = Math.round(Number(order.total) * 100);
  const expectedCurrency = String(order.currency ?? "").toUpperCase();
  const incomingCurrency = (input.currency ?? "").toUpperCase();
  const amountMatches = input.amountMinor == null ? true : input.amountMinor === totalMinor;
  const currencyMatches = !incomingCurrency || incomingCurrency === expectedCurrency;

  const auditEntry = {
    at: new Date().toISOString(),
    source: input.eventType,
    event_id: input.eventId ?? null,
    paid: input.paid,
    amount_minor: input.amountMinor,
    currency: input.currency,
    amount_matches: amountMatches,
    currency_matches: currencyMatches,
  };
  const nextMeta = appendAuditLog(
    (order.metadata as Record<string, unknown> | null) ?? input.metadata,
    auditEntry,
  );

  if (!amountMatches || !currencyMatches) {
    if (!terminalStatuses.has(order.status)) {
      await admin
        .from("orders")
        .update({
          status: "failed",
          updated_at: new Date().toISOString(),
          metadata: nextMeta,
        })
        .eq("id", order.id);
    }
    return { ok: false, reason: "Payment mismatch.", orderId: order.id };
  }

  // idempotent: if already terminal, only append audit metadata
  if (terminalStatuses.has(order.status)) {
    await admin
      .from("orders")
      .update({
        updated_at: new Date().toISOString(),
        metadata: nextMeta,
      })
      .eq("id", order.id);
    return { ok: order.status === "paid", orderId: order.id };
  }

  if (input.paid) {
    const { data: items } = await admin
      .from("order_items")
      .select("product_id, quantity")
      .eq("order_id", order.id);
    if (!items || items.length === 0) {
      return { ok: false, reason: "Missing order items for paid transaction.", orderId: order.id };
    }

    const productIds = [...new Set(items.map((i) => i.product_id))];
    const { data: products } = await admin
      .from("products")
      .select("id, inventory")
      .in("id", productIds);
    const inv = new Map((products ?? []).map((p) => [p.id as string, Number(p.inventory)]));

    for (const item of items) {
      const available = inv.get(item.product_id) ?? 0;
      if (available < Number(item.quantity)) {
        await admin
          .from("orders")
          .update({
            status: "failed",
            updated_at: new Date().toISOString(),
            metadata: appendAuditLog(nextMeta, {
              at: new Date().toISOString(),
              source: "inventory_guard",
              product_id: item.product_id,
              requested_qty: item.quantity,
              available,
            }),
          })
          .eq("id", order.id);
        return { ok: false, reason: "Insufficient inventory to fulfill order.", orderId: order.id };
      }
    }

    for (const item of items) {
      const quantity = Number(item.quantity);
      const available = inv.get(item.product_id) ?? 0;
      await admin
        .from("products")
        .update({ inventory: available - quantity, updated_at: new Date().toISOString() })
        .eq("id", item.product_id);
      inv.set(item.product_id, available - quantity);
    }
  }

  await admin
    .from("orders")
    .update({
      status: input.paid ? "paid" : "failed",
      updated_at: new Date().toISOString(),
      metadata: nextMeta,
    })
    .eq("id", order.id);

  return { ok: input.paid, orderId: order.id };
}
