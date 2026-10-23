import Animate from "@/components/animations/Animate";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import TechIcon from "@/components/ui/TechIcon";
import TechEcosystem from "@/components/technologies/TechEcosystem";
import FinalCta from "@/components/home/FinalCta";
import { techCategories } from "@/data/technologies";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Technology Stack",
  description:
    "The frontend, backend, CMS, database, cloud, analytics and design technologies Growthys uses — chosen per project for performance, scalability and maintainability.",
  path: "/technologies",
});

export default function TechnologiesPage() {
  return (
    <Animate>
      <PageHero
        eyebrow="Technology"
        title={
          <>
            Powered by the <span className="text-gradient">right technology.</span>
          </>
        }
        lead="We choose technologies based on your goals, performance requirements, scalability needs, and business model — not on trends."
        crumbs={[{ label: "Technologies", href: "/technologies" }]}
      >
        <Button href="/contact">Talk to an engineer</Button>
      </PageHero>

      <TechEcosystem showIntro={false} />

      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" />
              Full stack, by category
            </p>
            <h2 className="h2" data-split>
              Everything in one place.
            </h2>
          </div>
          <div className="tech-categories">
            {techCategories.map((c) => (
              <section key={c.id} id={c.id} className="tech-category" aria-labelledby={`cat-${c.id}`}>
                <div data-reveal>
                  <h3 id={`cat-${c.id}`} className="h3">
                    {c.label}
                  </h3>
                  <p className="muted">{c.description}</p>
                </div>
                <ul className="tool-list" data-stagger>
                  {c.items.map((t) => (
                    <li key={t.name} className="tool">
                      <TechIcon icon={t.icon} name={t.name} size={24} />
                      <span>
                        {t.name}
                        {t.note && <small>{t.note}</small>}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <p className="small muted tech-disclaimer" data-reveal>
            Logos are trademarks of their respective owners and indicate technologies we work with. They do not imply
            partnership, certification or endorsement.
          </p>
        </div>
      </section>

      <FinalCta />
    </Animate>
  );
}
