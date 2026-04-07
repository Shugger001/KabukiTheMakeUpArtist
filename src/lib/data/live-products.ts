import { sampleProducts, type SampleProduct } from "@/lib/data/sample-products";
import { createClient } from "@/lib/supabase/server";

export type LiveProduct = SampleProduct;

function normalizeProduct(row: Record<string, unknown>): LiveProduct | null {
  const id = typeof row.id === "string" ? row.id : null;
  const slug = typeof row.slug === "string" ? row.slug : null;
  const name = typeof row.name === "string" ? row.name : null;
  const price = typeof row.price === "number" ? row.price : Number(row.price);
  if (!id || !slug || !name || Number.isNaN(price)) return null;

  const images = Array.isArray(row.images) ? row.images : [];
  const firstImage = images.find((x) => typeof x === "string") as string | undefined;

  return {
    id,
    slug,
    name,
    description: typeof row.description === "string" ? row.description : "",
    price,
    category: typeof row.category === "string" ? row.category : "Essentials",
    image: firstImage ?? "/icons/icon-512.png",
  };
}

/**
 * Uses live Supabase products when available, otherwise falls back to local samples.
 */
export async function getShopProducts(): Promise<LiveProduct[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("id, slug, name, description, price, category, images, active, created_at")
      .eq("active", true)
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return sampleProducts;
    const normalized = data
      .map((row) => normalizeProduct(row as Record<string, unknown>))
      .filter((x): x is LiveProduct => Boolean(x));
    return normalized.length > 0 ? normalized : sampleProducts;
  } catch {
    return sampleProducts;
  }
}

export async function getShopProductBySlug(slug: string): Promise<LiveProduct | null> {
  const products = await getShopProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
