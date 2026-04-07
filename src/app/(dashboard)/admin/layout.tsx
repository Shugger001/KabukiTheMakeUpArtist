import Link from "next/link";
import { KabukiLogo } from "@/components/brand/kabuki-logo";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/customers", label: "CRM" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-kabuki-navy text-kabuki-white">
      <div className="border-b border-white/10 bg-kabuki-navy/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-kabuki-pink">
              Super admin
            </p>
            <Link href="/" className="mt-2 inline-block" aria-label="Home">
              <KabukiLogo variant="onDark" className="[&_img]:h-7 [&_img]:sm:h-8" />
            </Link>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-white/60 transition hover:text-white"
          >
            View storefront
          </Link>
        </div>
        <nav
          className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 pb-4 sm:px-8"
          aria-label="Admin"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/70 transition hover:border-kabuki-pink/50 hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">{children}</div>
    </div>
  );
}
