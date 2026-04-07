import { createClient } from "@/lib/supabase/server";

export type LiveService = {
  id: string;
  name: string;
  duration: number;
  price: number;
};

export const fallbackServices: LiveService[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "Bridal editorial",
    duration: 120,
    price: 8500,
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "Soft glam portrait",
    duration: 90,
    price: 4200,
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    name: "Private masterclass",
    duration: 180,
    price: 11500,
  },
];

export async function getLiveServices(): Promise<LiveService[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("id, name, duration_minutes, base_price, active, sort_order")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackServices;
    const normalized = data
      .map((row) => {
        const id = typeof row.id === "string" ? row.id : null;
        const name = typeof row.name === "string" ? row.name : null;
        const duration =
          typeof row.duration_minutes === "number"
            ? row.duration_minutes
            : Number(row.duration_minutes);
        const price = typeof row.base_price === "number" ? row.base_price : Number(row.base_price);
        if (!id || !name || Number.isNaN(duration) || Number.isNaN(price)) return null;
        return { id, name, duration, price };
      })
      .filter((x): x is LiveService => Boolean(x));
    return normalized.length > 0 ? normalized : fallbackServices;
  } catch {
    return fallbackServices;
  }
}
