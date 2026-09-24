"use client";

import { useState } from "react";

interface Airline {
  id: string;
  name: string;
  count: number;
}

const airlines: Airline[] = [
  {
    id: "indigo",
    name: "IndiGo",
    count: 24,
  },
  {
    id: "air-india",
    name: "Air India",
    count: 12,
  },
  {
    id: "air-india-express",
    name: "Air India Express",
    count: 8,
  },
  {
    id: "akasa-air",
    name: "Akasa Air",
    count: 6,
  },
  {
    id: "spicejet",
    name: "SpiceJet",
    count: 5,
  },
  {
    id: "vistara",
    name: "Vistara",
    count: 3,
  },
];

const AirlinesFilter = () => {
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);

  const handleAirlineChange = (id: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(id)
        ? prev.filter((airlineId) => airlineId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-heading">
          Airlines
        </h3>

        {selectedAirlines.length > 0 && (
          <button
            type="button"
            onClick={() => setSelectedAirlines([])}
            className="text-xs font-semibold text-primary transition hover:text-primary-hover"
          >
            Clear
          </button>
        )}
      </div>

      {/* Airline List */}
      <div className="mt-4 space-y-3">
        {airlines.map((airline) => {
          const isSelected = selectedAirlines.includes(airline.id);

          return (
            <label
              key={airline.id}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 transition hover:bg-primary-light"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleAirlineChange(airline.id)}
                  className="h-4 w-4 rounded border-border text-primary accent-primary focus:ring-primary"
                />

                <span className="text-sm font-medium text-text">
                  {airline.name}
                </span>
              </div>

              <span className="text-xs text-muted">
                {airline.count}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default AirlinesFilter;