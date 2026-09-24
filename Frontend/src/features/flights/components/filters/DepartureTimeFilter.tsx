"use client";

import { useState } from "react";

const departureTimes = [
  {
    id: "early-morning",
    label: "Early Morning",
    time: "12 AM - 6 AM",
  },
  {
    id: "morning",
    label: "Morning",
    time: "6 AM - 12 PM",
  },
  {
    id: "afternoon",
    label: "Afternoon",
    time: "12 PM - 6 PM",
  },
  {
    id: "evening",
    label: "Evening",
    time: "6 PM - 12 AM",
  },
];

const DepartureTimeFilter = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <h3 className="text-base font-bold text-heading">
        Departure Time
      </h3>

      <p className="mt-1 text-xs text-muted">
        Select your preferred departure time
      </p>

      {/* Options */}
      <div className="mt-4 space-y-2">
        {departureTimes.map((item) => {
          const isSelected = selectedTime === item.id;

          return (
            <label
              key={item.id}
              className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-3 transition ${
                isSelected
                  ? "border-primary bg-primary-light"
                  : "border-border hover:border-primary/40 hover:bg-primary-light"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="departure-time"
                  value={item.id}
                  checked={isSelected}
                  onChange={() => setSelectedTime(item.id)}
                  className="h-4 w-4 accent-primary"
                />

                <div>
                  <p className="text-sm font-medium text-text">
                    {item.label}
                  </p>

                  <p className="mt-0.5 text-xs text-muted">
                    {item.time}
                  </p>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Clear */}
      {selectedTime && (
        <button
          type="button"
          onClick={() => setSelectedTime(null)}
          className="mt-4 text-xs font-semibold text-primary transition hover:text-primary-hover"
        >
          Clear Selection
        </button>
      )}
    </div>
  );
};

export default DepartureTimeFilter;