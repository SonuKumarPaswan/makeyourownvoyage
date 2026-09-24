"use client";

import { useState } from "react";

interface CabinClass {
  id: string;
  label: string;
  description: string;
}

const cabinClasses: CabinClass[] = [
  {
    id: "E",
    label: "Economy",
    description: "Standard cabin",
  },
  {
    id: "PE",
    label: "Premium Economy",
    description: "Extra comfort",
  },
  {
    id: "B",
    label: "Business",
    description: "Premium experience",
  },
  {
    id: "F",
    label: "First Class",
    description: "Luxury travel",
  },
];

const CabinClassSelector = () => {
  const [selectedClass, setSelectedClass] = useState("E");

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-heading">
          Cabin Class
        </h3>

        <p className="mt-1 text-xs text-muted">
          Select your preferred cabin class
        </p>
      </div>

      {/* Options */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {cabinClasses.map((cabin) => {
          const isSelected = selectedClass === cabin.id;

          return (
            <button
              key={cabin.id}
              type="button"
              onClick={() => setSelectedClass(cabin.id)}
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
                {cabin.label}
              </span>

              <span className="mt-1 block text-xs text-muted">
                {cabin.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CabinClassSelector;