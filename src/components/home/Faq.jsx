import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import JsonLd from "@/components/layout/JsonLd";

export default function Faq({ items, title = "Questions, answered.", withSchema = true }) {
  return (
    <section className="section faq" aria-labelledby="faq-title">
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
      <div className="container faq__grid">
        <div className="faq__intro">
          <p className="eyebrow" data-reveal>
            <span className="eyebrow__dot" />
            FAQ
          </p>
          <h2 id="faq-title" className="h2" data-split>
            {title}
          </h2>
          <p className="muted" data-reveal>
            Something else on your mind?{" "}
            <Link href="/contact" className="inline-link">
              Ask us directly
            </Link>
            .
          </p>
        </div>
        <div data-reveal>
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
