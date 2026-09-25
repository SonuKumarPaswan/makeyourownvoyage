"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedPackages, getPackages } from "@/lib/api/packages.api";
import type { Package } from "@/types/package";

interface FeaturedPackagesProps {
  initialPackages?: Package[] | null;
}

export const FeaturedPackages: React.FC<FeaturedPackagesProps> = ({
  initialPackages,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [packages, setPackages] = useState<Package[]>(() => {
    return Array.isArray(initialPackages) && initialPackages.length > 0
      ? initialPackages
      : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (packages.length > 0) return;

    let isMounted = true;
    setLoading(true);

    getFeaturedPackages(10)
      .then((res) => {
        if (!isMounted) return;
        if (res?.data && res.data.length > 0) {
          setPackages(res.data);
        } else {
          return getPackages({ limit: 10 }).then((fallbackRes) => {
            if (isMounted && fallbackRes?.data) {
              setPackages(fallbackRes.data);
            }
          });
        }
      })
      .catch(() => { })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [packages.length]);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = 320;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!loading && packages.length === 0) {
    return null;
  }

  return (
    <section className="bg-background py-14 sm:py-20 overflow-hidden border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left Column: Heading & Call to Action */}
          <div className="shrink-0 lg:w-[280px] xl:w-[320px] mb-8 lg:mb-0 flex flex-col justify-between">
            <div>
              {/* Category / Badge with Sparkle */}
              <div className="flex items-center gap-2 text-xs font-normal text-muted">
                <span className="text-primary text-sm leading-none">✦</span>
                <span>Featured Packages</span>
              </div>

              {/* Editorial Main Heading */}
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-normal leading-[1.15] text-heading font-serif tracking-tight">
                Popular packages <br />
                <span className="text-[#d4af37]">at lowest prices</span>
              </h2>

              <p className="mt-3 text-sm text-muted leading-relaxed hidden sm:block font-normal">
                Handcrafted luxury itineraries featuring premium verified stays, private cab transfers, and guided sightseeing.
              </p>
            </div>

            {/* View All Packages Link */}
            <div className="mt-6 lg:mt-10 flex items-center justify-between sm:justify-start gap-4">
              <Link
                href="/packages"
                className="group inline-flex items-center gap-2 text-sm font-medium text-heading underline decoration-border underline-offset-8 transition-colors hover:text-primary hover:decoration-primary"
              >
                <span>View All Packages</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1 font-sans">
                  →
                </span>
              </Link>

              {/* Slider Prev / Next Controls for Mobile */}
              <div className="flex items-center gap-1.5 lg:hidden">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  aria-label="Previous package"
                  className="dest-circle-btn flex h-9 w-9 items-center justify-center border border-border bg-card text-heading shadow-xs transition hover:border-primary hover:text-primary active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  aria-label="Next package"
                  className="dest-circle-btn flex h-9 w-9 items-center justify-center border border-border bg-card text-heading shadow-xs transition hover:border-primary hover:text-primary active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Desktop Navigation buttons under the link */}
            <div className="mt-8 hidden lg:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous packages"
                className="dest-circle-btn flex h-10 w-10 items-center justify-center border border-border bg-card text-heading shadow-xs transition duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next packages"
                className="dest-circle-btn flex h-10 w-10 items-center justify-center border border-border bg-card text-heading shadow-xs transition duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Rounded Packages Cards Carousel */}
          <div className="relative min-w-0 flex-1">
            <div
              ref={sliderRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {packages.map((pkg) => {
                const destName =
                  typeof pkg.destination === "object" && pkg.destination
                    ? (pkg.destination as any).name
                    : pkg.region || "Curated Tour";

                return (
                  <Link
                    key={pkg._id || pkg.slug}
                    href={`/packages/${pkg.slug}`}
                    className="group relative shrink-0 w-[220px] sm:w-[250px] md:w-[270px] h-[310px] sm:h-[350px] md:h-[370px] cursor-pointer select-none"
                  >
                    {/* Card Outer Container with Rounded Corners */}
                    <div className="dest-card-rounded relative h-full w-full overflow-hidden bg-neutral-900 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                      {/* Package Image from Cloudinary / Database */}
                      {pkg.image ? (
                        <Image
                          src={pkg.image}
                          alt={pkg.title}
                          fill
                          sizes="(max-width: 640px) 220px, (max-width: 768px) 250px, 270px"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[#0a192f] via-[#162e51] to-[#0a192f] flex flex-col items-center justify-center p-6 text-center">
                          <span className="text-4xl text-[#d4af37]/40 mb-2 font-bold">✦</span>
                          <span className="text-white/90 text-sm font-medium tracking-normal">{destName}</span>
                        </div>
                      )}

                      {/* Top Duration / Package Type Pill Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="dest-circle-btn inline-block bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-normal px-3 py-1 tracking-normal">
                          {pkg.duration || `${pkg.days || 3}D / ${pkg.nights || 2}N`}
                        </span>
                      </div>

                      {/* Gradient Overlay for Crisp Text Contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                      {/* Card Bottom Bar: Title & Price on Left + Circular Arrow Button on Right */}
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
                        <div className="min-w-0 pr-2">
                          <span className="block text-base sm:text-lg font-medium text-white tracking-wide truncate drop-shadow-xs">
                            {pkg.title}
                          </span>
                          <div className="mt-0.5 flex items-baseline gap-1.5">
                            <span className="text-xs sm:text-sm font-bold text-[#d4af37]">
                              ₹{pkg.startingPrice ? pkg.startingPrice.toLocaleString("en-IN") : "Custom"}
                            </span>
                            <span className="text-[10px] text-white/70 tracking-normal">
                              / person
                            </span>
                          </div>
                        </div>

                        {/* Circular Arrow Button */}
                        <div className="dest-circle-btn flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center bg-white/90 text-heading backdrop-blur-xs shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:shadow-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 text-[#2b2521]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 12h14m-6-6 6 6-6 6"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;