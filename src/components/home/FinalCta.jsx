import Button from "@/components/ui/Button";

export default function FinalCta({
  title = (
    <>
      Your Next Stage of
      <br />
      <span className="text-gradient">Growth</span> Starts Here.
    </>
  ),
  text = "Let's build a digital experience that helps your business move forward.",
}) {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta__glow" aria-hidden="true" />
      <svg
        className="final-cta__accent"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        aria-hidden="true"
        data-draw
        data-draw-start="top 85%"
        data-draw-end="center 45%"
      >
        <path d="M-20 340 C 240 340, 360 120, 600 160 S 980 60, 1220 40" />
        <path d="M-20 370 C 260 360, 420 200, 640 220 S 1000 120, 1220 100" />
      </svg>
      <div className="container final-cta__inner">
        <p className="eyebrow" data-reveal>
          <span className="eyebrow__dot" />
          Start a project
        </p>
        <h2 id="final-cta-title" className="final-cta__title" data-split>
          {title}
        </h2>
        <p className="lead" data-reveal>
          {text}
        </p>
        <div className="final-cta__actions" data-reveal>
          <Button href="/contact" size="lg" magnetic>
            Let&apos;s Build Something Great
          </Button>
          <Button href="/contact#project-form" variant="ghost" size="lg">
            Discuss Your Project
          </Button>
        </div>
      </div>
    </section>
  );
}
