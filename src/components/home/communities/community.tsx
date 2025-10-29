import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
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
  icon?: string;
  color?: string;
  members?: number;
  activeMarkets?: number;
  totalVolume?: string;
  category?: string;
  categories?: string[];
  createdAt?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

const ITEMS_PER_PAGE = 9;

const Communities = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Fetch one page from server (server-side pagination)
  useEffect(() => {
    let mounted = true;
    const fetchPage = async () => {
      setLoading(true);
      setApiError(null);
      try {
        const baseUrl = import.meta.env.VITE_URL_COMMUNITY;
        if (!baseUrl) throw new Error("VITE_URL_COMMUNITY is not configured");

        const token = localStorage.getItem("token") || undefined;

        const res = await axios.get<PaginatedResponse<Community>>(
          `${baseUrl.replace(/\/$/, "")}/communities`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            params: { page, limit: ITEMS_PER_PAGE },
          }
        );

        if (!mounted) return;

        const payload = res.data;
        const data = Array.isArray(payload?.data) ? payload.data : [];

        // normalize fields and safe defaults
        const normalized = data.map((c) => ({
          id: c.id,
          name: c.name,
          description: c.description,
          icon: c.icon ?? "📈",
          color: c.color ?? "text-green-400",
          members: c.members ?? 0,
          activeMarkets: c.activeMarkets ?? 0,
          totalVolume: c.totalVolume ?? "$0",
          categories: c.categories ?? [],
          category:
            (c.categories && c.categories.length > 0 && c.categories[0]) ||
            c.category ||
            "General",
          createdAt: c.createdAt ?? "",
        }));

        setCommunities(normalized);

        if (payload?.pagination) {
          setTotalPages(payload.pagination.totalPages || 1);
          setTotalItems(payload.pagination.totalItems || normalized.length);
          setPage(payload.pagination.currentPage || page);
        } else {
          setTotalPages(
            Math.max(1, Math.ceil(normalized.length / ITEMS_PER_PAGE))
          );
          setTotalItems(normalized.length);
        }
      } catch (err: any) {
        console.error("Failed to fetch communities", err);
        setApiError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            "Failed to load communities"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPage();
    return () => {
      mounted = false;
    };
  }, [page]);

  // derive available categories (unique across the fetched page)
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    communities.forEach((c) => {
      (c.categories || []).forEach((cat) => set.add(cat));
    });
    return Array.from(set).sort();
  }, [communities]);

  // client-side filtering (no extra API calls)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = communities;
    if (activeCategory) {
      list = list.filter((c) => (c.categories || []).includes(activeCategory));
    }
    if (q) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          (c.category || "").toLowerCase().includes(q) ||
          (c.categories || []).some((cat) => cat.toLowerCase().includes(q))
      );
    }
    return list;
  }, [communities, query, activeCategory]);

  const startIndex = 0; // server returned page already; we display items as-is (or throttle if you want client paging)
  const paginated = filtered.slice(startIndex, ITEMS_PER_PAGE);

  const handleViewCommunity = (community: Community) => {
    // store selected community for CommunityInfo to read (persist across refresh)
    try {
      localStorage.setItem("selectedCommunity", JSON.stringify(community));
    } catch {
      // ignore localStorage errors
    }
    // also pass via navigate state for immediate access
    const formattedName = community.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/communities/${formattedName}`, { state: community });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between text-left">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-1">
              Communities
            </h1>
            <p className="text-lg text-muted-foreground">
              Join specialized communities and participate in prediction markets
            </p>
          </div>
          <CreateCommunity />
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative max-w-md w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search communities..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          <div className="flex gap-2 items-center">
            <div className="text-sm text-muted-foreground mr-2 hidden md:block">
              Categories:
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={activeCategory ? "outline" : "default"}
                className="cursor-pointer"
                onClick={() => setActiveCategory(null)}
              >
                All
              </Badge>
              {availableCategories.map((cat) => (
                <Badge
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() =>
                    setActiveCategory((s) => (s === cat ? null : cat))
                  }
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="gradient-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Communities
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {totalItems}
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
                    {filtered
                      .reduce((acc, c) => acc + (c.members || 0), 0)
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
                    {filtered.reduce(
                      (acc, c) => acc + (c.activeMarkets || 0),
                      0
                    )}
                  </p>
                </div>
                <MessageCircle className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loading / Error / Empty */}
        {loading ? (
          <Card className="gradient-card border-border/50">
            <CardContent className="text-center py-12">
              <div className="text-2xl mb-2">Loading communities…</div>
            </CardContent>
          </Card>
        ) : apiError ? (
          <Card className="gradient-card border-border/50">
            <CardContent className="text-center py-12">
              <div className="text-2xl mb-2">Error</div>
              <p className="text-sm text-red-400">{apiError}</p>
            </CardContent>
          </Card>
        ) : filtered.length === 0 ? (
          <Card className="gradient-card border-border/50">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No communities found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search term or category
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {paginated.map((community) => (
                <Card
                  key={community.id}
                  className="gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{community.icon}</div>
                        <div>
                          <h3
                            className={`text-lg font-bold ${community.color} group-hover:text-primary`}
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
                          {(community.members || 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-muted/20 rounded-lg p-2">
                        <p className="text-xs text-muted-foreground">Markets</p>
                        <p className="text-sm font-semibold text-foreground">
                          {community.activeMarkets || 0}
                        </p>
                      </div>
                      <div className="bg-muted/20 rounded-lg p-2">
                        <p className="text-xs text-muted-foreground">Volume</p>
                        <p className="text-sm font-semibold text-green-500">
                          {community.totalVolume || "$0"}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full btn-quantum"
                      onClick={() => handleViewCommunity(community)}
                    >
                      View Community
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Simple Pagination (server controls pages) */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Page</span>
                  <strong>{page}</strong>
                  <span className="text-sm text-muted-foreground">
                    of {totalPages}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
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
