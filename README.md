# Growthys website

Marketing website for **Growthys**, a digital growth agency. Built with Next.js (App Router, JavaScript), GSAP + ScrollTrigger + SplitText, Motion for React, and Lenis.

The site is exported as **static HTML** (`output: "export"`) and published with **GitHub Pages**: https://akshay-bisht-dev.github.io/growthys/

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

Build-time variables (in CI they are set by the workflow; locally use `.env.local`):

```bash
NEXT_PUBLIC_SITE_URL=https://akshay-bisht-dev.github.io/growthys  # canonical URLs, sitemap, Open Graph
NEXT_PUBLIC_BASE_PATH=/growthys        # sub-path the site is served under (empty for a root domain)
NEXT_PUBLIC_CONTACT_ENDPOINT=          # URL that receives form submissions (JSON POST)
NEXT_PUBLIC_CONTACT_EMAIL=             # optional, shown in footer/contact page
NEXT_PUBLIC_CONTACT_PHONE=             # optional
```

**Contact form:** GitHub Pages only serves static files, so the form needs an external endpoint. Until `CONTACT_ENDPOINT` is set (as a repository variable), the form tells visitors that online enquiries aren't connected yet. It never shows a fake success. A ready-made PHP endpoint for PHP hosting is kept in `deploy/hostinger/`.

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
  icons/brand-sprite.svg  Generated brand-icon sprite
deploy/hostinger/         Optional PHP form endpoint + .htaccess for PHP hosting (not used on GitHub Pages)
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

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` runs on every push to `main`: it lints, builds the static site with the correct base path and publishes `out/` to GitHub Pages. Progress is visible under the repository's **Actions** tab; the live URL is

**https://akshay-bisht-dev.github.io/growthys/**

To redeploy without a code change, run the workflow manually (Actions → Deploy to GitHub Pages → Run workflow).

### After deploying

- [ ] The Actions run is green and the Pages URL loads with styles and icons
- [ ] A page's `<link rel="canonical">` and `/growthys/sitemap.xml` use the Pages URL
- [ ] Unknown URLs (e.g. `/growthys/services/nope/`) show the custom 404 page
- [ ] Share a page link to check the Open Graph image
- [ ] Before a public launch: replace the temporary logo, demo case studies and legal templates, and connect a contact endpoint

Note: search engines only read `robots.txt` at a domain root, so `/growthys/robots.txt` is informational until the site moves to its own domain (then set `NEXT_PUBLIC_BASE_PATH` to empty and `NEXT_PUBLIC_SITE_URL` to the domain).
