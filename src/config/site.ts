function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "https://www.metromowcrew.com";
}

/** Client sites default to noindex until explicitly opted in for launch. */
export const siteAllowIndexing = false;

export const siteConfig = {
  name: "Metro Mow Crew",
  legalName: "Metro Mow Crew",
  positioning: "Landscaping & Lawn Care",
  tagline: "Say Hello To Metro Mow",
  heroTitle: "Top-notch landscaping and lawn care",
  estimateCta: "Get an Estimate",
  description:
    "Your go-to for landscaping and lawn care in Indianapolis, Avon, Plainfield, and nearby areas — mowing, aeration, mulching, yard clean-up, and more.",
  siteUrl: resolveSiteUrl(),
  phoneDisplay: "(317) 767-5689",
  phoneHref: "tel:+13177675689",
  smsHref: "sms:+13177675689",
  email: "sales@metromowcrew.com",
  publicWebsite: "metromowcrew.com",
  publicWebsiteHref: "https://www.metromowcrew.com",
  serviceArea: {
    primary: "Indianapolis",
    summary: "Indianapolis, Avon, Plainfield & nearby",
    cities: ["Indianapolis", "Avon", "Plainfield"] as string[],
    note: "Landscaping and lawn care throughout Indianapolis, Avon, Plainfield, and nearby communities.",
  },
  address: {
    city: "Indianapolis",
    state: "IN",
    region: "Indiana",
    zip: "",
  },
  social: {
    googleMaps: null as string | null,
    instagram: null as string | null,
    facebook: null as string | null,
    messenger: null as string | null,
    tiktok: null as string | null,
  },
  trust: [
    {
      title: "Attention to detail",
      description: "We pay close attention to detail on every job.",
    },
    {
      title: "Customer satisfaction",
      description: "Customer satisfaction is a top priority on every visit.",
    },
    {
      title: "Professional & reliable",
      description: "Seasoned professionals committed to enhancing your outdoor space.",
    },
  ] as const,
  hours: [
    {
      days: "By appointment",
      hours: "Call or request an estimate",
    },
  ],
  responseTime: "Complete the estimate form and we’ll follow up about next steps.",
  developer: {
    name: "Signal Works",
    platformLabel: "Signal Works Platform",
    url: "https://hiresignalworks.com",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function allowIndexing(): boolean {
  return siteAllowIndexing;
}
