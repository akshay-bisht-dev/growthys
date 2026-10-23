import Image from "next/image";
import { testimonials, workingTogether } from "@/data/content";

// Shows genuine testimonials when they exist; otherwise explains what
// working together looks like. Never renders invented reviews.
export default function SocialProof() {
  if (testimonials.length > 0) {
    return (
      <section className="section proof" aria-labelledby="proof-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" />
              Client voices
            </p>
            <h2 id="proof-title" className="h2" data-split>
              What clients say.
            </h2>
          </div>
          <ul className="testimonials" data-stagger>
            {testimonials.map((t) => (
              <li key={t.name} className="testimonial">
                <blockquote>
                  <p>“{t.quote}”</p>
                </blockquote>
                <div className="testimonial__by">
                  {t.image && <Image src={t.image} alt="" width={48} height={48} />}
                  <p>
                    <strong>{t.name}</strong>
                    <span>
                      {t.role}, {t.company}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="section proof" aria-labelledby="proof-title">
      <div className="container proof__grid">
        <div className="proof__intro">
          <p className="eyebrow" data-reveal>
            <span className="eyebrow__dot" />
            Working together
          </p>
          <h2 id="proof-title" className="h2" data-split>
            What working with
            <br />
            <span className="brand-word">Growthys</span> looks like.
          </h2>
        </div>
        <ul className="promise-list" data-stagger>
          {workingTogether.map((w, i) => (
            <li key={w.title} className="promise">
              <span className="promise__num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="promise__title">{w.title}</h3>
                <p>{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
