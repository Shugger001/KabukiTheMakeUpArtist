import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account",
  description: "Your profile, bookings, and orders.",
};

export default function AccountOverviewPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <section className="glass-panel rounded-3xl p-8 lg:col-span-2">
        <h1 className="font-display text-3xl text-kabuki-navy">Welcome back</h1>
        <p className="mt-4 text-kabuki-navy/60">
          Connect Supabase Auth to hydrate this dashboard with live profile, booking history, order
          tracking, and in-app notifications from the `notifications` table.
        </p>
      </section>
      <aside className="space-y-4 rounded-3xl border border-kabuki-pink/25 bg-kabuki-white/80 p-8 shadow-soft">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-kabuki-navy/45">
          Quick actions
        </h2>
        <ul className="space-y-3 text-sm font-medium text-kabuki-navy">
          <li>
            <Link href="/book" className="hover:underline">
              New booking
            </Link>
          </li>
          <li>
            <Link href="/shop" className="hover:underline">
              Continue shopping
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
