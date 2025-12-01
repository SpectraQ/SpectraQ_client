import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  ArrowRight,
  ChartBar,
  DollarSign,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const stats = [
  {
    name: "Total Value Locked",
    value: "$24.7M",
    icon: DollarSign,
    change: "+12.4%",
  },
  {
    name: "Active Traders",
    value: "12,847",
    icon: Users,
    change: "+8.3%",
  },
  {
    name: "Markets Created",
    value: "1,247",
    icon: ChartBar,
    change: "+15.2%",
  },
];

export const HeroSection = () => (
  <section className="relative min-h-screen bg-quantum-black overflow-hidden ">
    {/* Animated Dot Grid Background */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 animated-dots-bg" />
    </div>

    {/* Grid Pattern Background */}
    <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-black to-red-900">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>

    {/* Gradient Overlays */}
    <div className="absolute inset-0 bg-linear-to-br from-quantum-red/5 via-transparent to-transparent" />
    <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-quantum-red/10 via-transparent to-transparent" />

    {/* Additional gradient overlay for depth */}
    <div className="absolute inset-0 bg-linear-to-t from-quantum-black/50 via-transparent to-transparent" />
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10">
      <div className="flex flex-col lg:flex-row items-center gap-12 min-h-[80vh]">
        {/* Left Content */}
        <div className="pt-12 text-center mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-quantum-red/10 text-quantum-red mb-8 border border-quantum-red/20 backdrop-blur-sm mt-16">
            <Zap className="w-4 h-4 mr-2" />
            Powered by Yellow Protocol
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Decentralized Trading
            <br />
            <span className="text-quantum-red">Powered by AI</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            SpectraQ combines AI-driven market predictions with automated
            hedging strategies. Trade with leverage on BTC, ETH, and SOL while
            managing risk intelligently.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 mt-6">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-red"
            >
              Start Trading
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 hover:bg-primary/10"
            >
              View Predictions
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-quantum-red">$2.5B+</div>
              <div className="text-sm text-muted-foreground mt-1">
                Total Volume
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-quantum-red">95%</div>
              <div className="text-sm text-muted-foreground mt-1">
                AI Accuracy
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-quantum-red">10K+</div>
              <div className="text-sm text-muted-foreground mt-1">
                Active Traders
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
