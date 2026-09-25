"use client";

import React from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Hotel } from "@/types/hotel";

interface HotelFacilitiesProps {
  hotel: Hotel;
}

export const HotelFacilities: React.FC<HotelFacilitiesProps> = ({ hotel }) => {
  const facilitiesList = [
    {
      name: "Swimming Pool",
      active: hotel.facilities?.swimmingPool ?? true,
      iconName: "pool",
      desc: "Temperature controlled infinity pool",
    },
    {
      name: "Luxury Spa & Wellness",
      active: hotel.facilities?.spa ?? true,
      iconName: "spa",
      desc: "Ayurvedic massage & steam sauna therapy",
    },
    {
      name: "Fitness Gym",
      active: hotel.facilities?.gym ?? true,
      iconName: "fitness_center",
      desc: "Fully equipped modern cardio gym",
    },
    {
      name: "Multi-Cuisine Dining",
      active: hotel.facilities?.restaurant ?? true,
      iconName: "restaurant",
      desc: "Buffet breakfast & live culinary stations",
    },
    {
      name: "MICE & Conference Halls",
      active: hotel.facilities?.conferenceRoom ?? false,
      iconName: "business_center",
      desc: "Corporate AV setup & banquet setup for 150+ pax",
    },
    {
      name: "Valet & Parking",
      active: hotel.facilities?.parking ?? true,
      iconName: "directions_car",
      desc: "24x7 secured on-premise parking",
    },
  ];

  return (
    <section className="bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#0a192f]">
            Property <span className="text-[#d4af37]">Facilities & Dining</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-light mt-1">
            State-of-the-art hospitality amenities provided on premise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilitiesList
            .filter((f) => f.active)
            .map((facility, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-5 flex items-start gap-4 hover:border-[#d4af37] transition-colors"
              >
                <div className="p-3 bg-[#0a192f] text-[#d4af37] shrink-0 border border-[#d4af37]/30">
                  <MaterialIcon name={facility.iconName} size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-[#0a192f]">
                    {facility.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    {facility.desc}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Dining Information if exists */}
        {hotel.dining?.restaurants && hotel.dining.restaurants.length > 0 && (
          <div className="mt-8 bg-white border border-[#d4af37]/40 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a192f] mb-3 flex items-center gap-2">
              <MaterialIcon name="restaurant" size={16} className="text-[#d4af37]" /> On-Site Dining Venues
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hotel.dining.restaurants.map((rest, i) => (
                <div key={i} className="border-l-2 border-[#d4af37] pl-3 py-1">
                  <h4 className="text-xs font-bold uppercase text-[#0a192f]">{rest.name}</h4>
                  <p className="text-[11px] text-gray-500">
                    Cuisines: {rest.cuisine?.join(", ") || "Multi-Cuisine"} • Hours: {rest.openingTime} - {rest.closingTime}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
