"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const featuredPackages = [
  {
    id: 1,
    title: "Goa Premium Escape",
    location: "Goa, India",
    duration: "5 Days / 4 Nights",
    price: "₹14,999",
    oldPrice: "₹19,999",
    discount: "25% OFF",
    rating: "4.8",
    reviews: "124",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    slug: "goa-premium-escape",
  },
  {
    id: 2,
    title: "Manali Snow Adventure",
    location: "Manali, Himachal Pradesh",
    duration: "6 Days / 5 Nights",
    price: "₹17,999",
    oldPrice: "₹22,999",
    discount: "22% OFF",
    rating: "4.9",
    reviews: "98",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
    slug: "manali-snow-adventure",
  },
  {
    id: 3,
    title: "Kashmir Paradise",
    location: "Srinagar, Kashmir",
    duration: "7 Days / 6 Nights",
    price: "₹24,999",
    oldPrice: "₹31,999",
    discount: "21% OFF",
    rating: "4.9",
    reviews: "156",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop",
    slug: "kashmir-paradise",
  },
  {
    id: 4,
    title: "Dubai Luxury Holiday",
    location: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    price: "₹39,999",
    oldPrice: "₹49,999",
    discount: "20% OFF",
    rating: "4.8",
    reviews: "87",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    slug: "dubai-luxury-holiday",
  },
];

const FeaturedPackages = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -420 : 420,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Handpicked For You
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              Featured Packages
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Explore our handpicked holiday packages with great experiences
              and exclusive travel deals.
            </p>
          </div>

          {/* Arrows */}
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

        {/* Packages */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {featuredPackages.map((pkg) => (
            <article
              key={pkg.id}
              className="group min-w-[310px] max-w-[310px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-[390px] sm:max-w-[390px]"
            >
              {/* Image */}
              <Link href={`/packages/${pkg.slug}`}>
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={`${pkg.title} travel package`}
                    fill
                    sizes="(max-width: 640px) 310px, 390px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  {/* Discount */}
                  <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-white shadow-md">
                    {pkg.discount}
                  </span>

                  {/* Duration */}
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-heading">
                    {pkg.duration}
                  </span>
                </div>
              </Link>

              {/* Content */}
              <div className="p-5">
                {/* Location */}
                <p className="flex items-center gap-1.5 text-sm text-muted">
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

                {/* Title */}
                <h3 className="mt-2 text-xl font-bold text-heading">
                  {pkg.title}
                </h3>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded-md bg-success-light px-2 py-1 text-xs font-bold text-success">
                    ★ {pkg.rating}
                  </span>

                  <span className="text-xs text-muted">
                    {pkg.reviews} reviews
                  </span>
                </div>

                {/* Price */}
                <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted">Starting from</p>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-2xl font-bold text-heading">
                        {pkg.price}
                      </span>

                      <span className="text-sm text-muted line-through">
                        {pkg.oldPrice}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
                  >
                    View Details

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4"
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

        {/* Bottom */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-heading"
              aria-label="Previous packages"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-heading"
              aria-label="Next packages"
            >
              →
            </button>
          </div>

          <Link
            href="/packages"
            className="ml-auto inline-flex items-center gap-2 font-semibold text-primary transition hover:text-primary-hover"
          >
            View All Packages
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;