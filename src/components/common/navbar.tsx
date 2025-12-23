import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Wallet,
  Zap,
  ChevronDown,
  Terminal,
  Activity,
} from "lucide-react";
import logo from "@/assets/logo.jpg"; // Ensure this path exists

// --- Sub-Component: Top Data Ticker ---
const TopBar = () => (
  <div className="hidden md:flex h-9 bg-[#0A0A0A] border-b border-white/10 items-center justify-between px-4 text-[10px] font-mono text-gray-400">
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-gray-300">SYSTEM NORMAL</span>
      </div>
      <div className="flex items-center gap-1">
        <Zap className="w-3 h-3 text-yellow-500" />
        <span>GAS: 12 Gwei</span>
      </div>
      <div className="w-px h-3 bg-white/10"></div>
      <div>
        BTC: <span className="text-white">$94,230</span>
      </div>
      <div>
        ETH: <span className="text-white">$3,450</span>
      </div>
      <div>
        SOL: <span className="text-white">$145</span>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <span className="hover:text-white cursor-pointer transition-colors">
        Docs
      </span>
      <span className="hover:text-white cursor-pointer transition-colors">
        Support
      </span>
      <span className="text-gray-600">v2.0.4-beta</span>
    </div>
  </div>
);

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Markets", path: "/markets" },
    { name: "Trading", path: "/trading" },
    { name: "AI Signals", path: "/predictions" },
    { name: "Community", path: "/community" }, // New link
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* 1. Top Ticker Data */}
      <TopBar />

      {/* 2. Main Navigation */}
      <header
        className={`w-full transition-all duration-200 border-b ${
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-md border-white/10 py-3"
            : "bg-[#050505] border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Area */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 flex items-center justify-center rounded bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors overflow-hidden">
                <img
                  src={logo}
                  alt="SpectraQ"
                  className="w-6 h-6 object-contain"
                />
                {/* Glitch overlay effect on hover could go here */}
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight leading-none">
                  SpectraQ
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive(link.path)
                      ? "text-white bg-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/portfolio">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white font-mono text-xs"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Portfolio
                </Button>
              </Link>

              <Button
                size="sm"
                className="bg-quantum-red text-white hover:bg-red-700 font-medium border border-transparent"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-[#050505] border-b border-white/10 animate-in slide-in-from-top-2">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {/* Mobile Top Stats */}
              <div className="grid grid-cols-3 gap-2 py-4 border-b border-white/10 mb-2">
                <div className="text-center p-2 bg-white/5 rounded">
                  <div className="text-[10px] text-gray-500">BTC</div>
                  <div className="text-xs font-mono text-white">$94k</div>
                </div>
                <div className="text-center p-2 bg-white/5 rounded">
                  <div className="text-[10px] text-gray-500">ETH</div>
                  <div className="text-xs font-mono text-white">$3.4k</div>
                </div>
                <div className="text-center p-2 bg-white/5 rounded">
                  <div className="text-[10px] text-gray-500">GAS</div>
                  <div className="text-xs font-mono text-yellow-500">12</div>
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-white/10">
                <Button className="w-full bg-white text-black justify-center">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
