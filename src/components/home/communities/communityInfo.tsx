import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, TrendingUp, MessageCircle } from "lucide-react";
import { CommunityChat } from "./communityChat";
// import { MarketCard } from "../markets/marketCard";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

interface Market {
  id: string;
  title: string;
  description: string;
  category: string;
  endDate: string;
  volume: string;
  participants: number;
  yesPrice: number;
  noPrice: number;
  status: "active" | "closed";
}

interface Community {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  members?: number;
  activeMarkets?: number;
  totalVolume?: string;
  categories?: string[];
  createdAt?: string;
  isMember?: boolean;
}

const CommunityInfo = () => {
  const { communityName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // community can come from navigation state or localStorage (persist across refresh)
  const stored =
    (location.state as Community | null) ||
    JSON.parse(localStorage.getItem("selectedCommunity") || "null");

  // fallback community if none available
  const fallbackName = communityName
    ? communityName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Community";

  const community: Community = stored || {
    id: "unknown",
    name: fallbackName,
    description: "No description available",
    icon: "📈",
    color: "text-green-400",
    members: 0,
    activeMarkets: 0,
    totalVolume: "$0",
    categories: [],
    isMember: false,
  };

  // Example mock markets (you will fetch real markets by community id)
  const mockMarkets: Market[] = [
    {
      id: "1",
      title: "Will Bitcoin reach $100,000 by end of 2024?",
      description: "Prediction market for Bitcoin price milestone",
      category: "crypto",
      endDate: "2024-12-31",
      volume: "$2.4M",
      participants: 1247,
      yesPrice: 0.65,
      noPrice: 0.35,
      status: "active",
    },
    {
      id: "2",
      title: "Will Ethereum surpass $5,000 in 2024?",
      description: "ETH price prediction market",
      category: "crypto",
      endDate: "2024-11-30",
      volume: "$1.8M",
      participants: 983,
      yesPrice: 0.48,
      noPrice: 0.52,
      status: "active",
    },
  ];

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        await Swal.fire({
          icon: "warning",
          title: "Not signed in",
          text: "You must be logged in to join a community.",
          showConfirmButton: true,
          theme: "dark",
        });
        return;
      }

      if (!community || !community.id || community.id === "unknown") {
        await Swal.fire({
          icon: "error",
          title: "Invalid community",
          text: "Invalid community. Cannot join.",
          showConfirmButton: true,
          theme: "dark",
        });
        return;
      }

      const baseUrl = import.meta.env.VITE_URL_COMMUNITY;
      if (!baseUrl) {
        await Swal.fire({
          icon: "error",
          title: "Configuration error",
          text: "Server URL not configured.",
          showConfirmButton: true,
          theme: "dark",
        });
        return;
      }

      const url = `${baseUrl.replace(/\/$/, "")}/communities/${
        community.id
      }/join`;

      Swal.fire({
        title: "Joining community...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
        theme: "dark",
      });

      const res = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // close loading
      Swal.close();

      const updated = { ...(stored || community), isMember: true };
      try {
        localStorage.setItem("selectedCommunity", JSON.stringify(updated));
      } catch {}

      await Swal.fire({
        icon: "success",
        title: "Joined",
        text: res?.data?.message || "Successfully joined the community.",
        timer: 2000,
        showConfirmButton: false,
        theme: "dark",
        confirmButtonColor: "red",
      });
    } catch (err: any) {
      try {
        Swal.close();
      } catch {}

      console.error("Failed to join community", err);

      const status = err?.response?.status;
      const serverMsg =
        err?.response?.data?.message || err?.response?.data?.error;

      if (status === 409 || /already.*member/i.test(String(serverMsg || ""))) {
        await Swal.fire({
          icon: "info",
          title: "Already a member",
          text: serverMsg || "You are already a member of this community.",
          showConfirmButton: true,
          theme: "dark",
          confirmButtonColor: "red",
        });

        const updated = { ...(stored || community), isMember: true };
        try {
          localStorage.setItem("selectedCommunity", JSON.stringify(updated));
        } catch {}
        return;
      }

      const msg = serverMsg || err?.message || "Failed to join community";
      await Swal.fire({
        icon: "error",
        title: "Failed to join",
        text: msg,
        showConfirmButton: true,
        theme: "dark",
        confirmButtonColor: "red",
      });
    }
  };

  // If the page loaded with no stored community and you want to fetch by name, do it here.
  useEffect(() => {
    if (!stored && communityName) {
      console.info(
        "No stored community found; using fallback display for",
        communityName
      );
    }
  }, [stored, communityName]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex"
          onClick={() => navigate("/communities")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Communities
        </Button>

        <Card className="gradient-card mb-8 text-left">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{community.icon}</div>
                <div>
                  <h1 className={`text-3xl font-bold ${community.color} mb-2`}>
                    {community.name}
                  </h1>
                  <p className="text-muted-foreground mb-3">
                    {community.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {(community.categories || []).length ? (
                      community.categories!.map((cat) => (
                        <Badge key={cat} variant="outline">
                          {cat}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline">No categories</Badge>
                    )}
                  </div>
                </div>
              </div>

              <Button className="btn-quantum" onClick={handleJoin}>
                {community.isMember ? "Joined" : "Join Community"}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/20 rounded-lg p-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Members</p>
                  <p className="text-xl font-bold">
                    {(community.members || 0).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="bg-muted/20 rounded-lg p-4 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Markets
                  </p>
                  <p className="text-xl font-bold">
                    {community.activeMarkets || 0}
                  </p>
                </div>
              </div>

              <div className="bg-muted/20 rounded-lg p-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Volume</p>
                  <p className="text-xl font-bold text-green-500">
                    {community.totalVolume || "$0"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <CommunityChat
          communityId={community.id || ""}
          communityName={community.name}
        />
      </div>
    </div>
  );
};

export default CommunityInfo;
