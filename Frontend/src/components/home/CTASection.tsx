import React from "react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="px-6 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center shadow-xl sm:px-10 sm:py-16 lg:px-16">
          {/* Background Decorations */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />

          <div className="pointer-events-none absolute right-[12%] top-10 hidden rotate-12 text-6xl opacity-10 lg:block">
            ✈️
          </div>

          <div className="pointer-events-none absolute bottom-8 left-[10%] hidden -rotate-12 text-5xl opacity-10 lg:block">
            🌴
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl">
            {/* Label */}
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/75">
              Your Next Adventure Awaits
            </p>

            {/* Heading */}
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Start Your Journey?
            </h2>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              Explore amazing destinations, discover great travel deals and
              plan your perfect trip with Make Your Own Voyage.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/packages"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-primary shadow-sm transition hover:bg-primary-light"
              >
                Explore Packages

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

              <Link
                href="/flights"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-primary"
              >
                Search Flights

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
                    d="M12 19V5m0 0-6 6m6-6 6 6"
                  />
                </svg>
              </Link>
            </div>

            {/* Trust Text */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <span className="text-green-300">✓</span>
                Easy Booking
              </span>

              <span className="hidden h-4 w-px bg-white/20 sm:block" />

              <span className="flex items-center gap-2">
                <span className="text-green-300">✓</span>
                Great Travel Deals
              </span>

              <span className="hidden h-4 w-px bg-white/20 sm:block" />

              <span className="flex items-center gap-2">
                <span className="text-green-300">✓</span>
                Travel Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;