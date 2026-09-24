"use client";

import { useState } from "react";

import AirportSelector from "./AirportSelector";
import CabinClassSelector from "./CabinClassSelector";
import FareTypeSelector from "./FareTypeSelector";
import TravellerSelector from "./TravellerSelector";
import TripTypeSelector from "./TripTypeSelector";

const FlightSearchBar = () => {
  const [departureDate, setDepartureDate] = useState("2026-09-23");
  const [returnDate, setReturnDate] = useState("");

  const handleSearch = () => {
    console.log({
      departureDate,
      returnDate,
    });
  };

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-4 py-5">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-heading">
            Search Flights
          </h1>

          <p className="mt-1 text-sm text-muted">
            Find and compare flights for your next journey.
          </p>
        </div>

        {/* Search Card */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          {/* Trip Type */}
          <div className="mb-5">
            <TripTypeSelector />
          </div>

          {/* Airport */}
          <AirportSelector />

          {/* Dates */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {/* Departure Date */}
            <div>
              <label
                htmlFor="departure-date"
                className="mb-1.5 block text-xs font-semibold text-muted"
              >
                Departure
              </label>

              <input
                id="departure-date"
                type="date"
                value={departureDate}
                onChange={(event) =>
                  setDepartureDate(event.target.value)
                }
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Return Date */}
            <div>
              <label
                htmlFor="return-date"
                className="mb-1.5 block text-xs font-semibold text-muted"
              >
                Return
              </label>

              <input
                id="return-date"
                type="date"
                value={returnDate}
                min={departureDate}
                onChange={(event) =>
                  setReturnDate(event.target.value)
                }
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          {/* Traveller */}
          <div className="mt-4">
            <TravellerSelector />
          </div>

          {/* Cabin + Fare */}
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <CabinClassSelector />
            <FareTypeSelector />
          </div>

          {/* Search Button */}
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleSearch}
              className="w-full rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-white transition hover:bg-primary-hover sm:w-auto"
            >
              Search Flights
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightSearchBar;