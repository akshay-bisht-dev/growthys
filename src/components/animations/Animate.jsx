"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

/*
  Declarative scroll animations for server-rendered markup. Wrap a page (or
  section) and mark descendants with data attributes:

    data-split            heading reveals line by line (masked)
    data-intro            (CSS only) above-the-fold rise-in on first paint
    data-reveal           fades and rises in when it enters the viewport
    data-stagger          direct children reveal in sequence
    data-parallax="0.15"  drifts vertically while scrolling (desktop only)
    data-draw             SVG paths inside draw on as the element scrolls by
    data-img-reveal       clip-path wipe with a slow inner scale

  Everything is visible without JavaScript or with reduced motion; GSAP only
  animates *from* a hidden state once it is running.
*/
export default function Animate({ as: Tag = "div", children, className, ...rest }) {
  const root = useRef(null);

  useGSAP(
    (context, contextSafe) => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      // Deferred one frame: on client navigation this effect runs before
      // Next.js resets the scroll position, and triggers created at the old
      // offset would all fire as "already passed".
      const setup = contextSafe(() => {
        mm.add(MOTION_OK, () => {
          // Headings are split lazily, shortly before they scroll into view,
          // so the measuring work is spread out instead of blocking load.
          const splits = [];
          q("[data-split]").forEach((el) => {
            let done = false;
            ScrollTrigger.create({
              trigger: el,
              start: "top bottom+=240",
              onEnter: () => {
                if (done) return;
                done = true;
                requestAnimationFrame(() => {
                  if (!el.isConnected) return;
                  splits.push(
                    SplitText.create(el, {
                      type: "lines",
                      mask: "lines",
                      linesClass: "split-line",
                      autoSplit: true,
                      onSplit: (self) =>
                        gsap.from(self.lines, {
                          yPercent: 105,
                          duration: 1.1,
                          ease: "expo.out",
                          stagger: 0.09,
                          scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none none",
                          },
                        }),
                    }),
                  );
                });
              },
            });
          });

          q("[data-reveal]").forEach((el) => {
            gsap.from(el, {
              y: 32,
              autoAlpha: 0,
              duration: 1,
              ease: "power3.out",
              delay: parseFloat(el.dataset.delay || 0),
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            });
          });

          q("[data-stagger]").forEach((el) => {
            gsap.from(el.children, {
              y: 40,
              autoAlpha: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          });

          q("[data-img-reveal]").forEach((el) => {
            const media = el.querySelector("img, svg, .cover-art");
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
            tl.from(el, {
              clipPath: "inset(100% 0% 0% 0%)",
              duration: 1.3,
              ease: "expo.inOut",
            });
            if (media) tl.from(media, { scale: 1.2, duration: 1.6, ease: "expo.out" }, 0.1);
          });

          q("[data-draw]").forEach((el) => {
            const paths = el.querySelectorAll("path, line, polyline, circle, rect");
            paths.forEach((p) => {
              const len = p.getTotalLength ? p.getTotalLength() : 0;
              gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
            });
            gsap.to(paths, {
              strokeDashoffset: 0,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: {
                trigger: el,
                start: el.dataset.drawStart || "top 80%",
                end: el.dataset.drawEnd || "bottom 50%",
                scrub: 0.6,
              },
            });
          });

          return () => splits.forEach((s) => s.revert());
        });

        mm.add(`${MOTION_OK} and (min-width: 900px)`, () => {
          q("[data-parallax]").forEach((el) => {
            const amount = parseFloat(el.dataset.parallax || 0.15);
            gsap.fromTo(
              el,
              { yPercent: amount * 50 },
              {
                yPercent: -amount * 50,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });
        });

        // Fonts can change line breaks and section heights after first paint.
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
      });
      const frame = requestAnimationFrame(setup);

      return () => {
        cancelAnimationFrame(frame);
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <Tag ref={root} className={className} {...rest}>
      {children}
    </Tag>
  );
}
