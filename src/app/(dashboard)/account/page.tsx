import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Account",
  description: "Your profile, bookings, and orders.",
};

export default async function AccountOverviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("full_name, glow_points, referral_code")
        .eq("id", user.id)
        .maybeSingle()
    : { data: null };
  const { count: bookingCount } = user
    ? await supabase
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
    : { count: 0 };
  const { count: orderCount } = user
    ? await supabase.from("orders").select("id", { count: "exact", head: true }).eq("user_id", user.id)
    : { count: 0 };
  const referralDisplay =
    profile?.referral_code?.trim() ||
    (user ? `KAB-${user.id.replace(/-/g, "").slice(0, 6).toUpperCase()}` : "KAB-GUEST");
  const glowPoints = profile?.glow_points ?? 0;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <section className="glass-panel rounded-3xl p-8 lg:col-span-2">
        <h1 className="font-display text-3xl text-kabuki-navy">
          Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}
        </h1>
        <p className="mt-4 text-kabuki-navy/60">
          Your account is live. Track bookings, review orders, and manage your upcoming appointments.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-kabuki-pink/25 bg-white/70 p-4">
            <p className="text-xs uppercase tracking-wider text-kabuki-navy/50">Bookings</p>
            <p className="mt-2 font-display text-3xl text-kabuki-navy">{bookingCount ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-kabuki-pink/25 bg-white/70 p-4">
            <p className="text-xs uppercase tracking-wider text-kabuki-navy/50">Orders</p>
            <p className="mt-2 font-display text-3xl text-kabuki-navy">{orderCount ?? 0}</p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-kabuki-pink/25 bg-white/75 p-4">
          <p className="text-xs uppercase tracking-wider text-kabuki-navy/45">Recommended next buy</p>
          <p className="mt-2 text-sm text-kabuki-navy/70">
            Based on your recent appointments, clients usually pair with{" "}
            <Link href="/shop/velvet-skin-primer" className="font-semibold underline-offset-4 hover:underline">
              Velvet Skin Primer
            </Link>{" "}
            for longer wear.
          </p>
        </div>
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
        <div className="rounded-2xl border border-kabuki-pink/20 bg-white/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-kabuki-navy/45">Referral code</p>
          <p className="mt-2 font-mono text-sm text-kabuki-navy">{referralDisplay}</p>
          <p className="mt-2 text-xs text-kabuki-navy/55">
            Share with a friend. You both unlock loyalty credits after first completed booking.
          </p>
        </div>
        <div className="rounded-2xl border border-kabuki-pink/20 bg-white/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-kabuki-navy/45">Glow Club</p>
          <p className="mt-2 font-display text-2xl text-kabuki-navy">{glowPoints}</p>
          <p className="mt-1 text-xs text-kabuki-navy/50">Glow points from bookings and orders</p>
          <p className="mt-3 text-sm text-kabuki-navy/65">
            Redeem perks and bundles as your balance grows — we&apos;ll notify you when new rewards drop.
          </p>
        </div>
      </aside>
    </div>
  );
}
