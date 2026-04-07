import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sampleProducts } from "@/lib/data/sample-products";
import { formatShopPrice } from "@/lib/format/money";
import { ProductActions } from "@/components/shop/product-actions";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = sampleProducts.find((x) => x.slug === slug);
  if (!p) return { title: "Product" };
  return { title: p.name, description: p.description };
}

export async function generateStaticParams() {
  return sampleProducts.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = sampleProducts.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <div className="bg-kabuki-grey py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-start">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-kabuki-pink/25 bg-white shadow-soft">
          <Image src={p.image} alt="" fill className="object-cover" priority />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-kabuki-navy/45">
            {p.category}
          </p>
          <h1 className="mt-3 font-display text-4xl text-kabuki-navy sm:text-5xl">{p.name}</h1>
          <p className="mt-6 text-lg leading-relaxed text-kabuki-navy/65">{p.description}</p>
          <p className="mt-8 text-2xl font-semibold text-kabuki-navy">{formatShopPrice(p.price)}</p>
          <ProductActions product={p} />
          <Link
            href="/shop"
            className="mt-10 inline-block text-sm font-semibold text-kabuki-navy/60 underline-offset-4 hover:text-kabuki-navy hover:underline"
          >
            ← Back to shop
          </Link>
        </div>
      </div>
    </div>
  );
}
