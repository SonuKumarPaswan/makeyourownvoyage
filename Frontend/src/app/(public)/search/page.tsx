"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import MaterialIcon from "@/components/ui/MaterialIcon";
import type { GlobalSearchResponse, SearchResultItem } from "@/types/search";
import { Button } from "@/components/ui/Button";

const CATEGORIES = [
  { id: "all", label: "All Results", iconName: "travel_explore" },
  { id: "destinations", label: "Destinations", iconName: "location_on" },
  { id: "states", label: "States & Regions", iconName: "map" },
  { id: "packages", label: "Packages", iconName: "luggage" },
  { id: "hotels", label: "Hotels & Stays", iconName: "hotel" },
  { id: "transports", label: "Cabs & Transport", iconName: "local_taxi" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "";
  const initialType = searchParams.get("type") || "all";

  const [query, setQuery] = useState(initialQuery);
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialType);
  const [sortBy, setSortBy] = useState("recommended");
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<GlobalSearchResponse | null>(null);

  // Sync state with URL params
  useEffect(() => {
    const qParam = searchParams.get("q") || "";
    const typeParam = searchParams.get("type") || "all";
    setQuery(qParam);
    setSearchInput(qParam);
    setActiveCategory(typeParam);
  }, [searchParams]);

  // Fetch search results from backend Express API
  useEffect(() => {
    if (!query.trim()) {
      setSearchData(null);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query.trim())}&type=${activeCategory}`
        );
        const data = await res.json();
        if (data.success) {
          setSearchData(data);
        } else {
          setSearchData(null);
        }
      } catch (err) {
        console.error("Failed to fetch search results:", err);
        setSearchData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, activeCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    router.push(
      `/search?q=${encodeURIComponent(searchInput.trim())}&type=${activeCategory}`
    );
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    router.push(`/search?q=${encodeURIComponent(query)}&type=${catId}`);
  };

  const getDisplayItems = (): SearchResultItem[] => {
    if (!searchData) return [];

    let items: SearchResultItem[] = [];
    if (activeCategory === "all") {
      items = searchData.combined || [];
    } else if (activeCategory === "destinations") {
      items = searchData.results?.destinations || [];
    } else if (activeCategory === "states") {
      items = searchData.results?.states || [];
    } else if (activeCategory === "packages") {
      items = searchData.results?.packages || [];
    } else if (activeCategory === "hotels") {
      items = searchData.results?.hotels || [];
    } else if (activeCategory === "transports") {
      items = searchData.results?.transports || [];
    }

    return [...items].sort((a, b) => {
      if (sortBy === "price_asc") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price_desc") return (b.price || 0) - (a.price || 0);
      if (sortBy === "title_asc") return a.title.localeCompare(b.title);
      return 0;
    });
  };

  const displayItems = getDisplayItems();
  const totalCount =
    activeCategory === "all"
      ? searchData?.totalMatches ?? displayItems.length
      : displayItems.length;

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar Header Banner */}
        <div className="bg-[#0a192f] border-2 border-[#d4af37] p-6 mb-8 text-white shadow-xl">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MaterialIcon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]" size={18} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search packages, destinations, hotels, outstation cabs..."
                className="w-full bg-[#0f2444] border border-gray-700 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37] text-sm"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="uppercase tracking-widest text-xs font-bold px-8 py-3"
            >
              Search
            </Button>
          </form>

          {/* Search Result Summary Bar */}
          {query && (
            <div className="mt-4 pt-4 border-t border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <p className="text-gray-300">
                Results for <span className="text-[#d4af37] font-bold">"{query}"</span>
                {!isLoading && (
                  <span className="ml-2 text-gray-400 font-semibold">
                    ({totalCount} {totalCount === 1 ? "match" : "matches"} found)
                  </span>
                )}
              </p>

              {/* Sorting Filter */}
              <div className="flex items-center gap-2">
                <MaterialIcon name="tune" className="text-[#d4af37]" size={16} />
                <span className="text-gray-400 font-semibold uppercase text-[10px]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#0f2444] border border-gray-700 text-white px-3 py-1 text-xs focus:outline-none cursor-pointer"
                >
                  <option value="recommended">Featured / Recommended</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="title_asc">Name: A to Z</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Category Pills Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const count =
              searchData?.counts?.[cat.id as keyof typeof searchData.counts] ?? null;

            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all ${
                  isActive
                    ? "bg-[#0a192f] text-[#d4af37] border-[#0a192f]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#0a192f]"
                }`}
              >
                <MaterialIcon
                  name={cat.iconName}
                  className={isActive ? "text-[#d4af37]" : "text-gray-500"}
                  size={16}
                />
                <span>{cat.label}</span>
                {count !== null && count > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 text-[10px] ${
                      isActive ? "bg-[#d4af37] text-[#0a192f]" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-gray-200 bg-white p-4 animate-pulse">
                <div className="h-48 bg-gray-200 mb-4" />
                <div className="h-5 bg-gray-200 w-3/4 mb-2" />
                <div className="h-4 bg-gray-100 w-1/2 mb-4" />
                <div className="h-8 bg-gray-200 w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Search Results Grid */}
        {!isLoading && displayItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                href={item.url || "#"}
                className="group flex flex-col border-2 border-gray-200 bg-white shadow-sm hover:border-[#d4af37] hover:shadow-xl transition-all duration-300 justify-between"
              >
                {/* Photo & Category Badge */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#0a192f] text-[#d4af37] text-2xl font-bold">
                      {item.type.toUpperCase()}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 bg-[#0a192f]/90 text-[#d4af37] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border border-[#d4af37]/30">
                    {item.type}
                  </span>

                  {item.starCategory && (
                    <span className="absolute top-3 right-3 bg-black/75 text-[#d4af37] px-2 py-0.5 text-xs font-bold flex items-center gap-1 border border-white/20">
                      ★ {item.starCategory} Star
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold uppercase tracking-wide text-[#0a192f] group-hover:text-[#d4af37] transition-colors line-clamp-1 mb-1">
                      {item.title}
                    </h3>

                    {item.subtitle && (
                      <p className="text-xs text-gray-500 line-clamp-2 font-light mb-3">
                        {item.subtitle}
                      </p>
                    )}

                    {item.destination && (
                      <p className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-3">
                        <MaterialIcon name="location_on" size={14} className="text-[#d4af37]" />
                        {item.destination}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    {item.price ? (
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block">Starting from</span>
                        <p className="text-base font-black text-[#0a192f]">
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    ) : (
                       <span className="text-xs font-medium text-gray-500">Explore Catalog</span>
                    )}

                    <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#0a192f] group-hover:text-[#d4af37]">
                      <span>View</span>
                      <MaterialIcon name="arrow_forward" size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (!query || displayItems.length === 0) && (
          <div className="border-2 border-dashed border-gray-300 bg-white p-12 text-center">
            <div className="w-16 h-16 bg-[#0a192f] text-[#d4af37] mx-auto flex items-center justify-center mb-4 border border-[#d4af37]/30">
              <MaterialIcon name="search" size={32} />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wide text-[#0a192f] mb-1">
              {query ? `No results found for "${query}"` : "Search Across All Voyages"}
            </h3>
            <p className="text-xs text-gray-500 font-light max-w-md mx-auto mb-6">
              {query
                ? "Try searching for another state, holiday destination, 5-star hotel, or outstation cab."
                : "Type names like 'Manali', 'Goa', 'Jaipur', 'Kashmir', or 'Innova Crysta'."}
            </p>
            {query && (
              <Button
                onClick={() => {
                  setQuery("");
                  setSearchInput("");
                  setActiveCategory("all");
                  router.push("/search");
                }}
                variant="outline"
                size="md"
                className="uppercase tracking-widest text-xs font-bold"
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
          <div className="h-8 w-8 animate-spin border-4 border-[#0a192f] border-t-[#d4af37]" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
