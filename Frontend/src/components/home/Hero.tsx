"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MaterialIcon from "@/components/ui/MaterialIcon";
import type { HomepageFeedResponse, Collection } from "@/types/homepage-feed";
import type { Package } from "@/types/package";
import { getHomepageFeed } from "@/lib/api/homepage-feed";
import { getPackages } from "@/lib/api/packages.api";

export interface HeroSlide {
  id: string;
  tabName: string;
  tagline: string;
  title: string;
  description: string;
  duration: string;
  bestSeason: string;
  location: string;
  packageSlug: string;
  exploreLink: string;
  packageType: string;
  image: string;
}

// Helper: Extract seasonal packages and collections from backend
const extractSeasonalSlides = (
  feedData?: HomepageFeedResponse | null,
  packagesList?: Package[] | null
): { slides: HeroSlide[]; season: string } => {
  const currentSeason = feedData?.currentSeason || feedData?.data?.seasonalSection?.season || "monsoon";
  const seasonalCollections = feedData?.data?.seasonalSection?.collections || [];
  const weekendCollections = feedData?.data?.weekendSection?.collections || [];
  const directWeekendPackages = feedData?.data?.weekendSection?.directPackages || [];

  const slides: HeroSlide[] = [];

  // 1. Map packages inside seasonal collections
  const primaryCols: Collection[] = [...seasonalCollections, ...weekendCollections];

  primaryCols.forEach((col, colIdx) => {
    if (col.featuredPackages && col.featuredPackages.length > 0) {
      col.featuredPackages.forEach((pkg: any, pkgIdx: number) => {
        const dest =
          (typeof pkg.destination === "object" ? pkg.destination?.name : pkg.destination) ||
          pkg.region ||
          col.title ||
          "Voyage";

        const img =
          pkg.image ||
          pkg.gallery?.[0] ||
          pkg.thumbnail ||
          col.bannerImage?.desktop ||
          col.bannerImage?.mobile;

        if (img) {
          slides.push({
            id: pkg._id || `pkg-${colIdx}-${pkgIdx}`,
            tabName: (dest || pkg.title.split(" ")[0]).toUpperCase().slice(0, 16),
            tagline: col.badgeText
              ? col.badgeText.toUpperCase()
              : `${currentSeason.toUpperCase()} SPECIAL 2026`,
            title: (pkg.title || col.title).toUpperCase(),
            description:
              col.subtitle ||
              "EXPERIENCE HANDCRAFTED ITINERARIES, 5-STAR AMENITIES & UNFORGETTABLE LUXURY VOYAGES.",
            duration: pkg.duration || "5 Days / 4 Nights",
            bestSeason: `${currentSeason.toUpperCase()} Season`,
            location: dest,
            packageSlug: pkg.slug || col.slug || "packages",
            exploreLink: `/packages?season=${encodeURIComponent(currentSeason)}`,
            packageType: col.collectionType || "Seasonal Package",
            image: img,
          });
        }
      });
    } else {
      const dest =
        (typeof col.featuredDestinations?.[0] === "object"
          ? (col.featuredDestinations[0] as { name?: string }).name
          : "") || col.title;

      const img =
        col.bannerImage?.desktop ||
        col.bannerImage?.mobile ||
        (typeof col.featuredDestinations?.[0] === "object"
          ? (col.featuredDestinations[0] as any)?.image
          : null);

      if (img) {
        slides.push({
          id: col._id || `col-${colIdx}`,
          tabName: (dest || col.title.split(" ")[0]).toUpperCase().slice(0, 16),
          tagline: col.badgeText
            ? col.badgeText.toUpperCase()
            : `${currentSeason.toUpperCase()} ESCAPE 2026`,
          title: col.title.toUpperCase(),
          description:
            col.subtitle ||
            "DISCOVER HANDCRAFTED SEASONAL PACKAGES WITH CURATED LUXURY EXPERIENCES.",
          duration: "5 Days / 4 Nights",
          bestSeason: `${currentSeason.toUpperCase()} Season`,
          location: dest || "Voyage",
          packageSlug: col.slug || "packages",
          exploreLink: `/packages?season=${encodeURIComponent(currentSeason)}`,
          packageType: col.collectionType || "Seasonal Package",
          image: img,
        });
      }
    }
  });

  // 2. Map direct weekend packages
  if (directWeekendPackages.length > 0) {
    directWeekendPackages.forEach((pkg: any, idx: number) => {
      const dest =
        (typeof pkg.destination === "object" ? pkg.destination?.name : pkg.destination) ||
        pkg.region ||
        "Voyage";

      const img = pkg.image || pkg.gallery?.[0] || pkg.thumbnail;

      if (img) {
        slides.push({
          id: pkg._id || `direct-${idx}`,
          tabName: (dest || pkg.title.split(" ")[0]).toUpperCase().slice(0, 16),
          tagline: `${currentSeason.toUpperCase()} GETAWAY 2026`,
          title: pkg.title.toUpperCase(),
          description: "SPECIAL HANDPICKED GETAWAY WITH DELUXE STAYS AND SIGHTSEEING.",
          duration: pkg.duration || "3 Days / 2 Nights",
          bestSeason: `${currentSeason.toUpperCase()} Season`,
          location: dest,
          packageSlug: pkg.slug || "packages",
          exploreLink: `/packages?season=${encodeURIComponent(currentSeason)}`,
          packageType: "Getaway",
          image: img,
        });
      }
    });
  }

  // 3. Map real packages fetched from backend packages API with actual images
  if (packagesList && packagesList.length > 0) {
    packagesList.forEach((p: Package, idx: number) => {
      const dest =
        (typeof p.destination === "object" ? (p.destination as any)?.name : p.destination) ||
        p.region ||
        "Voyage";

      const img =
        p.image ||
        p.gallery?.[0] ||
        (typeof p.destination === "object" ? (p.destination as any)?.image : null);

      if (img) {
        slides.push({
          id: p._id || `pkg-api-${idx}`,
          tabName: (dest || p.title.split(" ")[0]).toUpperCase().slice(0, 16),
          tagline: `${currentSeason.toUpperCase()} VOYAGE 2026`,
          title: p.title.toUpperCase(),
          description: `DISCOVER ${dest.toUpperCase()} WITH CURATED ACCOMMODATION & GUIDED ITINERARIES.`,
          duration: p.duration || `${p.days || 5} Days / ${p.nights || 4} Nights`,
          bestSeason: `${currentSeason.toUpperCase()} Season`,
          location: dest,
          packageSlug: p.slug || "packages",
          exploreLink: `/packages?season=${encodeURIComponent(currentSeason)}`,
          packageType: String(p.packageType || "Seasonal Package"),
          image: img,
        });
      }
    });
  }

  // Remove duplicates by ID or title and ensure valid image exists
  const validSlides = slides.filter(
    (s) => s.image && typeof s.image === "string" && s.image.trim() !== ""
  );
  const uniqueSlides = Array.from(new Map(validSlides.map((s) => [s.title, s])).values());

  return { slides: uniqueSlides, season: currentSeason };
};

