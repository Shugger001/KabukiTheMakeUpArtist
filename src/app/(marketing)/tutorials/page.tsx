import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Tutorials",
  description: "Makeup tutorials and masterclasses from Kabuki.",
};

export default function TutorialsPage() {
  return (
    <div className="bg-kabuki-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-kabuki-navy/45">
            Learn
          </p>
          <h1 className="mt-4 font-display text-4xl text-kabuki-navy sm:text-5xl">Tutorials</h1>
          <p className="mt-6 max-w-2xl text-kabuki-navy/60">
            Host video chapters in Storage or Mux — model lessons as structured JSON in{" "}
            <code className="rounded bg-kabuki-pink/25 px-1">blog_posts</code> with a{" "}
            <code className="rounded bg-kabuki-pink/25 px-1">type: tutorial</code> discriminator.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {["Skin prep ritual", "Feathered liner", "Bridal longevity"].map((title) => (
            <div
              key={title}
              className="rounded-3xl border border-kabuki-pink/25 bg-kabuki-grey/50 p-8 shadow-soft"
            >
              <p className="font-display text-2xl text-kabuki-navy">{title}</p>
              <p className="mt-3 text-sm text-kabuki-navy/50">Coming soon — connect your CMS fields.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
