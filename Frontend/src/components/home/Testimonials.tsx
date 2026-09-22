"use client";

import React, { useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Delhi, India",
    trip: "Goa Trip",
    rating: 5,
    review:
      "My Goa trip was very smooth from start to finish. The booking process was simple and the package was exactly as described. Had a really great experience.",
    initials: "RS",
  },
  {
    id: 2,
    name: "Priya Verma",
    location: "Mumbai, India",
    trip: "Kashmir Trip",
    rating: 5,
    review:
      "We booked our Kashmir holiday package through Make Your Own Voyage and everything was well organized. The hotel and travel arrangements were excellent.",
    initials: "PV",
  },
  {
    id: 3,
    name: "Amit Kumar",
    location: "Bangalore, India",
    trip: "Dubai Trip",
    rating: 5,
    review:
      "The entire booking experience was easy and convenient. I especially liked how quickly I could compare different travel options and choose what suited me.",
    initials: "AK",
  },
  {
    id: 4,
    name: "Neha Singh",
    location: "Lucknow, India",
    trip: "Manali Trip",
    rating: 5,
    review:
      "Our Manali vacation was memorable. The package was well planned and the support team was helpful whenever we had questions.",
    initials: "NS",
  },
  {
    id: 5,
    name: "Vikas Gupta",
    location: "Jaipur, India",
    trip: "Kerala Trip",
    rating: 5,
    review:
      "Very convenient platform for planning a holiday. We found a good package at a reasonable price and had a wonderful Kerala experience.",
    initials: "VG",
  },
];

const Testimonials = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -420 : 420,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Traveler Stories
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              What Our Travelers Say
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Hear from travelers who have planned their journeys with
              Make Your Own Voyage.
            </p>
          </div>

          {/* Desktop Arrows */}
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous testimonials"
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
              aria-label="Next testimonials"
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

        {/* Testimonials */}
        <div
          ref={sliderRef}
          className="mt-10 flex gap-6 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="min-w-[310px] max-w-[310px] shrink-0 rounded-2xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-w-[390px] sm:max-w-[390px]"
            >
              {/* Quote Icon */}
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6v-6H5.98a3.2 3.2 0 0 1 3.19-3V6H7.17Zm11 0A5.17 5.17 0 0 0 13 11.17V18h6v-6h-2.02a3.2 3.2 0 0 1 3.19-3V6h-1Z" />
                  </svg>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-accent"
                      >
                        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
                      </svg>
                    )
                  )}
                </div>
              </div>

              {/* Review */}
              <p className="mt-6 text-[15px] leading-7 text-text">
                “{testimonial.review}”
              </p>

              {/* User */}
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {testimonial.initials}
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-heading">
                    {testimonial.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-muted">
                    {testimonial.location}
                  </p>
                </div>

                <div className="ml-auto text-right">
                  <p className="text-xs text-muted">Trip</p>

                  <p className="text-sm font-semibold text-primary">
                    {testimonial.trip}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="mt-4 flex items-center justify-between sm:hidden">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-heading"
              aria-label="Previous testimonials"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-heading"
              aria-label="Next testimonials"
            >
              →
            </button>
          </div>

          <span className="text-sm text-muted">
            Happy Travelers
          </span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;