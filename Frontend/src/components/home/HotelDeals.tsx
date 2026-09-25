"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { hotelsApi } from "@/lib/api/hotels.api";
import type { Hotel } from "@/types/hotel";

interface HotelDealsProps {
  initialHotels?: Hotel[] | null;
}

const FALLBACK_HOTELS = [
  {
    _id: "hotel-1",
    name: "Taj Exotica Resort & Spa",
    slug: "taj-exotica-resort-goa",
    city: "Goa",
    location: { city: "Goa", state: "Goa" },
    starCategory: 5,
    rating: 4.8,
    price: 8999,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    gradient: "from-emerald-950 via-teal-950 to-slate-900",
  },
  {
    _id: "hotel-2",
    name: "The Himalayan Retreat",
    slug: "the-himalayan-retreat-manali",
    city: "Manali",
    location: { city: "Manali", state: "Himachal Pradesh" },
    starCategory: 4,
    rating: 4.7,
    price: 5499,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    gradient: "from-blue-950 via-indigo-950 to-slate-900",
  },
  {
    _id: "hotel-3",
    name: "The Leela Palace",
    slug: "the-leela-palace-udaipur",
    city: "Udaipur",
    location: { city: "Udaipur", state: "Rajasthan" },
    starCategory: 5,
    rating: 4.9,
    price: 12999,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    gradient: "from-amber-950 via-stone-900 to-slate-900",
  },
  {
    _id: "hotel-4",
    name: "Marina Bay Luxury Hotel",
    slug: "marina-bay-luxury-hotel",
    city: "Dubai",
    location: { city: "Dubai", state: "UAE" },
    starCategory: 5,
    rating: 4.8,
    price: 15999,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    gradient: "from-slate-900 via-sky-950 to-slate-900",
  },
  {
    _id: "hotel-5",
    name: "Grand Hyatt Resort & Spa",
    slug: "grand-hyatt-resort-kerala",
    city: "Kochi",
    location: { city: "Kochi", state: "Kerala" },
    starCategory: 5,
    rating: 4.9,
    price: 9499,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    gradient: "from-teal-950 via-emerald-950 to-slate-900",
  },
  {
    _id: "hotel-6",
    name: "JW Marriott Mussoorie",
    slug: "jw-marriott-mussoorie-resort",
    city: "Mussoorie",
    location: { city: "Mussoorie", state: "Uttarakhand" },
    starCategory: 5,
    rating: 4.8,
    price: 14499,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    gradient: "from-stone-950 via-amber-950 to-slate-900",
  },
];

