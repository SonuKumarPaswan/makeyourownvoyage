"use client";

import { useState } from "react";

interface FlightCardProps {
  airline?: string;
  airlineCode?: string;
  flightNumber?: string;

  departureTime?: string;
  departureAirport?: string;

  arrivalTime?: string;
  arrivalAirport?: string;

  duration?: string;
  stops?: number;

  price?: number;
  baggage?: string;
  refundable?: boolean;
}

const FlightCard = ({
  airline = "IndiGo",
  airlineCode = "6E",
  flightNumber = "6E 2345",

  departureTime = "06:30",
  departureAirport = "DEL",

  arrivalTime = "08:45",
  arrivalAirport = "BOM",

  duration = "2h 15m",
  stops = 0,

  price = 4850,
  baggage = "15 Kg",
  refundable = true,
}: FlightCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md">
      {/* Top Section */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Airline */}
        <div className="flex items-center gap-3 lg:w-[180px]">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-light text-sm font-bold text-primary">
            {airlineCode}
          </div>

          <div>
            <p className="text-sm font-bold text-heading">
              {airline}
            </p>

            <p className="mt-0.5 text-xs text-muted">
              {flightNumber}
            </p>
          </div>
        </div>

        {/* Flight Route */}
        <div className="flex flex-1 items-center justify-center gap-4">
          {/* Departure */}
          <div className="text-right">
            <p className="text-xl font-bold text-heading">
              {departureTime}
            </p>

            <p className="mt-1 text-sm font-medium text-text">
              {departureAirport}
            </p>
          </div>

          {/* Route */}
          <div className="flex min-w-[120px] flex-col items-center">
            <span className="text-xs text-muted">
              {duration}
            </span>

            <div className="my-2 flex w-full items-center">
              <span className="h-2 w-2 rounded-full bg-primary" />

              <div className="h-px flex-1 bg-border" />

              <span className="h-2 w-2 rounded-full bg-primary" />
            </div>

            <span className="text-xs font-medium text-muted">
              {stops === 0
                ? "Non Stop"
                : `${stops} Stop${stops > 1 ? "s" : ""}`}
            </span>
          </div>

          {/* Arrival */}
          <div>
            <p className="text-xl font-bold text-heading">
              {arrivalTime}
            </p>

            <p className="mt-1 text-sm font-medium text-text">
              {arrivalAirport}
            </p>
          </div>
        </div>

        {/* Price & Action */}
        <div className="border-t border-border pt-4 text-left lg:w-[190px] lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0 lg:text-right">
          <p className="text-xs text-muted">
            Starting from
          </p>

          <p className="mt-1 text-2xl font-bold text-heading">
            ₹{price.toLocaleString("en-IN")}
          </p>

          {refundable && (
            <p className="mt-1 text-xs font-medium text-success">
              Refundable
            </p>
          )}

          <button
            type="button"
            className="mt-3 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover lg:w-auto"
          >
            Select Flight
          </button>
        </div>
      </div>

      {/* Bottom Information */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs text-muted">
            Baggage:{" "}
            <strong className="font-semibold text-text">
              {baggage}
            </strong>
          </span>

          <span className="text-xs text-muted">
            Cabin:{" "}
            <strong className="font-semibold text-text">
              Economy
            </strong>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowDetails((prev) => !prev)}
          className="text-xs font-semibold text-primary transition hover:text-primary-hover"
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>
      </div>

      {/* Details */}
      {showDetails && (
        <div className="mt-4 rounded-xl bg-background p-4">
          <h4 className="text-sm font-bold text-heading">
            Flight Details
          </h4>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted">
                Flight
              </p>
              <p className="mt-1 text-sm font-medium text-text">
                {flightNumber}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted">
                Duration
              </p>
              <p className="mt-1 text-sm font-medium text-text">
                {duration}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted">
                Baggage
              </p>
              <p className="mt-1 text-sm font-medium text-text">
                {baggage}
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default FlightCard;