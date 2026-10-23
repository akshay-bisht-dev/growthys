import Button from "@/components/ui/Button";
import { capabilities } from "@/data/content";

export default function AboutIntro() {
  return (
    <section className="section about-intro" aria-labelledby="about-intro-title">
      <div className="container about-intro__grid">
        <div className="about-intro__copy">
          <p className="eyebrow" data-reveal>
            <span className="eyebrow__dot" />
            About Growthys
          </p>
          <h2 id="about-intro-title" className="h2" data-split>
            More Than an Agency.
            <br />
            <span className="text-gradient">Your Digital Growth Partner.</span>
          </h2>
          <p className="lead" data-reveal>
            Websites, campaigns and brands perform best when they are planned together. Growthys brings development,
            design, performance marketing and creative strategy into one team, so every piece of your digital presence
            pulls in the same direction.
          </p>
          <div data-reveal>
            <Button href="/about" variant="ghost">
              Learn about Growthys
            </Button>
          </div>
        </div>

        <div className="about-intro__visual">
          <svg
            className="about-intro__lines"
            viewBox="0 0 400 480"
            aria-hidden="true"
            data-draw
            data-draw-start="top 75%"
            data-draw-end="bottom 60%"
          >
            <path d="M60 40 C 200 40, 200 160, 340 160" />
            <path d="M340 160 C 200 160, 200 280, 60 280" />
            <path d="M60 280 C 200 280, 200 400, 340 400" />
          </svg>
          <ol className="capability-list" data-stagger>
            {capabilities.map((c, i) => (
              <li key={c.title} className={`capability capability--${i % 2 ? "right" : "left"}`}>
                <span className="capability__index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="capability__title">{c.title}</h3>
                <p className="capability__text">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
