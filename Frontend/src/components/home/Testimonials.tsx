"use client";

import React, { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  trip: string;
  rating: number;
  review: string;
  initials: string;
  bgGradient: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Thakur",
    location: "Gurugram, India",
    trip: "Goa Vacation",
    rating: 4.6,
    review:
      "My Goa trip was exceptionally smooth from start to finish. The booking process was simple, transparent, and the hotel was exactly as promised. Make Your Own Voyage made our family holiday completely stress-free and truly unforgettable.",
    initials: "RT",
    bgGradient: "from-amber-600 to-yellow-500",
  },
  {
    id: 2,
    name: "Vikash Panwar",
    location: "Mumbai, India",
    trip: "Kashmir Paradise",
    rating: 4.7,
    review:
      "We booked our Kashmir holiday package through Make Your Own Voyage and everything was flawlessly organized. From our private cab driver in Srinagar to the luxury stay in Gulmarg, the attention to detail was unmatched.",
    initials: "VP",
    bgGradient: "from-sky-700 to-blue-500",
  },
  {
    id: 3,
    name: "Abdul Rehman",
    location: "Noida, India",
    trip: "Dubai Getaway",
    rating: 4.5,
    review:
      "The entire booking experience was effortless and convenient. I loved how quickly I could customize our Dubai package with flight options, city tours, and desert safari without any hidden charges. Will definitely book again!",
    initials: "AR",
    bgGradient: "from-emerald-700 to-teal-500",
  },
  {
    id: 4,
    name: "Suhani Chaudhary",
    location: "Greater Noida, India",
    trip: "Manali Adventure",
    rating: 5.0,
    review:
      "Our Manali vacation was magical. The itinerary was perfectly balanced between sightseeing and relaxation. The 24/7 concierge support team was always responsive whenever we had questions during the journey.",
    initials: "SC",
    bgGradient: "from-indigo-700 to-violet-500",
  },
  {
    id: 5,
    name: "Vikas Gupta",
    location: "Delhi, India",
    trip: "Kerala Backwaters",
    rating: 4.3,
    review:
      "Outstanding platform for planning holidays. We found an authentic houseboat package at a great price and had a breathtaking Kerala backwaters experience. Highly recommend Make Your Own Voyage to all travelers.",
    initials: "VG",
    bgGradient: "from-rose-700 to-pink-500",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      className="bg-background py-16 sm:py-20 lg:py-24 border-t border-border/40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="mb-10 sm:mb-14 flex items-center justify-between">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.15] text-[#d4af37] font-serif tracking-tight">
            What Our Travelers Say
          </h2>

          {/* Progress Indicator Dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-7 bg-primary"
                    : "w-2 bg-border hover:bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Quote Area */}
        <div className="relative">
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Large Decorative Quote Icon */}
            <div className="shrink-0 text-3xl sm:text-4xl lg:text-5xl font-serif text-heading select-none leading-none pt-1">
              <svg
                viewBox="0 0 32 32"
                className="h-8 w-8 sm:h-10 sm:w-10 fill-current text-[#0a192f]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 8c-4.418 0-8 3.582-8 8 0 4.418 3.582 8 8 8 1.487 0 2.875-.407 4.072-1.111C13.565 25.42 10.42 27.5 7 28l-1 2c6.627 0 12-5.373 12-12 0-5.523-4.477-10-10-10zm16 0c-4.418 0-8 3.582-8 8 0 4.418 3.582 8 8 8 1.487 0 2.875-.407 4.072-1.111C29.565 25.42 26.42 27.5 23 28l-1 2c6.627 0 12-5.373 12-12 0-5.523-4.477-10-10-10z" />
              </svg>
            </div>

            {/* Testimonial Text */}
            <div className="flex-1">
              <p className="text-base sm:text-lg md:text-xl lg:text-[22px] leading-relaxed text-heading font-serif font-normal min-h-[120px] transition-all duration-300">
                {activeTestimonial.review}
              </p>

              {/* Exact Star Ratings Rendering */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const fillPercentage = Math.max(
                      0,
                      Math.min(100, (activeTestimonial.rating - (star - 1)) * 100)
                    );
                    return (
                      <span
                        key={star}
                        className="relative inline-block text-base leading-none text-slate-300 select-none"
                      >
                        ★
                        <span
                          className="absolute top-0 left-0 overflow-hidden text-[#d4af37]"
                          style={{ width: `${fillPercentage}%` }}
                        >
                          ★
                        </span>
                      </span>
                    );
                  })}
                </div>

                <span className="text-xs font-bold text-heading">
                  {activeTestimonial.rating.toFixed(1)}
                </span>
                <span className="text-xs font-medium text-muted">
                  • Verified Experience
                </span>
              </div>
            </div>
          </div>

          {/* Traveler Switcher Pill & Avatars Bar */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-3 sm:gap-4 pl-0 sm:pl-14">
            {/* Active Traveler Pill */}
            <div className="testimonial-pill flex items-center gap-3 bg-[#0a192f] py-2 pl-2 pr-5 text-white shadow-lg border border-[#d4af37]/30 transition-all duration-300">
              <div className="testimonial-avatar flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center bg-gradient-to-br from-[#d4af37] to-[#936e20] text-sm font-bold text-[#0a192f] border-2 border-[#d4af37] shadow-inner">
                {activeTestimonial.initials}
              </div>

              <div className="min-w-0 pr-1">
                <p className="text-sm sm:text-base font-semibold text-white tracking-wide truncate">
                  {activeTestimonial.name}
                </p>
                <p className="text-[11px] sm:text-xs text-[#d4af37] font-normal truncate">
                  {activeTestimonial.trip} • {activeTestimonial.location}
                </p>
              </div>
            </div>

            {/* Inactive Traveler Circular Monogram Avatars */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {testimonials.map((t, idx) => {
                if (idx === activeIndex) return null;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`View review from ${t.name}`}
                    className={`testimonial-avatar flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center bg-gradient-to-br ${t.bgGradient} text-xs font-bold text-white shadow-xs opacity-75 border-2 border-transparent transition-all duration-300 hover:scale-105 hover:opacity-100 hover:border-[#d4af37] active:scale-95`}
                  >
                    {t.initials}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;