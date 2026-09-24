"use client";

import { useState } from "react";

interface Airport {
  code: string;
  city: string;
  name: string;
}

const airports: Airport[] = [
  {
    code: "DEL",
    city: "Delhi",
    name: "Indira Gandhi International Airport",
  },
  {
    code: "BOM",
    city: "Mumbai",
    name: "Chhatrapati Shivaji Maharaj International Airport",
  },
  {
    code: "BLR",
    city: "Bangalore",
    name: "Kempegowda International Airport",
  },
  {
    code: "HYD",
    city: "Hyderabad",
    name: "Rajiv Gandhi International Airport",
  },
  {
    code: "MAA",
    city: "Chennai",
    name: "Chennai International Airport",
  },
  {
    code: "CCU",
    city: "Kolkata",
    name: "Netaji Subhas Chandra Bose International Airport",
  },
];

const AirportSelector = () => {
  const [from, setFrom] = useState<Airport | null>(null);
  const [to, setTo] = useState<Airport | null>(null);

  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const swapAirports = () => {
    const currentFrom = from;
    setFrom(to);
    setTo(currentFrom);
  };

  return (
    <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-end">
      {/* From */}
      <div className="relative">
        <label className="mb-1.5 block text-xs font-semibold text-muted">
          From
        </label>

        <button
          type="button"
          onClick={() => {
            setFromOpen((prev) => !prev);
            setToOpen(false);
          }}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-left transition hover:border-primary focus:border-primary focus:outline-none"
        >
          {from ? (
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-heading">
                  {from.code}
                </span>

                <span className="text-sm font-medium text-text">
                  {from.city}
                </span>
              </div>

              <p className="mt-1 truncate text-xs text-muted">
                {from.name}
              </p>
            </div>
          ) : (
            <span className="text-sm text-muted">
              Select departure airport
            </span>
          )}
        </button>

        {fromOpen && (
          <div className="absolute left-0 right-0 z-20 mt-2 max-h-64 overflow-y-auto rounded-xl border border-border bg-card p-2 shadow-lg">
            {airports.map((airport) => (
              <button
                key={airport.code}
                type="button"
                onClick={() => {
                  setFrom(airport);
                  setFromOpen(false);
                }}
                className="flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-primary-light"
              >
                <span className="rounded-md bg-primary-light px-2 py-1 text-xs font-bold text-primary">
                  {airport.code}
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-heading">
                    {airport.city}
                  </span>

                  <span className="mt-0.5 block truncate text-xs text-muted">
                    {airport.name}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Swap */}
      <button
        type="button"
        onClick={swapAirports}
        aria-label="Swap departure and arrival airports"
        className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-primary transition hover:border-primary hover:bg-primary-light md:mb-1"
      >
        ⇄
      </button>

      {/* To */}
      <div className="relative">
        <label className="mb-1.5 block text-xs font-semibold text-muted">
          To
        </label>

        <button
          type="button"
          onClick={() => {
            setToOpen((prev) => !prev);
            setFromOpen(false);
          }}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-left transition hover:border-primary focus:border-primary focus:outline-none"
        >
          {to ? (
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-heading">
                  {to.code}
                </span>

                <span className="text-sm font-medium text-text">
                  {to.city}
                </span>
              </div>

              <p className="mt-1 truncate text-xs text-muted">
                {to.name}
              </p>
            </div>
          ) : (
            <span className="text-sm text-muted">
              Select arrival airport
            </span>
          )}
        </button>

        {toOpen && (
          <div className="absolute left-0 right-0 z-20 mt-2 max-h-64 overflow-y-auto rounded-xl border border-border bg-card p-2 shadow-lg">
            {airports.map((airport) => (
              <button
                key={airport.code}
                type="button"
                onClick={() => {
                  setTo(airport);
                  setToOpen(false);
                }}
                className="flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-primary-light"
              >
                <span className="rounded-md bg-primary-light px-2 py-1 text-xs font-bold text-primary">
                  {airport.code}
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-heading">
                    {airport.city}
                  </span>

                  <span className="mt-0.5 block truncate text-xs text-muted">
                    {airport.name}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AirportSelector;