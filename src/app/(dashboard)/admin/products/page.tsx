export default function AdminProductsPage() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
      <h1 className="font-display text-3xl">Products & inventory</h1>
      <p className="mt-3 max-w-2xl text-sm text-white/55">
        CRUD against <code className="text-kabuki-pink">products</code>, upload media to Supabase
        Storage bucket <code className="text-kabuki-pink">media</code>, manage discounts via{" "}
        <code className="text-kabuki-pink">settings</code> or a dedicated table.
      </p>
    </div>
  );
}
