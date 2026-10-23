import { principles } from "@/data/content";

// Light accent section. Each principle gets a small custom diagram; a single
// vertical path draws through all four as the section scrolls.
const diagrams = [
  // Strategy: target with a path leading in
  <svg key="0" viewBox="0 0 80 80" aria-hidden="true">
    <circle cx="48" cy="40" r="22" />
    <circle cx="48" cy="40" r="12" />
    <circle cx="48" cy="40" r="3" className="fill" />
    <path d="M6 64 C 20 64, 24 40, 45 40" />
  </svg>,
  // Under one roof: two overlapping layers
  <svg key="1" viewBox="0 0 80 80" aria-hidden="true">
    <rect x="10" y="18" width="38" height="38" rx="8" />
    <rect x="32" y="28" width="38" height="38" rx="8" />
    <path d="M32 40 H48" className="accent" />
  </svg>,
  // Performance: gauge
  <svg key="2" viewBox="0 0 80 80" aria-hidden="true">
    <path d="M12 56 A 28 28 0 0 1 68 56" />
    <path d="M40 56 L58 34" className="accent" />
    <circle cx="40" cy="56" r="4" className="fill" />
  </svg>,
  // Continuous optimization: loop with rising step
  <svg key="3" viewBox="0 0 80 80" aria-hidden="true">
    <path d="M58 26 A 22 22 0 1 0 62 46" />
    <path d="M52 18 L60 26 L50 32" />
    <path d="M30 50 L38 42 L44 46 L54 34" className="accent" />
  </svg>,
];

export default function WhyGrowthys() {
  return (
    <section className="section section--light why" aria-labelledby="why-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" />
              Why choose Growthys
            </p>
            <h2 id="why-title" className="h2" data-split>
              Built for Progress.
              <br />
              Designed for Growth.
            </h2>
          </div>
          <p className="lead section-head__aside" data-reveal>
            Four principles shape how we work — from the first conversation to the hundredth iteration.
          </p>
        </div>

        <div className="why__body">
          <svg
            className="why__spine"
            viewBox="0 0 4 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            data-draw
            data-draw-start="top 70%"
            data-draw-end="bottom 70%"
          >
            <path d="M2 0 V100" vectorEffect="non-scaling-stroke" />
          </svg>
          <ol className="why__list">
            {principles.map((p, i) => (
              <li key={p.title} className="why__item" data-reveal>
                <span className="why__num">{String(i + 1).padStart(2, "0")}</span>
                <div className="why__diagram" data-draw data-draw-start="top 85%" data-draw-end="top 45%">
                  {diagrams[i]}
                </div>
                <div>
                  <h3 className="h3">{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
