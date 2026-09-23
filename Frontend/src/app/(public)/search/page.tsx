"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import type { GlobalSearchResponse, SearchResultItem } from "@/types/search";

// Category options
const CATEGORIES = [
    { id: "all", label: "All", icon: "✨" },
    { id: "packages", label: "Packages", icon: "🌴" },
    { id: "hotels", label: "Hotels", icon: "🏨" },
    { id: "destinations", label: "Destinations", icon: "📍" },
    { id: "transports", label: "Cabs & Transport", icon: "🚗" },
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

    // Fetch search results from API
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

    // Handle Search submit
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchInput.trim()) return;
        router.push(
            `/search?q=${encodeURIComponent(searchInput.trim())}&type=${activeCategory}`
        );
    };

    // Switch category filter
    const handleCategoryChange = (catId: string) => {
        setActiveCategory(catId);
        router.push(`/search?q=${encodeURIComponent(query)}&type=${catId}`);
    };

    // Get current active items based on activeCategory
    const getDisplayItems = (): SearchResultItem[] => {
        if (!searchData) return [];

        let items: SearchResultItem[] = [];
        if (activeCategory === "all") {
            items = searchData.combined || [];
        } else if (activeCategory === "packages") {
            items = searchData.results.packages || [];
        } else if (activeCategory === "hotels") {
            items = searchData.results.hotels || [];
        } else if (activeCategory === "destinations") {
            items = searchData.results.destinations || [];
        } else if (activeCategory === "transports") {
            items = searchData.results.transports || [];
        }

        // Client-side Sorting
        return [...items].sort((a, b) => {
            if (sortBy === "price_asc") {
                return (a.price || 0) - (b.price || 0);
            }
            if (sortBy === "price_desc") {
                return (b.price || 0) - (a.price || 0);
            }
            if (sortBy === "title_asc") {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    };

    const displayItems = getDisplayItems();
    const totalCount =
        activeCategory === "all"
            ? searchData?.totalMatches ?? 0
            : displayItems.length;

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Top Search Header */}
                <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm border border-border">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="flex flex-col gap-3 sm:flex-row sm:items-center"
                    >
                        <div className="relative flex-1">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted">
                                🔍
                            </span>
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search packages, destinations, hotels..."
                                className="w-full rounded-xl border border-border bg-gray-50 py-3 pl-12 pr-4 text-heading placeholder-muted transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <button
                            type="submit"
                            className="rounded-xl bg-primary px-8 py-3 font-semibold text-white transition hover:bg-primary-hover shadow-sm"
                        >
                            Search
                        </button>
                    </form>

                    {/* Search Summary Text */}
                    {query && (
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-4">
                            <p className="text-sm text-muted">
                                Showing results for{" "}
                                <span className="font-semibold text-heading">"{query}"</span>
                                {!isLoading && (
                                    <span className="ml-2 font-medium text-primary">
                                        ({totalCount} {totalCount === 1 ? "result" : "results"} found)
                                    </span>
                                )}
                            </p>

                            {/* Sorting Dropdown */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-muted">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-heading focus:border-primary focus:outline-none"
                                >
                                    <option value="recommended">Recommended</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="title_asc">Name: A to Z</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Category Filter Pills */}
                <div className="mb-8 flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => {
                        const count =
                            searchData?.counts?.[
                            cat.id as keyof typeof searchData.counts
                            ] ?? null;

                        return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${activeCategory === cat.id
                                        ? "bg-primary text-white shadow-sm"
                                        : "border border-border bg-white text-text hover:border-primary hover:text-primary"
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.label}</span>
                                {count !== null && count > 0 && (
                                    <span
                                        className={`ml-1 rounded-full px-2 py-0.5 text-xs ${activeCategory === cat.id
                                                ? "bg-white/20 text-white"
                                                : "bg-gray-100 text-muted"
                                            }`}
                                    >
                                        {count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Loading Skeleton */}
                {isLoading && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="animate-pulse rounded-2xl border border-border bg-white p-4 shadow-sm"
                            >
                                <div className="h-48 w-full rounded-xl bg-gray-200" />
                                <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
                                <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="h-6 w-20 rounded bg-gray-200" />
                                    <div className="h-8 w-24 rounded-lg bg-gray-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Search Results Grid */}
                {!isLoading && displayItems.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {displayItems.map((item) => (
                            <Link
                                key={`${item.type}-${item.id}`}
                                href={item.url || "#"}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                {/* Image & Type Badge */}
                                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-primary-light text-3xl">
                                            {item.type === "package" && "🌴"}
                                            {item.type === "hotel" && "🏨"}
                                            {item.type === "destination" && "📍"}
                                            {item.type === "transport" && "🚗"}
                                        </div>
                                    )}
                                    <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold capitalize text-heading shadow-sm backdrop-blur-sm">
                                        {item.type}
                                    </span>
                                    {item.starCategory && (
                                        <span className="absolute right-3 top-3 rounded-lg bg-yellow-400 px-2 py-0.5 text-xs font-bold text-gray-900 shadow-sm">
                                            ★ {item.starCategory}
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-5">
                                    <h3 className="text-lg font-bold text-heading group-hover:text-primary transition line-clamp-1">
                                        {item.title}
                                    </h3>

                                    {item.subtitle && (
                                        <p className="mt-1 text-sm text-muted line-clamp-2">
                                            {item.subtitle}
                                        </p>
                                    )}

                                    {item.destination && (
                                        <p className="mt-2 text-xs font-medium text-secondary">
                                            📍 {item.destination}
                                        </p>
                                    )}

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/60">
                                        {item.price ? (
                                            <div>
                                                <span className="text-xs text-muted">Starting from</span>
                                                <p className="text-lg font-bold text-heading">
                                                    ₹{item.price.toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                        ) : (
                                            <span className="text-xs font-medium text-muted">
                                                Explore details
                                            </span>
                                        )}

                                        <span className="rounded-lg bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary transition group-hover:bg-primary group-hover:text-white">
                                            View →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && (!query || displayItems.length === 0) && (
                    <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center shadow-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-2xl text-primary">
                            🔍
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-heading">
                            {query ? `No results found for "${query}"` : "Search for your next voyage"}
                        </h3>
                        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                            {query
                                ? "Try searching for a different destination, package, or clear the category filters."
                                : "Type destination names like 'Goa', 'Manali', 'Kerala', or hotels to explore."}
                        </p>
                        {query && (
                            <button
                                type="button"
                                onClick={() => {
                                    setQuery("");
                                    setSearchInput("");
                                    setActiveCategory("all");
                                    router.push("/search");
                                }}
                                className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover shadow-sm"
                            >
                                Clear Search
                            </button>
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
                <div className="flex min-h-[50vh] items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
            }
        >
            <SearchContent />
        </Suspense>
    );
}
