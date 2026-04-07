import { type NextRequest, NextResponse } from "next/server";

/**
 * Keep Edge minimal for Vercel size limits. Auth/role checks happen server-side in layouts/routes.
 * Scope proxy only to auth-sensitive surfaces.
 */
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/admin/:path*",
    "/auth/:path*",
    "/api/auth/:path*",
    "/api/paystack/:path*",
  ],
};
