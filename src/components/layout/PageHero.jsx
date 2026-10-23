import Link from "next/link";
import JsonLd from "@/components/layout/JsonLd";
import { absoluteUrl } from "@/data/site";

// Inner-page hero with breadcrumbs (visible + BreadcrumbList schema).
// `crumbs` excludes Home: [{ label, href }], the last item is the current page.
export default function PageHero({ eyebrow, title, lead, crumbs = [], children, wide = false }) {
  const all = [{ label: "Home", href: "/" }, ...crumbs];
  return (
    <section className="page-hero">
      <div className="page-hero__bg" aria-hidden="true" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: absoluteUrl(c.href),
          })),
        }}
      />
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb" data-intro style={{ "--d": 0 }}>
          <ol>
            {all.map((c, i) => (
              <li key={c.href}>
                {i === all.length - 1 ? (
                  <span aria-current="page">{c.label}</span>
                ) : (
                  <Link href={c.href}>{c.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && (
          <p className="eyebrow" data-intro style={{ "--d": 1 }}>
            <span className="eyebrow__dot" />
            {eyebrow}
          </p>
        )}
        <h1 className={`h1 page-hero__title${wide ? " page-hero__title--wide" : ""}`} data-intro style={{ "--d": 2 }}>
          {title}
        </h1>
        {lead && (
          <p className="lead" data-intro style={{ "--d": 3 }}>
            {lead}
          </p>
        )}
        {children && (
          <div className="page-hero__actions" data-intro style={{ "--d": 4 }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
