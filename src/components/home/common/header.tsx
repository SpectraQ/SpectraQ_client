import { useLocation } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/dashboard") return "Dashboard";
    if (path === "/communities") return "Communities";
    if (path === "/markets") return "Markets";
    if (path === "/portfolio") return "Portfolio";
    if (path === "/agent") return "Agent";
    if (path.startsWith("/communities/")) return "Community";

    const segment = path.split("/")[1];
    return segment
      ? segment.charAt(0).toUpperCase() + segment.slice(1)
      : "Dashboard";
  };

  return (
    <header className="sticky top-0 z-20 w-full flex justify-between items-center border-b border-gray-800 bg-background px-6 py-5">
      <div className="text-xl font-bold">{getPageTitle()}</div>

      <div className="relative">
        <ConnectButton
          showBalance={false}
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
        />
      </div>
    </header>
  );
}

export default Header;
