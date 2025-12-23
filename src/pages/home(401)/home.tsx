import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { AIPredictions } from "@/components/home(401)/aiPoweredAnalysis";
import { MarketOverview } from "@/components/home(401)/liveMarket";
import { Portfolio } from "@/components/home(401)/Portfolio";
import { HeroSection } from "@/components/home(401)/heroSection";
import { LeverageTrading } from "@/components/home(401)/leverageTrading";
import { AIAssistant } from "@/components/home(401)/agent";

import { FeaturesBento } from "@/components/home(401)/features";
import { CommunitySection } from "@/components/home(401)/ctaSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesBento />
      <MarketOverview />
      <Portfolio />
      <AIAssistant />
      {/* <CommunitySection /> */}
      <Footer />
    </>
  );
};

export default Home;
