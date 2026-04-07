import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const roleOptions = ["client", "staff", "admin"] as const;

async function updateCustomer(formData: FormData) {
  "use server";
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return;

  const id = String(formData.get("id") ?? "");
  const role = String(formData.get("role") ?? "");
  const adminNotes = String(formData.get("admin_notes") ?? "");
  const tagsRaw = String(formData.get("crm_tags") ?? "");
  if (!id || !roleOptions.includes(role as (typeof roleOptions)[number])) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (currentProfile?.role !== "admin") return;
  if (id === user.id && role !== "admin") return;

  const crmTags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const admin = createAdminClient();
  await admin
    .from("profiles")
    .update({
      role,
      admin_notes: adminNotes.length > 0 ? adminNotes : null,
      crm_tags: crmTags,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/admin/customers");
}

type ProfileRow = {
  id: string;
  full_name: string | null;
  role: "client" | "staff" | "admin";
  phone: string | null;
  crm_tags: string[] | null;
  admin_notes: string | null;
  created_at: string;
};

export default async function AdminCrmPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
        <h1 className="font-display text-3xl">CRM</h1>
        <p className="mt-3 max-w-2xl text-sm text-white/55">
          Configure <code className="text-kabuki-pink">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-kabuki-pink">SUPABASE_SERVICE_ROLE_KEY</code> to manage customer roles and
          segmentation.
        </p>
      </div>
    );
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from("profiles")
    .select("id, full_name, role, phone, crm_tags, admin_notes, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  const customers = (data ?? []) as ProfileRow[];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
      <h1 className="font-display text-3xl">CRM</h1>
      <p className="mt-3 max-w-2xl text-sm text-white/55">
        Manage customer segmentation and role onboarding. Only admins can change roles.
      </p>
      <div className="mt-8 space-y-4">
        {customers.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/20 bg-black/20 p-6 text-sm text-white/60">
            No profiles found yet.
          </p>
        ) : (
          customers.map((c) => (
            <form
              key={c.id}
              action={updateCustomer}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <input type="hidden" name="id" value={c.id} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_auto_1fr_auto]">
                <div>
                  <p className="font-semibold text-white">{c.full_name ?? "Unnamed client"}</p>
                  <p className="text-xs text-white/55">{c.id}</p>
                  <p className="mt-1 text-xs text-white/40">
                    Joined {new Date(c.created_at).toLocaleDateString()}
                    {c.phone ? ` · ${c.phone}` : ""}
                  </p>
                </div>
                <label className="text-xs text-white/60">
                  Role
                  <select
                    name="role"
                    defaultValue={c.role}
                    className="mt-1 rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-white"
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role} className="bg-kabuki-navy">
                        {role}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="space-y-2">
                  <label className="block text-xs text-white/60">
                    CRM tags (comma separated)
                    <input
                      name="crm_tags"
                      defaultValue={(c.crm_tags ?? []).join(", ")}
                      className="mt-1 w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-white"
                    />
                  </label>
                  <label className="block text-xs text-white/60">
                    Admin notes
                    <input
                      name="admin_notes"
                      defaultValue={c.admin_notes ?? ""}
                      className="mt-1 w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-white"
                    />
                  </label>
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="rounded-full bg-kabuki-pink px-4 py-2 text-xs font-semibold uppercase tracking-wider text-kabuki-navy"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          ))
        )}
      </div>
    </div>
  );
}
