"use client";

import { useState } from "react";

const MIN_PRICE = 1000;
const MAX_PRICE = 50000;

const PriceFilter = () => {
  const [price, setPrice] = useState(MAX_PRICE);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-heading">
          Price
        </h3>

        <span className="text-sm font-semibold text-primary">
          ₹{price.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Price Range */}
      <div className="mt-5">
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={500}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="h-2 w-full cursor-pointer accent-primary"
          aria-label="Maximum flight price"
        />

        {/* Min / Max */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium text-muted">
            ₹{MIN_PRICE.toLocaleString("en-IN")}
          </span>

          <span className="text-xs font-medium text-muted">
            ₹{MAX_PRICE.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Selected Price */}
      <div className="mt-5 flex items-center justify-between rounded-lg bg-primary-light px-3 py-2.5">
        <span className="text-sm text-text">
          Up to
        </span>

        <span className="text-sm font-bold text-primary">
          ₹{price.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
};

export default PriceFilter;