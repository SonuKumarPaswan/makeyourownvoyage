"use client";

import React from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface TravelStyleItem {
  id: string;
  title: string;
  icon: string;
  href: string;
}

const TRAVEL_STYLES: TravelStyleItem[] = [
  {
    id: "weekend-trips",
    title: "Weekend Trips",
    icon: "weekend",
    href: "/packages?type=weekend",
  },
  {
    id: "mountain-trips",
    title: "Mountain Trips",
    icon: "landscape",
    href: "/packages?type=mountain",
  },
  {
    id: "group-trips",
    title: "Group Trips",
    icon: "groups",
    href: "/packages?type=group",
  },
  {
    id: "honeymoon",
    title: "Honeymoon",
    icon: "favorite",
    href: "/packages?type=honeymoon",
  },
  {
    id: "sea-beach",
    title: "Sea Beach",
    icon: "beach_access",
    href: "/packages?type=beach",
  },
  {
    id: "trekking-tour",
    title: "Trekking Tour",
    icon: "hiking",
    href: "/packages?type=trekking",
  },
  {
    id: "single-tour",
    title: "Single Tour",
    icon: "person",
    href: "/packages?type=solo",
  },
];

export const TravelStyles: React.FC = () => {
  // Multiply items for continuous, gapless marquee looping
  const marqueeItems = [...TRAVEL_STYLES, ...TRAVEL_STYLES, ...TRAVEL_STYLES, ...TRAVEL_STYLES];

  return (
    <section className="py-8 sm:py-12 bg-transparent overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with decorative golden accents */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mb-7 sm:mb-9">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-[#d4af37] w-12 sm:w-28 md:w-36" />
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="text-[#d4af37] text-xs sm:text-sm select-none">✦</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-serif text-[#d4af37] tracking-tight text-center">
              Explore Travel Styles
            </h2>
            <span className="text-[#d4af37] text-xs sm:text-sm select-none">✦</span>
          </div>
          <div className="h-[1px] bg-gradient-to-l from-transparent via-[#d4af37]/40 to-[#d4af37] w-12 sm:w-28 md:w-36" />
        </div>
      </div>

      {/* Marquee Carousel Container (Right to Left, Pause on Hover, No Background) */}
      <div className="relative w-full overflow-hidden pause-on-hover [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="animate-marquee-rtl flex items-center gap-4 sm:gap-6 py-2">
          {marqueeItems.map((style, idx) => (
            <Link
              key={`${style.id}-${idx}`}
              href={style.href}
              className="tour-card-rounded relative shrink-0 w-[140px] sm:w-[170px] bg-card/60 border border-[#d4af37] px-4 py-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-sm cursor-pointer overflow-hidden"
            >
              {/* Permanent top gold indicator bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-12 bg-[#d4af37]" />

              {/* Icon Container with permanent gold color */}
              <div className="mb-2.5 flex h-11 w-11 items-center justify-center text-[#d4af37]">
                <MaterialIcon name={style.icon} size={30} weight={300} />
              </div>

              {/* Label with permanent gold color */}
              <span className="text-xs sm:text-sm font-normal font-serif text-[#d4af37] tracking-tight whitespace-nowrap">
                {style.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelStyles;
