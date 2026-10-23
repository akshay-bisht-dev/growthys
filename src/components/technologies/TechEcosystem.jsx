import TechTabs from "@/components/technologies/TechTabs";
import { getIconData, readableHex } from "@/components/ui/TechIcon";
import { techCategories } from "@/data/technologies";

export function resolveCategories() {
  return techCategories.map((c) => ({
    ...c,
    items: c.items.map((t) => {
      const data = getIconData(t.icon);
      return { ...t, icon: data ? t.icon : null, hex: data ? readableHex(data.hex) : null };
    }),
  }));
}

export default function TechEcosystem({ headingLevel = "h2", showIntro = true }) {
  const H = headingLevel;
  return (
    <section id="technology" className="section tech-eco" aria-labelledby="tech-eco-title">
      <div className="tech-eco__bg" aria-hidden="true" />
      <div className="container">
        {showIntro && (
          <div className="section-head section-head--center">
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" />
              Technology ecosystem
            </p>
            <H id="tech-eco-title" className="h2" data-split>
              Powered by the <span className="text-gradient">Right Technology.</span>
            </H>
            <p className="lead" data-reveal>
              We choose technologies based on your goals, performance requirements, scalability needs, and business
              model.
            </p>
          </div>
        )}
        {!showIntro && (
          <h2 id="tech-eco-title" className="sr-only">
            Technology categories
          </h2>
        )}
        <div data-reveal>
          <TechTabs categories={resolveCategories()} />
        </div>
      </div>
    </section>
  );
}
