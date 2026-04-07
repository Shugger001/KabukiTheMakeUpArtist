import { createClient } from "@/lib/supabase/server";
import { formatShopPrice } from "@/lib/format/money";

export default async function AccountOrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = user
    ? await supabase
        .from("orders")
        .select("id, status, total, currency, created_at, paystack_reference, order_items(quantity, unit_price, products(name))")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div className="space-y-4 rounded-3xl border border-kabuki-pink/25 bg-white/75 p-6 sm:p-8">
      <p className="font-display text-2xl text-kabuki-navy">Orders</p>
      {(data ?? []).length === 0 ? (
        <p className="text-sm text-kabuki-navy/55">No orders yet.</p>
      ) : (
        <ul className="space-y-3">
          {(data ?? []).map((order) => (
            <li key={order.id} className="rounded-2xl border border-kabuki-pink/20 bg-white/80 p-4">
              <p className="font-medium text-kabuki-navy">Order #{order.id.slice(0, 8)}</p>
              <p className="text-sm text-kabuki-navy/60">
                {new Date(order.created_at).toLocaleString()} · {formatShopPrice(Number(order.total))}
              </p>
              <p className="mt-1 text-xs text-kabuki-navy/45">Ref: {order.paystack_reference ?? "—"}</p>
              <span className="mt-2 inline-flex rounded-full border border-kabuki-pink/35 bg-kabuki-pink/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-kabuki-navy/70">
                {order.status.replaceAll("_", " ")}
              </span>
              <ul className="mt-3 space-y-1 text-xs text-kabuki-navy/60">
                {((order.order_items as Array<{ quantity?: number; unit_price?: number; products?: { name?: string } }> | null) ?? []).map(
                  (line, idx) => (
                    <li key={`${order.id}-${idx}`}>
                      {(line.products?.name ?? "Item")} × {line.quantity ?? 0} ·{" "}
                      {formatShopPrice(Number(line.unit_price ?? 0))}
                    </li>
                  ),
                )}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
