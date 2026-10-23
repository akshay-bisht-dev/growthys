# Growthys website

Marketing website for **Growthys**, a digital growth agency. Built with Next.js (App Router, JavaScript), GSAP + ScrollTrigger + SplitText, Motion for React, and Lenis.

The site is exported as **static HTML** (`output: "export"`) so it runs on Hostinger shared hosting (Apache/LiteSpeed + PHP, no Node.js). The contact form is handled by a small PHP script.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev                  # http://localhost:3000
```

| Script           | What it does                                       |
| ---------------- | -------------------------------------------------- |
| `npm run dev`    | Development server                                 |
| `npm run build`  | Production build (prerenders every page)           |
| `npm start`      | Serve the production build                         |
| `npm run lint`   | ESLint (Next.js core-web-vitals + Prettier compat) |
| `npm run format` | Format with Prettier (`format:check` for CI)       |
| `npm run icons`  | Regenerate the brand-icon sprite (see below)       |

Requires Node.js 20.9 or newer.

## Configuration

**Build time** — `.env.production` (not committed):

```bash
NEXT_PUBLIC_SITE_URL=https://growthys.com   # canonical URLs, sitemap, robots, Open Graph
NEXT_PUBLIC_CONTACT_EMAIL=                  # optional, shown in footer/contact page
NEXT_PUBLIC_CONTACT_PHONE=                  # optional
```

**Contact form (server)** — create `growthys-config.php` **one level above `public_html`** on the server, from `deploy/growthys-config.example.php`. It sets the inbox that receives enquiries, the sender mailbox (must exist on the domain, hPanel → Emails) and an optional Resend API key. Until it exists, the form shows an honest "temporarily unavailable" error — it never reports success unless the mail was accepted.

## Project structure

```text
src/
  app/                    Routes (App Router). Every page exports its own metadata.
    services/[slug]       Service detail template (10 services)
    portfolio/[slug]      Case study template
    blog/[slug]           Article template (BlogPosting schema)
    sitemap.js robots.js opengraph-image.js not-found.js
  components/
    animations/           Animate (declarative scroll animations), Magnetic, Spotlight
    hero/ home/ ...       Page sections
    layout/               SmoothScroll (Lenis ↔ ScrollTrigger), PageHero, JsonLd, PageSkeleton
    navigation/ footer/ ui/ forms/
  data/                   All content: site, services, technologies, projects, posts, industries, FAQs
  lib/                    gsap setup, metadata helper, shared contact validation
  styles/                 components.css, home.css, pages.css (tokens live in app/globals.css)
public/
  .htaccess               HTTPS/non-www redirect, 404 page, caching, security headers
  api/contact.php         Contact form endpoint: validation, honeypot, timing check, rate limit, mail delivery
  icons/brand-sprite.svg  Generated brand-icon sprite
deploy/                   Server config example + long-cache rule for hashed assets
  logos/                  Logo assets
```

## Updating content

All copy lives in `src/data/` — no component changes needed for routine edits.

- **Business details** — `src/data/site.js` (address, social profiles). Empty values are hidden and never reach structured data.
- **Services** — `src/data/services.js`. Adding an entry creates its page, nav item, footer link and sitemap entry.
- **Case studies** — `src/data/projects.js`. The current four are clearly labelled **concept projects**; replace them with real, client-approved work and set `isDemo: false`. Only publish verified outcomes.
- **Testimonials** — `src/data/content.js` → `testimonials`. While empty, the homepage shows a “What working with Growthys looks like” section instead. Add only genuine, authorised quotes.
- **Blog** — `src/data/posts.js`. Update `date` to the real publication date.
- **Industries** — `src/data/industries.js`. Remove any that Growthys doesn't serve.
- **Legal pages** — `src/app/privacy-policy` and `src/app/terms` are templates. Have them reviewed by a legal professional before launch.

### Replacing the logo

The current logo is a temporary typographic mark in `src/components/ui/Logo.jsx`. To use the official logo, add it to `public/logos/` and replace the `<svg>` + wordmark in that component with `next/image`. Also replace `public/logos/growthys-mark.svg` (used in Organization schema) and `src/app/icon.svg` (favicon).

### Brand icons

Technology logos come from [Simple Icons](https://simpleicons.org) (CC0). Only the icons in use are bundled into a single cached sprite. To add one, put its slug in `scripts/generate-brand-icons.mjs` and run `npm run icons`. AWS and Adobe marks aren't in Simple Icons (trademark removals), so they render as neutral text tiles instead of invented logos. Logos indicate technologies used, not partnerships.

## Animation system

- **`<Animate>`** wraps page content and wires up GSAP from data attributes: `data-split` (masked line reveal), `data-reveal`, `data-stagger`, `data-parallax`, `data-draw` (SVG path drawing), `data-img-reveal`. All cleanup goes through `useGSAP` + `gsap.matchMedia`.
- **Above-the-fold intros** (`data-intro`) are pure CSS, so text paints at first paint and doesn't delay LCP while JavaScript loads.
- **Lenis** runs on desktop pointers only and is driven by GSAP's ticker, so ScrollTrigger and Lenis share one clock. Touch devices use native scrolling.
- **Reduced motion**: an inline script adds `html.js-motion` only when motion is allowed. Without it (or without JavaScript), all content is static and fully visible.

## Deployment (Hostinger shared hosting)

```bash
npm run package     # next build → out/ (+ postbuild cache rule) → growthys-site.zip
```

1. In hPanel → **Files → File Manager → public_html**, remove the default/parking files.
2. Upload `growthys-site.zip` and **Extract** it into `public_html` (make sure hidden `.htaccess` files are included).
3. Create `growthys-config.php` next to `public_html` (not inside it) from `deploy/growthys-config.example.php`, and create the sender mailbox in hPanel → Emails.
4. Make sure SSL is active (hPanel → Security → SSL). `.htaccess` redirects everything to `https://growthys.com`.

Or over SSH (enable in hPanel → Advanced → SSH Access; port 65002):

```bash
rsync -avz --delete -e "ssh -p 65002" out/ <user>@<ip>:domains/growthys.com/public_html/
```

Hosts with Node.js (Vercel, Hostinger VPS) can also serve `out/` as static files; to bring back server features (API routes, Cache Components), remove `output: "export"` from `next.config.mjs` and port `public/api/contact.php` back to a route handler.

### After deploying

- [ ] `NEXT_PUBLIC_SITE_URL` matches the live domain (check a page's `<link rel="canonical">`)
- [ ] `/sitemap.xml` and `/robots.txt` load and use the live domain
- [ ] Submit the sitemap in Google Search Console
- [ ] Send a real test enquiry and confirm it arrives (and that Reply-To is the visitor)
- [ ] Unknown URLs (e.g. `/services/nope/`) return a 404 with the custom page
- [ ] Share a page link to check the Open Graph image
- [ ] Run Lighthouse on mobile and desktop
- [ ] Replace demo case studies, legal templates and the temporary logo before public launch
- [ ] If adding analytics, gate it behind consent where required and update the privacy policy
