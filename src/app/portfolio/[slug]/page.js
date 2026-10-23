import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Animate from "@/components/animations/Animate";
import PageSkeleton from "@/components/layout/PageSkeleton";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import CoverArt from "@/components/portfolio/CoverArt";
import ProjectCard from "@/components/portfolio/ProjectCard";
import TechIcon, { getIconData } from "@/components/ui/TechIcon";
import FinalCta from "@/components/home/FinalCta";
import projects, { getProject } from "@/data/projects";
import services from "@/data/services";
import { pageMeta } from "@/lib/metadata";

// Only the slugs listed here exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMeta({
    title: `${project.title}${project.isDemo ? " (Concept)" : ""}`,
    description: project.overview,
    path: `/portfolio/${slug}`,
  });
}

const serviceHref = (title) => {
  const match = services.find((s) => s.title === title || s.title.startsWith(title));
  return match ? `/services/${match.slug}` : "/services";
};

export default function CaseStudyPage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CaseStudyContent params={params} />
    </Suspense>
  );
}

async function CaseStudyContent({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const others = projects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <Animate>
      <PageHero
        eyebrow={project.isDemo ? "Demo case study — concept project" : project.category}
        title={project.title}
        lead={project.overview}
        crumbs={[
          { label: "Portfolio", href: "/portfolio" },
          { label: project.title, href: `/portfolio/${slug}` },
        ]}
      />

      <section className="section section--tight case">
        <div className="container">
          <div className="case__cover" data-img-reveal>
            <CoverArt project={project} />
          </div>

          <dl className="case__facts" data-stagger>
            <div>
              <dt>Industry</dt>
              <dd>{project.industry}</dd>
            </div>
            <div>
              <dt>Services</dt>
              <dd>
                {project.services.map((s, i) => (
                  <span key={s}>
                    <Link href={serviceHref(s)} className="inline-link">
                      {s}
                    </Link>
                    {i < project.services.length - 1 && ", "}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd className="case__stack">
                {project.stack.map((t) => (
                  <span key={t} className="tool tool--sm">
                    <TechIcon icon={t} name={getIconData(t)?.title || t} size={16} />
                    {getIconData(t)?.title}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{project.isDemo ? "Concept — not a client project" : project.year}</dd>
            </div>
          </dl>

          <div className="case__body">
            <div className="split">
              <h2 className="h3" data-reveal>
                The challenge
              </h2>
              <p className="prose" data-reveal>
                {project.challenge}
              </p>
            </div>
            <div className="split">
              <h2 className="h3" data-reveal>
                Our approach
              </h2>
              <ul className="prose" data-stagger>
                {project.approach.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            <div className="split">
              <h2 className="h3" data-reveal>
                Outcome
              </h2>
              <p className="prose" data-reveal>
                {project.outcome}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 className="h2" data-split>
              More work
            </h2>
            <div className="section-head__aside" data-reveal>
              <Button href="/portfolio" variant="ghost">
                All projects
              </Button>
            </div>
          </div>
          <div className="portfolio-grid">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </Animate>
  );
}
