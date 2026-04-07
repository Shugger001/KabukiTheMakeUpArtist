export default function AccountBookingsPage() {
  return (
    <div className="rounded-3xl border border-dashed border-kabuki-pink/35 bg-white/60 p-12 text-center">
      <p className="font-display text-2xl text-kabuki-navy">Booking history</p>
      <p className="mt-3 text-sm text-kabuki-navy/55">
        Subscribe to Supabase Realtime on <code className="rounded bg-kabuki-pink/20 px-1">bookings</code>{" "}
        for live status updates (confirm, reschedule, cancel).
      </p>
    </div>
  );
}
