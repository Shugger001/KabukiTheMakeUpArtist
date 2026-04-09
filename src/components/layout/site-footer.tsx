import Link from "next/link";
import { KabukiLogo } from "@/components/brand/kabuki-logo";
import { BRAND } from "@/lib/constants/brand";

const googleBusinessUrl = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL?.trim() || "https://maps.google.com";

export function SiteFooter() {
  return (
    <footer className="border-t border-kabuki-pink/25 bg-kabuki-navy text-kabuki-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div className="space-y-4">
          <KabukiLogo variant="onDark" className="max-w-[240px]" />
          <p className="max-w-xs text-sm leading-relaxed text-white/65">
            Editorial beauty artistry — bespoke makeup for moments that deserve to be remembered.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-kabuki-pink">
            Explore
          </p>
          <ul className="space-y-2 text-sm text-white/75">
            <li>
              <Link href="/shop" className="transition hover:text-white">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/book" className="transition hover:text-white">
                Book appointment
              </Link>
            </li>
            <li>
              <Link href="/tutorials" className="transition hover:text-white">
                Tutorials
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-kabuki-pink">
            Company
          </p>
          <ul className="space-y-2 text-sm text-white/75">
            <li>
              <Link href="/blog" className="transition hover:text-white">
                Journal
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="transition hover:text-white">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/makeup-artist-accra" className="transition hover:text-white">
                Makeup artist Accra
              </Link>
            </li>
            <li>
              <Link href="/bridal-makeup-kumasi" className="transition hover:text-white">
                Bridal makeup Kumasi
              </Link>
            </li>
            <li>
              <Link href="/admin" className="transition hover:text-white">
                Studio login
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-kabuki-pink">
            Contact
          </p>
          <a
            href={`mailto:${BRAND.links.email}`}
            className="text-sm text-white/75 transition hover:text-white"
          >
            {BRAND.links.email}
          </a>
          <a
            href={googleBusinessUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block text-sm text-white/75 transition hover:text-white"
          >
            Google Business
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/45">
        © {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.
      </div>
    </footer>
  );
}
