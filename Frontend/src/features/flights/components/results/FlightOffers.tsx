"use client";

import { useState } from "react";

interface FlightOffer {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
}

const flightOffers: FlightOffer[] = [
  {
    id: "domestic",
    title: "Domestic Flight Offer",
    description: "Save on selected domestic flights.",
    discount: "Up to ₹500 OFF",
    code: "FLY500",
  },
  {
    id: "international",
    title: "International Flight Offer",
    description: "Get special fares on international flights.",
    discount: "Up to ₹2,000 OFF",
    code: "FLY2000",
  },
  {
    id: "new-user",
    title: "New User Offer",
    description: "Special discount for your first booking.",
    discount: "₹750 OFF",
    code: "WELCOME750",
  },
];

const FlightOffers = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);

      setTimeout(() => {
        setCopiedCode(null);
      }, 2000);
    } catch {
      setCopiedCode(null);
    }
  };

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-heading">
          Flight Offers
        </h2>

        <p className="mt-1 text-sm text-muted">
          Save more on your flight booking with these offers.
        </p>
      </div>

      {/* Offers */}
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {flightOffers.map((offer) => (
          <div
            key={offer.id}
            className="rounded-xl border border-border bg-background p-4 transition hover:border-primary/40 hover:shadow-sm"
          >
            {/* Discount */}
            <span className="inline-flex rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-primary">
              {offer.discount}
            </span>

            {/* Content */}
            <h3 className="mt-3 text-sm font-bold text-heading">
              {offer.title}
            </h3>

            <p className="mt-1 text-xs leading-5 text-muted">
              {offer.description}
            </p>

            {/* Coupon */}
            <div className="mt-4 flex items-center justify-between gap-2">
              <div className="rounded-lg border border-dashed border-border bg-card px-3 py-2">
                <span className="text-xs font-bold tracking-wide text-text">
                  {offer.code}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(offer.code)}
                className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary-hover"
              >
                {copiedCode === offer.code ? "Copied" : "Copy Code"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlightOffers;