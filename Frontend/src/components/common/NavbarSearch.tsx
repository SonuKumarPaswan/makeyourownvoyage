"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MaterialIcon from "@/components/ui/MaterialIcon";
import type { SearchSuggestion } from "@/types/search";

export default function NavbarSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const cacheRef = useRef<Map<string, SearchSuggestion[]>>(new Map());
  const abortControllerRef = useRef<AbortController | null>(null);

  // Click outside listener
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

  // Lightning-fast debounced API call with in-memory caching & request cancellation
  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    // Check instant client-side cache (0ms instant response)
    if (cacheRef.current.has(trimmed)) {
      setSuggestions(cacheRef.current.get(trimmed)!);
      setIsOpen(true);
      setIsLoading(false);
      return;
    }

    // Cancel any in-flight pending fetch
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}&suggestions=true`,
          { signal: controller.signal }
        );
        const data = await res.json();
        const results = data.suggestions || [];
        cacheRef.current.set(trimmed, results);
        setSuggestions(results);
        setIsOpen(true);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.error("Search fetch error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    }, 120);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  // Navigate on enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Category Icon helper with Material Symbols
  const getIconName = (type: string) => {
    switch (type) {
      case "state":
        return "map";
      case "destination":
        return "location_on";
      case "package":
        return "luggage";
      case "hotel":
        return "hotel";
      case "transport":
        return "local_taxi";
      default:
        return "travel_explore";
    }
  };

  return (
    <div ref={searchContainerRef} className="relative w-full lg:max-w-sm">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-3 flex items-center justify-center text-[#d4af37]">
          <MaterialIcon name="search" size={18} />
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search places, trips, hotels..."
          className="w-full border border-[#d4af37]/30 bg-[#0a192f] py-2 pl-9 pr-8 text-xs text-white placeholder-slate-400 transition focus:border-[#d4af37] focus:bg-[#0a192f] focus:outline-none md:text-sm"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            <MaterialIcon name="close" size={16} />
          </button>
        )}
      </div>

      {/* Floating Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto border border-slate-200 bg-white p-2 shadow-2xl">
          {isLoading ? (
            <div className="p-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <MaterialIcon name="progress_activity" className="animate-spin text-[#d4af37]" size={16} />
              <span>Searching...</span>
            </div>
          ) : suggestions.length > 0 ? (
            <div>
              <p className="px-3 py-1.5 text-[11px] font-medium text-slate-400">
                Top Matches
              </p>
              {suggestions.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 transition hover:bg-slate-50 border-b border-slate-100 last:border-b-0 group"
                >
                  <div className="flex items-center gap-3 overflow-hidden min-w-0">
                    {/* Item Thumbnail Image or Styled Icon */}
                    <div className="relative h-11 w-13 shrink-0 overflow-hidden bg-[#0a192f] border border-slate-200 shadow-xs">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="52px"
                          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-[#d4af37]">
                          <MaterialIcon name={getIconName(item.type)} size={18} />
                        </div>
                      )}
                    </div>

                    {/* Text Details */}
                    <div className="truncate min-w-0">
                      <p className="truncate text-xs font-medium text-slate-900 group-hover:text-[#0a192f]">
                        {item.title}
                      </p>
                      <p className="truncate text-[11px] text-slate-500 font-normal">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <span className="shrink-0 bg-slate-100 px-2 py-0.5 text-[10px] font-normal text-slate-600 border border-slate-200">
                    {item.type}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-slate-400 font-normal">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}

