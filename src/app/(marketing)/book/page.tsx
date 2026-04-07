import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { Reveal } from "@/components/motion/reveal";
import { MARKET } from "@/lib/constants/market";
import { getLiveServices } from "@/lib/data/live-services";

export const metadata: Metadata = {
  title: "Book an appointment",
  description: `Reserve a luxury makeup session in ${MARKET.city} — studio or on-location across ${MARKET.country}.`,
};

export default async function BookPage() {
  const services = await getLiveServices();

  return (
    <div className="relative overflow-hidden bg-kabuki-grey py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(248,200,220,0.35),transparent_40%)]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-kabuki-navy/45">
            Concierge booking
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl tracking-tight text-kabuki-navy sm:text-5xl">
            Your session, composed like an editorial.
          </h1>
          <p className="mt-5 max-w-xl text-kabuki-navy/60">
            Select a service, choose a time, and tell us whether we meet at the {MARKET.city} studio
            or your venue. Availability syncs when Supabase is connected — confirm and manage
            everything from the dashboard.
          </p>
        </Reveal>
        <div className="mt-14">
          <BookingWizard services={services} />
        </div>
      </div>
    </div>
  );
}
