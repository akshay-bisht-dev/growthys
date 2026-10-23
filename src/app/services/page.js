import Animate from "@/components/animations/Animate";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/services/ServiceCard";
import Spotlight from "@/components/animations/Spotlight";
import Process from "@/components/home/Process";
import FinalCta from "@/components/home/FinalCta";
import services from "@/data/services";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Web development, UI/UX design, performance marketing, SEO, social media, content, branding, e-commerce growth and website maintenance from one digital growth team.",
  path: "/services",
});

export default function ServicesPage() {
  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured);
  return (
    <Animate>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Ten disciplines. <span className="text-gradient">One growth plan.</span>
          </>
        }
        wide
        lead="Engage a single service or combine several. Either way, every piece of work is planned around the same business objectives and measured against the same numbers."
        crumbs={[{ label: "Services", href: "/services" }]}
      >
        <Button href="/contact">Discuss your project</Button>
      </PageHero>

      <section className="section section--tight">
        <div className="container">
          <Spotlight className="services-grid">
            <div className="services-grid__featured" data-stagger>
              {featured.map((s) => (
                <ServiceCard key={s.slug} service={s} index={services.indexOf(s)} variant="featured" />
              ))}
            </div>
            <div className="services-grid__rest services-grid__rest--page" data-stagger>
              {rest.map((s) => (
                <ServiceCard key={s.slug} service={s} index={services.indexOf(s)} />
              ))}
            </div>
          </Spotlight>
        </div>
      </section>

      <Process />
      <FinalCta />
    </Animate>
  );
}