export const HotelDeals: React.FC<HotelDealsProps> = ({ initialHotels }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [hotels, setHotels] = useState<any[]>(() => {
    return Array.isArray(initialHotels) && initialHotels.length > 0
      ? initialHotels
      : FALLBACK_HOTELS;
  });

  useEffect(() => {
    let isMounted = true;

    hotelsApi
      .getAllHotels({ limit: 10 })
      .then((res: any) => {
        if (!isMounted) return;
        const fetchedHotels = res?.data?.hotels || res?.hotels || res?.data;
        if (Array.isArray(fetchedHotels) && fetchedHotels.length > 0) {
          setHotels(fetchedHotels);
        }
      })
      .catch(() => {
        // Keeps luxury fallback hotels if backend endpoint is unavailable
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = 320;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-background py-14 sm:py-20 overflow-hidden border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left Column: Heading & Call to Action (Matching FeaturedPackages layout) */}
          <div className="shrink-0 lg:w-[280px] xl:w-[320px] mb-8 lg:mb-0 flex flex-col justify-between">
            <div>
              {/* Category / Badge with Sparkle */}
              <div className="flex items-center gap-2 text-xs font-normal text-muted">
                <span className="text-primary text-sm leading-none">✦</span>
                <span>Handpicked Stays</span>
              </div>

              {/* Editorial Main Heading */}
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-normal leading-[1.15] text-heading font-serif tracking-tight">
                Best hotels at <br />
                <span className="text-[#d4af37]">lowest prices</span>
              </h2>

              <p className="mt-3 text-sm text-muted leading-relaxed hidden sm:block font-normal">
                Curated 5-star resorts, heritage palaces, and private pool villas featuring verified reviews and complimentary breakfast.
              </p>
            </div>

            {/* View All Hotels Link */}
            <div className="mt-6 lg:mt-10 flex items-center justify-between sm:justify-start gap-4">
              <Link
                href="/hotels"
                className="group inline-flex items-center gap-2 text-sm font-medium text-heading underline decoration-border underline-offset-8 transition-colors hover:text-primary hover:decoration-primary"
              >
                <span>View All Hotels</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1 font-sans">
                  →
                </span>
              </Link>

              {/* Slider Prev / Next Controls for Mobile */}
              <div className="flex items-center gap-1.5 lg:hidden">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  aria-label="Previous hotel"
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
                  aria-label="Next hotel"
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
                aria-label="Previous hotels"
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
                aria-label="Next hotels"
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

          {/* Right Column: Rounded Hotel Cards Carousel (Same Divs & Geometry as Packages) */}
          <div className="relative min-w-0 flex-1">
            <div
              ref={sliderRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {hotels.map((hotel) => {
                // Calculate display price and image
                const rawPrice =
                  hotel.price ||
                  hotel.rooms?.[0]?.pricing?.finalPrice ||
                  hotel.rooms?.[0]?.pricing?.basePrice ||
                  6499;

                const rawImage =
                  hotel.image ||
                  (Array.isArray(hotel.images) && hotel.images[0]?.url ? hotel.images[0].url : "") ||
                  (Array.isArray(hotel.images) && typeof hotel.images[0] === "string" ? hotel.images[0] : "") ||
                  "";

                const cityName =
                  hotel.city ||
                  hotel.location?.city ||
                  hotel.location?.state ||
                  "Popular Destination";

                const starRating = hotel.starCategory || (hotel.rating ? `${hotel.rating}★` : "5★");

                return (
                  <Link
                    key={hotel._id || hotel.slug}
                    href={`/hotels/${hotel.slug}`}
                    className="group relative shrink-0 w-[220px] sm:w-[250px] md:w-[270px] h-[310px] sm:h-[350px] md:h-[370px] cursor-pointer select-none"
                  >
                    {/* Card Outer Container with Rounded Corners */}
                    <div className="dest-card-rounded relative h-full w-full overflow-hidden bg-neutral-900 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                      {/* Hotel Image from Cloudinary / Database */}
                      {rawImage ? (
                        <Image
                          src={rawImage}
                          alt={hotel.name}
                          fill
                          sizes="(max-width: 640px) 220px, (max-width: 768px) 250px, 270px"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className={`h-full w-full bg-gradient-to-br ${hotel.gradient || "from-[#0a192f] via-[#162e51] to-[#0a192f]"} flex flex-col items-center justify-center p-6 text-center`}>
                          <span className="text-4xl text-[#d4af37]/40 mb-2 font-bold font-serif">✦</span>
                          <span className="text-white/90 text-sm font-medium tracking-normal">{cityName}</span>
                        </div>
                      )}

                      {/* Top Star Rating & City Pill Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="dest-circle-btn inline-block bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-normal px-3 py-1 tracking-normal">
                          ★ {hotel.rating || hotel.starCategory || 5} • {cityName}
                        </span>
                      </div>

                      {/* Gradient Overlay for Crisp Text Contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                      {/* Card Bottom Bar: Title & Price on Left + Circular Arrow Button on Right */}
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
                        <div className="min-w-0 pr-2">
                          <span className="block text-base sm:text-lg font-medium text-white tracking-wide truncate drop-shadow-xs">
                            {hotel.name}
                          </span>
                          <div className="mt-0.5 flex items-baseline gap-1.5">
                            <span className="text-xs sm:text-sm font-bold text-[#d4af37]">
                              ₹{Number(rawPrice).toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] text-white/70 tracking-normal">
                              / night
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

export default HotelDeals;