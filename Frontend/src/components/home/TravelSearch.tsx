"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  Building2,
  Car,
  Bike,
  Bus,
  Users,
  Search,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

type SearchCategory = "packages" | "hotels" | "cabs" | "bikes" | "buses" | "traveller";

export const TravelSearch: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SearchCategory>("packages");

  // Input states
  const [destination, setDestination] = useState("");
  const [pickupCity, setPickupCity] = useState("Delhi NCR");
  const [dropCity, setDropCity] = useState("Manali");
  const [travelDate, setTravelDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pax, setPax] = useState("2");
  const [cabServiceType, setCabServiceType] = useState("Outstation One-Way");

  const tabs: Array<{ id: SearchCategory; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: "packages", label: "Holiday Packages", icon: Compass },
    { id: "hotels", label: "Hotels & Stays", icon: Building2 },
    { id: "cabs", label: "Outstation Cabs", icon: Car },
    { id: "bikes", label: "Bike Rentals", icon: Bike },
    { id: "buses", label: "Luxury Buses", icon: Bus },
    { id: "traveller", label: "Tempo Traveller", icon: Users },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "packages") {
      const q = destination ? `?q=${encodeURIComponent(destination)}` : "";
      router.push(`/packages${q}`);
    } else if (activeTab === "hotels") {
      const q = destination ? `?city=${encodeURIComponent(destination)}` : "";
      router.push(`/hotels${q}`);
    } else if (activeTab === "cabs") {
      router.push(`/services/transport/cabs?from=${encodeURIComponent(pickupCity)}&to=${encodeURIComponent(dropCity)}`);
    } else if (activeTab === "bikes") {
      router.push(`/services/transport/bikes?city=${encodeURIComponent(pickupCity)}`);
    } else if (activeTab === "buses") {
      router.push(`/services/transport/buses?from=${encodeURIComponent(pickupCity)}&to=${encodeURIComponent(dropCity)}`);
    } else if (activeTab === "traveller") {
      router.push(`/services/transport/traveller?from=${encodeURIComponent(pickupCity)}&to=${encodeURIComponent(dropCity)}`);
    }
  };

  return (
    <section className="relative z-20 -mt-24 sm:-mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#0a192f] border-2 border-[#d4af37] shadow-2xl overflow-hidden">
        {/* MakeMyTrip Style Category Navigation Tabs */}
        <div className="bg-[#081325] border-b border-[#d4af37]/30 px-3 sm:px-6 pt-3 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap border-b-2 ${
                  isActive
                    ? "border-[#d4af37] text-[#d4af37] bg-[#0a192f]"
                    : "border-transparent text-gray-400 hover:text-white hover:border-gray-600"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#d4af37]" : "text-gray-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Search Form Body */}
        <div className="p-5 sm:p-7 bg-[#0a192f]">
          <form onSubmit={handleSearchSubmit}>
            {/* 1. HOLIDAY PACKAGES TAB */}
            {activeTab === "packages" && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Curated All-Inclusive Tour Packages
                  </span>
                  <span className="text-[11px] text-[#d4af37] font-semibold">
                    Over 500+ Handcrafted Domestic & International Itineraries
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="bg-[#0f2444] border border-gray-700 p-3">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Destination / Region
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Manali, Goa, Kashmir, Dubai"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="bg-transparent text-white text-sm font-medium w-full focus:outline-none placeholder-gray-500"
                    />
                  </div>

                  <div className="bg-[#0f2444] border border-gray-700 p-3">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> Month / Date
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="bg-transparent text-white text-sm font-medium w-full focus:outline-none [color-scheme:dark]"
                    />
                  </div>

                  <div className="bg-[#0f2444] border border-gray-700 p-3">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-1">
                      <Users className="w-3.5 h-3.5 text-[#d4af37]" /> Travelers / Trip Type
                    </label>
                    <select
                      value={pax}
                      onChange={(e) => setPax(e.target.value)}
                      className="bg-transparent text-white text-sm font-medium w-full focus:outline-none cursor-pointer"
                    >
                      <option value="couple" className="bg-[#0a192f]">Couple / Honeymoon (2 Pax)</option>
                      <option value="family" className="bg-[#0a192f]">Family Vacation (3-5 Pax)</option>
                      <option value="group" className="bg-[#0a192f]">Friends Group (6-12 Pax)</option>
                      <option value="mice" className="bg-[#0a192f]">Corporate MICE (20+ Pax)</option>
                    </select>
                  </div>

                  <div className="flex items-stretch">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full h-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold py-3.5"
                    >
                      <Search className="w-4 h-4" />
                      Search Packages
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. HOTELS & RESORTS TAB */}
            {activeTab === "hotels" && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#d4af37]" /> Handpicked Stays & 5-Star Resorts
                  </span>
                  <span className="text-[11px] text-[#d4af37] font-semibold">
                    Free Cancellation & Guaranteed Luxury Amenities
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="bg-[#0f2444] border border-gray-700 p-3">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> City or Hotel Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Manali, Goa, Jaipur"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="bg-transparent text-white text-sm font-medium w-full focus:outline-none placeholder-gray-500"
                    />
                  </div>

                  <div className="bg-[#0f2444] border border-gray-700 p-3">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> Check-In Date
                    </label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="bg-transparent text-white text-sm font-medium w-full focus:outline-none [color-scheme:dark]"
                    />
                  </div>

                  <div className="bg-[#0f2444] border border-gray-700 p-3">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-1">
                      <Users className="w-3.5 h-3.5 text-[#d4af37]" /> Rooms & Guests
                    </label>
                    <select className="bg-transparent text-white text-sm font-medium w-full focus:outline-none cursor-pointer">
                      <option value="1r2g" className="bg-[#0a192f]">1 Room • 2 Guests</option>
                      <option value="2r4g" className="bg-[#0a192f]">2 Rooms • 4 Guests</option>
                      <option value="villa" className="bg-[#0a192f]">Entire Private Villa</option>
                    </select>
                  </div>

                  <div className="flex items-stretch">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full h-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold py-3.5"
                    >
                      <Search className="w-4 h-4" />
                      Find Stays
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. CABS & TRANSPORT TAB */}
            {(activeTab === "cabs" || activeTab === "buses" || activeTab === "traveller") && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#d4af37]" /> Sanitized Luxury Fleet with Professional Chauffeurs
                  </span>
                  <div className="flex items-center gap-2">
                    {["Outstation One-Way", "Outstation Round-Trip", "Airport Transfer"].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setCabServiceType(mode)}
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 border ${
                          cabServiceType === mode
                            ? "bg-[#d4af37] text-[#0a192f] border-[#d4af37]"
                            : "border-gray-700 text-gray-400 hover:text-white"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="bg-[#0f2444] border border-gray-700 p-3">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Pickup City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Delhi NCR"
                      value={pickupCity}
                      onChange={(e) => setPickupCity(e.target.value)}
                      className="bg-transparent text-white text-sm font-medium w-full focus:outline-none placeholder-gray-500"
                    />
                  </div>

                  <div className="bg-[#0f2444] border border-gray-700 p-3">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Drop Destination
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Manali, Shimla, Jaipur"
                      value={dropCity}
                      onChange={(e) => setDropCity(e.target.value)}
                      className="bg-transparent text-white text-sm font-medium w-full focus:outline-none placeholder-gray-500"
                    />
                  </div>

                  <div className="bg-[#0f2444] border border-gray-700 p-3">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> Pickup Date & Time
                    </label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="bg-transparent text-white text-sm font-medium w-full focus:outline-none [color-scheme:dark]"
                    />
                  </div>

                  <div className="flex items-stretch">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full h-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold py-3.5"
                    >
                      <Search className="w-4 h-4" />
                      Search Fleet
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. BIKE RENTALS TAB */}
            {activeTab === "bikes" && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1.5">
                    <Bike className="w-3.5 h-3.5 text-[#d4af37]" /> Self-Drive Royal Enfield Himalayan & Scooters
                  </span>
                  <span className="text-[11px] text-[#d4af37] font-semibold">
                    Helmets Provided • Zero Security Hassle • 24/7 Roadside Assistance
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="bg-[#0f2444] border border-gray-700 p-3 md:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Rental City / Station
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Manali, Rishikesh, Goa, Leh Ladakh"
                      value={pickupCity}
                      onChange={(e) => setPickupCity(e.target.value)}
                      className="bg-transparent text-white text-sm font-medium w-full focus:outline-none placeholder-gray-500"
                    />
                  </div>

                  <div className="bg-[#0f2444] border border-gray-700 p-3">
                    <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> Start Date
                    </label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="bg-transparent text-white text-sm font-medium w-full focus:outline-none [color-scheme:dark]"
                    />
                  </div>

                  <div className="flex items-stretch">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full h-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold py-3.5"
                    >
                      <Search className="w-4 h-4" />
                      Find Bikes
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default TravelSearch;