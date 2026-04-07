import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-kabuki-navy px-6 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-kabuki-pink">Kabuki</p>
      <h1 className="mt-6 font-display text-3xl sm:text-4xl">You are offline</h1>
      <p className="mt-4 max-w-md text-sm text-white/65">
        The PWA shell is active. Reconnect to book, shop, and sync your session.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex rounded-full bg-kabuki-pink px-8 py-3 text-sm font-semibold text-kabuki-navy"
      >
        Try again
      </Link>
    </div>
  );
}
