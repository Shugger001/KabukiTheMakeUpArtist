"use client";

import { m, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { KabukiLogo } from "@/components/brand/kabuki-logo";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/book", label: "Book" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/blog", label: "Journal" },
  { href: "/gallery", label: "Gallery" },
];

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setCondensed(y > 24);
  });

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <m.header
        initial={false}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-[var(--header-height)] overflow-visible border-b transition-[border-color,background-color] duration-500",
          condensed
            ? "border-kabuki-pink/30 bg-kabuki-white/75 shadow-[var(--shadow-glass)] backdrop-blur-xl"
            : "border-transparent bg-kabuki-white/20 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between gap-3 overflow-visible px-4 sm:gap-5 sm:px-8">
          <Link
            href="/"
            className="group -ml-1 flex h-full min-h-11 min-w-11 shrink-0 items-center rounded-md md:-ml-0"
            aria-label="Kabuki The MakeUp Girl — Home"
            onClick={() => setMenuOpen(false)}
          >
            <KabukiLogo priority />
          </Link>

          <nav
            className="hidden items-center gap-5 text-sm font-medium text-kabuki-navy/80 md:flex lg:gap-7 xl:gap-8"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative transition-colors hover:text-kabuki-navy after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-kabuki-pink after:transition-transform hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/account"
              className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-kabuki-navy/80 transition hover:bg-kabuki-pink/25 hover:text-kabuki-navy sm:inline-flex"
            >
              Account
            </Link>
            <Link
              href="/book"
              className="hidden items-center rounded-full bg-kabuki-navy px-4 py-1.5 text-sm font-semibold text-kabuki-white shadow-soft transition hover:bg-kabuki-navy/90 hover:shadow-md active:scale-[0.98] sm:inline-flex sm:px-5"
            >
              Book
            </Link>
            <button
              type="button"
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-kabuki-navy/12 bg-white/70 text-kabuki-navy shadow-sm backdrop-blur-sm md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-primary-nav"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span className="flex flex-col gap-1.5" aria-hidden>
                <span
                  className={cn(
                    "block h-0.5 w-6 rounded-full bg-kabuki-navy transition-transform",
                    menuOpen && "translate-y-2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-6 rounded-full bg-kabuki-navy transition-opacity",
                    menuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-6 rounded-full bg-kabuki-navy transition-transform",
                    menuOpen && "-translate-y-2 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </m.header>

      <AnimatePresence>
        {menuOpen ? (
          <m.div
            id="mobile-primary-nav"
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-kabuki-navy/40 backdrop-blur-sm"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
            <m.nav
              className="absolute inset-0 flex flex-col bg-kabuki-white px-6 pb-10 pt-[calc(var(--header-height)+1.5rem)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              aria-label="Primary mobile"
            >
              <ul className="flex flex-1 flex-col gap-2">
                {nav.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.05, duration: 0.35 }}
                  >
                    <Link
                      href={item.href}
                      className="flex min-h-14 items-center rounded-2xl px-4 text-lg font-semibold tracking-tight text-kabuki-navy transition hover:bg-kabuki-pink/15"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </m.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 border-t border-kabuki-pink/20 pt-6">
                <Link
                  href="/account"
                  className="flex min-h-14 items-center justify-center rounded-2xl border border-kabuki-navy/12 text-base font-semibold text-kabuki-navy"
                  onClick={() => setMenuOpen(false)}
                >
                  Account
                </Link>
                <Link
                  href="/book"
                  className="flex min-h-14 items-center justify-center rounded-full bg-kabuki-navy text-base font-semibold text-kabuki-white shadow-soft"
                  onClick={() => setMenuOpen(false)}
                >
                  Book appointment
                </Link>
              </div>
            </m.nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
