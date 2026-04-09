"use client";

import { useEffect } from "react";

/**
 * When PWA is off (default), unregister any existing Workbox SW so users who installed
 * an older build stop serving cached page bundles with outdated content.
 */
export function ClearStalePwa() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENABLE_PWA === "true") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    void navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => {
        void r.unregister();
      });
    });
  }, []);

  return null;
}
