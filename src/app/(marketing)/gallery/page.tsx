import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Before and after — editorial makeup by Kabuki.",
};

export default function GalleryPage() {
  return (
    <div className="bg-kabuki-navy py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-kabuki-pink">
            Before / After
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">Gallery</h1>
          <p className="mt-6 max-w-2xl text-white/65">
            Pair images in Storage with consent metadata. Consider a dedicated{" "}
            <code className="rounded bg-white/10 px-1">gallery_items</code> table for ordering and
            captions.
          </p>
        </Reveal>
        <div className="mt-14 columns-2 gap-4 sm:columns-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="mb-4 break-inside-avoid aspect-[3/4] rounded-2xl bg-gradient-to-br from-kabuki-pink/30 to-white/5 sm:mb-5"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
