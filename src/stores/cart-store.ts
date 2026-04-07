import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
}

interface CartState {
  lines: CartLine[];
  addLine: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeLine: (productId: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addLine: (line) => {
        const qty = line.quantity ?? 1;
        const existing = get().lines.find((l) => l.productId === line.productId);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.productId === line.productId
                ? { ...l, quantity: l.quantity + qty }
                : l,
            ),
          });
        } else {
          set({
            lines: [
              ...get().lines,
              {
                productId: line.productId,
                slug: line.slug,
                name: line.name,
                price: line.price,
                quantity: qty,
                image: line.image,
              },
            ],
          });
        }
      },
      setQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeLine(productId);
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.productId === productId ? { ...l, quantity } : l,
          ),
        });
      },
      removeLine: (productId) =>
        set({ lines: get().lines.filter((l) => l.productId !== productId) }),
      clear: () => set({ lines: [] }),
    }),
    { name: "kabuki-cart" },
  ),
);
