"use client";

import { Reveal } from "@/components/motion/reveal";

const chapters = [
  {
    title: "Skin-first philosophy",
    body:
      "Every application begins with skin that feels alive — from the deepest melanin-rich tones to the fairest complexions. We balance hydration, tone correction, and texture respect before pigment ever touches the face, with Accra heat and humidity in mind.",
  },
  {
    title: "Editorial discipline",
    body:
      "Structure without severity — camera-ready polish for photographs and film, from courtyard vows to reception halls in Accra and abroad. Soft focus where it flatters, precision where it defines.",
  },
  {
    title: "Your light, amplified",
    body:
      "Makeup that moves with you from outdoor kente portraits to late-night receptions — cohesive under African sun or ballroom light, never overworked.",
  },
];

export function StorySection() {
  return (
    <section className="relative bg-kabuki-grey py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-kabuki-navy/42 sm:text-xs sm:tracking-[0.46em]">
            The narrative
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.35rem)] leading-[1.08] tracking-[-0.028em] text-kabuki-navy">
            Roots in Ghana. Vision for <span className="italic">every</span> face.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {chapters.map((c, i) => (
            <Reveal key={c.title} delay={0.05 * i + 0.04} y={22}>
              <article className="glass-panel relative h-full rounded-3xl p-8 sm:p-10">
                <span className="font-display text-5xl text-kabuki-pink/80">0{i + 1}</span>
                <h3 className="mt-6 font-display text-2xl tracking-[-0.02em] text-kabuki-navy">
                  {c.title}
                </h3>
                <p className="mt-4 max-w-[26rem] text-sm leading-relaxed text-kabuki-navy/65">
                  {c.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
