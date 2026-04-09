import { LandingHero } from "@/components/landing/hero";
import { StorySection } from "@/components/landing/story-section";
import { TestimonialsSection } from "@/components/landing/testimonials";

/** Fresh HTML each request so testimonial/name updates are not stuck behind stale CDN or SW caches. */
export const dynamic = "force-dynamic";
import { GalleryStrip } from "@/components/landing/gallery-strip";
import { CtaBand } from "@/components/landing/cta-band";
import { PressStrip } from "@/components/landing/press-strip";
import { StatsRow } from "@/components/landing/stats-row";
import { EditorPickStrip } from "@/components/landing/editor-pick-strip";
import { SectionDivider } from "@/components/landing/section-divider";
import { TrustConversionBlock } from "@/components/landing/trust-conversion-block";

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <TrustConversionBlock />
      <PressStrip />
      <StatsRow />
      <StorySection />
      <SectionDivider
        variant="quote"
        quote="Confidence wears many faces — we honour yours with craft, care, and colour that belongs on African skin."
      />
      <TestimonialsSection />
      <SectionDivider variant="rule-arch" />
      <GalleryStrip />
      <EditorPickStrip />
      <CtaBand />
    </>
  );
}
