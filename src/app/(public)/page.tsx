import { HeroSection } from "@/components/marketing/HeroSection";
import { PillarsSection } from "@/components/marketing/PillarsSection";
import { AdvantagesSection } from "@/components/marketing/AdvantagesSection";
import { BoilerplatesSection } from "@/components/marketing/BoilerplatesSection";
import { StepsSection } from "@/components/marketing/StepsSection";
import { PricingSection } from "@/components/marketing/PricingSection";
import { FaqSection } from "@/components/marketing/FaqSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full text-on-surface">
      <HeroSection />
      <PillarsSection />
      <AdvantagesSection />
      <BoilerplatesSection />
      <StepsSection />
      <PricingSection />
      <FaqSection />
    </div>
  );
}