import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatShopPrice } from "@/lib/format/money";

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  price: number;
  inventory: number;
  active: boolean;
};

async function updateProduct(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  const inventory = Number(formData.get("inventory") ?? 0);
  const active = String(formData.get("active") ?? "") === "on";
  if (!id || Number.isNaN(inventory)) return;
  const admin = createAdminClient();
  await admin
    .from("products")
    .update({ inventory, active, updated_at: new Date().toISOString() })
    .eq("id", id);
  revalidatePath("/admin/products");
}

export default async function AdminProductsPage() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("products")
    .select("id, name, slug, price, inventory, active")
    .order("created_at", { ascending: false });
  const products = ((data ?? []) as ProductRow[]).filter((p) => p.id && p.slug);

  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
      <h1 className="font-display text-3xl">Products & inventory</h1>
      <p className="max-w-2xl text-sm text-white/55">
        Live products from Supabase. Update stock and publish state directly from this panel.
      </p>
      {products.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/20 bg-black/20 p-6 text-sm text-white/60">
          No products found. Seed or add rows to <code className="text-kabuki-pink">products</code>.
        </p>
      ) : (
        <div className="space-y-4">
          {products.map((p) => (
            <form
              key={p.id}
              action={updateProduct}
              className="grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 sm:grid-cols-[1fr_auto_auto_auto]"
            >
              <input type="hidden" name="id" value={p.id} />
              <div>
                <p className="font-semibold text-white">{p.name}</p>
                <p className="text-xs text-white/50">{p.slug}</p>
                <p className="mt-1 text-xs text-kabuki-pink">Price: {formatShopPrice(p.price)}</p>
              </div>
              <label className="text-xs text-white/60">
                Inventory
                <input
                  type="number"
                  name="inventory"
                  min={0}
                  defaultValue={p.inventory}
                  className="mt-1 w-24 rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-white"
                />
              </label>
              <label className="flex items-center gap-2 text-sm text-white/75">
                <input type="checkbox" name="active" defaultChecked={p.active} />
                Active
              </label>
              <button
                type="submit"
                className="rounded-full bg-kabuki-pink px-4 py-2 text-xs font-semibold uppercase tracking-wider text-kabuki-navy hover:opacity-95"
              >
                Save
              </button>
            </form>
          ))}
        </div>
      )}
    </div>
  );
}
