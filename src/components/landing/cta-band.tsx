"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { MagneticWrap } from "@/components/motion/magnetic-wrap";
import { MARKET } from "@/lib/constants/market";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-kabuki-grey py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(248,200,220,0.35),transparent_45%)]" />
      <m.div
        className="relative mx-auto max-w-4xl rounded-[2rem] border border-kabuki-pink/30 bg-white/70 px-8 py-16 text-center shadow-soft backdrop-blur-xl sm:px-16"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-display text-3xl tracking-tight text-kabuki-navy sm:text-5xl">
          Reserve your date
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-kabuki-navy/60">
          By appointment in {MARKET.city} — studio or on-location. We confirm every booking
          personally: bridal trials, traditional ceremonies, editorial days, and destination
          weddings when travel is arranged.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticWrap>
            <Link
              href="/book"
              className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-full bg-kabuki-navy px-8 text-sm font-semibold text-white transition hover:bg-kabuki-navy/90"
            >
              Book appointment
            </Link>
          </MagneticWrap>
          <MagneticWrap>
            <Link
              href="/shop"
              className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-full border border-kabuki-navy/15 bg-transparent px-8 text-sm font-semibold text-kabuki-navy transition hover:border-kabuki-pink hover:bg-kabuki-pink/15"
            >
              Shop essentials
            </Link>
          </MagneticWrap>
        </div>
      </m.div>
    </section>
  );
}
