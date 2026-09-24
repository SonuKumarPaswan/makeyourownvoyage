"use client";

import { useState } from "react";

export interface FlightFilters {
  stops: string[];
  airlines: string[];
  departureTime: string | null;
  price: number;
  popularFilters: string[];
  smartFilter: string | null;
}

const initialFilters: FlightFilters = {
  stops: [],
  airlines: [],
  departureTime: null,
  price: 50000,
  popularFilters: [],
  smartFilter: null,
};

const useFlightFilters = () => {
  const [filters, setFilters] =
    useState<FlightFilters>(initialFilters);

  // Stops
  const toggleStop = (stop: string) => {
    setFilters((prev) => ({
      ...prev,
      stops: prev.stops.includes(stop)
        ? prev.stops.filter((item) => item !== stop)
        : [...prev.stops, stop],
    }));
  };

  // Airlines
  const toggleAirline = (airline: string) => {
    setFilters((prev) => ({
      ...prev,
      airlines: prev.airlines.includes(airline)
        ? prev.airlines.filter((item) => item !== airline)
        : [...prev.airlines, airline],
    }));
  };

  // Departure Time
  const setDepartureTime = (time: string | null) => {
    setFilters((prev) => ({
      ...prev,
      departureTime: time,
    }));
  };

  // Price
  const setMaxPrice = (price: number) => {
    setFilters((prev) => ({
      ...prev,
      price,
    }));
  };

  // Popular Filters
  const togglePopularFilter = (filter: string) => {
    setFilters((prev) => ({
      ...prev,
      popularFilters: prev.popularFilters.includes(filter)
        ? prev.popularFilters.filter((item) => item !== filter)
        : [...prev.popularFilters, filter],
    }));
  };

  // Smart Filter
  const setSmartFilter = (filter: string | null) => {
    setFilters((prev) => ({
      ...prev,
      smartFilter: filter,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    toggleStop,
    toggleAirline,
    setDepartureTime,
    setMaxPrice,
    togglePopularFilter,
    setSmartFilter,
    clearFilters,
  };
};

export default useFlightFilters;