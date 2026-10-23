"use client";

import { useRef } from "react";
import { gsap, useGSAP, FINE_POINTER, MOTION_OK } from "@/lib/gsap";

// Gently pulls its child toward the cursor. Desktop pointers only; the
// child stays a normal, focusable link or button.
export default function Magnetic({ children, strength = 0.28 }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => {
        const el = ref.current;
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
        const move = (e) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  );
}
