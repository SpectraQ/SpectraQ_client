import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.jpg";
import {
  ArrowRightIcon,
  DollarSign,
  Home,
  Lightbulb,
  LucideShoppingBasket,
  MenuIcon,
  Plus,
  SparklesIcon,
  User2,
  X,
} from "lucide-react";

export function Navigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("");
  useEffect(() => {
    setActiveTab(location.hash || "#");
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#", label: "Home", icon: Home },
    {
      href: "#markets",
      label: "Market",
      icon: LucideShoppingBasket,
      badge: "Hot",
    },
    { href: "#communities", label: "Communities", icon: User2 },
    { href: "#trading", label: "Trading", icon: Plus },
    {
      href: "#predictions",
      label: "AI Predictions",
      icon: Lightbulb,
      badge: "New",
    },
    { href: "#portfolio", label: "Portfolio", icon: DollarSign },
    {
      href: "#ai-assistant",
      label: "Agent",
      icon: SparklesIcon,
      badge: "New",
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 border-b transition-all duration-300 ${
        isScrolled ? "bg-card/90 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-8xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="w-10 h-10 rounded-md" />
          <h1 className="text-xl font-bold">SpectraQ</h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map(({ href, label, icon: Icon, badge }) => (
            <a
              key={href}
              href={href}
              // className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted relative transition"
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm relative transition
  ${
    activeTab === href
      ? "bg-quantum-red text-white"
      : "text-muted-foreground hover:text-foreground hover:bg-muted"
  }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {badge && (
                <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] bg-quantum-red">
                  {badge}
                </Badge>
              )}
            </a>
          ))}
        </div>

        {/* Buttons */}
        <div className="hidden lg:flex gap-3">
          <Button className="bg-quantum-red" onClick={() => nav("/login")}>
            Login
          </Button>
          <Button
            className="bg-black hover:bg-transparent hover:text-black"
            onClick={() => nav("/signup")}
          >
            Get Started
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-t absolute top-20 left-0 w-full z-[200]">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map(({ href, label, icon: Icon, badge }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-md text-base text-muted-foreground hover:text-foreground hover:bg-muted transition"
              >
                <Icon className="w-5 h-5" />
                {label}
                {badge && <Badge>{badge}</Badge>}
              </a>
            ))}

            <div className="flex flex-col gap-2 pt-3">
              <Button onClick={() => nav("/login")}>Login</Button>
              <Button className="bg-black" onClick={() => nav("/signup")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
