export default function AdminBookingsPage() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
      <h1 className="font-display text-3xl">Bookings</h1>
      <p className="mt-3 max-w-2xl text-sm text-white/55">
        Calendar + approval queue: filter by <code className="text-kabuki-pink">awaiting_approval</code>
        , assign staff (extend schema), and push notifications on status change.
      </p>
    </div>
  );
}
