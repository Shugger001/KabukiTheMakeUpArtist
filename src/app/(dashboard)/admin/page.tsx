import { revalidatePath } from "next/cache";
import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatShopPrice } from "@/lib/format/money";

export const metadata: Metadata = {
  title: "Admin",
};

export const dynamic = "force-dynamic";
const orderStatusOptions = [
  "pending_payment",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "failed",
] as const;

async function updateOrderStatus(formData: FormData) {
  "use server";
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return;
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const note = String(formData.get("admin_note") ?? "").trim();
  if (!id || !orderStatusOptions.includes(status as (typeof orderStatusOptions)[number])) return;

  const admin = createAdminClient();
  const { data: existing } = await admin
    .from("orders")
    .select("status, metadata, user_id")
    .eq("id", id)
    .maybeSingle();
  if (!existing) return;

  const prevMeta = (existing.metadata as Record<string, unknown> | null) ?? {};
  const nextMeta = {
    ...prevMeta,
    admin_note: note || (prevMeta.admin_note as string | undefined) || null,
    status_events: [
      ...(Array.isArray(prevMeta.status_events) ? prevMeta.status_events : []),
      {
        at: new Date().toISOString(),
        from: existing.status,
        to: status,
        note: note || null,
      },
    ].slice(-20),
  };

  await admin
    .from("orders")
    .update({ status, metadata: nextMeta, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (existing.user_id && existing.status !== status) {
    await admin.from("notifications").insert({
      user_id: existing.user_id,
      title: "Order update",
      body: `Your order is now ${status.replaceAll("_", " ")}.`,
      type: "order_status",
    });
  }

  revalidatePath("/admin");
}

export default async function AdminOverviewPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
        <h1 className="font-display text-3xl">At-a-glance</h1>
        <p className="mt-3 text-sm text-white/60">
          Configure <code className="text-kabuki-pink">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-kabuki-pink">SUPABASE_SERVICE_ROLE_KEY</code> to load live admin KPIs.
        </p>
      </div>
    );
  }

  const admin = createAdminClient();
  const [ordersRes, bookingsRes, profilesRes, inventoryRes, recentOrdersRes] = await Promise.all([
    admin.from("orders").select("total", { count: "exact" }).eq("status", "paid"),
    admin
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .in("status", ["pending", "awaiting_approval", "confirmed"]),
    admin.from("profiles").select("id", { count: "exact", head: true }),
    admin.from("products").select("id", { count: "exact", head: true }).lte("inventory", 3),
    admin
      .from("orders")
      .select("id, status, total, currency, created_at, paystack_reference")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const revenue = (ordersRes.data ?? []).reduce((sum, row) => sum + Number(row.total ?? 0), 0);
  const kpis = [
    { label: "Paid revenue", value: formatShopPrice(revenue), hint: "orders.status = paid" },
    { label: "Open bookings", value: `${bookingsRes.count ?? 0}`, hint: "pending + confirmed" },
    { label: "Total clients", value: `${profilesRes.count ?? 0}`, hint: "profiles table" },
    { label: "Low stock SKUs", value: `${inventoryRes.count ?? 0}`, hint: "inventory <= 3" },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl sm:text-4xl">At-a-glance</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/55">
          Live operational metrics from Supabase. Use this as your daily command center.
        </p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-kabuki-pink/90">
              {k.label}
            </p>
            <p className="mt-4 font-display text-4xl text-white">{k.value}</p>
            <p className="mt-3 text-xs text-white/45">{k.hint}</p>
          </div>
        ))}
      </div>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-display text-2xl">Order operations</h2>
        <p className="mt-2 text-sm text-white/55">
          Progress orders through fulfillment, or mark cancellations/refund intents with notes.
        </p>
        <div className="mt-5 space-y-3">
          {(recentOrdersRes.data ?? []).map((order) => (
            <form
              key={order.id}
              action={updateOrderStatus}
              className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 sm:grid-cols-[1fr_auto_auto]"
            >
              <input type="hidden" name="id" value={order.id} />
              <div>
                <p className="font-medium text-white">
                  #{order.id.slice(0, 8)} · {formatShopPrice(Number(order.total))}
                </p>
                <p className="text-xs text-white/55">
                  {new Date(order.created_at).toLocaleString()} · ref {order.paystack_reference ?? "—"}
                </p>
                <input
                  name="admin_note"
                  placeholder="Optional note (refund reason, courier update...)"
                  className="mt-2 w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-white"
                />
              </div>
              <select
                name="status"
                defaultValue={order.status}
                className="rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-white"
              >
                {orderStatusOptions.map((s) => (
                  <option key={s} value={s} className="bg-kabuki-navy">
                    {s}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-full bg-kabuki-pink px-4 py-2 text-xs font-semibold uppercase tracking-wider text-kabuki-navy"
              >
                Save
              </button>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}
