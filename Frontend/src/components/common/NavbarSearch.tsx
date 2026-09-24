"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SearchSuggestion } from "@/types/search";

export default function NavbarSearch() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const searchContainerRef = useRef<HTMLDivElement>(null);

    // Click outside hone par dropdown close karna
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounced API call jab user type kare
    useEffect(() => {
        if (query.trim().length < 2) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        const timer = setTimeout(async () => {
            setIsLoading(true);
            try {
                const res = await fetch(
                    `/api/search?q=${encodeURIComponent(query)}&suggestions=true`
                );
                const data = await res.json();
                setSuggestions(data.suggestions || []);
                setIsOpen(true);
            } catch (err) {
                console.error("Search fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Enter press karne par full search page par bhejna
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            setIsOpen(false);
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    // Category Icon helper
    const getIcon = (type: string) => {
        switch (type) {
            case "package":
                return "🌴";
            case "hotel":
                return "🏨";
            case "destination":
                return "📍";
            case "transport":
                return "🚗";
            default:
                return "✨";
        }
    };

    return (
        <div ref={searchContainerRef} className="relative w-full lg:max-w-sm">
            {/* Search Input Box */}
            <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-3 text-sm text-gray-400">
                    🔍
                </span>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search places, trips, hotels..."
                    className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-8 text-xs text-gray-800 transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 md:text-sm"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery("");
                            setIsOpen(false);
                        }}
                        className="absolute right-3 text-xs text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Floating Suggestions Dropdown */}
            {isOpen && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
                    {isLoading ? (
                        <div className="p-4 text-center text-xs text-gray-400">
                            Searching...
                        </div>
                    ) : suggestions.length > 0 ? (
                        <div>
                            <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                Top Matches
                            </p>
                            {suggestions.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.url}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between rounded-xl px-3 py-2 transition hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-2.5 overflow-hidden">
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm text-primary">
                                            {getIcon(item.type)}
                                        </span>
                                        <div className="truncate">
                                            <p className="truncate text-xs font-semibold text-gray-800">
                                                {item.title}
                                            </p>
                                            <p className="truncate text-[11px] text-gray-500">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="ml-2 shrink-0 rounded bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-gray-600">
                                        {item.type}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 text-center text-xs text-gray-400">
                            No results found for &ldquo;{query}&rdquo;
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
