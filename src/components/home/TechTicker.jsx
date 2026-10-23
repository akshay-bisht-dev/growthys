import TechIcon from "@/components/ui/TechIcon";
import { marqueeItems } from "@/data/technologies";

// Pure-CSS marquee: the list is rendered twice so translating by -50% loops
// seamlessly. The duplicate is hidden from assistive tech.
export default function TechTicker() {
  return (
    <section id="tech-ticker" className="ticker" aria-labelledby="ticker-label">
      <p id="ticker-label" className="ticker__label container">
        Technologies and platforms we work with
      </p>
      <div className="ticker__viewport">
        <div className="ticker__track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="ticker__list" aria-hidden={copy === 1 || undefined}>
              {marqueeItems.map((t) => (
                <li key={t.name} className="ticker__item">
                  <TechIcon icon={t.icon} name={t.name} size={22} />
                  <span>{t.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <p className="ticker__note container">
        Brand names and logos belong to their respective owners and indicate technologies we use, not partnerships.
      </p>
    </section>
  );
}
