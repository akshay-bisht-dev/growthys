import Icon from "@/components/ui/Icon";
import industries from "@/data/industries";

export default function Industries({ intro = true }) {
  return (
    <section className="section industries" aria-labelledby="industries-title">
      <div className="container">
        {intro ? (
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow" data-reveal>
                <span className="eyebrow__dot" />
                Industries
              </p>
              <h2 id="industries-title" className="h2" data-split>
                Industries we serve.
              </h2>
            </div>
            <p className="lead section-head__aside" data-reveal>
              Different markets, same discipline: understand the customer, remove friction, measure what matters.
            </p>
          </div>
        ) : (
          <h2 id="industries-title" className="sr-only">
            Industries
          </h2>
        )}
        <ul className="industry-grid" data-stagger>
          {industries.map((ind) => (
            <li key={ind.name} className="industry">
              <span className="industry__icon">
                <Icon name={ind.icon} size={24} />
              </span>
              <h3 className="industry__name">{ind.name}</h3>
              <p className="industry__text">{ind.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
