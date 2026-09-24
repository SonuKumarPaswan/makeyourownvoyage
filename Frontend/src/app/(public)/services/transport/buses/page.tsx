import React from "react";
import { getTransportByCategory } from "@/lib/api/transport.api";
import type { Transport } from "@/types/transport";
import TransportHero from "@/components/transport/TransportHero";
import TransportFleetGrid from "@/components/transport/TransportFleetGrid";

export const metadata = {
  title: "Volvo & Luxury Bus Booking | Make Your Own Voyage",
  description: "Book AC Multi-Axle Volvo, BharatBenz, and Sleeper buses for corporate groups, weddings, and long-distance intercity tours.",
};

export default async function BusesPage() {
  let buses: Transport[] = [];

  try {
    const res = await getTransportByCategory("Bus");
    buses = res.data || [];
  } catch {
    buses = [];
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TransportHero
        category="Bus"
        title="Volvo & Luxury Coach Charters"
        subtitle="35 to 55-seater Volvo Multi-Axle and BharatBenz coaches for corporate offsites, schools, and weddings."
      />
      <TransportFleetGrid
        items={buses}
        category="Bus"
        heading="Available Luxury Buses"
        subheading="Air-conditioned coaches with pushback seats and onboard entertainment"
      />
    </div>
  );
}
