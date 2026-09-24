import type { FlightSearchParams } from "../types/flight.types";

export async function searchFlights(params: FlightSearchParams) {
  const query = new URLSearchParams();

  if (params.itinerary) {
    query.set("itinerary", params.itinerary);
  }

  if (params.tripType) {
    query.set("tripType", params.tripType);
  }

  if (params.paxType) {
    query.set("paxType", params.paxType);
  }

  if (params.intl) {
    query.set("intl", params.intl);
  }

  if (params.cabinClass) {
    query.set("cabinClass", params.cabinClass);
  }

  if (params.lang) {
    query.set("lang", params.lang);
  }

  const response = await fetch(
    `${process.env.API_URL}/flights/search?${query.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch flight results");
  }

  return response.json();
}