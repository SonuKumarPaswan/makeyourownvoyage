"use client";

import React, { useState } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";

interface HotelsHeroProps {
  onSearch?: (searchParams: {
    city: string;
    starCategory?: string;
  }) => void;
  totalHotels?: number;
}

export const HotelsHero: React.FC<HotelsHeroProps> = ({
  onSearch,
  totalHotels = 180,
}) => {
  const [city, setCity] = useState("");
  const [selectedStar, setSelectedStar] = useState<string>("all");

  const popularCities = ["Manali", "Goa", "Jaipur", "Rishikesh", "Udaipur", "Shimla", "Kashmir"];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        city,
        starCategory: selectedStar === "all" ? undefined : selectedStar,
      });
    }
  };

  return (
    <section className="relative bg-[#0a192f] text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#d4af37]/20">
      {/* Background Subtle Luxury Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-none blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#d4af37]/40 bg-[#0a192f]/80 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-4">
            <MaterialIcon name="auto_awesome" size={14} />
            Make Your Own Voyage • Luxury Stays & Resorts
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
            Handpicked <span className="text-[#d4af37]">Hotels & Royal Resorts</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-300 font-light max-w-2xl mx-auto">
            From mountain-view chalets in Manali to private pool villas in Goa. Curated luxury with zero booking friction.
          </p>
        </div>

        {/* MakeMyTrip Style Search Console (Zero Curve, Luxury Gold Borders) */}
        <div className="bg-[#0f2444] border-2 border-[#d4af37] shadow-2xl p-4 sm:p-6 mb-8">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* City / Destination Input */}
            <div className="bg-[#0a192f] border border-gray-700 p-3 flex flex-col justify-center">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5 mb-1">
                <MaterialIcon name="location_on" size={14} className="text-[#d4af37]" /> City or Hotel Name
              </label>
              <input
                type="text"
                placeholder="e.g. Manali, Goa, Jaipur"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent text-white text-sm font-medium focus:outline-none placeholder-gray-500"
              />
            </div>

            {/* Check-in Date */}
            <div className="bg-[#0a192f] border border-gray-700 p-3 flex flex-col justify-center">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5 mb-1">
                <MaterialIcon name="calendar_month" size={14} className="text-[#d4af37]" /> Check-In Date
              </label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="bg-transparent text-white text-sm font-medium focus:outline-none [color-scheme:dark]"
              />
            </div>

            {/* Guests / Rooms */}
            <div className="bg-[#0a192f] border border-gray-700 p-3 flex flex-col justify-center">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5 mb-1">
                <MaterialIcon name="group" size={14} className="text-[#d4af37]" /> Guests & Rooms
              </label>
              <select className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer">
                <option value="2-1" className="bg-[#0a192f] text-white">2 Adults • 1 Room</option>
                <option value="4-2" className="bg-[#0a192f] text-white">4 Adults • 2 Rooms</option>
                <option value="group" className="bg-[#0a192f] text-white">Corporate / Group (10+ Pax)</option>
              </select>
            </div>

            {/* Search CTA */}
            <div className="flex items-stretch">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full h-full flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-bold"
              >
                <MaterialIcon name="search" size={16} />
                Find Stays
              </Button>
            </div>
          </form>

          {/* Quick Filter Chips */}
          <div className="mt-4 pt-4 border-t border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-gray-400 uppercase font-semibold text-[10px] tracking-wider">Top Destinations:</span>
              {popularCities.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCity(c)}
                  className={`px-2.5 py-1 border transition-colors ${
                    city.toLowerCase() === c.toLowerCase()
                      ? "border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]"
                      : "border-gray-700 text-gray-300 hover:border-gray-500"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <span className="text-gray-400 uppercase font-semibold text-[10px] tracking-wider mr-1">Rating:</span>
              {["all", "5", "4", "3"].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setSelectedStar(star)}
                  className={`px-2 py-0.5 border text-[11px] font-semibold flex items-center gap-1 ${
                    selectedStar === star
                      ? "border-[#d4af37] bg-[#d4af37] text-[#0a192f]"
                      : "border-gray-700 text-gray-400 hover:border-gray-500"
                  }`}
                >
                  {star === "all" ? "All" : `${star} ★`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
