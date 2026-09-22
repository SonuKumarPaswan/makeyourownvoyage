"use client";

import React, { useRef } from "react";
import Link from "next/link";

const flightDeals = [
  {
    id: 1,
    airline: "IndiGo",
    logo: "6E",
    from: "Delhi",
    fromCode: "DEL",
    to: "Mumbai",
    toCode: "BOM",
    date: "15 Oct 2026",
    duration: "2h 10m",
    stops: "Non-stop",
    price: "₹4,999",
  },
  {
    id: 2,
    airline: "Air India",
    logo: "AI",
    from: "Delhi",
    fromCode: "DEL",
    to: "Goa",
    toCode: "GOI",
    date: "18 Oct 2026",
    duration: "2h 35m",
    stops: "Non-stop",
    price: "₹6,499",
  },
  {
    id: 3,
    airline: "IndiGo",
    logo: "6E",
    from: "Mumbai",
    fromCode: "BOM",
    to: "Bangalore",
    toCode: "BLR",
    date: "20 Oct 2026",
    duration: "1h 45m",
    stops: "Non-stop",
    price: "₹3,999",
  },
  {
    id: 4,
    airline: "Air India Express",
    logo: "IX",
    from: "Delhi",
    fromCode: "DEL",
    to: "Kolkata",
    toCode: "CCU",
    date: "22 Oct 2026",
    duration: "2h 15m",
    stops: "Non-stop",
    price: "₹5,299",
  },
  {
    id: 5,
    airline: "Akasa Air",
    logo: "QP",
    from: "Mumbai",
    fromCode: "BOM",
    to: "Delhi",
    toCode: "DEL",
    date: "25 Oct 2026",
    duration: "2h 05m",
    stops: "Non-stop",
    price: "₹4,799",
  },
];

const FlightDeals = () => {
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
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Fly More, Spend Less
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              Best Flight Deals
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Find attractive flight fares on popular routes and plan your
              next journey with ease.
            </p>
          </div>

          {/* Arrows */}
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous flights"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-heading shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next flights"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-heading shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
            >
              →
            </button>
          </div>
        </div>

        {/* Flight Cards */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {flightDeals.map((flight) => (
            <article
              key={flight.id}
              className="min-w-[320px] max-w-[320px] shrink-0 rounded-2xl border border-border bg-card p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-w-[390px] sm:max-w-[390px]"
            >
              {/* Airline */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light font-bold text-primary">
                    {flight.logo}
                  </div>

                  <div>
                    <p className="font-semibold text-heading">
                      {flight.airline}
                    </p>

                    <p className="text-xs text-muted">
                      Economy
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-success-light px-3 py-1 text-xs font-semibold text-success">
                  {flight.stops}
                </span>
              </div>

              {/* Route */}
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-heading">
                    {flight.fromCode}
                  </p>

                  <p className="mt-1 text-sm text-muted">
                    {flight.from}
                  </p>
                </div>

                {/* Plane Route */}
                <div className="flex flex-1 items-center px-4">
                  <div className="h-px flex-1 border-t border-dashed border-border" />

                  <div className="mx-2 flex h-9 w-9 rotate-90 items-center justify-center rounded-full bg-primary-light text-primary">
                    ✈
                  </div>

                  <div className="h-px flex-1 border-t border-dashed border-border" />
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-heading">
                    {flight.toCode}
                  </p>

                  <p className="mt-1 text-sm text-muted">
                    {flight.to}
                  </p>
                </div>
              </div>

              {/* Flight Info */}
              <div className="mt-5 grid grid-cols-2 gap-3 border-y border-border py-4">
                <div>
                  <p className="text-xs text-muted">Departure</p>
                  <p className="mt-1 text-sm font-semibold text-heading">
                    {flight.date}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-muted">Duration</p>
                  <p className="mt-1 text-sm font-semibold text-heading">
                    {flight.duration}
                  </p>
                </div>
              </div>

              {/* Price + Button */}
              <div className="mt-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-muted">Starting from</p>

                  <p className="mt-1 text-2xl font-bold text-primary">
                    {flight.price}
                  </p>

                  <p className="text-xs text-muted">per person</p>
                </div>

                <Link
                  href={`/flights?from=${flight.fromCode}&to=${flight.toCode}`}
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
                >
                  Book Now
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-5 flex items-center justify-between">
          {/* Mobile Arrows */}
          <div className="flex gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-heading"
              aria-label="Previous flights"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-heading"
              aria-label="Next flights"
            >
              →
            </button>
          </div>

          <Link
            href="/flights"
            className="ml-auto inline-flex items-center gap-2 font-semibold text-primary transition hover:text-primary-hover"
          >
            View All Flights
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FlightDeals;