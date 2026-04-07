"use client";

import { m } from "framer-motion";
import Link from "next/link";

export function FloatingBookCta() {
  return (
    <m.div
      className="fixed bottom-6 right-5 z-40 md:hidden"
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href="/book"
        className="flex items-center gap-2 rounded-full bg-kabuki-navy px-5 py-3 text-sm font-semibold text-kabuki-white shadow-[0_20px_50px_-12px_rgba(10,26,47,0.45)] ring-2 ring-kabuki-pink/40"
      >
        Book now
      </Link>
    </m.div>
  );
}
