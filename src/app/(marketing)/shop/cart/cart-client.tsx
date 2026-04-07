"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { formatShopPrice } from "@/lib/format/money";

export function CartClient() {
  const { lines, setQuantity, removeLine, clear } = useCartStore();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const reference = searchParams.get("reference");
    if (!reference) return;
    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`);
      const data = await res.json();
      if (cancelled) return;
      if (data.ok) {
        toast.success("Payment confirmed", { description: "Thank you — your order is processing." });
        clear();
      } else if (data.error) {
        toast.error(String(data.error));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [searchParams, clear]);

  const subtotal = lines.reduce((acc, l) => acc + l.price * l.quantity, 0);

  async function checkout() {
    if (!email.trim()) {
      toast.error("Email required for checkout");
      return;
    }
    if (lines.length === 0) {
      toast.error("Your bag is empty");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount: subtotal,
          items: lines.map((l) => ({ productId: l.productId, quantity: l.quantity })),
          metadata: { source: "web-cart" },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Checkout failed");
        return;
      }
      if (data.authorization_url) {
        window.location.href = data.authorization_url as string;
        return;
      }
      toast.message("Configure Paystack", {
        description: "Set PAYSTACK_SECRET_KEY to receive a live authorization URL.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-kabuki-grey py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h1 className="font-display text-4xl text-kabuki-navy">Your bag</h1>
        {lines.length === 0 ? (
          <p className="mt-8 rounded-3xl border border-dashed border-kabuki-pink/40 bg-white/60 p-12 text-center text-kabuki-navy/55">
            Nothing here yet —{" "}
            <Link href="/shop" className="font-semibold text-kabuki-navy underline-offset-4 hover:underline">
              explore the boutique
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-10 space-y-6">
            {lines.map((l) => (
              <li
                key={l.productId}
                className="flex gap-4 rounded-3xl border border-kabuki-pink/25 bg-white/80 p-4 shadow-soft"
              >
                <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-kabuki-grey">
                  {l.image && (
                    <Image src={l.image} alt="" fill className="object-cover" sizes="96px" />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="font-medium text-kabuki-navy">{l.name}</p>
                      <p className="text-sm text-kabuki-navy/50">{formatShopPrice(l.price)} each</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(l.productId)}
                      className="text-xs font-semibold uppercase tracking-wider text-kabuki-navy/40 hover:text-kabuki-navy"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2 rounded-full border border-kabuki-pink/30 px-2 py-1">
                      <button
                        type="button"
                        className="size-8 rounded-full text-lg leading-none text-kabuki-navy hover:bg-kabuki-pink/20"
                        onClick={() => setQuantity(l.productId, l.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="min-w-[2ch] text-center text-sm font-semibold">{l.quantity}</span>
                      <button
                        type="button"
                        className="size-8 rounded-full text-lg leading-none text-kabuki-navy hover:bg-kabuki-pink/20"
                        onClick={() => setQuantity(l.productId, l.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-kabuki-navy">
                      {formatShopPrice(l.price * l.quantity)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 && (
          <div className="mt-12 space-y-6 rounded-[2rem] border border-kabuki-pink/25 bg-white/80 p-8 shadow-soft">
            <div className="flex justify-between text-kabuki-navy">
              <span className="text-kabuki-navy/55">Subtotal</span>
              <span className="text-xl font-semibold">{formatShopPrice(subtotal)}</span>
            </div>
            <label className="block text-sm font-medium text-kabuki-navy/70">
              Email for receipt
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-kabuki-pink/30 px-4 py-3 text-kabuki-navy outline-none ring-kabuki-pink/40 focus:ring-2"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
            <button
              type="button"
              disabled={loading}
              onClick={checkout}
              className="w-full rounded-full bg-kabuki-navy py-4 text-sm font-semibold text-white transition hover:bg-kabuki-navy/90 disabled:opacity-50"
            >
              {loading ? "Connecting…" : "Pay with Paystack"}
            </button>
            <button
              type="button"
              onClick={() => clear()}
              className="w-full text-center text-xs font-semibold uppercase tracking-wider text-kabuki-navy/40 hover:text-kabuki-navy"
            >
              Clear bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
