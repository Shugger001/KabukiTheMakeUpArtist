"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { galleryEditorial } from "@/lib/constants/editorial-media";
import { useState } from "react";

export function GalleryStrip() {
  const [slider, setSlider] = useState(52);
  return (
    <section className="bg-kabuki-navy py-24 text-kabuki-white sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-kabuki-pink/88 sm:text-xs sm:tracking-[0.45em]">
            From Accra sets
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-[-0.025em] sm:text-5xl">
            Light, texture, and tone — for every complexion.
          </h2>
        </Reveal>
        <div className="mt-10 rounded-3xl border border-white/15 bg-white/5 p-4">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-white/70">
            Before / after lighting check
          </p>
          <div className="relative mt-3 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={galleryEditorial[0].src}
              alt="Before makeup balancing"
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}>
              <Image
                src={galleryEditorial[3].src}
                alt="After makeup balancing"
                fill
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover saturate-110"
              />
            </div>
          </div>
          <label className="mt-3 block text-xs text-white/70">
            Slide to compare
            <input
              type="range"
              min={0}
              max={100}
              value={slider}
              onChange={(e) => setSlider(Number(e.target.value))}
              className="mt-2 w-full accent-kabuki-pink"
            />
          </label>
        </div>

        <div className="mt-14 columns-2 gap-4 sm:columns-3 lg:gap-5">
          {galleryEditorial.map((item, i) => (
            <m.figure
              key={item.id}
              className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl sm:mb-5"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.55,
                delay: 0.05 * i + 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-kabuki-navy">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,26,47,0.08)_0%,rgba(10,26,47,0.52)_100%)] mix-blend-multiply"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-kabuki-pink/[0.07] mix-blend-soft-light"
                  aria-hidden
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 pt-12 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/92">
                  {item.caption}
                </figcaption>
              </div>
            </m.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
