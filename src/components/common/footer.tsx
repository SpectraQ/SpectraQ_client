import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

export const Footer = () => (
  <footer className="border-t border-border py-12 ">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-md logo-container flex items-center justify-center">
              <img
                src={logo}
                alt="SpectraQ Logo"
                className="w-9 h-9 object-contain logo-image"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">
                SpectraQ
              </span>
            </div>
          </Link>
          <p className="text-muted-foreground mt-4 text-sm text-left">
            Decentralized prediction marketplace with AI-driven hedging on
            Yellow Protocol.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
            Markets
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/markets"
                className="text-muted-foreground hover:text-primary"
              >
                Market
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="text-muted-foreground hover:text-primary"
              >
                Trading
              </Link>
            </li>
            <li>
              <Link
                to="/markets?category=Crypto"
                className="text-muted-foreground hover:text-primary"
              >
                AI predictions
              </Link>
            </li>
            <li>
              <Link
                to="/markets?category=Politics"
                className="text-muted-foreground hover:text-primary"
              >
                Portfolio
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
            Resources
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                API
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Tutorials
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
            Company
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
        <p className="text-muted-foreground text-sm">
          © 2025 SpectraQ. All rights reserved.
        </p>
        <div className="mt-4 md:mt-0 flex space-x-6">
          <a href="#" className="text-muted-foreground hover:text-primary">
            Terms
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            Privacy
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            Cookies
          </a>
        </div>
      </div>
    </div>
  </footer>
);
