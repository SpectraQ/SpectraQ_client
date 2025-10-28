import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, TrendingUp, MessageCircle } from "lucide-react";
import { CommunityChat } from "./communityChat";
import { MarketCard } from "../markets/marketCard";

const CommunityInfo = () => {
  const { communityName } = useParams();
  const navigate = useNavigate();

  // Mock community data - replace with API call
  const community = {
    id: "1",
    name:
      communityName
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || "Community",
    description: "Predict cryptocurrency prices and market movements",
    icon: "₿",
    color: "text-orange-500",
    members: 12847,
    activeMarkets: 45,
    totalVolume: "$2.4M",
    category: "Finance",
  };

  // Mock markets data - replace with API call
  const mockMarkets = [
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
      status: "active" as const,
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
      status: "active" as const,
    },
    {
      id: "3",
      title: "Will Solana be in top 5 by market cap?",
      description: "SOL market position prediction",
      category: "crypto",
      endDate: "2024-10-31",
      volume: "$950K",
      participants: 654,
      yesPrice: 0.72,
      noPrice: 0.28,
      status: "active" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 flex"
          onClick={() => navigate("/communities")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Communities
        </Button>

        {/* Community Header */}
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
                  <Badge variant="outline">{community.category}</Badge>
                </div>
              </div>
              <Button className="btn-quantum">Join Community</Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/20 rounded-lg p-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Members</p>
                  <p className="text-xl font-bold">
                    {community.members.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="bg-muted/20 rounded-lg p-4 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Markets
                  </p>
                  <p className="text-xl font-bold">{community.activeMarkets}</p>
                </div>
              </div>
              <div className="bg-muted/20 rounded-lg p-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Volume</p>
                  <p className="text-xl font-bold text-green-500">
                    {community.totalVolume}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full justify-center max-w-md mx-auto md:mx-0 grid-cols-2 mb-8 border border-gray-700">
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Community Chat
            </TabsTrigger>
            <TabsTrigger
              value="markets"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Markets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <CommunityChat
              communityId={community.id}
              communityName={community.name}
            />
          </TabsContent>

          <TabsContent value="markets">
            {mockMarkets.length === 0 ? (
              <Card className="gradient-card border-border/50">
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No markets found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or category filter
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {mockMarkets.map((market) => (
                  <MarketCard key={market.id} market={market} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityInfo;
