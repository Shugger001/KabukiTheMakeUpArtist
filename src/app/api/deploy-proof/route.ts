import { NextResponse } from "next/server";
import { VOICES_ATTRIBUTIONS } from "@/lib/constants/voices-from-ghana";

export const dynamic = "force-dynamic";

/**
 * Hit `/api/deploy-proof` on the live site to confirm this deployment serves the expected testimonial
 * names (bypasses page HTML caching confusion).
 */
export function GET() {
  return NextResponse.json(
    {
      ok: true,
      testimonialAttributions: [...VOICES_ATTRIBUTIONS],
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
      deployedAt: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
