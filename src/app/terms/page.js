import Animate from "@/components/animations/Animate";
import PageHero from "@/components/layout/PageHero";
import Link from "next/link";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Terms and Conditions",
  description: "The terms that govern use of the Growthys website.",
  path: "/terms",
});

// Template — have it reviewed by a qualified legal professional before publishing.
export default function TermsPage() {
  return (
    <Animate>
      <PageHero
        eyebrow="Legal"
        title="Terms and conditions"
        lead="These terms govern your use of this website. Project work is covered by a separate written agreement."
        crumbs={[{ label: "Terms and conditions", href: "/terms" }]}
      />
      <section className="section section--tight">
        <div className="container">
          <div className="prose">
            <p>
              <strong>Last updated:</strong> October 2026
            </p>
            <h2>Using this website</h2>
            <p>
              By accessing this website you agree to these terms. If you do not agree, please do not use the website.
            </p>
            <h2>Information on this website</h2>
            <p>
              Content on this website is provided for general information. It is not professional advice for your
              specific situation. We work to keep information accurate but do not guarantee that it is complete or
              current. Case studies labelled as demo or concept projects are illustrative and do not describe client
              engagements.
            </p>
            <h2>Services</h2>
            <p>
              Any services Growthys provides are governed by a separate proposal or agreement, which takes precedence
              over these terms for that work.
            </p>
            <h2>Intellectual property</h2>
            <p>
              The website design, text and graphics are owned by or licensed to Growthys. Third-party names and logos
              shown on this website are trademarks of their respective owners and are used only to identify technologies
              we work with; their use does not imply endorsement or partnership.
            </p>
            <h2>Acceptable use</h2>
            <ul>
              <li>Do not attempt to disrupt, overload or gain unauthorized access to the website.</li>
              <li>Do not submit unlawful, misleading or harmful content through our forms.</li>
            </ul>
            <h2>Links to other websites</h2>
            <p>We are not responsible for the content or practices of websites we link to.</p>
            <h2>Limitation of liability</h2>
            <p>
              To the extent permitted by law, Growthys is not liable for losses arising from use of this website or
              reliance on its general information.
            </p>
            <h2>Changes and contact</h2>
            <p>
              We may update these terms from time to time. Questions can be sent through our{" "}
              <Link href="/contact">contact page</Link>.
            </p>
          </div>
        </div>
      </section>
    </Animate>
  );
}
