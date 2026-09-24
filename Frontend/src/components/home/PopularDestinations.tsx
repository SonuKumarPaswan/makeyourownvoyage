"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const packages = [
  {
    id: 1,
    title: "Goa Beach Escape",
    location: "Goa, India",
    duration: "4 Days / 3 Nights",
    price: "₹12,999",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    slug: "goa-beach-escape",
  },
  {
    id: 2,
    title: "Manali Adventure",
    location: "Manali, Himachal Pradesh",
    duration: "5 Days / 4 Nights",
    price: "₹15,999",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
    slug: "manali-adventure",
  },
  {
    id: 3,
    title: "Kashmir Paradise",
    location: "Kashmir, India",
    duration: "6 Days / 5 Nights",
    price: "₹21,999",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop",
    slug: "kashmir-paradise",
  },
  {
    id: 4,
    title: "Dubai Holiday",
    location: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    price: "₹39,999",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    slug: "dubai-holiday",
  },
  {
    id: 5,
    title: "Kerala Backwaters",
    location: "Kerala, India",
    duration: "5 Days / 4 Nights",
    price: "₹18,999",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    slug: "kerala-backwaters",
  },
  {
    id: 6,
    title: "Rajasthan Heritage",
    location: "Rajasthan, India",
    duration: "6 Days / 5 Nights",
    price: "₹19,999",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop",
    slug: "rajasthan-heritage",
  },
];

const PopularDestinations = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = 380;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Explore & Travel
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              Popular Destinations
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Discover our most popular holiday packages and start planning
              your next unforgettable journey.
            </p>
          </div>

          {/* Desktop Arrows */}
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous packages"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-heading shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 18-6-6 6-6"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next packages"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-heading shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 18 6-6-6-6"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className="group min-w-[300px] max-w-[300px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-[350px] sm:max-w-[350px]"
            >
              {/* Image */}
              <Link href={`/packages/${pkg.slug}`}>
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={`${pkg.title} travel package`}
                    fill
                    sizes="(max-width: 640px) 300px, 350px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Duration */}
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-heading shadow-sm">
                    {pkg.duration}
                  </div>
                </div>
              </Link>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-heading">
                      {pkg.title}
                    </h3>

                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12Z"
                        />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>

                      {pkg.location}
                    </p>
                  </div>
                </div>

                {/* Price + Button */}
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted">Starting from</p>
                    <p className="mt-0.5 text-xl font-bold text-primary">
                      {pkg.price}
                    </p>
                  </div>

                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
                  >
                    View Package

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14m-6-6 6 6-6 6"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile / Bottom Navigation */}
        <div className="mt-4 flex items-center justify-between sm:hidden">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-heading shadow-sm"
            aria-label="Previous packages"
          >
            ←
          </button>

          <Link
            href="/packages"
            className="text-sm font-semibold text-primary hover:underline"
          >
            View All Packages →
          </Link>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-heading shadow-sm"
            aria-label="Next packages"
          >
            →
          </button>
        </div>

        {/* Desktop View All */}
        <div className="mt-8 hidden text-center sm:block">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 rounded-xl border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            View All Packages

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;