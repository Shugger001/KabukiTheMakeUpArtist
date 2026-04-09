import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: "Makeup Artist in Accra",
  description:
    "Book a luxury makeup artist in Accra for bridal, editorial, and private events. Skin-first artistry tailored for Ghanaian complexions.",
};

export default function MakeupArtistAccraPage() {
  const googleUrl = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL?.trim() || "https://maps.google.com";

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.fullName,
    areaServed: "Accra, Ghana",
    priceRange: "$$",
    url: "/makeup-artist-accra",
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you offer home service in Accra?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, home and venue callouts are available across Accra." },
      },
      {
        "@type": "Question",
        name: "Can I book bridal trials?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, bridal packages include optional trial sessions." },
      },
    ],
  };

  return (
    <div className="bg-kabuki-grey py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-kabuki-navy/45">Accra studio</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] text-kabuki-navy">
          Luxury makeup artist in Accra
        </h1>
        <p className="mt-5 text-kabuki-navy/65">
          Bridal, editorial, and private-client makeup designed for Ghanaian skin tones and humid weather.
          Book your preferred date in minutes.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/book" className="rounded-full bg-kabuki-navy px-6 py-3 text-sm font-semibold text-white">
            Book now
          </Link>
          <a
            href={googleUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-kabuki-navy/20 px-6 py-3 text-sm font-semibold text-kabuki-navy"
          >
            Google Business profile
          </a>
        </div>
      </div>
    </div>
  );
}
