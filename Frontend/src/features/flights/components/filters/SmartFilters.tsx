"use client";

import { useState } from "react";

interface SmartFilter {
  id: string;
  label: string;
  description: string;
}

const smartFilters: SmartFilter[] = [
  {
    id: "cheapest",
    label: "Cheapest",
    description: "Lowest fare",
  },
  {
    id: "fastest",
    label: "Fastest",
    description: "Shortest duration",
  },
  {
    id: "non-stop",
    label: "Non-Stop",
    description: "Direct flights",
  },
  {
    id: "refundable",
    label: "Refundable",
    description: "Flexible booking",
  },
];

const SmartFilters = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-heading">
          Smart Filters
        </h3>

        <p className="mt-1 text-xs text-muted">
          Quickly find the flight that suits you
        </p>
      </div>

      {/* Filter Options */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {smartFilters.map((filter) => {
          const isSelected = selectedFilter === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() =>
                setSelectedFilter(isSelected ? null : filter.id)
              }
              className={`rounded-lg border p-3 text-left transition ${
                isSelected
                  ? "border-primary bg-primary-light"
                  : "border-border bg-card hover:border-primary/40 hover:bg-primary-light"
              }`}
            >
              <span
                className={`block text-sm font-semibold ${
                  isSelected ? "text-primary" : "text-text"
                }`}
              >
                {filter.label}
              </span>

              <span className="mt-1 block text-xs text-muted">
                {filter.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SmartFilters;