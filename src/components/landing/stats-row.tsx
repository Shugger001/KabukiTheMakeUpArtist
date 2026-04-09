"use client";

import { Reveal } from "@/components/motion/reveal";

const stats = [
  { label: "Traditional & family celebrations", value: "Trad+" },
  { label: "Preview your wedding look", value: "Trials" },
  { label: "Accra studio · travel on request", value: "Ghana" },
];

export function StatsRow() {
  return (
    <section className="bg-kabuki-navy py-12 text-kabuki-white sm:py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.05 * i + 0.04} y={18}>
              <div className="text-center sm:text-left">
                <p className="font-display text-4xl tracking-[-0.03em] text-kabuki-pink sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-white/45">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
