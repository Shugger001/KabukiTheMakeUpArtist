export default function AccountOrdersPage() {
  return (
    <div className="rounded-3xl border border-dashed border-kabuki-pink/35 bg-white/60 p-12 text-center">
      <p className="font-display text-2xl text-kabuki-navy">Orders</p>
      <p className="mt-3 text-sm text-kabuki-navy/55">
        Order rows link to Paystack references — surface tracking states from the `orders` table.
      </p>
    </div>
  );
}
