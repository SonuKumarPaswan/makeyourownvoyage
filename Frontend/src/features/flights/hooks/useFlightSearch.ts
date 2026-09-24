"use client";

import { useCallback, useState } from "react";

import { searchFlights } from "../services/flight.service";
import type {
  Flight,
  FlightSearchParams,
} from "../types/flight.types";

const useFlightSearch = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(
    async (params: FlightSearchParams) => {
      try {
        setLoading(true);
        setError(null);

        const response = await searchFlights(params);

        setFlights(response?.data ?? response ?? []);
      } catch (error) {
        console.error("Flight search error:", error);

        setFlights([]);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch flights"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearResults = () => {
    setFlights([]);
    setError(null);
  };

  return {
    flights,
    loading,
    error,
    search,
    clearResults,
  };
};

export default useFlightSearch;