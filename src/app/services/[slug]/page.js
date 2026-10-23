import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import Animate from "@/components/animations/Animate";
import PageSkeleton from "@/components/layout/PageSkeleton";
import PageHero from "@/components/layout/PageHero";
import JsonLd from "@/components/layout/JsonLd";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import TechIcon, { getIconData } from "@/components/ui/TechIcon";
import ServiceCard from "@/components/services/ServiceCard";
import Faq from "@/components/home/Faq";
import FinalCta from "@/components/home/FinalCta";
import services, { getService } from "@/data/services";
import site, { absoluteUrl } from "@/data/site";
import { pageMeta } from "@/lib/metadata";

// Only the slugs listed here exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMeta({ title: service.title, description: service.short, path: `/services/${slug}` });
}

export default function ServicePage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

async function ServiceContent({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = services.indexOf(service);
  const related = [1, 2, 3].map((n) => services[(index + n) % services.length]);

  return (
    <Animate>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.intro,
          serviceType: service.title,
          url: absoluteUrl(`/services/${slug}`),
          provider: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
      <PageHero
        eyebrow={`Service ${String(index + 1).padStart(2, "0")}`}
        title={service.title}
        wide
        lead={service.intro}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${slug}` },
        ]}
      >
        <Button href="/contact" magnetic>
          Start your project
        </Button>
        <Button href="#capabilities" variant="ghost">
          What&apos;s included
        </Button>
      </PageHero>

      <section id="capabilities" className="section section--tight">
        <div className="container split">
          <div>
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" />
              What&apos;s included
            </p>
            <h2 className="h2" data-split>
              Capabilities
            </h2>
            <span className="service-hero-icon" data-reveal aria-hidden="true">
              <Icon name={service.icon} size={40} strokeWidth={1.3} />
            </span>
          </div>
          <ul className="check-list" data-stagger>
            {service.capabilities.map((c) => (
              <li key={c}>
                <Check size={18} aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" />
              Benefits
            </p>
            <h2 className="h2" data-split>
              Why it matters.
            </h2>
          </div>
          <ul className={service.benefits.length === 4 ? "grid-4" : "grid-3"} data-stagger>
            {service.benefits.map((b) => (
              <li key={b.title} className="card">
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight section--light">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" />
              How we deliver
            </p>
            <h2 className="h2" data-split>
              Our process for {service.title.toLowerCase()}.
            </h2>
          </div>
          <ol className="steps" data-stagger>
            {service.process.map((p, i) => (
              <li key={p.title} className="steps__item">
                <span className="steps__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {service.technologies.length > 0 && (
        <section className="section section--tight">
          <div className="container split split--center">
            <div>
              <p className="eyebrow" data-reveal>
                <span className="eyebrow__dot" />
                Tools
              </p>
              <h2 className="h2" data-split>
                Technology we use.
              </h2>
              <p className="muted" data-reveal>
                Chosen per project.{" "}
                <Link href="/technologies" className="inline-link">
                  See our full stack
                </Link>
                .
              </p>
            </div>
            <ul className="tool-list" data-stagger>
              {service.technologies.map((t) => {
                const data = getIconData(t);
                return (
                  <li key={t} className="tool">
                    <TechIcon icon={t} name={data?.title || t} size={26} />
                    <span>{data?.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <Faq items={service.faqs} title={`${service.title}: common questions.`} />

      <section className="section section--tight">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 className="h2" data-split>
              Related services
            </h2>
            <div className="section-head__aside" data-reveal>
              <Button href="/services" variant="ghost">
                All services
              </Button>
            </div>
          </div>
          <div className="grid-3" data-stagger>
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} index={services.indexOf(s)} />
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </Animate>
  );
}
