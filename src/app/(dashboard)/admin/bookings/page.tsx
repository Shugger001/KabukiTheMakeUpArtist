import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

const statusOptions = [
  "awaiting_approval",
  "confirmed",
  "rejected",
  "cancelled",
  "completed",
] as const;

async function updateBookingStatus(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !statusOptions.includes(status as (typeof statusOptions)[number])) return;
  const admin = createAdminClient();
  await admin
    .from("bookings")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  revalidatePath("/admin/bookings");
}

export default async function AdminBookingsPage() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("bookings")
    .select("id, start_at, status, location_type, address, profiles(full_name), services(name)")
    .order("start_at", { ascending: false })
    .limit(50);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
      <h1 className="font-display text-3xl">Bookings</h1>
      <div className="mt-6 space-y-3">
        {(data ?? []).map((b) => (
          <form
            key={b.id}
            action={updateBookingStatus}
            className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 sm:grid-cols-[1fr_auto_auto]"
          >
            <input type="hidden" name="id" value={b.id} />
            <div>
              <p className="font-semibold text-white">
                {(b.services as { name?: string } | null)?.name ?? "Service"} ·{" "}
                {(b.profiles as { full_name?: string } | null)?.full_name ?? "Client"}
              </p>
              <p className="text-xs text-white/55">
                {new Date(b.start_at).toLocaleString()} · {b.location_type}
                {b.address ? ` · ${b.address}` : ""}
              </p>
            </div>
            <select
              name="status"
              defaultValue={b.status}
              className="rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm text-white"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s} className="bg-kabuki-navy">
                  {s}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-full bg-kabuki-pink px-4 py-2 text-xs font-semibold uppercase tracking-wider text-kabuki-navy"
            >
              Update
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
