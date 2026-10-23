"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SPRITE } from "@/components/ui/TechIcon";

// Accessible tabs (roving tabindex, arrow keys) over technology categories.
// Icon path data arrives pre-resolved from the server to keep the bundle small.
export default function TechTabs({ categories }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabs = useRef([]);
  const current = categories[active];

  const onKeyDown = (e) => {
    const last = categories.length - 1;
    const next = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = next < 0 ? last : next > last ? 0 : next;
    setActive(i);
    tabs.current[i]?.focus();
  };

  return (
    <div className="tech-tabs">
      <div
        className="tech-tabs__list"
        role="tablist"
        aria-label="Technology categories"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
      >
        {categories.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => (tabs.current[i] = el)}
            role="tab"
            id={`tab-${c.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${c.id}`}
            tabIndex={i === active ? 0 : -1}
            className="tech-tabs__tab"
            onClick={() => setActive(i)}
          >
            {i === active && (
              <motion.span
                layoutId="tech-tab-bg"
                className="tech-tabs__tab-bg"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            )}
            <span className="tech-tabs__tab-label">{c.label}</span>
            <span className="tech-tabs__count">{c.items.length}</span>
          </button>
        ))}
      </div>

      <div className="tech-tabs__panel-wrap">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
            className="tech-tabs__panel"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: reduce ? 0 : 0.045 } },
              exit: { opacity: 0, transition: { duration: 0.15 } },
            }}
          >
            <p className="tech-tabs__desc">{current.description}</p>
            <ul className="tech-grid">
              {current.items.map((t) => (
                <motion.li
                  key={t.name}
                  className="tech-tile"
                  style={t.hex ? { "--brand": t.hex } : undefined}
                  variants={{
                    hidden: { opacity: 0, y: reduce ? 0 : 14, scale: reduce ? 1 : 0.96 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <span className="tech-tile__icon">
                    {t.icon ? (
                      <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
                        <use href={`${SPRITE}#${t.icon}`} />
                      </svg>
                    ) : (
                      <span className="tech-tile__mono" aria-hidden="true">
                        {t.name.split(" ")[0]}
                      </span>
                    )}
                  </span>
                  <span className="tech-tile__name">{t.name}</span>
                  {t.note && <span className="tech-tile__note">{t.note}</span>}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
