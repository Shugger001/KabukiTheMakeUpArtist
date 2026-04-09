import { VOICES_ATTRIBUTIONS } from "@/lib/constants/voices-from-ghana";

/**
 * Server Component — testimonial names and quotes are rendered in the initial HTML so they are
 * not dependent on cached client bundles (PWA / aggressive browser cache).
 */
const quotes = [
  {
    attribution: VOICES_ATTRIBUTIONS[0],
    role: "Bride",
    quote: (
      <>
        She understood my skin and my culture before I finished explaining the brief. I have never
        felt more myself — just <span className="italic">elevated</span>.
      </>
    ),
  },
  {
    attribution: VOICES_ATTRIBUTIONS[1],
    role: "Bride",
    quote: (
      <>
        The studio felt like a <span className="italic">sanctuary</span> in Accra. Every brushstroke
        intentional — she truly gets how our humidity behaves on the skin.
      </>
    ),
  },
  {
    attribution: VOICES_ATTRIBUTIONS[2],
    role: "Bride",
    quote: (
      <>
        Home visit was seamless. Punctual, immaculate kit, and a look that held through the full
        reception — <span className="italic">from sun to dance floor</span>.
      </>
    ),
  },
] as const;

export function TestimonialsSection() {
  return (
    <section
      id="voices-from-ghana"
      className="bg-kabuki-white py-24 sm:py-32"
      data-voices={VOICES_ATTRIBUTIONS.join("|")}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-kabuki-navy/38 sm:text-xs sm:tracking-[0.46em]">
            Testimonials
          </p>
          <h2 className="mt-3 max-w-xl font-display text-[clamp(2rem,5vw,3.25rem)] tracking-[-0.028em] text-kabuki-navy">
            Voices from Ghana
          </h2>
          <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-kabuki-navy/58 sm:text-[1.02rem]">
            A few of the brides I&apos;ve had the pleasure to work with — real women, real wedding
            days.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {quotes.map((q) => (
            <blockquote
              key={q.attribution}
              className="flex flex-col justify-between rounded-3xl border border-kabuki-pink/25 bg-kabuki-grey/40 p-8 shadow-soft"
            >
              <p className="font-display text-lg leading-relaxed tracking-[-0.01em] text-kabuki-navy/90">
                &ldquo;{q.quote}&rdquo;
              </p>
              <footer className="mt-8 border-t border-kabuki-pink/20 pt-6">
                <p className="text-sm font-semibold text-kabuki-navy">{q.attribution}</p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-kabuki-navy/45 sm:tracking-[0.26em]">
                  {q.role}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-[0.65rem] leading-relaxed text-kabuki-navy/45">
          Quotes may be shortened for readability; each attribution is a real bride from that town.
        </p>
      </div>
    </section>
  );
}
