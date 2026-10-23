import Animate from "@/components/animations/Animate";
import Hero from "@/components/hero/Hero";
import TechTicker from "@/components/home/TechTicker";
import AboutIntro from "@/components/home/AboutIntro";
import ServicesOverview from "@/components/home/ServicesOverview";
import TechEcosystem from "@/components/technologies/TechEcosystem";
import WhyGrowthys from "@/components/home/WhyGrowthys";
import Process from "@/components/home/Process";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import Industries from "@/components/home/Industries";
import SocialProof from "@/components/home/SocialProof";
import BlogPreview from "@/components/home/BlogPreview";
import Faq from "@/components/home/Faq";
import FinalCta from "@/components/home/FinalCta";
import { homeFaqs } from "@/data/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Animate>
        <TechTicker />
        <AboutIntro />
        <ServicesOverview />
        <TechEcosystem />
        <WhyGrowthys />
        <Process />
        <PortfolioPreview />
        <Industries />
        <SocialProof />
        <BlogPreview />
        <Faq items={homeFaqs} />
        <FinalCta />
      </Animate>
    </>
  );
}
