import Animate from "@/components/animations/Animate";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import Industries from "@/components/home/Industries";
import FinalCta from "@/components/home/FinalCta";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Industries We Serve",
  description:
    "Growthys supports e-commerce, healthcare, education, SaaS, professional services, travel, real estate and consumer brands with web development and digital marketing.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <Animate>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Different markets. <span className="text-gradient">Same discipline.</span>
          </>
        }
        lead="Every industry has its own customers, regulations and buying journeys. Our approach stays consistent: understand the customer, remove friction and measure what matters."
        crumbs={[{ label: "Industries", href: "/industries" }]}
      >
        <Button href="/contact">Tell us about your market</Button>
      </PageHero>
      <Industries intro={false} />
      <FinalCta />
    </Animate>
  );
}
