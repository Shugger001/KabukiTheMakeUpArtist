import { cn } from "@/lib/utils/cn";

const bleed = "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen max-w-none";

type SectionDividerProps = {
  variant?: "rule" | "rule-arch" | "quote";
  quote?: string;
  className?: string;
};

export function SectionDivider({
  variant = "rule",
  quote,
  className,
}: SectionDividerProps) {
  if (variant === "quote" && quote) {
    return (
      <div className={cn(bleed, "bg-kabuki-grey/80", className)} aria-hidden={false}>
        <figure className="mx-auto max-w-5xl px-6 py-14 text-center sm:py-20 sm:px-10">
          <blockquote className="font-display text-[clamp(1.35rem,4vw,2.35rem)] leading-snug tracking-[-0.02em] text-kabuki-navy/88">
            <span className="text-kabuki-pink/90">&ldquo;</span>
            {quote}
            <span className="text-kabuki-pink/90">&rdquo;</span>
          </blockquote>
          <figcaption className="mt-6 text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-kabuki-navy/40 sm:tracking-[0.42em]">
            In house
          </figcaption>
        </figure>
        <div
          className="h-px bg-gradient-to-r from-transparent via-kabuki-navy/12 to-transparent"
          aria-hidden
        />
      </div>
    );
  }

  if (variant === "rule-arch") {
    return (
      <div className={cn(bleed, className)} aria-hidden>
        <div className="relative h-12 overflow-hidden bg-kabuki-white">
          <svg
            className="absolute -bottom-px left-0 h-14 w-full text-kabuki-navy"
            viewBox="0 0 1440 56"
            preserveAspectRatio="none"
            role="presentation"
          >
            <path
              fill="currentColor"
              fillOpacity="0.06"
              d="M0,56 L0,28 Q720,-8 1440,28 L1440,56 Z"
            />
          </svg>
          <div className="absolute inset-x-10 top-6 h-px bg-gradient-to-r from-transparent via-kabuki-pink/35 to-transparent sm:inset-x-24" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(bleed, className)} aria-hidden>
      <div className="h-px bg-gradient-to-r from-transparent via-kabuki-navy/15 to-transparent" />
    </div>
  );
}
