import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Search,
  Users,
  TrendingUp,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CreateCommunity } from "./createcommunity";
import { useNavigate } from "react-router-dom";

interface Community {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  members: number;
  activeMarkets: number;
  totalVolume: string;
  category: string;
  createdAt: string;
}

const Communities = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Mock data - replace with API call later
  const mockCommunities: Community[] = [
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
      createdAt: "2024-01-15",
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
      createdAt: "2024-02-20",
    },
    {
      id: "3",
      name: "Stock Market Pros",
      description: "Traditional markets and stock predictions",
      icon: "📈",
      color: "text-green-500",
      members: 15234,
      activeMarkets: 67,
      totalVolume: "$3.8M",
      category: "Finance",
      createdAt: "2024-01-10",
    },
    {
      id: "4",
      name: "Political Forecasters",
      description: "Predict election outcomes and political events",
      icon: "🗳️",
      color: "text-blue-500",
      members: 6543,
      activeMarkets: 28,
      totalVolume: "$890K",
      category: "Politics",
      createdAt: "2024-03-05",
    },
    {
      id: "5",
      name: "Sports Betting Hub",
      description: "Predictions on football, basketball, and more",
      icon: "⚽",
      color: "text-red-500",
      members: 18234,
      activeMarkets: 89,
      totalVolume: "$4.2M",
      category: "Sports",
      createdAt: "2024-01-20",
    },
    {
      id: "6",
      name: "Tech Innovators",
      description: "Predict tech product launches and startup success",
      icon: "💻",
      color: "text-cyan-500",
      members: 5621,
      activeMarkets: 21,
      totalVolume: "$650K",
      category: "Technology",
      createdAt: "2024-04-12",
    },
    {
      id: "7",
      name: "Weather Watchers",
      description: "Climate predictions and weather event forecasts",
      icon: "🌦️",
      color: "text-sky-500",
      members: 3421,
      activeMarkets: 15,
      totalVolume: "$320K",
      category: "Science",
      createdAt: "2024-05-01",
    },
    {
      id: "8",
      name: "Entertainment Buzz",
      description: "Movie box office, award shows, and celebrity news",
      icon: "🎬",
      color: "text-pink-500",
      members: 9876,
      activeMarkets: 34,
      totalVolume: "$1.1M",
      category: "Entertainment",
      createdAt: "2024-02-28",
    },
    {
      id: "9",
      name: "DeFi Enthusiasts",
      description: "Decentralized finance protocols and token predictions",
      icon: "🔗",
      color: "text-indigo-500",
      members: 7234,
      activeMarkets: 41,
      totalVolume: "$1.6M",
      category: "Finance",
      createdAt: "2024-03-15",
    },
    {
      id: "10",
      name: "Real Estate Insights",
      description: "Property market trends and housing predictions",
      icon: "🏠",
      color: "text-yellow-500",
      members: 4532,
      activeMarkets: 18,
      totalVolume: "$780K",
      category: "Real Estate",
      createdAt: "2024-04-20",
    },
    {
      id: "11",
      name: "Music Charts",
      description: "Predict chart positions and music award winners",
      icon: "🎵",
      color: "text-fuchsia-500",
      members: 6234,
      activeMarkets: 24,
      totalVolume: "$540K",
      category: "Entertainment",
      createdAt: "2024-05-10",
    },
    {
      id: "12",
      name: "Space Explorers",
      description: "Space missions, launches, and astronomical events",
      icon: "🚀",
      color: "text-violet-500",
      members: 4123,
      activeMarkets: 12,
      totalVolume: "$380K",
      category: "Science",
      createdAt: "2024-06-01",
    },
  ];

  const filteredCommunities = mockCommunities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCommunities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCommunities = filteredCommunities.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewCommunity = (communityName: string) => {
    const formattedName = communityName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/communities/${formattedName}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 text-left">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Communities
              </h1>
              <p className="text-lg text-muted-foreground">
                Join specialized communities and participate in prediction
                markets
              </p>
            </div>
            <CreateCommunity />
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
          <Card className="gradient-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Communities
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockCommunities.length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockCommunities
                      .reduce((acc, c) => acc + c.members, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Markets
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockCommunities.reduce(
                      (acc, c) => acc + c.activeMarkets,
                      0
                    )}
                  </p>
                </div>
                <MessageCircle className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communities Grid */}
        {filteredCommunities.length === 0 ? (
          <Card className="gradient-card border-border/50">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No communities found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search term
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedCommunities.map((community) => (
                <Card
                  key={community.id}
                  className="gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group border-gray-700"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between text-left">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{community.icon}</div>
                        <div>
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
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {community.description}
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-muted/20 rounded-lg p-2">
                        <p className="text-xs text-muted-foreground">Members</p>
                        <p className="text-sm font-semibold text-foreground">
                          {community.members.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-muted/20 rounded-lg p-2">
                        <p className="text-xs text-muted-foreground">Markets</p>
                        <p className="text-sm font-semibold text-foreground">
                          {community.activeMarkets}
                        </p>
                      </div>
                      <div className="bg-muted/20 rounded-lg p-2">
                        <p className="text-xs text-muted-foreground">Volume</p>
                        <p className="text-sm font-semibold text-green-500">
                          {community.totalVolume}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full btn-quantum"
                      onClick={() => handleViewCommunity(community.name)}
                    >
                      View Community
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn-outline-quantum"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => handlePageChange(page)}
                      className={
                        currentPage === page
                          ? "btn-quantum"
                          : "btn-outline-quantum"
                      }
                    >
                      {page}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn-outline-quantum"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Communities;
