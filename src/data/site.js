// Central business details. Replace the empty values with verified Growthys
// information — empty fields are hidden automatically and never reach
// structured data.
const site = {
  name: "Growthys",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  tagline: "Strategy. Technology. Performance.",
  description:
    "Growthys is a full-service digital growth agency combining web development, UI/UX, performance marketing, SEO, social media, branding and ongoing technical support.",
  shortDescription: "A digital growth agency where development, design and data-driven marketing work as one team.",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
    address: "",
  },
  // Add verified profiles only, e.g. { label: "LinkedIn", href: "https://..." }
  social: [],
};

export default site;

// Page URLs get a trailing slash to match `trailingSlash: true` (and the
// canonical tags Next.js emits); file URLs like /sitemap.xml are left alone.
export function absoluteUrl(path = "/") {
  let p = path.startsWith("/") ? path : `/${path}`;
  if (!p.endsWith("/") && !/\.[a-z0-9]+$/i.test(p)) p += "/";
  return `${site.url}${p}`;
}
