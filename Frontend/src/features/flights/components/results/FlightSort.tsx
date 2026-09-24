"use client";

import { useState } from "react";

const sortOptions = [
  {
    id: "recommended",
    label: "Recommended",
  },
  {
    id: "cheapest",
    label: "Cheapest",
  },
  {
    id: "fastest",
    label: "Fastest",
  },
  {
    id: "earliest",
    label: "Earliest Departure",
  },
];

const FlightSort = () => {
  const [selectedSort, setSelectedSort] = useState("recommended");

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Title */}
      <div>
        <h3 className="text-sm font-bold text-heading">
          Sort Flights
        </h3>

        <p className="mt-1 text-xs text-muted">
          Choose how you want to view flight results
        </p>
      </div>

      {/* Sort Options */}
      <div className="flex flex-wrap gap-2">
        {sortOptions.map((option) => {
          const isSelected = selectedSort === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelectedSort(option.id)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                isSelected
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-card text-text hover:border-primary/40 hover:bg-primary-light hover:text-primary"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FlightSort;