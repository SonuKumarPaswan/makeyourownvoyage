"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getDestinations } from "@/lib/api/destinations.api";
import { getStates } from "@/lib/api/states.api";
import type { Destination } from "@/types/destination";
import type { State } from "@/types/state";

interface DestinationCardItem {
  id: string;
  name: string;
  subtitle?: string;
  image: string | null;
  href: string;
}

interface PopularDestinationsProps {
  initialDestinations?: Destination[] | null;
  initialStates?: State[] | null;
}

function resolveItemImage(item: any): string | null {
  if (!item) return null;
  if (typeof item.image === "string" && item.image.trim()) return item.image;
  if (item.image?.url && typeof item.image.url === "string") return item.image.url;
  if (Array.isArray(item.images) && item.images.length > 0) {
    const cover = item.images.find((img: any) => img?.type === "cover");
    if (cover?.url) return cover.url;
    if (item.images[0]?.url) return item.images[0].url;
    if (typeof item.images[0] === "string") return item.images[0];
  }
  if (item.media?.coverImage?.url) return item.media.coverImage.url;
  if (item.state && typeof item.state === "object") {
    if (item.state.image?.url) return item.state.image.url;
    if (typeof item.state.image === "string") return item.state.image;
  }
  return null;
}

export default function PopularDestinations({
  initialDestinations,
  initialStates,
}: PopularDestinationsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<DestinationCardItem[]>(() => {
    return transformBackendData(initialDestinations, initialStates);
  });
  const [loading, setLoading] = useState(false);

  function transformBackendData(
    dests?: Destination[] | null,
    states?: State[] | null
  ): DestinationCardItem[] {
    const list: DestinationCardItem[] = [];

    if (Array.isArray(dests) && dests.length > 0) {
      dests.forEach((d) => {
        const stateSlug =
          typeof d.state === "object" && d.state ? (d.state as any).slug : "india";
        const stateName =
          typeof d.state === "object" && d.state
            ? (d.state as any).name
            : d.country || "Explore";

        list.push({
          id: d._id || d.slug,
          name: d.name,
          subtitle: stateName,
          image: resolveItemImage(d),
          href: `/destinations/${stateSlug}/${d.slug}`,
        });
      });
    }

    if (list.length < 4 && Array.isArray(states) && states.length > 0) {
      states.forEach((s) => {
        if (!list.some((existing) => existing.name.toLowerCase() === s.name.toLowerCase())) {
          list.push({
            id: s._id || s.slug,
            name: s.name,
            subtitle: "India",
            image: resolveItemImage(s),
            href: `/states/${s.slug}`,
          });
        }
      });
    }

    return list;
  }

  useEffect(() => {
    if (items.length > 0) return;

    let isMounted = true;
    setLoading(true);

    Promise.all([
      getDestinations({ limit: 12 }).catch(() => null),
      getStates().catch(() => null),
    ])
      .then(([destRes, statesRes]) => {
        if (!isMounted) return;
        const dests = destRes?.data || [];
        const states = statesRes?.data || [];
        const parsed = transformBackendData(dests, states);
        setItems(parsed);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [items.length]);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = 320;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!loading && items.length === 0) {
    return null;
  }

  return (
    <section className="bg-background py-14 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left Column: Heading & Call to Action */}
          <div className="shrink-0 lg:w-[280px] xl:w-[320px] mb-8 lg:mb-0 flex flex-col justify-between">
            <div>
              {/* Category / Badge with Sparkle */}
              <div className="flex items-center gap-2 text-xs font-normal text-muted">
                <span className="text-primary text-sm leading-none">✦</span>
                <span>Popular Destinations</span>
              </div>

              {/* Editorial Main Heading */}
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-normal leading-[1.15] text-heading font-serif tracking-tight">
                Find inspiration <br />
                for every journey
              </h2>

              <p className="mt-3 text-sm text-muted leading-relaxed hidden sm:block font-normal">
                Immerse yourself in handpicked getaways, serene escapes, and iconic world landmarks.
              </p>
            </div>

            {/* View All Destinations Link */}
            <div className="mt-6 lg:mt-10 flex items-center justify-between sm:justify-start gap-4">
              <Link
                href="/destinations"
                className="group inline-flex items-center gap-2 text-sm font-medium text-heading underline decoration-border underline-offset-8 transition-colors hover:text-primary hover:decoration-primary"
              >
                <span>View All Destinations</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1 font-sans">
                  →
                </span>
              </Link>

              {/* Slider Prev / Next Controls for Mobile */}
              <div className="flex items-center gap-1.5 lg:hidden">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  aria-label="Previous destination"
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
                  aria-label="Next destination"
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
                aria-label="Previous destinations"
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
                aria-label="Next destinations"
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

          {/* Right Column: Rounded Destination Cards Carousel */}
          <div className="relative min-w-0 flex-1">
            <div
              ref={sliderRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {items.map((dest) => (
                <Link
                  key={dest.id}
                  href={dest.href}
                  className="group relative shrink-0 w-[210px] sm:w-[240px] md:w-[260px] h-[300px] sm:h-[340px] md:h-[360px] cursor-pointer select-none"
                >
                  {/* Card Outer Container with Rounded Corners */}
                  <div className="dest-card-rounded relative h-full w-full overflow-hidden bg-neutral-900 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                    {/* Destination Image from Backend */}
                    {dest.image ? (
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        sizes="(max-width: 640px) 210px, (max-width: 768px) 240px, 260px"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#0a192f] via-[#162e51] to-[#0a192f] flex items-center justify-center">
                        <span className="text-4xl text-[#d4af37]/40 font-bold">✦</span>
                      </div>
                    )}

                    {/* Gradient Overlay for Crisp Text Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                    {/* Card Bottom Bar: Destination Name on Left + Circular Arrow Button on Right */}
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 sm:p-5">
                      <div className="min-w-0 pr-2">
                        <span className="block text-base sm:text-lg font-medium text-white tracking-wide truncate drop-shadow-xs">
                          {dest.name}
                        </span>
                        {dest.subtitle && (
                          <span className="block text-[11px] sm:text-xs text-white/70 tracking-normal truncate drop-shadow-xs">
                            {dest.subtitle}
                          </span>
                        )}
                      </div>

                      {/* Pill / Circular Arrow Button */}
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}