"use client";

import { useState } from "react";

interface Traveller {
  id: "adults" | "children" | "infants";
  label: string;
  description: string;
  min: number;
}

const travellerTypes: Traveller[] = [
  {
    id: "adults",
    label: "Adults",
    description: "12+ years",
    min: 1,
  },
  {
    id: "children",
    label: "Children",
    description: "2-11 years",
    min: 0,
  },
  {
    id: "infants",
    label: "Infants",
    description: "Under 2 years",
    min: 0,
  },
];

const TravellerSelector = () => {
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const updateTraveller = (
    type: "adults" | "children" | "infants",
    value: number
  ) => {
    setTravellers((prev) => ({
      ...prev,
      [type]: Math.max(
        type === "adults" ? 1 : 0,
        Math.min(value, 9)
      ),
    }));
  };

  const totalTravellers =
    travellers.adults +
    travellers.children +
    travellers.infants;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-heading">
            Travellers
          </h3>

          <p className="mt-1 text-xs text-muted">
            Select passengers for your journey
          </p>
        </div>

        <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
          {totalTravellers} Traveller
          {totalTravellers > 1 ? "s" : ""}
        </span>
      </div>

      {/* Traveller Options */}
      <div className="mt-4 space-y-3">
        {travellerTypes.map((traveller) => {
          const count = travellers[traveller.id];

          return (
            <div
              key={traveller.id}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div>
                <p className="text-sm font-semibold text-heading">
                  {traveller.label}
                </p>

                <p className="mt-0.5 text-xs text-muted">
                  {traveller.description}
                </p>
              </div>

              {/* Counter */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    updateTraveller(
                      traveller.id,
                      count - 1
                    )
                  }
                  disabled={count <= traveller.min}
                  aria-label={`Decrease ${traveller.label}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-lg text-text transition hover:border-primary hover:bg-primary-light hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  −
                </button>

                <span className="w-5 text-center text-sm font-bold text-heading">
                  {count}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    updateTraveller(
                      traveller.id,
                      count + 1
                    )
                  }
                  disabled={count >= 9}
                  aria-label={`Increase ${traveller.label}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-lg text-text transition hover:border-primary hover:bg-primary-light hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TravellerSelector;