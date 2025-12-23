import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Terminal, Activity, ShieldCheck, Zap } from "lucide-react";

export const HeroSection = () => (
  <section className="relative min-h-[90vh] flex flex-col justify-center bg-[#050505] overflow-hidden pt-40">
    {/* Subtle Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

    {/* Radial Gradient for focus */}
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-quantum-red/20 opacity-20 blur-[100px]"></div>

    <div className="container mx-auto px-4 z-10 relative">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* YC Style Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-red-600/30 backdrop-blur-sm transition-all hover:bg-red-700/10 cursor-pointer">
          <span className="flex h-2 w-2 rounded-full bg-quantum-red animate-pulse"></span>
          <span className="text-xs font-medium text-gray-300">
            SpectraQ Protocol Launching soon
          </span>
          <ArrowRight className="w-3 h-3 text-gray-500" />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-quantum-red leading-tight">
          Algorithmic Trading, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
            Democratized.
          </span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Institutional-grade execution with AI-driven hedging. Access leverage,
          manage risk, and automate strategies on a decentralized
          infrastructure.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            size="lg"
            className="h-12 px-8 bg-quantum-red text-white  hover:bg-red-700 font-medium rounded-md text-base transition-all"
          >
            Start Trading
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-md text-base backdrop-blur-sm"
          >
            <Terminal className="w-4 h-4 mr-2 text-gray-400" />
            Read Documentation
          </Button>
        </div>
      </div>

      {/* Interface Preview (Glass Mockup) */}
      <div className="mt-20 relative rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] max-w-5xl mx-auto group">
        <div className="absolute inset-0 bg-gradient-to-tr from-quantum-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Fake UI Header */}
        <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          <div className="ml-4 text-xs font-mono text-gray-500">
            spectraq_terminal_v2.exe
          </div>
        </div>

        {/* Fake UI Content - Abstract representation of data */}
        <div className="p-8 grid grid-cols-12 gap-4 h-full">
          <div className="col-span-3 border-r border-white/10 space-y-4 pr-4">
            <div className="h-8 w-24 bg-white/10 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-white/5 rounded"></div>
            <div className="h-4 w-2/3 bg-white/5 rounded"></div>
          </div>
          <div className="col-span-6 space-y-4">
            <div className="h-32 w-full bg-gradient-to-b from-quantum-red/10 to-transparent border-b border-quantum-red/20 rounded-t relative overflow-hidden">
              {/* Simulated Chart Line */}
              <svg
                className="absolute bottom-0 w-full h-12 text-quantum-red"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,20 L10,15 L20,18 L30,10 L40,12 L50,5 L60,8 L70,2 L80,10 L90,5 L100,0 V20 H0 Z"
                  fill="currentColor"
                  opacity="0.2"
                />
                <path
                  d="M0,20 L10,15 L20,18 L30,10 L40,12 L50,5 L60,8 L70,2 L80,10 L90,5 L100,0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </svg>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-20 bg-white/5 rounded border border-white/5"></div>
              <div className="h-20 bg-white/5 rounded border border-white/5"></div>
              <div className="h-20 bg-white/5 rounded border border-white/5"></div>
            </div>
          </div>
          <div className="col-span-3 border-l border-white/10 pl-4 space-y-2">
            <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
              <span>BTC/USD</span>
              <span className="text-green-500">+2.4%</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
              <span>ETH/USD</span>
              <span className="text-red-500">-1.2%</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
              <span>SOL/USD</span>
              <span className="text-green-500">+5.8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
