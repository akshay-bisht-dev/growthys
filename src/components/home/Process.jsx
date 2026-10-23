"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { processSteps } from "@/data/content";

// No pinning: the connecting line simply fills as the section scrolls past,
// lighting each step as it is reached. CSS turns the same line vertical on
// small screens via the --p custom property.
export default function Process({ detailed = false, title = true }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = root.current;
        const steps = gsap.utils.toArray(".process__step", el);
        el.classList.add("is-enhanced");
        const st = ScrollTrigger.create({
          trigger: el.querySelector(".process__track"),
          start: "top 75%",
          end: "bottom 55%",
          scrub: true,
          onUpdate: (self) => {
            el.style.setProperty("--p", self.progress.toFixed(4));
            steps.forEach((s, i) =>
              s.classList.toggle("is-active", self.progress >= i / steps.length + 0.02 || self.progress > 0.98),
            );
          },
        });
        return () => {
          st.kill();
          el.classList.remove("is-enhanced");
          el.style.removeProperty("--p");
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className={`section process${detailed ? " process--detailed" : ""}`}
      aria-labelledby="process-title"
    >
      <div className="container">
        {title && (
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow" data-reveal>
                <span className="eyebrow__dot" />
                Our process
              </p>
              <h2 id="process-title" className="h2" data-split>
                Five steps from idea
                <br />
                to measurable growth.
              </h2>
            </div>
            <p className="lead section-head__aside" data-reveal>
              A clear, collaborative journey with defined checkpoints — you always know what is happening and what comes
              next.
            </p>
          </div>
        )}
        {!title && (
          <h2 id="process-title" className="sr-only">
            Project process
          </h2>
        )}

        <div className="process__track">
          <div className="process__line" aria-hidden="true">
            <span className="process__line-fill" />
          </div>
          <ol className="process__steps">
            {processSteps.map((s) => (
              <li key={s.number} className="process__step is-active">
                <span className="process__node" aria-hidden="true" />
                <span className="process__number">{s.number}</span>
                <h3 className="process__title">{s.title}</h3>
                <p className="process__text">{s.text}</p>
                {detailed && (
                  <ul className="process__detail">
                    {s.detail.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
