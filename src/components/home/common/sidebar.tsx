import { useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Users,
  BadgeDollarSign,
  User,
} from "lucide-react";
import logo from "@/assets/logo.jpg";
import Header from "./header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/communities", icon: Users, label: "Communities" },
    { path: "/markets", icon: BadgeDollarSign, label: "Markets" },
    { path: "/portfolio", icon: User, label: "Portfolio" },
  ];

  return (
    <>
      {/* Fixed Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-800 bg-background transition-transform duration-300 ease-in-out 
          md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xl font-bold"
            onClick={() => setSidebarOpen(false)}
          >
            <img src={logo} className="w-8 h-8 rounded" alt="SpectraQ" />
            SpectraQ
          </Link>

          <button
            className="md:hidden text-foreground hover:text-muted-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5 cursor-pointer" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-200px)]">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
            >
              <Button
                variant={isActive(item.path) ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 w-64 p-4 border-t border-gray-800 text-left bg-background">
          <div className="mb-3 px-3">
            <div className="font-medium text-sm">Name</div>
            <div className="text-xs text-muted-foreground">
              email@example.com
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Mobile Header with Menu */}
        <div className="md:hidden sticky top-0 z-30 flex items-center justify-between border-b border-gray-800 bg-background/80 backdrop-blur px-4 py-3">
          <button
            className="text-foreground hover:text-muted-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5 cursor-pointer" />
          </button>
          <h1 className="text-lg font-semibold">SpectraQ</h1>
          <div className="w-5" />
        </div>

        {/* Fixed Header */}
        <Header />

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </>
  );
};
