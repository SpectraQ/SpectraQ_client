import { Footer } from "@/components/common/footer";
import { Navigation } from "@/components/common/navbar";
import { AIPredictions } from "@/components/home(401)/aiPoweredAnalysis";
import { MarketOverview } from "@/components/home(401)/liveMarket";
import { Portfolio } from "@/components/home(401)/features";
import { HeroSection } from "@/components/home(401)/heroSection";
import { LeverageTrading } from "@/components/home(401)/leverageTrading";
import { AIAssistant } from "@/components/home(401)/agent";

const Home = () => {
  return (
    <>
      <Navigation />
      <HeroSection />
      <MarketOverview />
      <LeverageTrading />
      <Portfolio />
      <AIPredictions />
      <AIAssistant />
      <Footer />
    </>
  );
};

export default Home;
