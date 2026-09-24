import React from "react";
import { getTransportByCategory } from "@/lib/api/transport.api";
import type { Transport } from "@/types/transport";
import TransportHero from "@/components/transport/TransportHero";
import TransportFleetGrid from "@/components/transport/TransportFleetGrid";

export const metadata = {
  title: "Book Verified Cabs & Taxis | Make Your Own Voyage",
  description: "Affordable and luxury cab rentals across India. Sedan, SUV, Innova Crysta for local sightseeing and outstation road trips.",
};

export default async function CabsPage() {
  let cabs: Transport[] = [];

  try {
    const res = await getTransportByCategory("Cab");
    cabs = res.data || [];
  } catch {
    cabs = [];
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TransportHero
        category="Cab"
        title="Premium Cab & Taxi Fleet"
        subtitle="Outstation one-way, round-trips, and local airport transfers with transparent per-km and per-day pricing."
      />
      <TransportFleetGrid
        items={cabs}
        category="Cab"
        heading="Available Chauffeur-Driven Cabs"
        subheading="Sedans, Premium SUVs, and Luxury Executive Cars"
      />
    </div>
  );
}
