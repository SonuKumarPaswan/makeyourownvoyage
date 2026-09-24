import React from "react";
import { getTransportByCategory } from "@/lib/api/transport.api";
import type { Transport } from "@/types/transport";
import TransportHero from "@/components/transport/TransportHero";
import TransportFleetGrid from "@/components/transport/TransportFleetGrid";

export const metadata = {
  title: "Self-Drive Bike Rentals (Royal Enfield, Himalayan, Scooters) | Make Your Own Voyage",
  description: "Rent Royal Enfield Classic, Himalayan, and scooters in Manali, Leh, Goa, and Rishikesh. Verified bikes with helmets and 24/7 roadside assistance.",
};

export default async function BikesPage() {
  let bikes: Transport[] = [];

  try {
    const res = await getTransportByCategory("Bike");
    bikes = res.data || [];
  } catch {
    bikes = [];
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TransportHero
        category="Bike"
        title="Premium Motorcycle & Scooter Rentals"
        subtitle="Ride Royal Enfield Himalayans, Classic 350s, and Scooters across Ladakh, Spiti, Manali, and Goa."
      />
      <TransportFleetGrid
        items={bikes}
        category="Bike"
        heading="Available Self-Drive Motorcycles"
        subheading="Well-maintained fleet with complimentary helmets and tools"
      />
    </div>
  );
}
