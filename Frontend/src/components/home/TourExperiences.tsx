"use client";

import React from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { FlipText } from "@/components/ui/FlipText";

interface TourCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  href: string;
  gradient: string;
  badge: string;
  tagline: string;
}

const TOUR_CATEGORIES: TourCategory[] = [
  {
    id: "adventure",
    title: "Adventure Trips",
    tagline: "High-Altitude & Wild Safaris",
    description:
      "Thrilling trekking expeditions, mountain camping, desert jeep safaris, and wild river rafting across scenic landscapes.",
    iconName: "terrain",
    href: "/packages?type=adventure",
    gradient: "from-stone-900 via-amber-950 to-neutral-900",
    badge: "Thrill & Trekking",
  },
  {
    id: "spiritual",
    title: "Spiritual Trips",
    tagline: "Pilgrimages & Divine Heritage",
    description:
      "Sacred temple circuits, holy river ghats, peaceful ashram stays, and tranquil heritage retreats for inner rejuvenation.",
    iconName: "self_improvement",
    href: "/packages?type=spiritual",
    gradient: "from-amber-900 via-orange-950 to-slate-900",
    badge: "Divine & Heritage",
  },
  {
    id: "honeymoon",
    title: "Honeymoon Trips",
    tagline: "Romantic Hideaways & Stays",
    description:
      "Handcrafted couples getaways featuring secluded luxury pool villas, sunset beach dinners, and private scenic tours.",
    iconName: "favorite",
    href: "/packages?type=honeymoon",
    gradient: "from-rose-950 via-purple-950 to-slate-900",
    badge: "Romance & Luxury",
  },
  {
    id: "weekend",
    title: "Weekend Trips",
    tagline: "Short Breaks & Staycations",
    description:
      "Quick refreshing weekend getaways, scenic hill station drives, luxury resort staycations, and short break escapes.",
    iconName: "weekend",
    href: "/packages?type=weekend",
    gradient: "from-slate-900 via-teal-950 to-slate-900",
    badge: "Quick Getaways",
  },
];

export const TourExperiences: React.FC = () => {
  return (
    <section className="bg-background py-14 sm:py-20 border-t border-border/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-normal text-muted mb-2">
            <span className="text-primary text-sm leading-none">✦</span>
            <span>Tour Categories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-normal leading-[1.15] text-[#d4af37] font-serif tracking-tight">
            Choose your perfect tour experience
          </h2>

          <p className="mt-3 text-sm text-muted leading-relaxed font-normal max-w-xl mx-auto">
            Handcrafted luxury itineraries featuring premium verified stays, private cab transfers, and guided sightseeing.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {TOUR_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="tour-card-rounded group flex flex-col justify-between border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
            >
              <div>
                {/* Top Image / Graphic Scene Banner */}
                <div
                  className={`relative h-44 sm:h-48 w-full overflow-hidden bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}
                >
                  <div className="text-center p-4">
                    <span className="text-3xl text-[#d4af37]/40 block mb-1 font-serif">✦</span>
                    <span className="text-white/80 text-xs font-normal tracking-wide">{cat.tagline}</span>
                  </div>

                  {/* Gradient Lighting Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top Badge */}
                  <span className="absolute top-3 left-3 bg-[#0a192f]/90 border border-[#d4af37]/40 px-2.5 py-1 text-[10px] font-normal text-[#d4af37]">
                    {cat.badge}
                  </span>
                </div>

                {/* Overlapping Centered Circular Emblem Badge */}
                <div className="dest-circle-btn relative z-10 -mt-7 mx-auto flex h-14 w-14 items-center justify-center border-2 border-[#d4af37] bg-white text-[#0a192f] shadow-md transition-all duration-300 group-hover:bg-[#0a192f] group-hover:text-[#d4af37] group-hover:scale-105">
                  <MaterialIcon name={cat.iconName} size={24} />
                </div>

                {/* Content Section */}
                <div className="px-5 pt-3 pb-2 text-center">
                  <h3 className="text-lg sm:text-xl font-normal font-serif text-heading tracking-tight">
                    {cat.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-[13px] text-muted leading-relaxed font-normal line-clamp-3">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="px-5 pb-6 pt-3 text-center">
                <Link
                  href={cat.href}
                  className="group/btn inline-flex w-full items-center justify-center gap-1.5 bg-[#d4af37] px-4 py-2.5 text-xs font-medium text-black transition-all duration-300 hover:bg-[#c49f27] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] shadow-xs overflow-hidden"
                >
                  <FlipText text="Explore More" className="text-black" flippedClassName="text-black" />
                  <MaterialIcon name="arrow_forward" size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1 text-black" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourExperiences;
