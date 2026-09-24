"use client";

import { useState } from "react";

interface StopOption {
  id: string;
  label: string;
  count: number;
}

const stopOptions: StopOption[] = [
  {
    id: "non-stop",
    label: "Non Stop",
    count: 18,
  },
  {
    id: "1-stop",
    label: "1 Stop",
    count: 12,
  },
  {
    id: "2-plus-stops",
    label: "2+ Stops",
    count: 4,
  },
];

const StopsFilter = () => {
  const [selectedStops, setSelectedStops] = useState<string[]>([]);

  const handleStopChange = (id: string) => {
    setSelectedStops((prev) =>
      prev.includes(id)
        ? prev.filter((stopId) => stopId !== id)
        : [...prev, id]
    );
  };

  const clearAll = () => {
    setSelectedStops([]);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-heading">
          Stops
        </h3>

        {selectedStops.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-semibold text-primary transition hover:text-primary-hover"
          >
            Clear
          </button>
        )}
      </div>

      {/* Options */}
      <div className="mt-4 space-y-2">
        {stopOptions.map((option) => {
          const isSelected = selectedStops.includes(option.id);

          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 transition ${
                isSelected
                  ? "bg-primary-light"
                  : "hover:bg-primary-light"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleStopChange(option.id)}
                  className="h-4 w-4 rounded border-border accent-primary"
                />

                <span
                  className={`text-sm font-medium ${
                    isSelected ? "text-primary" : "text-text"
                  }`}
                >
                  {option.label}
                </span>
              </div>

              <span className="text-xs text-muted">
                {option.count}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default StopsFilter;