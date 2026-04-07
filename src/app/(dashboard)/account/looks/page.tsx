export default function AccountLooksPage() {
  return (
    <div className="rounded-3xl border border-dashed border-kabuki-pink/35 bg-white/60 p-12 text-center">
      <p className="font-display text-2xl text-kabuki-navy">Saved looks</p>
      <p className="mt-3 text-sm text-kabuki-navy/55">
        Extend the schema with a <code className="rounded bg-kabuki-pink/20 px-1">saved_looks</code>{" "}
        table or store references in <code className="rounded bg-kabuki-pink/20 px-1">profiles</code>{" "}
        metadata.
      </p>
    </div>
  );
}
