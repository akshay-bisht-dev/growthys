// Demo case studies. These are illustrative concept projects that show how
// Growthys approaches work — they are not client engagements and contain no
// performance figures. Replace with real, approved case studies (and verified
// outcomes) when available, then set `isDemo: false`.
const projects = [
  {
    slug: "outdoor-retail-storefront",
    isDemo: true,
    title: "Outdoor retail storefront",
    industry: "E-commerce and retail",
    category: "E-commerce",
    year: "Concept",
    services: ["E-commerce Growth", "Website Design and UI/UX", "Performance Marketing"],
    stack: ["shopify", "googleanalytics", "meta", "figma"],
    palette: ["#57E6D2", "#1B3B3A"],
    layout: "store",
    overview:
      "A concept Shopify storefront for an outdoor equipment retailer, designed around fast product discovery and confident purchasing on mobile.",
    challenge:
      "Outdoor shoppers compare technical specifications carefully. A typical store buries that information, which pushes visitors to research elsewhere and abandon the purchase.",
    approach: [
      "Structured product data so filters work on the specifications people actually compare.",
      "Product pages that lead with use-case, fit and key specs, followed by detail on demand.",
      "A shortened mobile checkout path and clear delivery and returns messaging.",
      "GA4 e-commerce events and Meta conversion tracking planned before launch.",
    ],
    outcome:
      "This is a concept project, so there are no client results to report. Real case studies will include verified, client-approved outcomes.",
  },
  {
    slug: "saas-product-launch",
    isDemo: true,
    title: "SaaS product launch site",
    industry: "Technology and SaaS",
    category: "Web development",
    year: "Concept",
    services: ["Web Development", "Website Design and UI/UX", "Search Engine Optimization"],
    stack: ["nextdotjs", "react", "gsap", "sanity"],
    palette: ["#648BFF", "#16204A"],
    layout: "saas",
    overview:
      "A concept marketing site for a B2B software launch, built with Next.js and a headless CMS so the marketing team can ship pages without developers.",
    challenge:
      "Launch sites often look impressive but are slow, hard to update and weak on search. The goal was a site that is fast, flexible for marketers and technically sound for SEO.",
    approach: [
      "A component library in the CMS so new landing pages are assembled, not rebuilt.",
      "Server-rendered pages with optimized images and restrained, purposeful motion.",
      "Structured data, clean URLs and an internal linking plan from day one.",
      "A product-led narrative that explains the value before listing features.",
    ],
    outcome:
      "This is a concept project, so there are no client results to report. Real case studies will include verified, client-approved outcomes.",
  },
  {
    slug: "clinic-local-seo",
    isDemo: true,
    title: "Healthcare clinic visibility",
    industry: "Healthcare",
    category: "SEO",
    year: "Concept",
    services: ["Search Engine Optimization", "Content Marketing", "Website Maintenance and Support"],
    stack: ["wordpress", "googlesearchconsole", "googleanalytics", "cloudflare"],
    palette: ["#A78BFA", "#2A1F4A"],
    layout: "clinic",
    overview:
      "A concept SEO and content programme for a multi-location clinic, focused on accurate, helpful information and an accessible WordPress site.",
    challenge:
      "Healthcare content must be accurate, accessible and trustworthy. The clinic's site needed clearer service pages, location pages and a maintainable technical setup.",
    approach: [
      "Technical audit covering indexing, page speed and duplicate location content.",
      "Service and location page templates reviewed with clinical staff for accuracy.",
      "Accessibility improvements to contrast, forms and keyboard navigation.",
      "Ongoing maintenance with updates, backups and uptime monitoring.",
    ],
    outcome:
      "This is a concept project, so there are no client results to report. Real case studies will include verified, client-approved outcomes.",
  },
  {
    slug: "consumer-brand-campaign",
    isDemo: true,
    title: "Consumer brand refresh",
    industry: "Consumer brands",
    category: "Branding",
    year: "Concept",
    services: ["Branding and Brand Promotion", "Social Media Marketing", "Performance Marketing"],
    stack: ["figma", "meta", "googleads"],
    palette: ["#F2B880", "#3A2516"],
    layout: "brand",
    overview:
      "A concept brand refresh and launch campaign for a direct-to-consumer brand moving from a single product to a wider range.",
    challenge:
      "The original identity was built for one product. Expanding the range required a flexible system that still felt recognizably like the same brand.",
    approach: [
      "Evolved the identity with a modular colour and typography system.",
      "Built campaign templates for social, paid media and packaging.",
      "Planned a phased launch across organic social and paid channels.",
      "Defined measurement for awareness and conversion objectives.",
    ],
    outcome:
      "This is a concept project, so there are no client results to report. Real case studies will include verified, client-approved outcomes.",
  },
];

export default projects;

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
