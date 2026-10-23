import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Icon from "@/components/ui/Icon";

export default function ServiceCard({ service, index, variant = "default" }) {
  const featured = variant === "featured";
  return (
    <article className={`service-card service-card--${variant}`}>
      <div className="service-card__spot" aria-hidden="true" />
      <div className="service-card__head">
        <span className="service-card__icon">
          <Icon name={service.icon} size={featured ? 26 : 22} />
        </span>
        <span className="service-card__index">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="service-card__title">
        <Link href={`/services/${service.slug}`} className="service-card__link">
          {service.title}
        </Link>
      </h3>
      <p className="service-card__text">{service.short}</p>
      {featured && (
        <ul className="service-card__caps">
          {service.capabilities.slice(0, 6).map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}
      <ul className="tags" aria-label="Capabilities">
        {service.tags.map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
      <span className="service-card__cta" aria-hidden="true">
        Explore Service <ArrowUpRight size={16} />
      </span>
      <span className="service-card__line" aria-hidden="true" />
    </article>
  );
}
