import React from "react";
import { getTransportByCategory } from "@/lib/api/transport.api";
import type { Transport } from "@/types/transport";
import TransportHero from "@/components/transport/TransportHero";
import TransportFleetGrid from "@/components/transport/TransportFleetGrid";

export const metadata = {
  title: "12, 17, 26 Seater Tempo Traveller Rentals | Make Your Own Voyage",
  description: "Rent Force Urbania and luxury Tempo Travellers for group tours, family getaways, and corporate offsites with pushback seats and AC.",
};

export default async function TravellerPage() {
  let travellers: Transport[] = [];

  try {
    const res = await getTransportByCategory("Traveller");
    travellers = res.data || [];
  } catch {
    travellers = [];
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TransportHero
        category="Traveller"
        title="Luxury Tempo Travellers"
        subtitle="12, 17, 20, and 26-seater Force Urbania and Maharaja Travellers with 1x1 Maharaja pushback seating."
      />
      <TransportFleetGrid
        items={travellers}
        category="Traveller"
        heading="Available Tempo Travellers"
        subheading="Ideal for 8 to 26 passenger group holidays & corporate offsites"
      />
    </div>
  );
}
