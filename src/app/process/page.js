import Animate from "@/components/animations/Animate";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import Process from "@/components/home/Process";
import SocialProof from "@/components/home/SocialProof";
import FinalCta from "@/components/home/FinalCta";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Our Process",
  description:
    "How Growthys works: discover, strategize, design, build and launch, then optimize and grow — a clear, collaborative process with defined checkpoints.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <Animate>
      <PageHero
        eyebrow="Our process"
        title={
          <>
            A clear path from idea to <span className="text-gradient">measurable growth.</span>
          </>
        }
        wide
        lead="Every project follows five stages. You review and approve work at each one, and nothing goes live without your sign-off."
        crumbs={[{ label: "Process", href: "/process" }]}
      >
        <Button href="/contact">Start with discovery</Button>
      </PageHero>
      <Process detailed title={false} />
      <SocialProof />
      <FinalCta />
    </Animate>
  );
}
