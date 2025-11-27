import { Footer } from "@/components/common/footer";
import { Navigation } from "@/components/common/navbar";
import { AIPredictions } from "@/components/home(401)/aiPoweredAnalysis";
import { MarketOverview } from "@/components/home(401)/liveMarket";
import { CTASection } from "@/components/home(401)/ctaSection";
import { FeaturesSection } from "@/components/home(401)/features";
import { HeroSection } from "@/components/home(401)/heroSection";
import { LeverageTrading } from "@/components/home(401)/leverageTrading";

const Home = () => {
  return (
    <>
      <Navigation />
      <HeroSection />
      <MarketOverview />
      <LeverageTrading />
      <FeaturesSection />
      <AIPredictions />
      <CTASection />
      <Footer />
    </>
  );
};

export default Home;
