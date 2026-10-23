import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Year from "@/components/footer/Year";
import services from "@/data/services";
import { techCategories } from "@/data/technologies";
import posts from "@/data/posts";
import { companyLinks, legalLinks } from "@/data/navigation";
import site from "@/data/site";

export default function Footer() {
  const { email, phone, address } = site.contact;
  const hasContact = email || phone || address;

  return (
    <footer className="site-footer">
      <div className="site-footer__glow" aria-hidden="true" />
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Logo id="footer-logo" />
            <p className="muted">{site.shortDescription}</p>
            <div className="site-footer__contact">
              {email && <a href={`mailto:${email}`}>{email}</a>}
              {phone && <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>}
              {address && <p>{address}</p>}
              {!hasContact && (
                <Link href="/contact" className="link-arrow">
                  Send us a message
                </Link>
              )}
            </div>
            {site.social.length > 0 && (
              <ul className="site-footer__social">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <FooterCol title="Services" links={services.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))} />
          <FooterCol title="Company" links={companyLinks} />
          <div className="site-footer__stack">
            <FooterCol
              title="Technology"
              links={techCategories.slice(0, 4).map((c) => ({ label: c.label, href: `/technologies#${c.id}` }))}
            />
            <FooterCol
              title="Insights"
              links={[
                { label: "All articles", href: "/blog" },
                ...posts.slice(0, 2).map((p) => ({ label: p.title, href: `/blog/${p.slug}` })),
              ]}
            />
          </div>
        </div>

        <p className="site-footer__word" aria-hidden="true">
          Growth<span>ys</span>
        </p>

        <div className="site-footer__bottom">
          <p>
            © <Year /> Growthys. All rights reserved.
          </p>
          <ul>
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div className="site-footer__col">
      <p className="site-footer__title">{title}</p>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
