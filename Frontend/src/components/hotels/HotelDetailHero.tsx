"use client";

import React from "react";
import Image from "next/image";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Hotel } from "@/types/hotel";
import { Button } from "@/components/ui/Button";

interface HotelDetailHeroProps {
  hotel: Hotel;
  onOpenEnquiry?: () => void;
}

export const HotelDetailHero: React.FC<HotelDetailHeroProps> = ({
  hotel,
  onOpenEnquiry,
}) => {
  const images = hotel.images && hotel.images.length > 0
    ? hotel.images
    : [
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80", alt: hotel.name, type: "cover" },
      { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", alt: "Room", type: "room" },
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", alt: "Pool", type: "pool" },
    ];

  const primaryImage = images[0]?.url;
  const secondaryImages = images.slice(1, 5);

  return (
    <section className="bg-[#0a192f] text-white pt-28 pb-10 px-4 sm:px-6 lg:px-8 border-b border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto">
        {/* Top Breadcrumb & Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 text-[11px] font-bold uppercase tracking-wider">
                {hotel.propertyType || "Luxury Resort"}
              </span>
              <div className="flex items-center gap-0.5">
                {[...Array(hotel.starCategory || 5)].map((_, i) => (
                  <MaterialIcon key={i} name="star" size={14} fill className="text-[#d4af37]" />
                ))}
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
              {hotel.name}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm text-gray-300 font-light">
              <MaterialIcon name="location_on" size={16} className="text-[#d4af37]" />
              {hotel.location?.address || `${hotel.location?.area || ""}, ${hotel.location?.city || "India"}`}
            </p>
          </div>

          {/* Ratings & CTA */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-sm font-bold text-white uppercase">Excellent</span>
                <span className="bg-[#d4af37] text-[#0a192f] font-black text-sm px-2 py-0.5">
                  {hotel.rating?.average ? hotel.rating.average.toFixed(1) : "4.8"}
                </span>
              </div>
              <span className="text-[11px] text-gray-400">
                Based on {hotel.rating?.totalReviews || 64} verified stays
              </span>
            </div>

            {onOpenEnquiry && (
              <Button
                onClick={onOpenEnquiry}
                variant="primary"
                size="md"
                className="uppercase tracking-widest text-xs font-bold px-5"
              >
                Send Enquiry
              </Button>
            )}
          </div>
        </div>

        {/* Luxury MakeMyTrip Style Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[380px] sm:h-[460px]">
          {/* Main Large Cover Photo */}
          <div className="relative md:col-span-2 h-full bg-gray-900 border border-[#d4af37]/30 overflow-hidden group">
            <Image
              src={primaryImage}
              alt={hotel.name}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-3 left-3 bg-[#0a192f]/90 border border-[#d4af37]/40 px-3 py-1 text-xs text-[#d4af37] font-bold uppercase tracking-widest">
              Featured Property
            </div>
          </div>

          {/* 4 Secondary Smaller Photos Grid */}
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-3 h-full">
            {secondaryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative h-full bg-gray-900 border border-gray-800 overflow-hidden group"
              >
                <Image
                  src={img.url}
                  alt={img.alt || `${hotel.name} view ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {idx === 3 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
                    <span className="text-white text-sm font-bold uppercase tracking-wider border border-white/40 px-3 py-1.5 bg-[#0a192f]/80">
                      View All Photos ({images.length})
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
