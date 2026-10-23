import Animate from "@/components/animations/Animate";
import PageHero from "@/components/layout/PageHero";
import Link from "next/link";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Growthys collects, uses and protects personal information submitted through this website.",
  path: "/privacy-policy",
});

// Template — have it reviewed by a qualified legal professional for the
// jurisdictions Growthys operates in before publishing.
export default function PrivacyPage() {
  return (
    <Animate>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        lead="This policy explains what information we collect through this website, why we collect it and the choices you have."
        crumbs={[{ label: "Privacy policy", href: "/privacy-policy" }]}
      />
      <section className="section section--tight">
        <div className="container">
          <div className="prose">
            <p>
              <strong>Last updated:</strong> October 2026
            </p>
            <h2>Who we are</h2>
            <p>
              This website is operated by Growthys (&ldquo;we&rdquo;, &ldquo;us&rdquo;). If you have questions about
              this policy or your personal information, please reach us through our{" "}
              <Link href="/contact">contact page</Link>.
            </p>
            <h2>Information we collect</h2>
            <ul>
              <li>
                <strong>Information you give us:</strong> when you submit the contact form we receive your name, email
                address, and any optional details you provide such as phone number, company name, budget range and
                project description.
              </li>
              <li>
                <strong>Technical information:</strong> our hosting provider may process standard server data such as IP
                address, browser type and the pages requested, for security and reliability.
              </li>
              <li>
                <strong>Analytics:</strong> if we use analytics tools, they will only be activated in accordance with
                applicable consent requirements, and this policy will describe them.
              </li>
            </ul>
            <h2>How we use information</h2>
            <ul>
              <li>To respond to your enquiry and discuss potential work.</li>
              <li>To protect the website against spam, abuse and security threats.</li>
              <li>To understand how the website is used so we can improve it, where you have consented.</li>
            </ul>
            <p>We do not sell your personal information.</p>
            <h2>Legal basis</h2>
            <p>
              Where data protection laws require a legal basis, we rely on your consent (for example, when you submit
              the contact form) and our legitimate interest in operating a secure website and responding to business
              enquiries.
            </p>
            <h2>Sharing</h2>
            <p>
              We share information only with service providers that help us operate the website and deliver email, such
              as hosting and email delivery providers, under appropriate confidentiality and data protection terms, or
              where required by law.
            </p>
            <h2>Retention</h2>
            <p>
              We keep enquiry information only for as long as necessary to respond and to manage any resulting business
              relationship, after which it is deleted or anonymized.
            </p>
            <h2>Your rights</h2>
            <p>
              Depending on where you live, you may have rights to access, correct, delete or restrict the use of your
              personal information, and to withdraw consent. To make a request, contact us through the{" "}
              <Link href="/contact">contact page</Link>.
            </p>
            <h2>Changes</h2>
            <p>We may update this policy from time to time. The date at the top shows when it last changed.</p>
          </div>
        </div>
      </section>
    </Animate>
  );
}
