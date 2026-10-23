"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis, setLenis } from "@/lib/lenis";

// One Lenis instance, driven by GSAP's ticker so ScrollTrigger and Lenis
// read the same scroll position every frame. Skipped for reduced motion.
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Touch devices keep native scrolling (Lenis wouldn't smooth it anyway).
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;

    const lenis = new Lenis({
      lerp: 0.12,
      anchors: { offset: -96 },
      autoRaf: false,
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // After client navigation Next.js resets the native scroll position;
  // sync Lenis to it and re-measure triggers for the new page.
  useEffect(() => {
    const lenis = getLenis();
    lenis?.scrollTo(window.scrollY, { immediate: true, force: true });
    lenis?.resize();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
