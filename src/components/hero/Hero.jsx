"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import Button from "@/components/ui/Button";
import TechIcon from "@/components/ui/TechIcon";
import { gsap, useGSAP, FINE_POINTER, MOTION_OK } from "@/lib/gsap";

const chips = [
  { name: "Next.js", icon: "nextdotjs", x: 8, y: 14, depth: 0.9 },
  { name: "React", icon: "react", x: 74, y: 14, depth: 0.6 },
  { name: "Google Ads", icon: "googleads", x: 78, y: 50, depth: 1 },
  { name: "Shopify", icon: "shopify", x: 66, y: 86, depth: 0.7 },
  { name: "Figma", icon: "figma", x: 4, y: 70, depth: 0.8 },
  { name: "Analytics", icon: "googleanalytics", x: 30, y: 92, depth: 0.5 },
];

// Deterministic particle field (no Math.random — stable across SSR/hydration).
const particles = Array.from({ length: 26 }, (_, i) => ({
  cx: ((i * 37) % 100) + 0.5,
  cy: ((i * 61) % 100) + 0.5,
  r: (i % 3) * 0.18 + 0.22,
}));

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        root.current.classList.add("is-ready");
        // Text intros are pure CSS (see [data-intro]) so the LCP text paints
        // without waiting for hydration; GSAP choreographs the visual layer.
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.from(
          document.querySelector(".site-header__inner"),
          { y: -24, autoAlpha: 0, duration: 1, clearProps: "all" },
          0,
        )
          .fromTo(".hero__visual", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.3)
          .from(".hero__orb", { scale: 0.4, duration: 1.8 }, 0.3)
          .from(".hero__ring", { rotateX: 90, autoAlpha: 0, duration: 1.6, stagger: 0.12 }, 0.45)
          .from(".hero__links path", { strokeDashoffset: 1, duration: 1.4, ease: "power2.inOut", stagger: 0.06 }, 0.9)
          .from(".hero__chip", { scale: 0.6, autoAlpha: 0, duration: 1, stagger: 0.07, ease: "back.out(1.6)" }, 1)
          .fromTo(".hero__word", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.6 }, 0.6)
          .fromTo(".hero__scroll", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 1.6);

        // Idle float on the chips.
        gsap.utils.toArray(".hero__chip-float").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? 10 : -10,
            duration: 3 + (i % 3),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.2,
          });
        });

        // Restrained parallax as the hero scrolls away.
        const out = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero__visual-inner", { yPercent: 18, ease: "none", scrollTrigger: out });
        gsap.to(".hero__word", { xPercent: -12, ease: "none", scrollTrigger: out });
        gsap.to(".hero__bg", { yPercent: 25, ease: "none", scrollTrigger: out });
      });

      // Cursor-reactive depth + glow, desktop only.
      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        const el = root.current;
        const layers = gsap.utils.toArray(".hero__chip").map((chip) => ({
          depth: parseFloat(chip.dataset.depth),
          x: gsap.quickTo(chip, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(chip, "y", { duration: 1.2, ease: "power3.out" }),
        }));
        const orbX = gsap.quickTo(".hero__system", "rotateY", { duration: 1.4, ease: "power3.out" });
        const orbY = gsap.quickTo(".hero__system", "rotateX", { duration: 1.4, ease: "power3.out" });
        const glowX = gsap.quickTo(el, "--gx", { duration: 0.8, ease: "power3.out" });
        const glowY = gsap.quickTo(el, "--gy", { duration: 0.8, ease: "power3.out" });

        const move = (e) => {
          const r = el.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          layers.forEach((l) => {
            l.x(nx * 40 * l.depth);
            l.y(ny * 30 * l.depth);
          });
          orbX(nx * 10);
          orbY(-ny * 8);
          glowX((nx + 0.5) * 100);
          glowY((ny + 0.5) * 100);
        };
        el.addEventListener("pointermove", move);
        return () => el.removeEventListener("pointermove", move);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow hero__glow--a" />
        <div className="hero__glow hero__glow--b" />
        <div className="hero__cursor-glow" />
        <div className="hero__grid" />
      </div>

      <div className="hero__visual" aria-hidden="true" data-hero>
        <div className="hero__visual-inner">
          <div className="hero__system">
            <div className="hero__ring hero__ring--1">
              <i />
            </div>
            <div className="hero__ring hero__ring--2">
              <i />
              <i />
            </div>
            <div className="hero__ring hero__ring--3">
              <i />
            </div>
            <div className="hero__orb" />
          </div>
          <svg className="hero__links" viewBox="0 0 100 100" preserveAspectRatio="none">
            {chips.map((c) => (
              <path
                key={c.name}
                d={`M50 50 Q ${(50 + c.x) / 2 + (c.y > 50 ? 8 : -8)} ${(50 + c.y) / 2} ${c.x + 6} ${c.y + 4}`}
                pathLength="1"
                strokeDasharray="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {particles.map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r={p.r} className="hero__particle" style={{ "--i": i }} />
            ))}
          </svg>
          {chips.map((c) => (
            <div key={c.name} className="hero__chip" data-depth={c.depth} style={{ left: `${c.x}%`, top: `${c.y}%` }}>
              <div className="hero__chip-float">
                <TechIcon icon={c.icon} name={c.name} size={18} />
                <span>{c.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow eyebrow" data-intro style={{ "--d": 0 }}>
          <span className="eyebrow__dot" />
          Growthys — Digital Growth Agency
        </p>
        <h1 id="hero-title" className="hero__title display">
          <span className="hero__mask">
            <span style={{ "--d": 0 }}>Build Digital Experiences.</span>
          </span>
          <span className="hero__mask">
            <span style={{ "--d": 1 }}>
              Accelerate <span className="hero__accent text-gradient">Growth.</span>
            </span>
          </span>
        </h1>
        <p className="hero__lead lead" data-intro style={{ "--d": 3 }}>
          <strong>Growthys</strong> combines technology, creativity, and data-driven marketing to help ambitious
          businesses build stronger brands and achieve measurable growth.
        </p>
        <div className="hero__ctas">
          <span data-intro style={{ "--d": 4 }}>
            <Button href="/contact" magnetic>
              Start Your Project
            </Button>
          </span>
          <span data-intro style={{ "--d": 5 }}>
            <Button href="/services" variant="ghost">
              Explore Our Services
            </Button>
          </span>
        </div>
      </div>

      <div className="hero__footer container">
        <ul className="hero__proof" data-intro style={{ "--d": 7 }} aria-label="What we combine">
          <li>Strategy.</li>
          <li>Technology.</li>
          <li>Performance.</li>
        </ul>
        <Link href="#tech-ticker" className="hero__scroll" data-hero aria-label="Scroll to content">
          <span className="hero__scroll-track">
            <ArrowDown size={16} aria-hidden="true" />
          </span>
          Scroll
        </Link>
      </div>

      <p className="hero__word" aria-hidden="true" data-hero>
        Growth<span>ys</span>
      </p>
    </section>
  );
}
