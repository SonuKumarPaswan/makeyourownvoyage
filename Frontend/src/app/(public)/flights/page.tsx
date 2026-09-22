import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flight Booking",
  description:
    "Book domestic and international flights with Make Your Own Voyage. Compare flight options and find convenient travel options for your journey.",

  alternates: {
    canonical: "/flights",
  },

  openGraph: {
    title: "Flight Booking | Make Your Own Voyage",
    description:
      "Book domestic and international flights with Make Your Own Voyage.",
    url: "https://www.makeyourownvoyage.com/flights",
    type: "website",
  },
};

export default function FlightsPage() {
  return <main>{/* Flights UI */}</main>;
}