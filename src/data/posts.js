// Blog articles. Body blocks: { h2 }, { p }, { ul: [] }.
// Update `date` to the actual publication date when publishing.
export const blogCategories = [
  "Web Development",
  "SEO",
  "Performance Marketing",
  "WordPress",
  "Shopify",
  "Technology",
  "Branding",
  "Digital Strategy",
];

const posts = [
  {
    slug: "core-web-vitals-explained-for-business-owners",
    title: "Core Web Vitals, Explained for Business Owners",
    category: "Web Development",
    date: "2026-10-20",
    author: "Growthys Team",
    excerpt:
      "What LCP, INP and CLS actually measure, why they affect both users and search, and where to start improving them.",
    readingTime: 6,
    body: [
      {
        p: "Core Web Vitals are a small set of metrics Google uses to describe how a page feels to real visitors: how quickly the main content appears, how quickly the page responds to input and how stable the layout is while it loads. They are not the only thing that matters for search, but they are a reliable shorthand for user experience.",
      },
      { h2: "The three metrics" },
      {
        ul: [
          "Largest Contentful Paint (LCP) measures when the largest visible element — usually a hero image or headline — finishes rendering. A good target is under 2.5 seconds.",
          "Interaction to Next Paint (INP) measures how quickly the page visually responds after someone clicks, taps or types. A good target is under 200 milliseconds.",
          "Cumulative Layout Shift (CLS) measures how much content unexpectedly moves around. A good target is below 0.1.",
        ],
      },
      { h2: "Why they matter beyond rankings" },
      {
        p: "Slow, jumpy pages frustrate people before they read a word of your offer. Improving these metrics usually means a page that feels calmer and more trustworthy, which supports conversion regardless of any search benefit.",
      },
      { h2: "Lab data versus field data" },
      {
        p: "Tools like Lighthouse run a simulated test on one device. Field data, such as the Chrome User Experience Report shown in Search Console, reflects what real visitors experienced. Use lab tests to diagnose and field data to judge whether a change actually helped.",
      },
      { h2: "Where to start" },
      {
        ul: [
          "Serve correctly sized, modern-format images and give them explicit dimensions to prevent layout shift.",
          "Audit third-party scripts — chat widgets, trackers and embeds are frequent causes of slow interactions.",
          "Load fonts efficiently and avoid invisible text while they download.",
          "Break up long JavaScript tasks so the browser can respond to input quickly.",
        ],
      },
      {
        p: "Performance work is most effective when it is part of how a site is built rather than a clean-up exercise afterwards. If you are planning a new site, make performance budgets part of the brief.",
      },
    ],
  },
  {
    slug: "seo-and-paid-search-together",
    title: "Why SEO and Paid Search Work Better Together",
    category: "SEO",
    date: "2026-10-13",
    author: "Growthys Team",
    excerpt:
      "Organic and paid search are often managed separately. Sharing data between them leads to better keywords, better landing pages and less wasted budget.",
    readingTime: 5,
    body: [
      {
        p: "Many businesses treat SEO and paid search as separate projects with separate suppliers. Yet both channels answer the same question: what are people searching for, and does our page give them what they need?",
      },
      { h2: "Paid data accelerates SEO decisions" },
      {
        p: "Organic results take time to move. Paid campaigns can show within days which search terms lead to enquiries or sales. That evidence helps decide which topics deserve long-term content investment.",
      },
      { h2: "SEO insight reduces paid waste" },
      {
        p: "Search Console reveals queries where you already rank well organically. In some cases it makes sense to reduce paid spend on those terms and redirect budget to queries where you are not yet visible. Test this carefully rather than assuming.",
      },
      { h2: "Shared landing pages" },
      {
        ul: [
          "Landing pages built for paid traffic often lack the depth needed to rank organically.",
          "Organic pages sometimes lack the focus needed to convert paid clicks.",
          "Planning both together lets you decide when one page can serve both purposes and when separate pages are better.",
        ],
      },
      { h2: "One measurement framework" },
      {
        p: "Most importantly, both channels should be measured against the same conversion definitions in GA4. When paid and organic report different numbers for the same goal, decisions become arguments instead of analysis.",
      },
    ],
  },
  {
    slug: "conversion-tracking-before-ad-spend",
    title: "Set Up Conversion Tracking Before You Spend on Ads",
    category: "Performance Marketing",
    date: "2026-10-06",
    author: "Growthys Team",
    excerpt:
      "Ad platforms optimize toward the signals you give them. Without accurate conversion tracking, they optimize toward the wrong things.",
    readingTime: 5,
    body: [
      {
        p: "Google Ads and Meta Ads use machine learning to decide who sees your ads. That learning is only as good as the conversion data you send back. Launching campaigns before tracking is verified is one of the most common and expensive mistakes in paid media.",
      },
      { h2: "Decide what a conversion is" },
      {
        p: "Start with the actions that represent real business value: a purchase, a qualified enquiry, a booked call. Secondary actions like newsletter sign-ups can be tracked too, but should not be treated as primary goals.",
      },
      { h2: "A practical setup checklist" },
      {
        ul: [
          "Install Google Tag Manager and GA4, and define key events deliberately.",
          "Configure Google Ads conversions and the Meta pixel with server-side events where appropriate.",
          "Respect consent requirements in your markets and configure consent mode accordingly.",
          "Test every conversion end-to-end before launch, including on mobile.",
          "Document the setup so future changes do not silently break tracking.",
        ],
      },
      { h2: "Check it regularly" },
      {
        p: "Website changes, new plugins and theme updates can all break tracking without anyone noticing. A short monthly check comparing platform conversions with your own records catches problems early.",
      },
    ],
  },
  {
    slug: "choosing-between-wordpress-shopify-and-headless",
    title: "WordPress, Shopify or Headless: Choosing the Right Platform",
    category: "Digital Strategy",
    date: "2026-09-29",
    author: "Growthys Team",
    excerpt:
      "There is no universally best platform. Here is how to think about the trade-offs for content, commerce and custom experiences.",
    readingTime: 7,
    body: [
      {
        p: "Platform decisions shape how fast you can launch, how easily your team can make changes and how much the site costs to run. The right choice depends far more on how your business operates than on which technology is fashionable.",
      },
      { h2: "WordPress" },
      {
        p: "WordPress remains an excellent choice for content-led websites. It has a familiar editor, a huge ecosystem and flexible hosting options. The trade-off is that plugin-heavy installations need disciplined maintenance to stay secure and fast.",
      },
      { h2: "Shopify" },
      {
        p: "For most online stores, Shopify removes a large amount of operational work: hosting, security, checkout and payments are handled for you. Customization is constrained in some areas, but those constraints are often a reasonable price for reliability.",
      },
      { h2: "WooCommerce" },
      {
        p: "WooCommerce suits businesses that want commerce tightly integrated with a WordPress content site, or need control that hosted platforms do not allow. It requires more hands-on maintenance than Shopify.",
      },
      { h2: "Headless and custom builds" },
      {
        p: "A headless setup — for example, Next.js with a headless CMS — separates content management from presentation. It enables highly custom, fast experiences and multi-channel content, but needs development support for structural changes.",
      },
      { h2: "Questions to ask" },
      {
        ul: [
          "Who will edit content day to day, and how technical are they?",
          "Is commerce central to the business or a secondary feature?",
          "Which systems need to integrate — CRM, ERP, inventory, booking?",
          "What is the realistic budget for ongoing maintenance?",
        ],
      },
    ],
  },
];

export default posts;

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
