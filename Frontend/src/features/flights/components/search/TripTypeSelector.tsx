"use client";

import { useState } from "react";

interface TripType {
  id: string;
  label: string;
  description: string;
}

const tripTypes: TripType[] = [
  {
    id: "O",
    label: "One Way",
    description: "Fly to your destination",
  },
  {
    id: "R",
    label: "Round Trip",
    description: "Fly and return",
  },
  {
    id: "M",
    label: "Multi City",
    description: "Visit multiple destinations",
  },
];

const TripTypeSelector = () => {
  const [selectedType, setSelectedType] = useState("O");

  return (
    <div>
      {/* Trip Type Options */}
      <div className="flex flex-wrap gap-2">
        {tripTypes.map((trip) => {
          const isSelected = selectedType === trip.id;

          return (
            <button
              key={trip.id}
              type="button"
              onClick={() => setSelectedType(trip.id)}
              className={`rounded-lg border px-4 py-2.5 text-left transition ${
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
                {trip.label}
              </span>

              <span className="mt-0.5 block text-xs text-muted">
                {trip.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TripTypeSelector;