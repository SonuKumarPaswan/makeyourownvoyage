import React from "react";
import { notFound } from "next/navigation";
import { getDestinationBySlug } from "@/lib/api/destinations.api";
import { getPackages } from "@/lib/api/packages.api";
import type { Destination } from "@/types/destination";
import type { Package } from "@/types/package";
import DestinationDetailHero from "@/components/destinations/DestinationDetailHero";
import DestinationHowToReach from "@/components/destinations/DestinationHowToReach";
import DestinationBestTime from "@/components/destinations/DestinationBestTime";
import DestinationAttractions from "@/components/destinations/DestinationAttractions";
import DestinationRelatedPackages from "@/components/destinations/DestinationRelatedPackages";

interface Props {
  params: Promise<{ stateSlug: string; destSlug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { stateSlug, destSlug } = await params;
  try {
    const res = await getDestinationBySlug(destSlug);
    const dest = res.data;
    if (!dest) return { title: "Destination Not Found" };
    return {
      title: `${dest.name} Travel Guide, Packages & How to Reach | Make Your Own Voyage`,
      description: `Complete travel guide for ${dest.name}. Best time to visit, top attractions, how to reach by air/train/road, and curated tour packages.`,
    };
  } catch {
    return { title: "Destination Travel Guide | Make Your Own Voyage" };
  }
}

export default async function DestinationDetailPage({ params }: Props) {
  const { stateSlug, destSlug } = await params;
  let dest: Destination | null = null;
  let packages: Package[] = [];

  try {
    const res = await getDestinationBySlug(destSlug);
    dest = res.data;
    if (dest?._id) {
      const pkgRes = await getPackages({ destination: dest._id, limit: 6 });
      packages = pkgRes.data || [];
    }
  } catch {
    notFound();
  }

  if (!dest) {
    notFound();
  }

  const stateName = typeof dest.state === "object" ? (dest.state as any)?.name : stateSlug;

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Schema.org TouristDestination */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            name: dest.name,
            description: dest.description || dest.shortDescription,
            image: dest.image,
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: stateName,
            },
          }),
        }}
      />

      <DestinationDetailHero dest={dest} stateSlug={stateSlug} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {/* Overview & Best Time */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="border border-[#e8e3d9] bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold text-[#0a192f]">About {dest.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {dest.description || dest.shortDescription}
            </p>
          </div>

          <DestinationBestTime bestTimeToVisit={dest.bestTimeToVisit} />
        </div>

        <DestinationHowToReach destName={dest.name} howToReach={dest.howToReach} />
        <DestinationAttractions destName={dest.name} attractions={dest.attractions} />
        <DestinationRelatedPackages destName={dest.name} packages={packages} />
      </main>
    </div>
  );
}
