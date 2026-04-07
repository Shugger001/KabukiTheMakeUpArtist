import Link from "next/link";
import { KabukiLogo } from "@/components/brand/kabuki-logo";

const links = [
  { href: "/account", label: "Overview" },
  { href: "/account/bookings", label: "Bookings" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/looks", label: "Saved looks" },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-kabuki-grey">
      <div className="border-b border-kabuki-pink/20 bg-kabuki-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-kabuki-navy/40">
              Client space
            </p>
            <Link href="/" className="mt-2 inline-block" aria-label="Home">
              <KabukiLogo className="[&_img]:h-7 [&_img]:sm:h-8" />
            </Link>
          </div>
          <Link
            href="/"
            className="text-sm font-semibold text-kabuki-navy/60 underline-offset-4 hover:text-kabuki-navy hover:underline"
          >
            ← Back to site
          </Link>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 pb-4 sm:px-8" aria-label="Account">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded-full border border-transparent px-4 py-2 text-sm font-medium text-kabuki-navy/65 transition hover:border-kabuki-pink/40 hover:bg-kabuki-pink/10 hover:text-kabuki-navy"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">{children}</div>
    </div>
  );
}
