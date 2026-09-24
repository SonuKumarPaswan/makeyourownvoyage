import FlightCategories from "@/features/flights/components/FlightCategories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flight Booking | Domestic & International Flights",
  description:
    "Book domestic and international flights with Make Your Own Voyage. Search flights, compare options and plan your next journey with convenient flight booking services.",

  keywords: [
    "flight booking",
    "online flight booking",
    "domestic flight booking",
    "international flight booking",
    "cheap flight booking",
    "book flights online",
    "flight tickets",
    "domestic flights",
    "international flights",
    "Make Your Own Voyage",
  ],

  alternates: {
    canonical: "https://www.makeyourownvoyage.com/flights",
  },

  openGraph: {
    title: "Flight Booking | Domestic & International Flights",
    description:
      "Search and book domestic and international flights with Make Your Own Voyage.",
    url: "https://www.makeyourownvoyage.com/flights",
    siteName: "Make Your Own Voyage",
    type: "website",
    images: [
      {
        url: "https://www.makeyourownvoyage.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Flight Booking - Make Your Own Voyage",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Flight Booking | Domestic & International Flights",
    description:
      "Book domestic and international flights with Make Your Own Voyage.",
    images: ["https://www.makeyourownvoyage.com/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function FlightsPage() {
  return (
    <main>
      <FlightCategories/>
    </main>
  );
}