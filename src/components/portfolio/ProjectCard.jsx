import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CoverArt from "@/components/portfolio/CoverArt";
import TechIcon from "@/components/ui/TechIcon";
import { getIconData } from "@/components/ui/TechIcon";

export default function ProjectCard({ project, large = false }) {
  return (
    <article className={`project-card${large ? " project-card--large" : ""}`}>
      <div className="project-card__media" data-img-reveal>
        <div className="project-card__parallax" data-parallax="0.12">
          <CoverArt project={project} />
        </div>
        {project.isDemo && <span className="badge">Demo case study</span>}
      </div>
      <div className="project-card__body">
        <p className="project-card__meta">
          <span>{project.category}</span>
          <span aria-hidden="true">/</span>
          <span>{project.industry}</span>
        </p>
        <h3 className="project-card__title">
          <Link href={`/portfolio/${project.slug}`} className="project-card__link">
            {project.title}
          </Link>
          <ArrowUpRight className="project-card__arrow" size={22} aria-hidden="true" />
        </h3>
        <p className="project-card__text">{project.overview}</p>
        <ul className="project-card__stack" aria-label="Technology stack">
          {project.stack.map((s) => (
            <li key={s} title={getIconData(s)?.title}>
              <TechIcon icon={s} name={getIconData(s)?.title || s} size={16} />
              <span className="sr-only">{getIconData(s)?.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
