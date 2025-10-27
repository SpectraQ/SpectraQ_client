import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/dashboard") return "Dashboard";
    if (path === "/communities") return "Communities";
    if (path === "/markets") return "Markets";
    if (path === "/portfolio") return "Portfolio";

    // Fallback: capitalize the path segment
    const segment = path.split("/")[1];
    return segment
      ? segment.charAt(0).toUpperCase() + segment.slice(1)
      : "Dashboard";
  };

  return (
    <header className="sticky top-0 z-30 w-full flex justify-between items-center border-b border-gray-800 bg-background px-6 py-5">
      <div className="text-xl font-bold">{getPageTitle()}</div>
      <Button className="btn-quantum">Connect wallet</Button>
    </header>
  );
}

export default Header;
