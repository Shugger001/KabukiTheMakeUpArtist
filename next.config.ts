import type { NextConfig } from "next";
import path from "path";
import withPWAInit from "@ducanh2912/next-pwa";

/**
 * PWA is opt-in: the default Workbox recipe caches navigations (`pages` / `start-url`)
 * for up to 24h, so repeat visitors often saw **stale JS/HTML** (e.g. old testimonial names)
 * after deploy. Set `NEXT_PUBLIC_ENABLE_PWA=true` on Vercel only if you need install/offline
 * and are OK tuning caching further.
 */
const pwaEnabled =
  process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_ENABLE_PWA === "true";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development" || !pwaEnabled,
  register: true,
  cacheStartUrl: false,
  fallbacks: {
    document: "/offline",
  },
});

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(process.cwd()),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [{ key: "Cache-Control", value: "private, no-cache, no-store, must-revalidate" }],
      },
    ];
  },
};

export default withPWA(nextConfig);
