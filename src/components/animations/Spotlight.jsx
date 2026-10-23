"use client";

import { useEffect, useRef } from "react";

// Sets --mx/--my on the hovered card so CSS can paint a cursor-following
// highlight. One delegated listener for the whole group; desktop only.
export default function Spotlight({ children, className, selector = ".service-card" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const move = (e) => {
      const card = e.target.closest(selector);
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    el.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
    };
  }, [selector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
