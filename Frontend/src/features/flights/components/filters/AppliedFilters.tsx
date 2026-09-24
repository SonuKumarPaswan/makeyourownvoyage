"use client";

import { useState } from "react";

const AppliedFilters = () => {
  const [filters, setFilters] = useState([
    {
      id: "non-stop",
      label: "Non Stop",
    },
  ]);

  const removeFilter = (id: string) => {
    setFilters((prev) => prev.filter((filter) => filter.id !== id));
  };

  const clearAll = () => {
    setFilters([]);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-heading">
          Applied Filters
        </h3>

        {filters.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-semibold text-primary transition hover:text-primary-hover"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filters */}
      {filters.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <div
              key={filter.id}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3 py-1.5 text-sm font-medium text-primary"
            >
              <span>{filter.label}</span>

              <button
                type="button"
                onClick={() => removeFilter(filter.id)}
                aria-label={`Remove ${filter.label} filter`}
                className="flex h-4 w-4 items-center justify-center rounded-full text-primary transition hover:bg-primary hover:text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted">
          No filters applied.
        </p>
      )}
    </div>
  );
};

export default AppliedFilters;