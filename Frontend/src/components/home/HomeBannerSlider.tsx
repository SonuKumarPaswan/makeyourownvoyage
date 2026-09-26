"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface BannerItem {
  id: string;
  imageUrl: string;
  alt: string;
  link: string;
}

const BANNERS: BannerItem[] = [
  {
    id: "spiritual-peace",
    imageUrl:
      "https://res.cloudinary.com/t2keybqe/image/upload/v1790405458/Spiritual_peace_at_affordable_price-2.jpg.jpg",
    alt: "Spiritual Peace Holiday Tour Packages",
    link: "/packages",
  },
  {
    id: "goa-trips",
    imageUrl:
      "https://res.cloudinary.com/t2keybqe/image/upload/v1790405471/goatrips.png",
    alt: "Goa Trips Holiday Packages",
    link: "/packages",
  },
];

export default function HomeBannerSlider() {
  const totalOriginalSlides = BANNERS.length;

  // Extended slides for infinite seamless 1 -> 2 -> 1 -> 2 forward loop
  const extendedSlides = [
    { ...BANNERS[totalOriginalSlides - 1], cloneKey: "clone-start" },
    ...BANNERS.map((b) => ({ ...b, cloneKey: b.id })),
    { ...BANNERS[0], cloneKey: "clone-end" },
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const isTransitioningRef = useRef(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Re-enable transition on the next animation frame after instantaneous jump
  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => {
        setWithTransition(true);
        isTransitioningRef.current = false;
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  const nextSlide = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const handleTransitionEnd = () => {
    // If reached cloned first slide at the end, jump to real first slide (index 1) instantly
    if (currentIndex === extendedSlides.length - 1) {
      setWithTransition(false);
      setCurrentIndex(1);
    }
    // If reached cloned last slide at the start, jump to real last slide instantly
    else if (currentIndex === 0) {
      setWithTransition(false);
      setCurrentIndex(totalOriginalSlides);
    } else {
      isTransitioningRef.current = false;
    }
  };

  // Continuous forward infinite auto-scroll
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="bg-background py-6 sm:py-8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="home-banner-rounded banner-card-rounded relative w-full overflow-hidden shadow-md border border-border/40 bg-muted/20 select-none"
          style={{ borderRadius: "1.25rem" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Banner Slides Carousel */}
          <div
            className={`flex will-change-transform ${
              withTransition
                ? "transition-transform duration-700 ease-out"
                : "transition-none"
            }`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((banner, index) => (
              <div
                key={`${banner.cloneKey}-${index}`}
                className="banner-card-rounded w-full shrink-0 overflow-hidden"
                style={{ borderRadius: "1.25rem" }}
              >
                <Link
                  href={banner.link}
                  className="banner-card-rounded block relative w-full aspect-[2.6/1] sm:aspect-[2.8/1] md:aspect-[3.2/1] lg:aspect-[3.4/1] overflow-hidden group cursor-pointer"
                  style={{ borderRadius: "1.25rem" }}
                  aria-label={banner.alt}
                >
                  <Image
                    src={banner.imageUrl}
                    alt={banner.alt}
                    fill
                    priority={index === 1}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
                    className="banner-card-rounded object-cover object-center transition-transform duration-700 group-hover:scale-[1.015]"
                    style={{ borderRadius: "1.25rem" }}
                    unoptimized
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Left Circular Navigation Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous Slide"
            className="banner-circle-btn dest-circle-btn absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center bg-white/75 hover:bg-white text-slate-800 shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 border border-white/50 cursor-pointer"
            style={{ borderRadius: "9999px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 sm:h-5 sm:w-5 -translate-x-[1px]"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right Circular Navigation Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next Slide"
            className="banner-circle-btn dest-circle-btn absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center bg-white/75 hover:bg-white text-slate-800 shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 border border-white/50 cursor-pointer"
            style={{ borderRadius: "9999px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 sm:h-5 sm:w-5 translate-x-[1px]"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
