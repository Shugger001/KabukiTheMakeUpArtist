import { publicMarketingMediaUrl } from "@/lib/media/public-marketing-url";

/**
 * Optional muted loop behind the hero still. Set `NEXT_PUBLIC_HERO_VIDEO_URL` to any public MP4,
 * or upload `editorial/hero-loop.mp4` when `NEXT_PUBLIC_MARKETING_MEDIA_USE_STORAGE` is enabled.
 */
export function getHeroLoopVideoSrc(): string | null {
  const direct = process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim();
  if (direct) return direct;
  return publicMarketingMediaUrl("editorial/hero-loop.mp4");
}
