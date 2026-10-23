import Animate from "@/components/animations/Animate";
import PageHero from "@/components/layout/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import site from "@/data/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Tell Growthys about your project. Share your goals and we will reply to arrange an initial conversation about web development, marketing or support.",
  path: "/contact",
});

const nextSteps = [
  { title: "We read every enquiry", text: "A real person reviews your message and the goals you describe." },
  { title: "We reply by email", text: "We follow up to arrange a short conversation or ask clarifying questions." },
  { title: "We outline next steps", text: "You receive a recommended approach before any commitment." },
];

export default function ContactPage() {
  const { email, phone, address } = site.contact;
  return (
    <Animate>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about <span className="text-gradient">your growth.</span>
          </>
        }
        lead="Tell us what you are building or improving. The more context you share, the more useful our first reply will be."
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />
      <section className="section section--tight">
        <div className="container contact">
          <aside className="contact__aside">
            <h2 className="h3" data-reveal>
              What happens next
            </h2>
            <ol className="contact__steps" data-stagger>
              {nextSteps.map((s, i) => (
                <li key={s.title}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            {(email || phone || address) && (
              <div className="contact__direct" data-reveal>
                <h2 className="h3">Direct contact</h2>
                {email && <a href={`mailto:${email}`}>{email}</a>}
                {phone && <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>}
                {address && <p>{address}</p>}
              </div>
            )}
          </aside>
          <div className="contact__form card" data-reveal>
            <h2 className="h3">Project enquiry</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </Animate>
  );
}
