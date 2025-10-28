import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  TrendingUp,
  MessageCircle,
  ArrowRight,
  Bell,
  BellOff,
  Activity,
  Award,
  DollarSign,
  Calendar,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JoinedCommunity {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  members: number;
  activeMarkets: number;
  totalVolume: string;
  category: string;
  joinedAt: string;
  unreadMessages: number;
  isNotificationsEnabled: boolean;
  lastActivity: string;
}

interface ActiveMarket {
  id: string;
  title: string;
  description: string;
  community: string;
  communityIcon: string;
  endDate: string;
  volume: string;
  participants: number;
  yesPrice: number;
  noPrice: number;
  status: "active" | "closed" | "resolved";
  userPosition?: {
    shares: number;
    side: "yes" | "no";
    avgPrice: number;
    currentValue: number;
    pnl: number;
  };
}

interface PortfolioStats {
  totalInvested: number;
  currentValue: number;
  totalPnL: number;
  totalPnLPercentage: number;
  activePositions: number;
  winRate: number;
  bestTrade: {
    market: string;
    pnl: number;
  };
  recentActivity: {
    date: string;
    action: string;
    market: string;
    amount: number;
  }[];
}

function Dashboard() {
  const navigate = useNavigate();
  const [notificationStates, setNotificationStates] = useState<
    Record<string, boolean>
  >({});

  // Mock data - replace with API calls
  const mockJoinedCommunities: JoinedCommunity[] = [
    {
      id: "1",
      name: "Crypto Traders",
      description: "Predict cryptocurrency prices and market movements",
      icon: "₿",
      color: "text-orange-500",
      members: 12847,
      activeMarkets: 45,
      totalVolume: "$2.4M",
      category: "Finance",
      joinedAt: "2024-09-15",
      unreadMessages: 12,
      isNotificationsEnabled: true,
      lastActivity: "2 hours ago",
    },
    {
      id: "2",
      name: "Esports Arena",
      description: "Bet on your favorite esports teams and tournaments",
      icon: "🎮",
      color: "text-purple-500",
      members: 8932,
      activeMarkets: 32,
      totalVolume: "$1.2M",
      category: "Gaming",
      joinedAt: "2024-09-20",
      unreadMessages: 5,
      isNotificationsEnabled: true,
      lastActivity: "1 day ago",
    },
    {
      id: "3",
      name: "DeFi Enthusiasts",
      description: "Decentralized finance protocols and token predictions",
      icon: "🔗",
      color: "text-indigo-500",
      members: 7234,
      activeMarkets: 41,
      totalVolume: "$1.6M",
      category: "Finance",
      joinedAt: "2024-10-01",
      unreadMessages: 0,
      isNotificationsEnabled: false,
      lastActivity: "3 days ago",
    },
  ];

  const mockActiveMarkets: ActiveMarket[] = [
    {
      id: "1",
      title: "Will Bitcoin reach $100,000 by end of 2024?",
      description: "Prediction market for Bitcoin price milestone",
      community: "Crypto Traders",
      communityIcon: "₿",
      endDate: "2024-12-31",
      volume: "$2.4M",
      participants: 1247,
      yesPrice: 0.65,
      noPrice: 0.35,
      status: "active",
      userPosition: {
        shares: 100,
        side: "yes",
        avgPrice: 0.58,
        currentValue: 65,
        pnl: 7,
      },
    },
    {
      id: "2",
      title: "Will Team Liquid win The International 2024?",
      description: "Esports prediction for Dota 2 championship",
      community: "Esports Arena",
      communityIcon: "🎮",
      endDate: "2024-10-15",
      volume: "$850K",
      participants: 892,
      yesPrice: 0.32,
      noPrice: 0.68,
      status: "active",
      userPosition: {
        shares: 50,
        side: "no",
        avgPrice: 0.65,
        currentValue: 34,
        pnl: -16,
      },
    },
    {
      id: "3",
      title: "Will Ethereum surpass $5,000 in 2024?",
      description: "ETH price prediction market",
      community: "DeFi Enthusiasts",
      communityIcon: "🔗",
      endDate: "2024-11-30",
      volume: "$1.8M",
      participants: 983,
      yesPrice: 0.48,
      noPrice: 0.52,
      status: "active",
      userPosition: {
        shares: 75,
        side: "yes",
        avgPrice: 0.42,
        currentValue: 36,
        pnl: 6,
      },
    },
  ];

  const portfolioStats: PortfolioStats = {
    totalInvested: 1250,
    currentValue: 1387,
    totalPnL: 137,
    totalPnLPercentage: 10.96,
    activePositions: 8,
    winRate: 62.5,
    bestTrade: {
      market: "Will Bitcoin reach $100k?",
      pnl: 45,
    },
    recentActivity: [
      {
        date: "2024-10-27",
        action: "Bought YES",
        market: "Bitcoin $100k prediction",
        amount: 50,
      },
      {
        date: "2024-10-26",
        action: "Sold NO",
        market: "Team Liquid TI winner",
        amount: 30,
      },
      {
        date: "2024-10-25",
        action: "Bought YES",
        market: "ETH $5k prediction",
        amount: 75,
      },
    ],
  };

  const handleViewCommunity = (communityName: string) => {
    const formattedName = communityName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/communities/${formattedName}`);
  };

  const toggleNotifications = (communityId: string) => {
    setNotificationStates((prev) => ({
      ...prev,
      [communityId]: !prev[communityId],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome Back! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's what's happening with your predictions
          </p>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="gradient-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Portfolio Value
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    ${portfolioStats.currentValue.toLocaleString()}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      portfolioStats.totalPnL >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {portfolioStats.totalPnL >= 0 ? "+" : ""}$
                    {portfolioStats.totalPnL} (
                    {portfolioStats.totalPnLPercentage.toFixed(2)}%)
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Positions
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {portfolioStats.activePositions}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across {mockJoinedCommunities.length} communities
                  </p>
                </div>
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                  <p className="text-2xl font-bold text-foreground">
                    {portfolioStats.winRate}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    From closed positions
                  </p>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Best Trade</p>
                  <p className="text-2xl font-bold text-green-500">
                    +${portfolioStats.bestTrade.pnl}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {portfolioStats.bestTrade.market}
                  </p>
                </div>
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="communities" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto md:mx-0 grid-cols-3 mb-8 bg-muted/20 border border-gray-700">
            <TabsTrigger
              value="communities"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              My Communities
            </TabsTrigger>
            <TabsTrigger
              value="markets"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Active Markets
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Recent Activity
            </TabsTrigger>
          </TabsList>

          {/* My Communities Tab */}
          <TabsContent value="communities">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Communities</h2>
              <Button
                variant="outline"
                className="btn-outline-quantum"
                onClick={() => navigate("/communities")}
              >
                <Users className="w-4 h-4 mr-2" />
                Explore More
              </Button>
            </div>

            {mockJoinedCommunities.length === 0 ? (
              <Card className="gradient-card border-border/50">
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4">🏘️</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No communities yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Join communities to start making predictions
                  </p>
                  <Button
                    className="btn-quantum"
                    onClick={() => navigate("/communities")}
                  >
                    Browse Communities
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockJoinedCommunities.map((community) => (
                  <Card
                    key={community.id}
                    className="gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 group border-gray-700"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between text-left">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="text-4xl">{community.icon}</div>
                          <div className="flex-1">
                            <h3
                              className={`text-lg font-bold ${community.color} group-hover:text-primary transition-colors`}
                            >
                              {community.name}
                            </h3>
                            <Badge variant="outline" className="mt-1">
                              {community.category}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleNotifications(community.id);
                          }}
                        >
                          {notificationStates[community.id] ??
                          community.isNotificationsEnabled ? (
                            <Bell className="h-4 w-4 text-primary" />
                          ) : (
                            <BellOff className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {community.description}
                      </p>

                      {community.unreadMessages > 0 && (
                        <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">
                          {community.unreadMessages} unread message
                          {community.unreadMessages !== 1 ? "s" : ""}
                        </Badge>
                      )}

                      <div className="grid grid-cols-3 gap-2 text-center mb-3">
                        <div className="bg-muted/20 rounded-lg p-2">
                          <p className="text-xs text-muted-foreground">
                            Members
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            {community.members.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-muted/20 rounded-lg p-2">
                          <p className="text-xs text-muted-foreground">
                            Markets
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            {community.activeMarkets}
                          </p>
                        </div>
                        <div className="bg-muted/20 rounded-lg p-2">
                          <p className="text-xs text-muted-foreground">
                            Volume
                          </p>
                          <p className="text-sm font-semibold text-green-500">
                            {community.totalVolume}
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Last active: {community.lastActivity}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full btn-quantum"
                        onClick={() => handleViewCommunity(community.name)}
                      >
                        Open
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Active Markets Tab */}
          <TabsContent value="markets">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Active Positions</h2>
              <Button
                variant="outline"
                className="btn-outline-quantum"
                onClick={() => navigate("/markets")}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Browse Markets
              </Button>
            </div>

            {mockActiveMarkets.length === 0 ? (
              <Card className="gradient-card border-border/50">
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No active positions
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Start trading in prediction markets
                  </p>
                  <Button
                    className="btn-quantum"
                    onClick={() => navigate("/markets")}
                  >
                    Explore Markets
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {mockActiveMarkets.map((market) => (
                  <Card
                    key={market.id}
                    className="gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 border-gray-700"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">
                              {market.communityIcon}
                            </span>
                            <Badge variant="outline">{market.community}</Badge>
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-2">
                            {market.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {market.description}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-muted/20 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">
                            Your Position
                          </p>
                          <p className="text-lg font-bold text-foreground">
                            {market.userPosition?.shares}{" "}
                            <span className="text-sm uppercase">
                              {market.userPosition?.side}
                            </span>
                          </p>
                        </div>
                        <div className="bg-muted/20 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">
                            Current Value
                          </p>
                          <p className="text-lg font-bold text-foreground">
                            ${market.userPosition?.currentValue}
                          </p>
                        </div>
                        <div className="bg-muted/20 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">P&L</p>
                          <p
                            className={`text-lg font-bold ${
                              (market.userPosition?.pnl ?? 0) >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {(market.userPosition?.pnl ?? 0) >= 0 ? "+" : ""}$
                            {market.userPosition?.pnl}
                          </p>
                        </div>
                        <div className="bg-muted/20 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">
                            Ends In
                          </p>
                          <p className="text-lg font-bold text-foreground">
                            {new Date(market.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge className="bg-green-500/20 text-green-500">
                            YES ${(market.yesPrice * 100).toFixed(0)}
                          </Badge>
                          <Badge className="bg-red-500/20 text-red-500">
                            NO ${(market.noPrice * 100).toFixed(0)}
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          className="btn-outline-quantum"
                        >
                          Trade
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Recent Activity Tab */}
          <TabsContent value="activity">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>

            {portfolioStats.recentActivity.length === 0 ? (
              <Card className="gradient-card border-border/50">
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4">📜</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No activity yet
                  </h3>
                  <p className="text-muted-foreground">
                    Your trading history will appear here
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {portfolioStats.recentActivity.map((activity, index) => (
                  <Card
                    key={index}
                    className="gradient-card border-border/50 hover:border-primary/50 transition-all border-gray-700"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-lg ${
                              activity.action.includes("Bought")
                                ? "bg-green-500/20"
                                : "bg-red-500/20"
                            }`}
                          >
                            <Activity
                              className={`w-5 h-5 ${
                                activity.action.includes("Bought")
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">
                              {activity.action}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {activity.market}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">
                            ${activity.amount}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;
