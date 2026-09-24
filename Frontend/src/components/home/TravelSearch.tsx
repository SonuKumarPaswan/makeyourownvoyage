"use client";

import React, { useState } from "react";
import Link from "next/link";

type SearchType = "flights" | "hotels" | "cabs" | "packages";

const TravelSearch = () => {
  const [activeTab, setActiveTab] = useState<SearchType>("flights");

  const tabs = [
    {
      id: "flights" as SearchType,
      label: "Flights",
      icon: "✈️",
    },
    {
      id: "hotels" as SearchType,
      label: "Hotels",
      icon: "🏨",
    },
    {
      id: "cabs" as SearchType,
      label: "Cabs",
      icon: "🚕",
    },
    {
      id: "packages" as SearchType,
      label: "Packages",
      icon: "🌴",
    },
  ];

  return (
    <section className="relative z-20 -mt-34 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
          {/* Tabs */}
          <div className="border-b border-border bg-white px-4 pt-4 sm:px-6">
            <div className="flex gap-2 overflow-x-auto pb-0">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition sm:px-6 ${
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted hover:text-primary"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Content */}
          <div className="p-5 sm:p-6 lg:p-8">
            {/* Flight Search */}
            {activeTab === "flights" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-heading sm:text-2xl">
                    Search Flights
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Find and book flights at the best available prices.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-4">
                  <SearchInput
                    label="From"
                    placeholder="Delhi"
                    icon="📍"
                  />

                  <SearchInput
                    label="To"
                    placeholder="Mumbai"
                    icon="📍"
                  />

                  <SearchInput
                    label="Departure"
                    placeholder="Select date"
                    type="date"
                    icon="📅"
                  />

                  <SearchInput
                    label="Travellers"
                    placeholder="1 Traveller"
                    icon="👤"
                  />
                </div>

                <div className="mt-5 flex justify-end">
                  <Link
                    href="/flights"
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 font-semibold text-white transition hover:bg-primary-hover"
                  >
                    Search Flights
                  </Link>
                </div>
              </div>
            )}

            {/* Hotel Search */}
            {activeTab === "hotels" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-heading sm:text-2xl">
                    Find Hotels
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Discover comfortable stays for your next trip.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-4">
                  <SearchInput
                    label="Destination"
                    placeholder="Goa"
                    icon="📍"
                  />

                  <SearchInput
                    label="Check-in"
                    placeholder="Select date"
                    type="date"
                    icon="📅"
                  />

                  <SearchInput
                    label="Check-out"
                    placeholder="Select date"
                    type="date"
                    icon="📅"
                  />

                  <SearchInput
                    label="Guests"
                    placeholder="2 Guests"
                    icon="👤"
                  />
                </div>

                <div className="mt-5 flex justify-end">
                  <Link
                    href="/hotels"
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 font-semibold text-white transition hover:bg-primary-hover"
                  >
                    Search Hotels
                  </Link>
                </div>
              </div>
            )}

            {/* Cab Search */}
            {activeTab === "cabs" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-heading sm:text-2xl">
                    Book a Cab
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Get reliable rides for airport transfers and local travel.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                  <SearchInput
                    label="Pickup Location"
                    placeholder="Enter pickup location"
                    icon="📍"
                  />

                  <SearchInput
                    label="Drop Location"
                    placeholder="Enter drop location"
                    icon="📍"
                  />

                  <SearchInput
                    label="Pickup Date"
                    placeholder="Select date"
                    type="date"
                    icon="📅"
                  />
                </div>

                <div className="mt-5 flex justify-end">
                  <Link
                    href="/cabs"
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 font-semibold text-white transition hover:bg-primary-hover"
                  >
                    Search Cabs
                  </Link>
                </div>
              </div>
            )}

            {/* Package Search */}
            {activeTab === "packages" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-heading sm:text-2xl">
                    Explore Tour Packages
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Choose from exciting holiday packages and destinations.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                  <SearchInput
                    label="Destination"
                    placeholder="Goa, Manali, Dubai..."
                    icon="🌴"
                  />

                  <SearchInput
                    label="Travel Date"
                    placeholder="Select date"
                    type="date"
                    icon="📅"
                  />

                  <SearchInput
                    label="Travellers"
                    placeholder="2 Travellers"
                    icon="👤"
                  />
                </div>

                <div className="mt-5 flex justify-end">
                  <Link
                    href="/packages"
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 font-semibold text-white transition hover:bg-primary-hover"
                  >
                    Explore Packages
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const SearchInput = ({
  label,
  placeholder,
  icon,
  type = "text",
}: {
  label: string;
  placeholder: string;
  icon: string;
  type?: string;
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-heading">
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
          {icon}
        </span>

        <input
          type={type}
          placeholder={placeholder}
          className="h-14 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
        />
      </div>
    </div>
  );
};

export default TravelSearch;