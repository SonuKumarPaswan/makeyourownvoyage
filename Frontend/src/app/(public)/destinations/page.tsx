import React from "react";
import { getDestinations } from "@/lib/api/destinations.api";
import type { Destination } from "@/types/destination";
import DestinationsHero from "@/components/destinations/DestinationsHero";
import DestinationsGrid from "@/components/destinations/DestinationsGrid";

export const metadata = {
  title: "Top Tourist Destinations in India | Make Your Own Voyage",
  description: "Explore top tourist destinations across India. Hill stations, beaches, heritage forts, and pilgrimage hubs with comprehensive travel guides and packages.",
};

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const resolvedParams = await searchParams;
  let destinations: Destination[] = [];

  try {
    const res = await getDestinations({
      type: resolvedParams.type,
      limit: 30,
    });
    destinations = res.data || [];
  } catch {
    destinations = [];
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <DestinationsHero />
      <DestinationsGrid
        destinations={destinations}
        activeType={resolvedParams.type || "all"}
      />
    </div>
  );
}
