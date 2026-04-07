import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatShopPrice } from "@/lib/format/money";

export const metadata: Metadata = {
  title: "Admin",
};

export const dynamic = "force-dynamic";

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
  const [ordersRes, bookingsRes, profilesRes, inventoryRes] = await Promise.all([
    admin.from("orders").select("total", { count: "exact" }).eq("status", "paid"),
    admin
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .in("status", ["pending", "awaiting_approval", "confirmed"]),
    admin.from("profiles").select("id", { count: "exact", head: true }),
    admin.from("products").select("id", { count: "exact", head: true }).lte("inventory", 3),
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
    </div>
  );
}
