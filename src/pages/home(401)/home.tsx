import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { MarketOverview } from "@/components/home(401)/liveMarket";
import { PortfolioFeatures } from "@/components/home(401)/Portfolio";
import { HeroSection } from "@/components/home(401)/heroSection";
import { AIAssistant } from "@/components/home(401)/agent";
import { FeaturesBento } from "@/components/home(401)/features";
import { ExchangeOrbit } from "@/components/home(401)/floatingicons";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesBento />
      {/* <ExchangeOrbit   /> */}
      <MarketOverview />
      <PortfolioFeatures />
      <AIAssistant />
      {/* <CommunitySection /> */}
      <Footer />
    </>
  );
};

export default Home;
