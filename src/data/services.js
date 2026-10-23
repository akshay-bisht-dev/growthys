const services = [
  {
    slug: "web-development",
    title: "Web Development",
    icon: "code",
    featured: true,
    short: "Fast, secure and scalable websites and web applications engineered around your business goals.",
    intro:
      "From a focused landing page to a custom web application, we build with modern, maintainable technology and treat performance, accessibility and search visibility as requirements, not extras.",
    tags: ["React", "Next.js", "WordPress", "Shopify"],
    capabilities: [
      "Business websites",
      "Custom web applications",
      "React and Next.js development",
      "Landing pages",
      "WordPress development",
      "WooCommerce development",
      "Shopify store development",
      "Headless CMS solutions",
    ],
    benefits: [
      {
        title: "Built for speed",
        text: "Lean code, optimized media and modern rendering so pages load quickly on real devices and networks.",
      },
      {
        title: "Easy to manage",
        text: "A content setup your team can actually use, whether that is WordPress, Shopify or a headless CMS.",
      },
      {
        title: "Ready to grow",
        text: "Clean architecture that leaves room for new features, integrations and traffic without a rebuild.",
      },
      {
        title: "Search-friendly foundations",
        text: "Semantic markup, structured data and technical SEO handled during development.",
      },
    ],
    process: [
      { title: "Scope", text: "Clarify goals, users, content and integrations, then choose the right platform." },
      { title: "Architecture", text: "Plan page structure, data models and the component system before writing code." },
      {
        title: "Build and test",
        text: "Develop iteratively with reviews, cross-device testing and performance checks.",
      },
      { title: "Launch and hand over", text: "Deploy, monitor, document and train your team on day-to-day updates." },
    ],
    technologies: ["react", "nextdotjs", "nodedotjs", "wordpress", "shopify", "php"],
    faqs: [
      {
        q: "Which platform should my website use?",
        a: "It depends on how you sell, who edits content and how much custom functionality you need. WordPress suits content-heavy sites, Shopify suits most online stores, and Next.js suits custom, performance-critical experiences. We recommend a platform after the discovery stage.",
      },
      {
        q: "Can you take over an existing website?",
        a: "Yes. We start with a technical review of the codebase, hosting and plugins, then recommend whether to improve what exists or rebuild specific parts.",
      },
      {
        q: "Will I be able to edit the site myself?",
        a: "Yes. Every build includes an editing setup appropriate to the platform and a walkthrough for your team.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    title: "Website Design and UI/UX",
    icon: "pen",
    short: "Interfaces that look distinctive, feel effortless and guide visitors toward meaningful actions.",
    intro:
      "Good design is how a business earns trust in the first few seconds. We combine user research, clear information architecture and refined visual design to create interfaces that are both beautiful and practical.",
    tags: ["UX strategy", "Design systems", "Prototyping"],
    capabilities: [
      "UI/UX strategy",
      "Website redesign",
      "Conversion-focused landing page design",
      "Responsive design systems",
      "Prototyping and interaction design",
    ],
    benefits: [
      {
        title: "Clarity first",
        text: "Visitors understand what you offer and what to do next without having to think.",
      },
      {
        title: "Consistent brand",
        text: "A reusable design system keeps every new page on-brand and faster to produce.",
      },
      { title: "Validated early", text: "Interactive prototypes let you test flows before development time is spent." },
    ],
    process: [
      { title: "Research", text: "Review audience, competitors, analytics and existing user journeys." },
      { title: "Structure", text: "Map sitemaps, user flows and wireframes around the key conversions." },
      { title: "Visual design", text: "Develop the visual language, components and responsive layouts." },
      {
        title: "Prototype and refine",
        text: "Validate interactions in clickable prototypes and refine with feedback.",
      },
    ],
    technologies: ["figma", "gsap", "tailwindcss"],
    faqs: [
      {
        q: "Do you design in Figma?",
        a: "Yes. Designs, components and prototypes are delivered in Figma so your team keeps full access to the source files.",
      },
      {
        q: "Can you redesign without changing our platform?",
        a: "Often, yes. Many redesigns can be implemented on your existing CMS. We will tell you if the platform is limiting what the design needs to do.",
      },
    ],
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    icon: "target",
    featured: true,
    short:
      "Paid campaigns on Google and Meta built around measurable outcomes, accurate tracking and continuous testing.",
    intro:
      "Performance marketing only works when strategy, creative, landing pages and measurement are connected. We plan, launch and optimize campaigns with clean conversion tracking so budget decisions are based on evidence.",
    tags: ["Google Ads", "Meta Ads", "Conversion tracking"],
    capabilities: [
      "Google Ads",
      "Meta Ads",
      "Campaign strategy",
      "Conversion tracking",
      "Landing page optimization",
      "Campaign performance reporting",
    ],
    benefits: [
      {
        title: "Measurement you can trust",
        text: "Conversion tracking is set up and verified before meaningful budget is spent.",
      },
      {
        title: "Structured testing",
        text: "Audiences, creatives and offers are tested methodically rather than guessed.",
      },
      {
        title: "Joined-up funnels",
        text: "Ads and landing pages are designed together, so the click and the page tell the same story.",
      },
      { title: "Transparent reporting", text: "Clear reports that focus on business outcomes, not vanity metrics." },
    ],
    process: [
      {
        title: "Audit and tracking",
        text: "Review existing accounts and set up or repair GA4, Tag Manager and platform conversions.",
      },
      { title: "Strategy", text: "Define objectives, audiences, budgets, channels and success measures." },
      { title: "Launch", text: "Build campaigns, creative variations and landing pages." },
      { title: "Optimize", text: "Monitor, test and reallocate budget based on what the data shows." },
    ],
    technologies: ["googleads", "meta", "googleanalytics", "googletagmanager"],
    faqs: [
      {
        q: "What budget do I need for paid ads?",
        a: "It depends on your market, competition and goals. We recommend a starting budget during strategy and explain the trade-offs rather than quoting a one-size-fits-all number.",
      },
      {
        q: "Do you guarantee results?",
        a: "No honest agency can guarantee specific advertising results. We commit to a transparent process, accurate tracking and continuous optimization.",
      },
    ],
  },
  {
    slug: "seo",
    title: "Search Engine Optimization",
    icon: "search",
    short: "Technical, on-page and content SEO that helps the right audience find you organically.",
    intro:
      "Sustainable organic growth comes from a technically sound site, content that genuinely answers searchers' questions and a structure search engines can understand. We work on all three.",
    tags: ["Technical SEO", "Content", "Structured data"],
    capabilities: [
      "Technical SEO",
      "On-page SEO",
      "Content optimization",
      "Keyword research",
      "Internal linking",
      "SEO audits",
      "Structured data",
      "Organic growth strategy",
    ],
    benefits: [
      {
        title: "Fix what holds you back",
        text: "Crawl, indexing, speed and structure issues are identified and prioritized by impact.",
      },
      {
        title: "Content with intent",
        text: "Keyword research maps real search intent to the pages that should answer it.",
      },
      {
        title: "Compounding value",
        text: "Organic visibility built properly keeps working long after the work is done.",
      },
    ],
    process: [
      { title: "Audit", text: "Technical crawl, content review, Search Console data and competitor analysis." },
      { title: "Prioritize", text: "A roadmap ordered by expected impact and effort." },
      { title: "Implement", text: "Technical fixes, on-page optimization, internal linking and structured data." },
      { title: "Measure", text: "Track rankings, impressions and organic conversions, then iterate." },
    ],
    technologies: ["googlesearchconsole", "googleanalytics", "nextdotjs", "wordpress"],
    faqs: [
      {
        q: "How long does SEO take?",
        a: "Technical fixes can show effects within weeks, while content and authority work typically compounds over several months. We set expectations based on your site's starting point.",
      },
      {
        q: "Do you build backlinks?",
        a: "We focus on content and digital PR approaches that earn links naturally. We do not buy links or use schemes that violate search engine guidelines.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    icon: "trending",
    short: "Integrated digital strategy that connects channels, funnels and analytics into one growth plan.",
    intro:
      "Most businesses do not need more channels — they need the channels they use to work together. We build a digital strategy around your customers, then connect acquisition, conversion and measurement.",
    tags: ["Strategy", "Lead generation", "Analytics"],
    capabilities: [
      "Digital strategy",
      "Lead generation",
      "Funnel optimization",
      "Analytics and reporting",
      "Customer acquisition",
    ],
    benefits: [
      { title: "One plan, many channels", text: "Search, social, email and paid media aligned to shared objectives." },
      { title: "Fewer leaks", text: "Funnel analysis shows where prospects drop off and what to fix first." },
      {
        title: "Decisions from data",
        text: "Dashboards and reporting focused on the numbers that matter to your business.",
      },
    ],
    process: [
      { title: "Diagnose", text: "Understand customers, current channels and funnel performance." },
      { title: "Plan", text: "Set objectives, channel mix, messaging and measurement framework." },
      { title: "Execute", text: "Launch campaigns and funnel improvements in prioritized sprints." },
      { title: "Report and refine", text: "Review performance regularly and adjust the plan." },
    ],
    technologies: ["googleanalytics", "googletagmanager", "googleads", "meta"],
    faqs: [
      {
        q: "Is digital marketing different from performance marketing?",
        a: "Performance marketing focuses on paid, measurable campaigns. Digital marketing is the wider strategy that also includes organic channels, content, funnels and analytics.",
      },
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    icon: "social",
    short: "Social strategy, content and community management that builds attention and trust over time.",
    intro:
      "Social media works best with a clear point of view and consistent execution. We help you decide where to show up, what to say and how to measure whether it is working.",
    tags: ["Strategy", "Content calendars", "Community"],
    capabilities: [
      "Social media strategy",
      "Content calendars",
      "Creative campaigns",
      "Community engagement",
      "Social media reporting",
    ],
    benefits: [
      { title: "Focused presence", text: "Effort concentrated on the platforms your audience actually uses." },
      { title: "Consistent output", text: "Planned content calendars remove last-minute scrambling." },
      { title: "Real engagement", text: "Community management that turns followers into conversations." },
    ],
    process: [
      { title: "Audit", text: "Review existing profiles, audience and competitor activity." },
      { title: "Strategy", text: "Define pillars, tone of voice, formats and posting rhythm." },
      { title: "Create", text: "Produce and schedule content and campaigns." },
      { title: "Engage and report", text: "Manage community activity and report on meaningful metrics." },
    ],
    technologies: ["meta", "figma"],
    faqs: [
      {
        q: "Which platforms do you manage?",
        a: "We recommend platforms based on your audience. Common choices include Instagram, Facebook, LinkedIn and YouTube.",
      },
    ],
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance and Support",
    icon: "shield",
    short: "Proactive updates, security, backups and fixes so your website stays fast, safe and reliable.",
    intro:
      "A website is never really finished. Ongoing maintenance protects your investment, reduces risk and keeps performance from slowly degrading.",
    tags: ["Security", "Monitoring", "Performance"],
    capabilities: [
      "CMS updates",
      "Security hardening",
      "Backup planning",
      "Website monitoring",
      "Performance optimization",
      "Bug fixes and technical support",
    ],
    benefits: [
      { title: "Lower risk", text: "Timely updates and hardening reduce exposure to common vulnerabilities." },
      { title: "Recoverable", text: "A tested backup plan means problems can be rolled back." },
      { title: "A team on call", text: "Fixes and small improvements handled by people who know your site." },
    ],
    process: [
      { title: "Health check", text: "Review hosting, plugins, security and performance baseline." },
      { title: "Stabilize", text: "Apply urgent fixes, updates and backup configuration." },
      { title: "Maintain", text: "Scheduled updates, monitoring and reporting." },
      { title: "Improve", text: "Ongoing performance and usability improvements." },
    ],
    technologies: ["wordpress", "cloudflare", "linux", "nginx", "php"],
    faqs: [
      {
        q: "Can you maintain a site you did not build?",
        a: "Yes. We begin with a health check so we understand the setup before taking responsibility for it.",
      },
      {
        q: "What happens if my site goes down?",
        a: "Maintenance plans include monitoring and an agreed response process. Specific response times are defined in each support agreement.",
      },
    ],
  },
  {
    slug: "branding",
    title: "Branding and Brand Promotion",
    icon: "sparkles",
    short: "Brand identity and creative direction that make your business recognizable and memorable.",
    intro:
      "A strong brand makes every other marketing activity more effective. We help define how your business looks, sounds and shows up — then put it to work in campaigns.",
    tags: ["Identity", "Creative direction", "Campaigns"],
    capabilities: [
      "Brand identity",
      "Visual communication",
      "Creative direction",
      "Campaign assets",
      "Brand awareness campaigns",
    ],
    benefits: [
      { title: "Recognizable", text: "A coherent identity that people remember and recognize across channels." },
      { title: "Consistent", text: "Guidelines and assets that keep internal teams and partners aligned." },
      { title: "Applied", text: "Identity carried through into real campaigns, not left in a PDF." },
    ],
    process: [
      { title: "Discover", text: "Explore positioning, audience, values and competitive landscape." },
      { title: "Define", text: "Develop identity concepts, typography, color and voice." },
      { title: "Systemize", text: "Build guidelines and a practical asset library." },
      { title: "Promote", text: "Launch the brand through coordinated campaigns." },
    ],
    technologies: ["figma"],
    faqs: [
      {
        q: "Can you refresh our brand rather than replace it?",
        a: "Yes. Many businesses benefit from an evolution that keeps recognizable elements while modernizing the system.",
      },
    ],
  },
  {
    slug: "content-marketing",
    title: "Content Marketing",
    icon: "content",
    short: "Useful, search-aware content that educates your audience and supports the sales process.",
    intro:
      "Content earns attention when it is genuinely helpful. We plan and produce content that answers your customers' real questions and supports both SEO and conversion.",
    tags: ["Strategy", "Copywriting", "Blog"],
    capabilities: [
      "Blog content",
      "Website copywriting",
      "Content strategy",
      "Educational resources",
      "Lead-generation content",
    ],
    benefits: [
      { title: "Answers that rank", text: "Topics chosen from search demand and customer questions." },
      { title: "Copy that converts", text: "Website copy written around benefits, objections and clear next steps." },
      { title: "Reusable assets", text: "Guides and resources that sales and support teams can use too." },
    ],
    process: [
      { title: "Research", text: "Audience questions, keyword demand and content gaps." },
      { title: "Plan", text: "An editorial calendar mapped to funnel stages." },
      { title: "Produce", text: "Write, edit, optimize and publish." },
      { title: "Refresh", text: "Update content based on performance data." },
    ],
    technologies: ["wordpress", "googlesearchconsole", "googleanalytics"],
    faqs: [
      {
        q: "Do you write for specialist industries?",
        a: "Yes, working closely with your subject-matter experts to make sure content is accurate.",
      },
    ],
  },
  {
    slug: "ecommerce-growth",
    title: "E-commerce Growth",
    icon: "cart",
    short: "Shopify and WooCommerce optimization focused on conversion, average order value and retention.",
    intro:
      "Small improvements across an online store add up. We analyze how shoppers behave, then improve product pages, navigation, checkout and measurement.",
    tags: ["Shopify", "WooCommerce", "CRO"],
    capabilities: [
      "Shopify optimization",
      "WooCommerce optimization",
      "Conversion rate optimization",
      "Product page improvements",
      "E-commerce analytics",
    ],
    benefits: [
      { title: "Smoother journeys", text: "Fewer obstacles between product discovery and checkout." },
      { title: "Better product pages", text: "Clearer information, imagery and trust signals." },
      { title: "Reliable data", text: "E-commerce tracking that shows what drives revenue." },
    ],
    process: [
      { title: "Analyze", text: "Review analytics, funnels, speed and user behaviour." },
      { title: "Hypothesize", text: "Prioritize improvement ideas by impact and effort." },
      { title: "Implement and test", text: "Ship improvements and test where traffic allows." },
      { title: "Scale", text: "Roll out what works across the store." },
    ],
    technologies: ["shopify", "woocommerce", "googleanalytics", "meta"],
    faqs: [
      {
        q: "Do you migrate stores between platforms?",
        a: "Yes. Migrations are planned carefully to protect products, customers, orders and search rankings.",
      },
    ],
  },
];

export default services;

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}
