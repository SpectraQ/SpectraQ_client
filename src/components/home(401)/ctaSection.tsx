import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

export const CTASection = () => {
  const [marketCount, setMarketCount] = useState(0);
  const [communityCount, setCommunityCount] = useState(0);

  // Animate counts on load
  useEffect(() => {
    const marketTarget = 1247;
    const communityTarget = 85;
    const duration = 2000;
    const stepTime = 20;

    const steps = duration / stepTime;
    const marketIncrement = marketTarget / steps;
    const communityIncrement = communityTarget / steps;

    let currentMarket = 0;
    let currentCommunity = 0;

    const updateCounts = () => {
      currentMarket += marketIncrement;
      currentCommunity += communityIncrement;

      if (currentMarket >= marketTarget) {
        setMarketCount(marketTarget);
        setCommunityCount(communityTarget);
        clearInterval(timer);
      } else {
        setMarketCount(Math.floor(currentMarket));
        setCommunityCount(Math.floor(currentCommunity));
      }
    };

    const timer = setInterval(updateCounts, stepTime);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-black via-black to-red-900/40">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-background pointer-events-none"></div>

      {/* Floating community bubbles decoration */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse delay-700"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-quantum-red">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Social Trading is Here
          </span>
        </div>
        <div className="absolute -top-2 left-50 z-20 transform -rotate-20 pointer-events-none">
          <div className="border-4 border-dashed border-red-500/60 bg-background/80 backdrop-blur-sm text-red-600 px-6 py-2 font-black uppercase text-sm tracking-widest shadow-sm rounded-sm">
            Live Now
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Predict Better, <span className="text-primary">Together</span>
        </h2>

        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Don't trade alone. Join thousands of traders on SpectraQ to form
          communities, share alpha, and debate market moves in real-time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/markets">
            <Button
              size="lg"
              className="btn-quantum px-8 py-6 text-lg shadow-xl bg-primary hover:bg-primary/90 min-w-[200px]"
            >
              Start Trading
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/communities">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-primary/50 hover:bg-primary/10 min-w-[200px]"
            >
              Find a Community
              <Users className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-y-8">
          <div className="flex items-center space-x-2 md:space-x-8 lg:space-x-12 px-4">
            <div className="text-center group">
              <div className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                {marketCount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                Markets Live
              </div>
            </div>

            <div className="h-12 w-px bg-border/50"></div>

            <div className="text-center group">
              <div className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                {communityCount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                <Users className="w-3 h-3" /> Active Communities
              </div>
            </div>

            <div className="h-12 w-px bg-border/50"></div>

            <div className="text-center group">
              <div className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                24/7
              </div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                <MessageSquare className="w-3 h-3" /> Live Discussions
              </div>
            </div>

            <div className="hidden sm:block h-12 w-px bg-border/50"></div>

            <div className="text-center group hidden sm:block">
              <div className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                $24.7M
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Total Value Locked
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
