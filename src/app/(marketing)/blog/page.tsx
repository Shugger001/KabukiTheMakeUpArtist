import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Editorial notes on beauty, craft, and Kabuki sessions.",
};

export default function BlogPage() {
  return (
    <div className="bg-kabuki-grey py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-kabuki-navy/45">
            Journal
          </p>
          <h1 className="mt-4 font-display text-4xl text-kabuki-navy sm:text-5xl">Stories in pigment</h1>
          <p className="mt-6 text-kabuki-navy/60">
            Posts hydrate from <code className="rounded bg-kabuki-pink/25 px-1">blog_posts</code> where{" "}
            <code className="rounded bg-kabuki-pink/25 px-1">published = true</code>. Build dynamic
            routes under <code className="rounded bg-kabuki-pink/25 px-1">/blog/[slug]</code>.
          </p>
        </Reveal>
        <div className="mt-14 rounded-3xl border border-dashed border-kabuki-pink/35 bg-white/60 p-12 text-center text-sm text-kabuki-navy/50">
          No published posts yet — seed content from the admin console.
        </div>
      </div>
    </div>
  );
}
