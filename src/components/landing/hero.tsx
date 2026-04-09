"use client";

import { m, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BRAND } from "@/lib/constants/brand";
import { MARKET } from "@/lib/constants/market";
import { heroEditorial } from "@/lib/constants/editorial-media";
import { getHeroLoopVideoSrc } from "@/lib/constants/hero-video";
import { MagneticWrap } from "@/components/motion/magnetic-wrap";
import { cn } from "@/lib/utils/cn";
import { track } from "@/lib/analytics/track";

const noiseDataUrl =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

const heroLoopVideoSrc = getHeroLoopVideoSrc();

function heroResponsiveWebpSrcSet(src: string): string | null {
  if (!src.startsWith("/editorial/") || !src.endsWith(".png")) return null;
  const stem = src.slice("/editorial/".length, -".png".length);
  return [640, 960, 1280, 1920].map((w) => `/editorial/${stem}-${w}.webp ${w}w`).join(", ");
}

export function LandingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.045]);

  const driftA = useMotionValue(0);
  const driftB = useMotionValue(0);
  useEffect(() => {
    const a = animate(driftA, [0, -12, 0], {
      duration: 14,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const b = animate(driftB, [0, 10, 0], {
      duration: 18,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => {
      a.stop();
      b.stop();
    };
  }, [driftA, driftB]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-kabuki-navy"
    >
      <m.div className="pointer-events-none absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        {heroLoopVideoSrc ? (
          <div className="hero-loop-video-wrap absolute inset-0" aria-hidden>
            <video
              className="hero-loop-video absolute inset-0 h-full w-full object-cover object-[center_18%] sm:object-[center_22%] opacity-95 contrast-[0.92] saturate-[0.82]"
              src={heroLoopVideoSrc}
              poster={heroEditorial.src}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
            />
          </div>
        ) : null}
        {heroResponsiveWebpSrcSet(heroEditorial.src) ? (
          <span
            className={cn(
              "absolute inset-0 block",
              heroLoopVideoSrc && "hero-editorial-still--layered opacity-[0.84]",
            )}
          >
            <picture className="absolute inset-0 block h-full w-full">
              <source
                type="image/webp"
                srcSet={heroResponsiveWebpSrcSet(heroEditorial.src) ?? undefined}
                sizes="100vw"
              />
              <img
                src={heroEditorial.src}
                alt={heroEditorial.alt}
                width={1920}
                height={1080}
                decoding="async"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover object-[center_18%] sm:object-[center_22%]"
              />
            </picture>
          </span>
        ) : (
          <Image
            src={heroEditorial.src}
            alt={heroEditorial.alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className={cn(
              "object-cover object-[center_18%] sm:object-[center_22%]",
              heroLoopVideoSrc && "hero-editorial-still--layered opacity-[0.84]",
            )}
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-b from-kabuki-navy/55 via-kabuki-navy/35 to-kabuki-navy/88"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_35%,transparent_20%,rgba(10,26,47,0.82)_100%)]"
          aria-hidden
        />
      </m.div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{ backgroundImage: noiseDataUrl }}
        aria-hidden
      />

      <m.div
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-kabuki-pink/20 blur-[100px]"
        style={{ y: driftA }}
        aria-hidden
      />
      <m.div
        className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-kabuki-pink/12 blur-[90px]"
        style={{ y: driftB }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_min(120px,22vw)_rgba(0,0,0,0.42)]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end gap-10 px-5 pb-24 pt-32 sm:px-8 md:justify-center md:pb-32 md:pt-40">
        <div className="pointer-events-none absolute left-5 top-[32%] max-md:top-[28%] md:left-8 md:top-1/3">
          <div
            className="h-[min(52vw,440px)] w-[min(92vw,560px)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(248,200,220,0.42)_0%,rgba(248,200,220,0.12)_42%,transparent_72%)] blur-2xl"
            aria-hidden
          />
        </div>

        <m.p
          className="relative text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-kabuki-pink/92 sm:text-xs sm:tracking-[0.48em]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {MARKET.city} · {MARKET.country} · Luxury makeup
        </m.p>

        <div className="relative max-w-4xl space-y-6">
          <m.h1
            className="font-display text-balance text-[clamp(2.35rem,8.2vw,6.35rem)] leading-[1.04] tracking-[-0.035em] text-kabuki-white"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            The face is
            <span className="mt-1 block bg-gradient-to-r from-kabuki-pink via-white to-kabuki-pink bg-clip-text font-normal text-transparent">
              your canvas.
            </span>
          </m.h1>
          <m.p
            className="max-w-[17.5rem] text-[0.9375rem] leading-relaxed text-white/72 sm:max-w-sm sm:text-[1.05rem] md:max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {BRAND.fullName} is {MARKET.city}-based, serving clients across {MARKET.audienceDescriptor}{" "}
            — luminous, editorial-ready looks with a soft-meets-structural philosophy, tailored to
            African skin tones, your story, and the light you{" "}
            <span className="font-display italic text-white/85">walk</span> into.
          </m.p>
        </div>

        <m.div
          className="relative flex flex-col gap-4 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticWrap>
            <Link
              href="/book"
              onClick={() => track("hero_cta_click", { target: "book" })}
              className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-full bg-kabuki-pink px-8 text-sm font-semibold text-kabuki-navy shadow-[0_20px_60px_-20px_rgba(248,200,220,0.65)] transition hover:opacity-[0.97] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kabuki-white/90"
            >
              Book appointment
            </Link>
          </MagneticWrap>
          <MagneticWrap>
            <Link
              href="/shop"
              onClick={() => track("hero_cta_click", { target: "shop" })}
              className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-full border border-white/28 bg-white/8 px-8 text-sm font-semibold text-white backdrop-blur-md transition hover:border-kabuki-pink/55 hover:bg-white/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kabuki-pink/90"
            >
              Shop the ritual
            </Link>
          </MagneticWrap>
        </m.div>

        <m.div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          aria-hidden
        >
          <div className="h-14 w-px bg-gradient-to-b from-transparent via-kabuki-pink/60 to-transparent" />
        </m.div>
      </div>
    </section>
  );
}
