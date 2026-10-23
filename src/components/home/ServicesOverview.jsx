import Button from "@/components/ui/Button";
import ServiceCard from "@/components/services/ServiceCard";
import Spotlight from "@/components/animations/Spotlight";
import services from "@/data/services";

export default function ServicesOverview() {
  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured);

  return (
    <section id="services" className="section services-overview" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" />
              Services
            </p>
            <h2 id="services-title" className="h2" data-split>
              Everything growth needs,
              <br />
              <span className="muted-strong">under one roof.</span>
            </h2>
          </div>
          <div className="section-head__aside" data-reveal>
            <p className="lead">
              Ten connected disciplines — from code to campaigns — so strategy, build and marketing never work in
              isolation.
            </p>
            <Button href="/services" variant="ghost">
              All services
            </Button>
          </div>
        </div>

        <Spotlight className="services-grid">
          <div className="services-grid__featured" data-stagger>
            {featured.map((s) => (
              <ServiceCard key={s.slug} service={s} index={services.indexOf(s)} variant="featured" />
            ))}
          </div>
          <div className="services-grid__rest" data-stagger>
            {rest.map((s) => (
              <ServiceCard key={s.slug} service={s} index={services.indexOf(s)} />
            ))}
          </div>
        </Spotlight>
      </div>
    </section>
  );
}
