"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Hotel } from "@/types/hotel";
import { Button } from "@/components/ui/Button";

interface HotelsGridProps {
  hotels: Hotel[];
  isLoading?: boolean;
  onOpenEnquiry?: (hotel: Hotel) => void;
}

export const HotelsGrid: React.FC<HotelsGridProps> = ({
  hotels,
  isLoading = false,
  onOpenEnquiry,
}) => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("all");

  const propertyTypes = ["all", "Resort", "5 Star", "Boutique", "Heritage", "Villa", "Business Hotel"];

  const filteredHotels = hotels.filter((h) => {
    if (selectedPropertyType === "all") return true;
    return h.propertyType?.toLowerCase() === selectedPropertyType.toLowerCase();
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-gray-200 bg-white p-4 animate-pulse">
              <div className="h-56 bg-gray-200 mb-4" />
              <div className="h-5 bg-gray-200 w-3/4 mb-2" />
              <div className="h-4 bg-gray-100 w-1/2 mb-4" />
              <div className="h-10 bg-gray-200 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {propertyTypes.map((pt) => (
              <button
                key={pt}
                onClick={() => setSelectedPropertyType(pt)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold border transition-all whitespace-nowrap ${selectedPropertyType === pt
                    ? "bg-[#0a192f] text-[#d4af37] border-[#0a192f]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#0a192f]"
                  }`}
              >
                {pt === "all" ? "All Properties" : pt}
              </button>
            ))}
          </div>

          <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Showing <span className="text-[#0a192f] font-bold">{filteredHotels.length}</span> verified stays
          </div>
        </div>

        {/* Hotels Cards Listing */}
        {filteredHotels.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-[#0a192f] mb-2 uppercase">No Properties Found</h3>
            <p className="text-sm text-gray-500 mb-6">
              We couldn't find any stays matching your selected criteria. Try resetting the filters.
            </p>
            <Button
              onClick={() => setSelectedPropertyType("all")}
              variant="outline"
              size="md"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => {
              const coverImage =
                hotel.images?.find((img) => img.type === "cover")?.url ||
                hotel.images?.[0]?.url ||
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";

              // Calculate starting price from rooms or fallback
              const startingPrice =
                hotel.rooms && hotel.rooms.length > 0
                  ? Math.min(...hotel.rooms.map((r) => r.pricing?.finalPrice || r.pricing?.basePrice || 3500))
                  : 3500;

              return (
                <div
                  key={hotel._id}
                  className="group bg-white border border-gray-200 hover:border-[#d4af37] transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl"
                >
                  {/* Photo Banner with Badges */}
                  <div className="relative h-60 w-full overflow-hidden bg-gray-900">
                    <Image
                      src={coverImage}
                      alt={hotel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Top Property Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-[#0a192f]/90 text-[#d4af37] text-[11px] font-bold uppercase tracking-wider border border-[#d4af37]/30 backdrop-blur-sm">
                        {hotel.propertyType || "Luxury Stay"}
                      </span>
                    </div>

                    {/* Star Rating Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/75 px-2 py-1 border border-white/20">
                      {[...Array(hotel.starCategory || 4)].map((_, i) => (
                        <MaterialIcon key={i} name="star" size={12} fill className="text-[#d4af37]" />
                      ))}
                    </div>

                    {/* Bottom City Tag */}
                    <div className="absolute bottom-3 left-3 text-white flex items-center gap-1.5 text-xs font-medium">
                      <MaterialIcon name="location_on" size={14} className="text-[#d4af37]" />
                      <span>
                        {hotel.location?.area ? `${hotel.location.area}, ` : ""}
                        {hotel.location?.city || "India"}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating Score in MakeMyTrip style */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="bg-[#0a192f] text-white text-xs font-bold px-1.5 py-0.5 border border-[#d4af37]/50">
                            {hotel.rating?.average ? hotel.rating.average.toFixed(1) : "4.8"}
                          </span>
                          <span className="text-xs font-bold text-[#0a192f]">
                            {hotel.rating?.average && hotel.rating.average >= 4.5
                              ? "Exceptional"
                              : "Very Good"}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-500">
                          ({hotel.rating?.totalReviews || 48} reviews)
                        </span>
                      </div>

                      {/* Hotel Name */}
                      <h3 className="text-lg font-bold text-[#0a192f] uppercase tracking-wide line-clamp-1 group-hover:text-[#d4af37] transition-colors mb-2">
                        {hotel.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-gray-600 line-clamp-2 mb-4 font-light leading-relaxed">
                        {hotel.description}
                      </p>

                      {/* Inclusions / Badges */}
                      <div className="grid grid-cols-2 gap-1.5 text-[11px] text-gray-700 mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-1">
                          <MaterialIcon name="check" size={12} className="text-green-600" /> Free Cancellation
                        </div>
                        <div className="flex items-center gap-1">
                          <MaterialIcon name="coffee" size={12} className="text-[#d4af37]" /> Breakfast Option
                        </div>
                        <div className="flex items-center gap-1">
                          <MaterialIcon name="wifi" size={12} className="text-[#d4af37]" /> High-Speed WiFi
                        </div>
                        <div className="flex items-center gap-1">
                          <MaterialIcon name="verified_user" size={12} className="text-[#0a192f]" /> Couple Friendly
                        </div>
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div>
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-[10px] uppercase text-gray-500 font-semibold block">
                            Starting from
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-[#0a192f]">
                              ₹{startingPrice.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[11px] text-gray-500 font-normal">/ night</span>
                          </div>
                          <span className="text-[10px] text-gray-400 block">+ ₹450 taxes & fees</span>
                        </div>

                        {onOpenEnquiry && (
                          <Button
                            onClick={() => onOpenEnquiry(hotel)}
                            variant="secondary"
                            size="sm"
                            className="text-[11px] uppercase tracking-wider py-1.5 px-3"
                          >
                            Quick Enquiry
                          </Button>
                        )}
                      </div>

                      <Link href={`/hotels/${hotel.slug}`}>
                        <Button
                          variant="primary"
                          size="md"
                          className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold"
                        >
                          View Rooms & Rates
                          <MaterialIcon name="arrow_forward" size={14} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
