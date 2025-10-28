import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Swal from "sweetalert2";

const COMMUNITY_ICONS = [
  "📈",
  "🎮",
  "⚽",
  "₿",
  "🗳️",
  "💻",
  "🎬",
  "🏠",
  "🌍",
  "🚀",
  "🎵",
  "⚡",
  "🔥",
  "💎",
  "🎯",
  "🌟",
];

const COMMUNITY_COLORS = [
  "text-green-400",
  "text-purple-400",
  "text-red-400",
  "text-orange-400",
  "text-blue-400",
  "text-cyan-400",
  "text-pink-400",
  "text-yellow-400",
  "text-emerald-400",
  "text-violet-400",
  "text-fuchsia-400",
  "text-amber-400",
  "text-rose-400",
  "text-indigo-400",
  "text-lime-400",
  "text-sky-400",
];

const SUGGESTED_CATEGORIES = [
  "Finance",
  "Cryptocurrency",
  "DeFi",
  "NFTs",
  "Gaming",
  "Esports",
  "Sports",
  "Politics",
  "Technology",
  "AI & ML",
  "Entertainment",
  "Movies",
  "Music",
  "Real Estate",
  "Science",
  "Space",
  "Climate",
  "Health",
  "Education",
  "Business",
  "Startup",
  "Trading",
  "Stocks",
  "Forex",
  "Commodities",
];

export const CreateCommunity = () => {
  const [open, setOpen] = useState(false);
  const [categoryPopoverOpen, setCategoryPopoverOpen] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "📈",
    color: "text-green-400",
    categories: [] as string[],
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    categories: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      description: "",
      categories: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Community name is required";
      isValid = false;
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
      isValid = false;
    }

    if (formData.categories.length === 0) {
      newErrors.categories = "Please select at least one category";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setApiError(null);
    setLoading(true);

    try {
      const rawUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!rawUser) {
        throw new Error("User not found in localStorage. Please login.");
      }

      const user = JSON.parse(rawUser);
      const ownerId = user?.id;
      if (!ownerId) throw new Error("Invalid user data. Missing id.");

      const payload = {
        name: formData.name,
        description: formData.description,
        ownerId,
        icon: formData.icon,
        categories: formData.categories,
      };

      const baseUrl = import.meta.env.VITE_URL_COMMUNITY;
      if (!baseUrl) throw new Error("Server URL not configured");

      const res = await fetch(`${baseUrl.replace(/\/$/, "")}/communities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        const message =
          errBody?.message ||
          errBody?.error ||
          `Failed to create community (${res.status})`;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
          timer: 3000,
          showConfirmButton: true,
          theme: "dark",
        });
        throw new Error(message);
      }

      const data = await res.json().catch(() => ({} as any));
      if (res.status >= 200 && res.status < 300) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Community created successfully",
          timer: 2000,
          showConfirmButton: false,
          theme: "dark",
        });
      }

      console.log("Community created:", data);

      setFormData({
        name: "",
        description: "",
        icon: "📈",
        color: "text-green-400",
        categories: [],
      });
      setErrors({ name: "", description: "", categories: "" });
      setOpen(false);
    } catch (err: any) {
      console.error("Create community error:", err);
      const message = err?.message || "Failed to create community";
      setApiError(message);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        timer: 3000,
        showConfirmButton: true,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  const addCategory = (category: string) => {
    if (category && !formData.categories.includes(category)) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, category],
      }));
      setErrors((prev) => ({ ...prev, categories: "" }));
    }
  };

  const removeCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };

  const addCustomCategory = () => {
    const trimmedCategory = customCategory.trim();
    if (trimmedCategory && !formData.categories.includes(trimmedCategory)) {
      addCategory(trimmedCategory);
      setCustomCategory("");
      setCategoryPopoverOpen(false);
    }
  };

  const availableCategories = SUGGESTED_CATEGORIES.filter(
    (cat) => !formData.categories.includes(cat)
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-quantum">
          <Plus className="w-4 h-4 mr-2" />
          Create Community
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl bg-black border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Community</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Build a community around shared interests and predictions
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Community Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Community Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              placeholder="e.g., DeFi Enthusiasts"
              className="bg-background border-border"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
                setErrors((prev) => ({ ...prev, description: "" }));
              }}
              placeholder="Describe what this community is about..."
              className="bg-background border-border min-h-[100px]"
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
              <p className="text-xs text-muted-foreground ml-auto">
                {formData.description.length}/500
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <Label>
              Categories <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-2 mb-2 ">
              {formData.categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="pl-3 pr-1 py-1 bg-quantum-red"
                >
                  {category}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
                    onClick={() => removeCategory(category)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>

            <Popover
              open={categoryPopoverOpen}
              onOpenChange={setCategoryPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full btn-outline-quantum"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[500px] p-0 bg-black border-gray-700">
                <Command className="bg-black">
                  <CommandInput
                    placeholder="Search or add custom category..."
                    value={customCategory}
                    onValueChange={setCustomCategory}
                  />
                  <CommandEmpty>
                    <div className="p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        No category found
                      </p>
                      <Button
                        type="button"
                        size="sm"
                        className="btn-quantum"
                        onClick={addCustomCategory}
                        disabled={!customCategory.trim()}
                      >
                        Add "{customCategory}"
                      </Button>
                    </div>
                  </CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-y-auto">
                    {availableCategories
                      .filter((cat) =>
                        cat.toLowerCase().includes(customCategory.toLowerCase())
                      )
                      .map((category) => (
                        <CommandItem
                          key={category}
                          value={category}
                          onSelect={() => {
                            addCategory(category);
                            setCategoryPopoverOpen(false);
                          }}
                          className="cursor-pointer"
                        >
                          {category}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.categories && (
              <p className="text-xs text-red-500">{errors.categories}</p>
            )}
          </div>

          {/* Icon Selection */}
          <div className="space-y-2">
            <Label>Choose Icon</Label>
            <div className="grid grid-cols-8 gap-2">
              {COMMUNITY_ICONS.map((icon, index) => (
                <Button
                  key={icon}
                  type="button"
                  variant={formData.icon === icon ? "default" : "outline"}
                  className={`h-12 text-2xl ${
                    formData.icon === icon
                      ? "btn-quantum"
                      : "btn-outline-quantum hover:scale-110 transition-transform"
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      icon,
                      color: COMMUNITY_COLORS[index % COMMUNITY_COLORS.length],
                    }))
                  }
                >
                  {icon}
                </Button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <Card className="bg-muted/20 border-border/50">
              <CardContent className="pt-4">
                <div className="flex items-start space-x-3">
                  <span className="text-4xl">{formData.icon}</span>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${formData.color}`}>
                      {formData.name || "Community Name"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {formData.description || "Community description"}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {formData.categories.length > 0 ? (
                        formData.categories.map((cat) => (
                          <Badge
                            key={cat}
                            variant="outline"
                            className="text-xs"
                          >
                            {cat}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="outline" className="text-xs opacity-50">
                          No categories
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {apiError && <p className="text-sm text-red-500">{apiError}</p>}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="btn-quantum flex-1"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Community"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="btn-outline-quantum flex-1"
              onClick={() => {
                setOpen(false);
                setFormData({
                  name: "",
                  description: "",
                  icon: "📈",
                  color: "text-green-400",
                  categories: [],
                });
                setErrors({ name: "", description: "", categories: "" });
                setApiError(null);
              }}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
