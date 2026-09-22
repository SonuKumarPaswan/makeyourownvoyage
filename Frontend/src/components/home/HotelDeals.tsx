"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const hotelDeals = [
  {
    id: 1,
    name: "Taj Exotica Resort",
    location: "Goa, India",
    rating: "4.8",
    reviews: "342",
    room: "Deluxe Sea View Room",
    nights: "3 Nights",
    price: "₹8,999",
    oldPrice: "₹11,999",
    discount: "25% OFF",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    slug: "taj-exotica-resort-goa",
  },
  {
    id: 2,
    name: "The Himalayan Retreat",
    location: "Manali, Himachal Pradesh",
    rating: "4.7",
    reviews: "218",
    room: "Mountain View Room",
    nights: "2 Nights",
    price: "₹5,499",
    oldPrice: "₹7,499",
    discount: "27% OFF",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop",
    slug: "himalayan-retreat-manali",
  },
  {
    id: 3,
    name: "The Leela Palace",
    location: "Udaipur, Rajasthan",
    rating: "4.9",
    reviews: "486",
    room: "Luxury Palace Room",
    nights: "3 Nights",
    price: "₹12,999",
    oldPrice: "₹16,999",
    discount: "24% OFF",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1200&auto=format&fit=crop",
    slug: "leela-palace-udaipur",
  },
  {
    id: 4,
    name: "Marina Bay Hotel",
    location: "Dubai, UAE",
    rating: "4.8",
    reviews: "391",
    room: "Premium City View",
    nights: "3 Nights",
    price: "₹15,999",
    oldPrice: "₹20,999",
    discount: "24% OFF",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
    slug: "marina-bay-dubai",
  },
];

const HotelDeals = () => {
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
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">
              Stay Better, Save More
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              Best Hotel Deals
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Discover comfortable stays at great prices in popular
              destinations around the world.
            </p>
          </div>

          {/* Desktop Arrows */}
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous hotels"
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
              aria-label="Next hotels"
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

        {/* Hotel Cards */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {hotelDeals.map((hotel) => (
            <article
              key={hotel.id}
              className="group min-w-[310px] max-w-[310px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-[390px] sm:max-w-[390px]"
            >
              {/* Image */}
              <Link href={`/hotels/${hotel.slug}`}>
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={`${hotel.name} in ${hotel.location}`}
                    fill
                    sizes="(max-width: 640px) 310px, 390px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  {/* Discount */}
                  <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-white shadow-md">
                    {hotel.discount}
                  </span>

                  {/* Rating */}
                  <span className="absolute bottom-4 right-4 flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1.5 text-sm font-bold text-heading shadow-sm">
                    <span className="text-accent">★</span>
                    {hotel.rating}
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

                  {hotel.location}
                </p>

                {/* Hotel Name */}
                <h3 className="mt-2 text-xl font-bold text-heading">
                  {hotel.name}
                </h3>

                {/* Reviews */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm font-semibold text-heading">
                    Excellent
                  </span>

                  <span className="text-sm text-muted">
                    ({hotel.reviews} reviews)
                  </span>
                </div>

                {/* Room */}
                <div className="mt-4 flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4 text-secondary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 19v-8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8M4 15h16M7 9V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"
                      />
                    </svg>

                    {hotel.room}
                  </div>

                  <span className="text-xs font-medium text-muted">
                    {hotel.nights}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted">
                      Starting from
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-2xl font-bold text-heading">
                        {hotel.price}
                      </span>

                      <span className="text-sm text-muted line-through">
                        {hotel.oldPrice}
                      </span>
                    </div>

                    <p className="mt-0.5 text-xs text-muted">
                      per night
                    </p>
                  </div>

                  <Link
                    href={`/hotels/${hotel.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
                  >
                    View Hotel

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

        {/* Bottom Navigation */}
        <div className="mt-5 flex items-center justify-between">
          {/* Mobile Arrows */}
          <div className="flex gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-heading"
              aria-label="Previous hotels"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-heading"
              aria-label="Next hotels"
            >
              →
            </button>
          </div>

          {/* All Hotels */}
          <Link
            href="/hotels"
            className="ml-auto inline-flex items-center gap-2 font-semibold text-primary transition hover:text-primary-hover"
          >
            View All Hotels
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HotelDeals;