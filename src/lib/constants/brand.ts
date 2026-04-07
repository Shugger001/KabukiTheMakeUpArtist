export const BRAND = {
  name: "Kabuki",
  tagline: "The MakeUp Girl",
  fullName: "Kabuki The MakeUp Girl",
  logo: {
    /** Transparent + trimmed; regenerate with `npm run build:logo` */
    src: "/brand/kabuki-logo-trimmed.png",
    alt: "Kabuki The MakeUp Girl",
    width: 381,
    height: 199,
  },
  colors: {
    pink: "#F8C8DC",
    white: "#FFFFFF",
    navy: "#0A1A2F",
    grey: "#F9FAFB",
  },
  links: {
    instagram: "https://instagram.com",
    email: "hello@kabukimakeup.com",
  },
} as const;
