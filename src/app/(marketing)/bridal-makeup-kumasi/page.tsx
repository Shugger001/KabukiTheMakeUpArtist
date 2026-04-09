import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: "Bridal Makeup in Kumasi",
  description:
    "Bridal makeup services in Kumasi with trial sessions, day-of artistry, and long-wear finishes for ceremonies and receptions.",
};

export default function BridalMakeupKumasiPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Bridal makeup",
    provider: { "@type": "Organization", name: BRAND.fullName },
    areaServed: "Kumasi, Ghana",
  };

  return (
    <div className="bg-kabuki-white py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-kabuki-navy/45">Kumasi weddings</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] text-kabuki-navy">
          Bridal makeup in Kumasi
        </h1>
        <p className="mt-5 text-kabuki-navy/65">
          Complete bridal beauty support from trial to ceremony day with skin-prep and weather-aware wear.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-kabuki-navy/68">
          <li>Bridal trial and final look mapping</li>
          <li>Touch-up strategy for day-to-night transitions</li>
          <li>Optional bridal party package add-ons</li>
        </ul>
        <div className="mt-8">
          <Link href="/book" className="rounded-full bg-kabuki-pink px-6 py-3 text-sm font-semibold text-kabuki-navy">
            Reserve bridal date
          </Link>
        </div>
      </div>
    </div>
  );
}
