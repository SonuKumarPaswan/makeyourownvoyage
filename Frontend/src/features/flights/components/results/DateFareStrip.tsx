"use client";

import { useState } from "react";

interface FareDate {
  id: string;
  day: string;
  date: string;
  month: string;
  price: number;
}

const fareDates: FareDate[] = [
  {
    id: "23-sep",
    day: "Wed",
    date: "23",
    month: "Sep",
    price: 4850,
  },
  {
    id: "24-sep",
    day: "Thu",
    date: "24",
    month: "Sep",
    price: 4520,
  },
  {
    id: "25-sep",
    day: "Fri",
    date: "25",
    month: "Sep",
    price: 5100,
  },
  {
    id: "26-sep",
    day: "Sat",
    date: "26",
    month: "Sep",
    price: 4290,
  },
  {
    id: "27-sep",
    day: "Sun",
    date: "27",
    month: "Sep",
    price: 4650,
  },
  {
    id: "28-sep",
    day: "Mon",
    date: "28",
    month: "Sep",
    price: 4950,
  },
  {
    id: "29-sep",
    day: "Tue",
    date: "29",
    month: "Sep",
    price: 4400,
  },
];

const DateFareStrip = () => {
  const [selectedDate, setSelectedDate] = useState("23-sep");

  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-[1600px] px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Previous */}
          <button
            type="button"
            aria-label="Previous date"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-text transition hover:border-primary hover:bg-primary-light hover:text-primary"
          >
            ←
          </button>

          {/* Dates */}
          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto scrollbar-hide">
            {fareDates.map((item) => {
              const isSelected = selectedDate === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedDate(item.id)}
                  className={`min-w-[125px] shrink-0 rounded-xl border px-4 py-3 text-center transition ${
                    isSelected
                      ? "border-primary bg-primary-light"
                      : "border-border bg-card hover:border-primary/40 hover:bg-primary-light"
                  }`}
                >
                  <p
                    className={`text-xs font-medium ${
                      isSelected ? "text-primary" : "text-muted"
                    }`}
                  >
                    {item.day}
                  </p>

                  <p
                    className={`mt-1 text-sm font-bold ${
                      isSelected ? "text-primary" : "text-heading"
                    }`}
                  >
                    {item.date} {item.month}
                  </p>

                  <p
                    className={`mt-1 text-xs font-semibold ${
                      isSelected ? "text-primary" : "text-text"
                    }`}
                  >
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Next */}
          <button
            type="button"
            aria-label="Next date"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-text transition hover:border-primary hover:bg-primary-light hover:text-primary"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default DateFareStrip;