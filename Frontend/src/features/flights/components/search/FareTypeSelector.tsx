"use client";

import { useState } from "react";

interface FareType {
  id: string;
  label: string;
  description: string;
}

const fareTypes: FareType[] = [
  {
    id: "regular",
    label: "Regular",
    description: "Standard fare",
  },
  {
    id: "student",
    label: "Student",
    description: "Special student fare",
  },
  {
    id: "senior",
    label: "Senior Citizen",
    description: "Special senior fare",
  },
  {
    id: "armed-forces",
    label: "Armed Forces",
    description: "Special defence fare",
  },
];

const FareTypeSelector = () => {
  const [selectedFare, setSelectedFare] = useState("regular");

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-heading">
          Fare Type
        </h3>

        <p className="mt-1 text-xs text-muted">
          Select your preferred fare type
        </p>
      </div>

      {/* Fare Options */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {fareTypes.map((fare) => {
          const isSelected = selectedFare === fare.id;

          return (
            <button
              key={fare.id}
              type="button"
              onClick={() => setSelectedFare(fare.id)}
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
                {fare.label}
              </span>

              <span className="mt-1 block text-xs text-muted">
                {fare.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FareTypeSelector;