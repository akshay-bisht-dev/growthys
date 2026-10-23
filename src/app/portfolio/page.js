import Animate from "@/components/animations/Animate";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/portfolio/ProjectCard";
import FinalCta from "@/components/home/FinalCta";
import projects from "@/data/projects";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Portfolio & Case Studies",
  description:
    "Case studies showing how Growthys approaches web development, e-commerce, SEO, performance marketing and branding projects.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const hasDemos = projects.some((p) => p.isDemo);
  return (
    <Animate>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Work that shows <span className="text-gradient">how we think.</span>
          </>
        }
        lead={
          hasDemos
            ? "These are illustrative concept case studies that demonstrate our approach to common challenges. They are not client engagements and include no performance claims. Verified client work will be published here with permission."
            : "A selection of projects across web development, e-commerce, search, paid media and branding."
        }
        crumbs={[{ label: "Portfolio", href: "/portfolio" }]}
      >
        <Button href="/contact">Start your project</Button>
      </PageHero>
      <section className="section section--tight">
        <div className="container portfolio-grid">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <FinalCta />
    </Animate>
  );
}
