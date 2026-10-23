"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

// Disclosure-pattern accordion. Height animates through CSS grid rows, so
// it needs no JS measuring and respects reduced motion via CSS.
export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={item.q} className={`accordion__item${isOpen ? " is-open" : ""}`}>
            <h3 className="accordion__heading">
              <button
                id={btnId}
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="accordion__icon" aria-hidden="true">
                  <Plus size={18} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="accordion__panel"
              inert={!isOpen || undefined}
            >
              <div className="accordion__inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
