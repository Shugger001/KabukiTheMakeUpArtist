import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

const kpis = [
  { label: "Revenue (30d)", value: "—", hint: "Wire to `orders` + Paystack" },
  { label: "Bookings", value: "—", hint: "Realtime `bookings` board" },
  { label: "New clients", value: "—", hint: "`profiles` growth" },
  { label: "Inventory alerts", value: "—", hint: "`products.inventory`" },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl sm:text-4xl">At-a-glance</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/55">
          SaaS-grade control plane — swap placeholders with Supabase aggregates and charting (e.g.
          Tremor or Recharts) when you connect production data.
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
