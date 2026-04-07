import { createClient } from "@/lib/supabase/server";

export default async function AccountBookingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = user
    ? await supabase
        .from("bookings")
        .select("id, start_at, status, location_type, services(name)")
        .eq("user_id", user.id)
        .order("start_at", { ascending: false })
    : { data: [] };

  return (
    <div className="space-y-4 rounded-3xl border border-kabuki-pink/25 bg-white/75 p-6 sm:p-8">
      <p className="font-display text-2xl text-kabuki-navy">Booking history</p>
      {(data ?? []).length === 0 ? (
        <p className="text-sm text-kabuki-navy/55">No bookings yet.</p>
      ) : (
        <ul className="space-y-3">
          {(data ?? []).map((b) => (
            <li key={b.id} className="rounded-2xl border border-kabuki-pink/20 bg-white/80 p-4">
              <p className="font-medium text-kabuki-navy">
                {(b.services as { name?: string } | null)?.name ?? "Service"}
              </p>
              <p className="text-sm text-kabuki-navy/60">{new Date(b.start_at).toLocaleString()}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-kabuki-navy/50">
                {b.status} · {b.location_type}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
