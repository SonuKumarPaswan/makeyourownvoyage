"use client";

import React, { useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";
import type { StateBlogData } from "@/lib/data/blogs/types";

interface BlogDetailClientProps {
  blog: StateBlogData;
}

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
  // Default to the first destination in this state
  const [selectedDestId, setSelectedDestId] = useState<number>(
    blog.destinations[0]?.id || 1
  );

  const activeDestination =
    blog.destinations.find((d) => d.id === selectedDestId) ||
    blog.destinations[0];

  const activeIndex = blog.destinations.findIndex(
    (d) => d.id === activeDestination.id
  );

  const prevDestination =
    activeIndex > 0 ? blog.destinations[activeIndex - 1] : null;
  const nextDestination =
    activeIndex < blog.destinations.length - 1
      ? blog.destinations[activeIndex + 1]
      : null;

  const handleSelectTab = (id: number) => {
    setSelectedDestId(id);
    const el = document.getElementById("destination-content-anchor");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Safe fallback values
  const distanceFromDelhi =
    activeDestination.distanceFromDelhi ||
    "Well Connected from Delhi NCR (Expressway & Rail Routes)";
  const packageTitle =
    activeDestination.packageTitle ||
    `Ex-Delhi ${activeDestination.name} Signature Holiday Package`;
  const startingPrice = activeDestination.startingPrice || "₹8,499 / person";
  const packageInclusions = activeDestination.packageInclusions || [
    "Door-to-door private cab transfer from Delhi NCR by Sedan / Innova",
    "Luxury 4-Star resort stay with daily breakfast and chef-crafted dinner",
    "Complete guided sightseeing tours and iconic attraction entries",
    "All expressway tolls, state entry permits, and driver allowances",
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-heading pb-24 font-sans">
      {/* Hero Banner Header */}
      <header
        className={`relative bg-gradient-to-br ${blog.gradient} pt-16 pb-20 sm:pt-20 sm:pb-28 text-white`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs text-slate-300"
          >
            <Link href="/" className="hover:text-primary transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog/states" className="hover:text-primary transition">
              States & Destinations
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{blog.state}</span>
          </nav>

          {/* State Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <MaterialIcon name={blog.iconName} size={15} />
            <span>Ex-Delhi Verified Travel Guide</span>
          </div>

          {/* State Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white font-serif tracking-tight">
            {blog.title}
          </h1>

          {/* State Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-3xl">
            {blog.subtitle}
          </p>

          {/* Key Facts Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-8 border-t border-white/15 pt-6 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <MaterialIcon name="schedule" size={16} className="text-primary" />
              <span>
                Recommended Duration:{" "}
                <strong className="text-white font-semibold">
                  {blog.idealDuration}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MaterialIcon name="calendar_month" size={16} className="text-primary" />
              <span>
                Best Season:{" "}
                <strong className="text-white font-semibold">
                  {blog.bestTimeOverall}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MaterialIcon name="directions_car" size={16} className="text-primary" />
              <span>
                Ex-Delhi:{" "}
                <strong className="text-white font-semibold">
                  Doorstep Cab & Volvo Available
                </strong>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main
        id="destination-content-anchor"
        className="relative -mt-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8"
      >
        {/* 1. TOP DESTINATION SELECTOR BUTTONS */}
        <section
          aria-label="Destination Selector"
          className="rounded-2xl border border-primary/30 bg-[#0a192f] p-4 sm:p-5 shadow-xl text-white"
        >
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <span>✦</span> Select a Destination in {blog.state}
            </span>
            <span className="hidden sm:inline text-xs text-slate-400">
              Click any place to explore detailed ex-Delhi packages
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {blog.destinations.map((dest, idx) => {
              const isSelected = selectedDestId === dest.id;
              return (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => handleSelectTab(dest.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-primary text-heading shadow-md scale-105"
                      : "bg-white/10 text-white hover:bg-white/20 hover:text-primary"
                  }`}
                >
                  <span className="text-xs font-bold opacity-75">
                    {String(idx + 1).padStart(2, "0")}.
                  </span>
                  <span>{dest.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* EXACT DIAGRAM LAYOUT IMPLEMENTATION                                       */}
        {/* ========================================================================= */}

        {/* 1. HEADLINE */}
        <section className="bg-white rounded-2xl border border-border/80 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4 mb-4">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#0a192f] px-3 py-1 text-xs font-bold text-primary">
              <span>
                DESTINATION {String(activeIndex + 1).padStart(2, "0")} OF{" "}
                {String(blog.destinations.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <MaterialIcon name="place" size={16} className="text-primary" />
              <span>
                Distance from Delhi:{" "}
                <strong className="text-heading">{distanceFromDelhi}</strong>
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-heading font-serif tracking-tight">
            {activeDestination.name}: {activeDestination.tagline}
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-normal">
            Comprehensive travel logistics, curated sightseeing circuits, and
            direct ex-Delhi holiday packages.
          </p>
        </section>

        {/* 2. 2-COLUMN SECTION: [OPENING] + [HALF-WIDTH IMAGE / VISUAL CARD] */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT: OPENING (7 COLS) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-border/80 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-2">
                <MaterialIcon name="auto_awesome" size={16} />
                <span>Overview & Allure</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-normal text-heading font-serif mb-3">
                Why Visit {activeDestination.name}?
              </h3>
              <p className="text-sm leading-relaxed text-slate-700 font-normal mb-5">
                {activeDestination.whyVisit.highlight}
              </p>

              {/* Highlights List */}
              <div className="space-y-2.5 pt-3 border-t border-border/60">
                <span className="text-xs font-bold text-heading uppercase tracking-wider block">
                  Key Destination Highlights:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-normal">
                  {activeDestination.whyVisit.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <MaterialIcon
                        name="check_circle"
                        size={16}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Trip Indicators */}
            <div className="mt-6 pt-4 border-t border-border/60 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-[#faf8f5] p-3 border border-border/60">
                <span className="text-muted block text-[11px]">
                  Recommended Stay
                </span>
                <strong className="text-heading font-semibold">
                  {activeDestination.duration}
                </strong>
              </div>
              <div className="rounded-lg bg-[#faf8f5] p-3 border border-border/60">
                <span className="text-muted block text-[11px]">
                  Best Suited For
                </span>
                <strong className="text-heading font-semibold">
                  {activeDestination.idealFor}
                </strong>
              </div>
            </div>
          </div>

          {/* RIGHT: HALF-WIDTH IMAGE / VISUAL CARD (5 COLS) */}
          <div
            className={`lg:col-span-5 rounded-2xl overflow-hidden shadow-sm border border-border/80 bg-gradient-to-br ${activeDestination.gradient} text-white p-6 sm:p-8 flex flex-col justify-between relative`}
          >
            {/* Ambient Background Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-bold text-primary backdrop-blur-xs">
                  ★ 4.9/5 RATED EX-DELHI CIRCUIT
                </span>
                <div className="dest-circle-btn flex h-10 w-10 shrink-0 items-center justify-center bg-white/10 border border-white/20 text-primary">
                  <MaterialIcon name={activeDestination.iconName} size={22} />
                </div>
              </div>

              <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold block">
                Featured Holiday Package
              </span>
              <h4 className="text-2xl font-bold font-serif text-white mt-1 leading-snug">
                {packageTitle}
              </h4>
              <p className="text-xs text-slate-200 mt-2 line-clamp-3">
                Experience {activeDestination.name} with door-to-door private cab
                transfers from Delhi NCR, verified boutique stays, daily
                breakfast & dinner, and comprehensive sightseeing.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-5 border-t border-white/20">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-[11px] text-slate-300 uppercase block">
                    Starting Price
                  </span>
                  <span className="text-2xl font-bold text-primary font-serif">
                    {startingPrice}
                  </span>
                </div>
                <span className="text-[11px] text-slate-300 text-right">
                  All Tolls & Taxes
                  <br />
                  Included
                </span>
              </div>

              <Link
                href={`/packages?search=${encodeURIComponent(
                  activeDestination.name
                )}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-gold px-5 py-3 text-xs sm:text-sm font-semibold text-heading shadow-md transition hover:brightness-105 active:scale-95"
              >
                <span>View Package Details</span>
                <MaterialIcon name="arrow_forward" size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. SUB-HEAD 1 */}
        <div className="pt-4">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
            <span>✦ Section 01</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-normal text-heading font-serif mt-1">
            Prime Attractions, Climate & Curated Ex-Delhi Itinerary
          </h3>
        </div>

        {/* 4. CONTENT 1 (Full-Width Content Block) */}
        <section className="bg-white rounded-2xl border border-border/80 p-6 sm:p-8 shadow-sm space-y-8">
          {/* Top Attractions Grid */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-heading font-serif mb-4">
              <MaterialIcon name="place" size={20} className="text-primary" />
              <span>
                Must-Visit Sightseeing Attractions in {activeDestination.name}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeDestination.topAttractions.map((spot, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-[#faf8f5] p-5 border border-border/70 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-bold text-heading text-sm sm:text-base block mb-1">
                      {spot.name}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {spot.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-border/50 text-xs font-semibold text-primary">
                    ★ Highlight: {spot.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Day-by-Day Itinerary */}
          <div className="pt-6 border-t border-border/60">
            <div className="flex items-center gap-2 text-sm font-bold text-heading font-serif mb-4">
              <MaterialIcon name="route" size={20} className="text-primary" />
              <span>Ex-Delhi Day-by-Day Travel Itinerary</span>
            </div>
            <div className="space-y-3">
              {activeDestination.itineraryPlan.map((plan, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-[#faf8f5] p-4 sm:p-5 border border-border/70 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start"
                >
                  <span className="rounded-lg bg-[#0a192f] text-primary px-3 py-1.5 text-xs font-bold shrink-0">
                    {plan.day}
                  </span>
                  <div>
                    <h5 className="font-bold text-heading text-xs sm:text-sm">
                      {plan.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed font-normal">
                      {plan.activities}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Time Season Breakdown */}
          <div className="pt-6 border-t border-border/60">
            <div className="flex items-center gap-2 text-sm font-bold text-heading font-serif mb-3">
              <MaterialIcon
                name="calendar_month"
                size={20}
                className="text-primary"
              />
              <span>Best Time to Visit & Seasonal Weather Breakdown</span>
            </div>
            <div className="rounded-lg bg-[#faf8f5] p-3.5 border border-border/70 mb-4 text-xs sm:text-sm font-normal">
              <strong>Seasonal Overview: </strong>{" "}
              {activeDestination.bestTime.summary}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="rounded-xl bg-[#faf8f5] p-4 border border-border/70">
                <span className="font-bold text-heading block mb-1">
                  ☀️ Summer Season
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {activeDestination.bestTime.summer}
                </p>
              </div>
              <div className="rounded-xl bg-[#faf8f5] p-4 border border-border/70">
                <span className="font-bold text-heading block mb-1">
                  ❄️ Winter Snow Season
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {activeDestination.bestTime.winter}
                </p>
              </div>
              <div className="rounded-xl bg-[#faf8f5] p-4 border border-border/70">
                <span className="font-bold text-heading block mb-1">
                  🌧️ Monsoon & Autumn
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {activeDestination.bestTime.monsoon}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CTA 1 (Primary Call to Action Banner) */}
        <section className="rounded-2xl border border-primary/40 bg-gradient-to-r from-[#0a192f] via-[#112240] to-[#0a192f] p-6 sm:p-8 text-white shadow-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 px-3 py-1 text-[11px] font-bold text-primary uppercase tracking-wider">
                Ex-Delhi Fully Managed Tour
              </span>
              <h4 className="text-2xl sm:text-3xl font-normal font-serif text-white">
                Book Your Delhi to {activeDestination.name} Holiday Package
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Enjoy hassle-free door-to-door private cab transfers from Delhi
                NCR, verified resort stays, daily meals, and 24/7 dedicated trip
                coordination.
              </p>

              {/* Inclusions pill row */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {packageInclusions.slice(0, 3).map((inc, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1 text-[11px] text-slate-200"
                  >
                    <MaterialIcon
                      name="check"
                      size={13}
                      className="text-primary"
                    />
                    <span>{inc}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 w-full sm:w-auto">
              <div className="text-left lg:text-right">
                <span className="text-xs text-slate-400 block">
                  Package starts at
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-primary font-serif">
                  {startingPrice}
                </span>
              </div>
              <Link
                href={`/packages?search=${encodeURIComponent(
                  activeDestination.name
                )}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-gold px-6 py-3.5 text-xs sm:text-sm font-semibold text-heading shadow-md transition hover:brightness-105 active:scale-95"
              >
                <span>Book This Package Now</span>
                <MaterialIcon name="arrow_forward" size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. SUB-HEAD 2 */}
        <div className="pt-4">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
            <span>✦ Section 02</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-normal text-heading font-serif mt-1">
            Ex-Delhi Travel Logistics, Gastronomy & Accommodation
          </h3>
        </div>

        {/* 7. CONTENT 2 (Full-Width Content Block) */}
        <section className="bg-white rounded-2xl border border-border/80 p-6 sm:p-8 shadow-sm space-y-8">
          {/* Ex-Delhi Transit Logistics */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-heading font-serif mb-4">
              <MaterialIcon
                name="directions"
                size={20}
                className="text-primary"
              />
              <span>
                How to Reach {activeDestination.name} from Delhi NCR
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Private Cab / Road */}
              <div className="rounded-xl bg-[#faf8f5] p-5 border border-border/70">
                <div className="flex items-center gap-2 font-bold text-heading text-sm mb-2">
                  <MaterialIcon
                    name="directions_car"
                    size={18}
                    className="text-primary"
                  />
                  <span>1. By Doorstep Private Cab (Ex-Delhi)</span>
                </div>
                <p className="text-xs font-semibold text-primary mb-1">
                  ⏱ Route & Travel Time:{" "}
                  {activeDestination.exDelhiLogistics?.byPrivateCab?.travelTime ||
                    (activeDestination as any).howToReach?.byRoad?.travelTime ||
                    "7 to 8 hours"}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {activeDestination.exDelhiLogistics?.byPrivateCab?.route ||
                    (activeDestination as any).howToReach?.byRoad?.route ||
                    "Expressway routes from Delhi NCR"}
                </p>
                <p className="text-xs text-muted mt-2 pt-2 border-t border-border/50">
                  {activeDestination.exDelhiLogistics?.byPrivateCab?.details ||
                    (activeDestination as any).howToReach?.byRoad?.details ||
                    "Chauffeur-driven sedans & Innovas available."}
                </p>
              </div>

              {/* Luxury Volvo Bus */}
              <div className="rounded-xl bg-[#faf8f5] p-5 border border-border/70">
                <div className="flex items-center gap-2 font-bold text-heading text-sm mb-2">
                  <MaterialIcon
                    name="directions_bus"
                    size={18}
                    className="text-primary"
                  />
                  <span>2. By Luxury Overnight Volvo Coach</span>
                </div>
                <p className="text-xs font-semibold text-primary mb-1">
                  ⏱ Boarding:{" "}
                  {activeDestination.exDelhiLogistics?.byLuxuryVolvo
                    ?.boardingPoints || "ISBT Kashmere Gate & Majnu Ka Tilla"}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {activeDestination.exDelhiLogistics?.byLuxuryVolvo
                    ?.travelTime || "8.5 to 11 hours overnight journey"}
                </p>
                <p className="text-xs text-muted mt-2 pt-2 border-t border-border/50">
                  {activeDestination.exDelhiLogistics?.byLuxuryVolvo?.details ||
                    "Daily overnight departures with reclining sleeper seats."}
                </p>
              </div>

              {/* By Train */}
              <div className="rounded-xl bg-[#faf8f5] p-5 border border-border/70">
                <div className="flex items-center gap-2 font-bold text-heading text-sm mb-2">
                  <MaterialIcon
                    name="train"
                    size={18}
                    className="text-primary"
                  />
                  <span>3. By Express Train (from New Delhi)</span>
                </div>
                <p className="text-xs font-semibold text-primary mb-1">
                  🚆{" "}
                  {activeDestination.exDelhiLogistics?.byTrain?.trainName ||
                    (activeDestination as any).howToReach?.byTrain?.station ||
                    "Vande Bharat / Shatabdi Express"}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {activeDestination.exDelhiLogistics?.byTrain?.route ||
                    (activeDestination as any).howToReach?.byTrain?.distance ||
                    "New Delhi to destination railheads"}
                </p>
                <p className="text-xs text-muted mt-2 pt-2 border-t border-border/50">
                  {activeDestination.exDelhiLogistics?.byTrain?.details ||
                    (activeDestination as any).howToReach?.byTrain?.details ||
                    "Direct trains available with connecting cab transfers."}
                </p>
              </div>

              {/* By Flight */}
              <div className="rounded-xl bg-[#faf8f5] p-5 border border-border/70">
                <div className="flex items-center gap-2 font-bold text-heading text-sm mb-2">
                  <MaterialIcon
                    name="flight"
                    size={18}
                    className="text-primary"
                  />
                  <span>4. By Flight (from IGI Airport T3/T2)</span>
                </div>
                <p className="text-xs font-semibold text-primary mb-1">
                  ✈️{" "}
                  {activeDestination.exDelhiLogistics?.byFlight?.airport ||
                    (activeDestination as any).howToReach?.byAir?.airport ||
                    "Nearest Domestic Airport"}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {activeDestination.exDelhiLogistics?.byFlight
                    ?.flightDuration ||
                    (activeDestination as any).howToReach?.byAir?.distance ||
                    "Direct non-stop flights from Delhi (DEL)"}
                </p>
                <p className="text-xs text-muted mt-2 pt-2 border-t border-border/50">
                  {activeDestination.exDelhiLogistics?.byFlight?.details ||
                    (activeDestination as any).howToReach?.byAir?.details ||
                    "Frequent flights connecting Delhi to Himachal airport hubs."}
                </p>
              </div>
            </div>
          </div>

          {/* Dining & Accommodation */}
          <div className="pt-6 border-t border-border/60 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dining */}
            <div className="rounded-xl bg-[#faf8f5] p-5 border border-border/70">
              <span className="font-bold text-heading text-sm block mb-2">
                🍽️ Local Culinary Specialties & Famous Cafes
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {activeDestination.localCuisine.mustTry.join(" • ")}
              </p>
              <p className="text-xs text-muted mt-3 pt-2.5 border-t border-border/50">
                <strong>Recommended Spots: </strong>{" "}
                {activeDestination.localCuisine.famousSpots}
              </p>
            </div>

            {/* Stays */}
            <div className="rounded-xl bg-[#faf8f5] p-5 border border-border/70">
              <span className="font-bold text-heading text-sm block mb-2">
                🏨 Recommended Stays & Locations
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {activeDestination.stayGuide.bestAreas}
              </p>
              <p className="text-xs text-muted mt-3 pt-2.5 border-t border-border/50">
                <strong>Estimated Tariff Range: </strong>{" "}
                {activeDestination.stayGuide.budgetRange}
              </p>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="pt-6 border-t border-border/60">
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5">
              <span className="font-bold text-amber-900 text-sm block mb-2">
                💡 Essential Travel Advice & Mountain Driving Precautions:
              </span>
              <ul className="space-y-2 text-xs text-amber-900/90 leading-relaxed">
                {activeDestination.proTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 8. CTA 2 (Secondary Call to Action / Footer Concierge Banner) */}
        <section className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-normal font-serif text-heading">
              Need a Customized Ex-Delhi Travel Itinerary?
            </h4>
            <p className="text-xs sm:text-sm text-muted">
              Connect with our bespoke travel concierges for corporate retreats,
              honeymoon specials, and family tours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-xs font-semibold text-heading shadow-xs transition hover:border-primary hover:text-primary"
            >
              <MaterialIcon name="support_agent" size={16} />
              <span>Contact Concierge</span>
            </Link>

            <Link
              href="/packages"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0a192f] px-6 py-3 text-xs font-semibold text-white shadow-xs transition hover:bg-primary hover:text-heading"
            >
              <span>Explore All Packages</span>
              <MaterialIcon name="arrow_forward" size={15} />
            </Link>
          </div>
        </section>

        {/* Previous / Next Destination Navigation Links */}
        <nav
          aria-label="Destination Pagination"
          className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/80"
        >
          <Link
            href="/blog/states"
            className="inline-flex items-center gap-2 text-xs font-bold text-heading transition hover:text-primary"
          >
            <MaterialIcon name="arrow_back" size={16} />
            <span>Back to All States & Regions</span>
          </Link>

          <div className="flex items-center gap-2">
            {prevDestination && (
              <button
                type="button"
                onClick={() => handleSelectTab(prevDestination.id)}
                className="inline-flex items-center gap-1 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-semibold text-heading shadow-xs transition hover:border-primary/50 hover:text-primary cursor-pointer"
              >
                <MaterialIcon name="arrow_back" size={14} />
                <span>Previous: {prevDestination.name}</span>
              </button>
            )}

            {nextDestination && (
              <button
                type="button"
                onClick={() => handleSelectTab(nextDestination.id)}
                className="inline-flex items-center gap-1 rounded-xl bg-[#0a192f] px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-primary hover:text-heading cursor-pointer"
              >
                <span>Next: {nextDestination.name}</span>
                <MaterialIcon name="arrow_forward" size={14} />
              </button>
            )}
          </div>
        </nav>
      </main>
    </div>
  );
}
