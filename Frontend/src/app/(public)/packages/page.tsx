import React from "react";
import { getPackages } from "@/lib/api/packages.api";
import type { Package } from "@/types/package";
import PackagesHero from "@/components/packages/PackagesHero";
import PackagesGrid from "@/components/packages/PackagesGrid";

export const metadata = {
  title: "Explore Handcrafted Tour Packages | Make Your Own Voyage",
  description: "Browse bespoke holiday and corporate travel packages across India. Best price guarantee with verified hotels and curated itineraries.",
};

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; destination?: string }>;
}) {
  const resolvedParams = await searchParams;
  let packages: Package[] = [];

  try {
    const res = await getPackages({
      packageType: resolvedParams.type,
      destination: resolvedParams.destination,
      limit: 24,
    });
    packages = res.data || [];
  } catch {
    packages = [];
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <PackagesHero />
      <PackagesGrid packages={packages} activeType={resolvedParams.type || "all"} />
    </div>
  );
}
