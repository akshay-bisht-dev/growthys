import Animate from "@/components/animations/Animate";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import WhyGrowthys from "@/components/home/WhyGrowthys";
import SocialProof from "@/components/home/SocialProof";
import FinalCta from "@/components/home/FinalCta";
import { capabilities } from "@/data/content";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "About Growthys",
  description:
    "Growthys is a digital growth agency that brings web development, design, performance marketing, SEO and brand strategy together in one accountable team.",
  path: "/about",
});

const disciplines = [
  { title: "Build", text: "Websites, stores and web applications engineered for speed, accessibility and growth." },
  { title: "Design", text: "Interfaces and brand systems that earn trust quickly and guide people to act." },
  { title: "Grow", text: "Search, paid media, social and content working from one plan and one set of numbers." },
  { title: "Support", text: "Maintenance, monitoring and continuous optimization long after launch." },
];

export default function AboutPage() {
  return (
    <Animate>
      <PageHero
        eyebrow="About Growthys"
        title={
          <>
            More than an agency. <span className="text-gradient">Your digital growth partner.</span>
          </>
        }
        wide
        lead="Growthys exists to close the gap between how businesses build their digital presence and how they grow it. Development, design and marketing work best when they are planned together — so that is how we work."
        crumbs={[{ label: "About", href: "/about" }]}
      >
        <Button href="/contact">Start a conversation</Button>
        <Button href="/services" variant="ghost">
          Our services
        </Button>
      </PageHero>

      <section className="section section--tight">
        <div className="container split">
          <div>
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" />
              Our approach
            </p>
            <h2 className="h2" data-split>
              One team, from first line of code to last campaign report.
            </h2>
          </div>
          <div className="prose" data-reveal>
            <p>
              Many businesses work with one supplier for their website, another for advertising and a third for SEO.
              Each does its part, but nobody owns the whole journey — and opportunities fall between the gaps.
            </p>
            <p>
              <strong>Growthys</strong> combines these disciplines. The people who plan your campaigns understand how
              your website is built, and the people who build it understand what your marketing needs. The result is
              fewer hand-offs, clearer accountability and decisions based on shared data.
            </p>
            <p>
              We are deliberately honest about what we can promise. We do not guarantee rankings or advertising returns;
              we commit to a transparent process, sound technical work and continuous improvement.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <ul className="grid-4" data-stagger>
            {disciplines.map((d, i) => (
              <li key={d.title} className="card discipline">
                <span className="discipline__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WhyGrowthys />

      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__dot" />
              What guides us
            </p>
            <h2 className="h2" data-split>
              Capabilities that compound.
            </h2>
          </div>
          <ul className="grid-2" data-stagger>
            {capabilities.map((c) => (
              <li key={c.title} className="card">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SocialProof />
      <FinalCta />
    </Animate>
  );
}
