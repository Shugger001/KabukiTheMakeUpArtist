import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { BRAND } from "@/lib/constants/brand";
import { MARKET } from "@/lib/constants/market";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://127.0.0.1:3100"),
  title: {
    default: `${BRAND.fullName} — Luxury Makeup · ${MARKET.city}, ${MARKET.country}`,
    template: `%s · ${BRAND.name}`,
  },
  description: `Accra-based luxury makeup artistry for Ghana and clients across Africa — ${BRAND.fullName}.`,
  applicationName: BRAND.fullName,
  icons: {
    icon: [{ url: BRAND.logo.src, type: "image/png" }],
    apple: [{ url: BRAND.logo.src, type: "image/png" }],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: BRAND.name,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: BRAND.fullName,
    title: BRAND.fullName,
    description: `Luxury makeup in ${MARKET.city}, ${MARKET.country} — bespoke looks for African skin and celebration.`,
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.fullName,
    description: `Luxury makeup in ${MARKET.city} — editorial artistry for Ghana & Africa.`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8C8DC" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1A2F" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={MARKET.htmlLocale}
      className={`${inter.variable} ${playfair.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
