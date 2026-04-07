export default function AdminCrmPage() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
      <h1 className="font-display text-3xl">CRM</h1>
      <p className="mt-3 max-w-2xl text-sm text-white/55">
        Use <code className="text-kabuki-pink">profiles.crm_tags</code> and{" "}
        <code className="text-kabuki-pink">admin_notes</code> for VIP / repeat segmentation (admin-only
        via RLS).
      </p>
    </div>
  );
}