interface HeroProps {
  initialFeed?: HomepageFeedResponse | null;
  initialPackages?: Package[] | null;
}

export const Hero: React.FC<HeroProps> = ({ initialFeed, initialPackages }) => {
  const router = useRouter();
  const initialParsed = extractSeasonalSlides(initialFeed, initialPackages);
  const [slides, setSlides] = useState<HeroSlide[]>(initialParsed.slides);
  const [activeSeason, setActiveSeason] = useState<string>(initialParsed.season);
  const [isLoading, setIsLoading] = useState<boolean>(initialParsed.slides.length === 0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [enableTransition, setEnableTransition] = useState(true);

  // Synchronize live backend seasonal feed and packages on mount
  useEffect(() => {
    let isMounted = true;

    async function fetchAllData() {
      try {
        const [feed, pkgRes] = await Promise.all([
          getHomepageFeed().catch(() => null),
          getPackages({ limit: 12 }).catch(() => null),
        ]);

        if (!isMounted) return;

        const pkgs = Array.isArray(pkgRes?.data) ? pkgRes.data : [];
        const parsed = extractSeasonalSlides(feed, pkgs);

        if (parsed.slides.length > 0) {
          setSlides(parsed.slides);
          setActiveSeason(parsed.season);
        }
      } catch (err) {
        console.error("Backend seasonal feed fetch error:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchAllData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Build extended array with clones on both ends for seamless infinite forward looping
  const hasMultipleSlides = slides.length > 1;
  const extendedSlides: HeroSlide[] = hasMultipleSlides
    ? [slides[slides.length - 1], ...slides, slides[0]]
    : slides;

  // Re-enable transition smoothly after instant jump
  useEffect(() => {
    if (!enableTransition) {
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
        });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [enableTransition]);

  // Seamless forward auto-scroll every 2.5 seconds
  useEffect(() => {
    if (!hasMultipleSlides || !enableTransition) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(timer);
  }, [hasMultipleSlides, enableTransition, currentIndex]);

  const handleTransitionEnd = () => {
    if (!hasMultipleSlides) return;

    if (currentIndex >= extendedSlides.length - 1) {
      // Reached cloned first slide at the end -> silently jump to real first slide
      setEnableTransition(false);
      setCurrentIndex(1);
    } else if (currentIndex <= 0) {
      // Reached cloned last slide at the beginning -> silently jump to real last slide
      setEnableTransition(false);
      setCurrentIndex(slides.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMultipleSlides || !enableTransition) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMultipleSlides || !enableTransition) return;
    setCurrentIndex((prev) => prev + 1);
  };

  // Click on background transfers to current season's packages
  const handleBackgroundClick = () => {
    router.push(`/packages?season=${encodeURIComponent(activeSeason)}`);
  };

  if (isLoading && slides.length === 0) {
    return (
      <section className="relative w-full min-h-[720px] bg-[#060b13] flex items-center justify-center pt-24 pb-12">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-2 border-[#d4af37] border-t-transparent animate-spin" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
            Loading {activeSeason.toUpperCase()} Packages...
          </span>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative w-full min-h-[500px] bg-[#060b13] text-white flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <MaterialIcon name="auto_awesome" className="text-[#d4af37] mx-auto mb-3" size={32} />
          <h2 className="text-xl font-bold uppercase mb-2">No {activeSeason.toUpperCase()} Packages Found</h2>
          <p className="text-xs text-gray-400 mb-4">
            Upload or tag packages with `{activeSeason}` in Admin Panel to auto-display them here.
          </p>
          <Link
            href="/packages"
            className="inline-block bg-[#d4af37] text-black font-bold uppercase text-xs px-5 py-2.5"
          >
            Explore All Packages
          </Link>
        </div>
      </section>
    );
  }

  // Calculate real active index for text, tags and counter
  const realIndex = hasMultipleSlides
    ? (currentIndex - 1 + slides.length) % slides.length
    : 0;
  const active = slides[realIndex] || slides[0];

  const totalExtended = extendedSlides.length;
  const slideOffsetPercent = hasMultipleSlides
    ? (currentIndex * 100) / totalExtended
    : 0;

  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden bg-[#060b13] text-white pt-20 sm:pt-24 pb-14 sm:pb-16 lg:pb-20 cursor-pointer select-none"
      onClick={handleBackgroundClick}
    >
      {/* Seamless Infinite Sliding Track */}
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`absolute inset-0 flex h-full z-0 ${
          enableTransition ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{
          width: `${totalExtended * 100}%`,
          transform: `translateX(-${slideOffsetPercent}%)`,
        }}
      >
        {extendedSlides.map((slide, idx) => (
          <div
            key={`${slide.id}-ext-${idx}`}
            className="relative h-full shrink-0"
            style={{ width: `${100 / totalExtended}%` }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx <= 1}
              sizes="100vw"
              className="object-cover object-center filter brightness-100 contrast-105"
            />
          </div>
        ))}
      </div>

      {/* Main Hero Content & Navigation Controls */}
      <div
        className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-3 sm:pb-4 flex flex-col md:flex-row md:items-end justify-between gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-2xl">
          {/* Subtitle / Seasonal Tagline */}
          <div className="mb-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
              {active.tagline}
            </span>
          </div>

          {/* Package / Destination Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white mb-3 sm:mb-4 leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            {active.title}
          </h1>

          {/* Description with Signature Gold Accent Line */}
          <div className="relative pl-3.5 sm:pl-4 border-l-2 border-[#d4af37] mb-4 sm:mb-5 py-1 pr-2">
            <p className="text-[11px] sm:text-xs md:text-[13px] font-medium text-white uppercase tracking-wide leading-relaxed max-w-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
              &ldquo;{active.description}&rdquo;
            </p>
          </div>

          {/* Metric Badges (Duration & Season) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
            {/* Duration */}
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1.5 shadow-md">
              <MaterialIcon name="schedule" className="text-[#d4af37]" size={16} />
              <div>
                <span className="block text-[8px] uppercase font-bold text-gray-300 leading-none">
                  Duration
                </span>
                <span className="text-[11px] font-bold text-white leading-tight">
                  {active.duration}
                </span>
              </div>
            </div>

            {/* Current Season */}
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1.5 shadow-md">
              <MaterialIcon name="explore" className="text-[#d4af37]" size={16} />
              <div>
                <span className="block text-[8px] uppercase font-bold text-gray-300 leading-none">
                  Best Season
                </span>
                <span className="text-[11px] font-bold text-white leading-tight">
                  {active.bestSeason}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Primary Button -> All Current Season Packages (Monsoon/Winter) */}
            <Link
              href={`/packages?season=${encodeURIComponent(activeSeason)}`}
              className="inline-flex items-center gap-1.5 bg-[#d4af37] text-black font-bold uppercase text-[11px] tracking-wider px-4 sm:px-5 py-2.5 transition hover:bg-[#c49f27] shadow-lg"
            >
              <MaterialIcon name="travel_explore" className="text-black" size={16} />
              <span>Explore {activeSeason.toUpperCase()} Packages</span>
            </Link>

            {/* Secondary Button -> Specific Active Tour / Itinerary */}
            <Link
              href={
                active.packageSlug.startsWith("packages")
                  ? `/${active.packageSlug}`
                  : `/packages/${active.packageSlug}`
              }
              className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-[#d4af37]/40 text-white font-bold uppercase text-[11px] tracking-wider px-4 sm:px-5 py-2.5 transition hover:bg-[#d4af37] hover:text-black shadow-lg group"
            >
              <MaterialIcon name="location_on" className="text-[#d4af37] group-hover:text-black" size={16} />
              <span>
                {active.location &&
                  !["india", "voyage", ""].includes(active.location.trim().toLowerCase())
                  ? `View ${active.location} Tour`
                  : "View Tour Itinerary"}
              </span>
              <MaterialIcon name="arrow_forward" className="text-white group-hover:text-black group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </div>
        </div>

        {/* Carousel Prev & Next Arrow Controls */}
        <div className="flex items-center gap-2.5 shrink-0 self-end">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous destination"
            className="h-10 w-10 sm:h-11 sm:w-11 bg-black/75 hover:bg-[#d4af37] hover:text-black text-white border border-white/30 flex items-center justify-center transition-all shadow-2xl backdrop-blur-md cursor-pointer"
          >
            <MaterialIcon name="chevron_left" size={24} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next destination"
            className="h-10 w-10 sm:h-11 sm:w-11 bg-black/75 hover:bg-[#d4af37] hover:text-black text-white border border-white/30 flex items-center justify-center transition-all shadow-2xl backdrop-blur-md cursor-pointer"
          >
            <MaterialIcon name="chevron_right" size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;