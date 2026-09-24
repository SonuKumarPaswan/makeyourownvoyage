"use client";

import { useState } from "react";

interface PopularFilter {
  id: string;
  label: string;
}

const popularFilters: PopularFilter[] = [
  {
    id: "non-stop",
    label: "Non Stop",
  },
  {
    id: "one-stop",
    label: "1 Stop",
  },
  {
    id: "cheapest",
    label: "Cheapest",
  },
  {
    id: "early-departure",
    label: "Early Departure",
  },
  {
    id: "morning-flight",
    label: "Morning Flight",
  },
  {
    id: "refundable",
    label: "Refundable",
  },
];

const PopularFilters = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id)
        ? prev.filter((filterId) => filterId !== id)
        : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-heading">
          Popular Filters
        </h3>

        {selectedFilters.length > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-semibold text-primary transition hover:text-primary-hover"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mt-4 space-y-2">
        {popularFilters.map((filter) => {
          const isSelected = selectedFilters.includes(filter.id);

          return (
            <label
              key={filter.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition ${
                isSelected
                  ? "bg-primary-light"
                  : "hover:bg-primary-light"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleFilterChange(filter.id)}
                className="h-4 w-4 rounded border-border accent-primary"
              />

              <span
                className={`text-sm font-medium ${
                  isSelected ? "text-primary" : "text-text"
                }`}
              >
                {filter.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default PopularFilters;