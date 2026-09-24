import type { Flight } from "../types/flight.types";

/**
 * Format flight price
 */
export const formatFlightPrice = (price: number): string => {
  return `₹${price.toLocaleString("en-IN")}`;
};

/**
 * Get stops label
 */
export const getStopsLabel = (stops: number): string => {
  if (stops === 0) {
    return "Non Stop";
  }

  if (stops === 1) {
    return "1 Stop";
  }

  return `${stops} Stops`;
};

/**
 * Sort flights by price
 */
export const sortFlightsByPrice = (
  flights: Flight[],
  order: "asc" | "desc" = "asc"
): Flight[] => {
  return [...flights].sort((a, b) =>
    order === "asc"
      ? a.price - b.price
      : b.price - a.price
  );
};

/**
 * Sort flights by duration
 * Example: "2h 30m" -> minutes
 */
export const getDurationInMinutes = (
  duration: string
): number => {
  const hours = duration.match(/(\d+)h/);
  const minutes = duration.match(/(\d+)m/);

  const hourValue = hours ? Number(hours[1]) : 0;
  const minuteValue = minutes ? Number(minutes[1]) : 0;

  return hourValue * 60 + minuteValue;
};

export const sortFlightsByDuration = (
  flights: Flight[]
): Flight[] => {
  return [...flights].sort(
    (a, b) =>
      getDurationInMinutes(a.duration) -
      getDurationInMinutes(b.duration)
  );
};

/**
 * Get airline display name
 */
export const getAirlineLabel = (flight: Flight): string => {
  return `${flight.airline} (${flight.airlineCode})`;
};