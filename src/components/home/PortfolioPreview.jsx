import Button from "@/components/ui/Button";
import ProjectCard from "@/components/portfolio/ProjectCard";
import projects from "@/data/projects";

export default function PortfolioPreview() {
  const hasDemos = projects.some((p) => p.isDemo);
  return (
    <section className="section portfolio-preview" aria-labelledby="portfolio-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" />
              Portfolio
            </p>
            <h2 id="portfolio-title" className="h2" data-split>
              Work that shows
              <br />
              <span className="text-gradient">how we think.</span>
            </h2>
          </div>
          <div className="section-head__aside" data-reveal>
            {hasDemos && (
              <p className="muted small">
                The projects below are illustrative concept case studies that demonstrate our approach. They are not
                client engagements.
              </p>
            )}
            <Button href="/portfolio" variant="ghost">
              View portfolio
            </Button>
          </div>
        </div>
        <div className="portfolio-grid">
          {projects.slice(0, 4).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
