import React from "react";
import { notFound } from "next/navigation";
import { getPackageBySlug } from "@/lib/api/packages.api";
import type { Package } from "@/types/package";
import PackageDetailHero from "@/components/packages/PackageDetailHero";
import PackageCorporatePerks from "@/components/packages/PackageCorporatePerks";
import PackagePriceSlabs from "@/components/packages/PackagePriceSlabs";
import PackageItineraryTimeline from "@/components/packages/PackageItineraryTimeline";
import PackageInclusions from "@/components/packages/PackageInclusions";
import PackageBookingSticky from "@/components/packages/PackageBookingSticky";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const res = await getPackageBySlug(slug);
    const pkg = res.data;
    if (!pkg) return { title: "Package Not Found" };
    return {
      title: `${pkg.title} | Make Your Own Voyage`,
      description: `Experience ${pkg.title} with luxury stays, guided itineraries, and transparent B2B pricing.`,
    };
  } catch {
    return { title: "Package Details | Make Your Own Voyage" };
  }
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  let pkg: Package | null = null;

  try {
    const res = await getPackageBySlug(slug);
    pkg = res.data;
  } catch {
    notFound();
  }

  if (!pkg) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["TouristTrip", "Product"],
            name: pkg.title,
            description: `Book ${pkg.title} (${pkg.duration}) with luxury itinerary and guaranteed pricing.`,
            image: pkg.image,
            offers: {
              "@type": "Offer",
              priceCurrency: pkg.currency || "INR",
              price: pkg.startingPrice,
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />

      <PackageDetailHero pkg={pkg} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-10 lg:col-span-2">
            <PackageCorporatePerks corporateFacilities={pkg.corporateFacilities} />
            <PackagePriceSlabs priceSlabs={pkg.priceSlabs || []} />
            <PackageItineraryTimeline itinerary={pkg.itinerary || []} />
            <PackageInclusions inclusions={pkg.inclusions} exclusions={pkg.exclusions} />
          </div>

          {/* Right Column Sticky CTA */}
          <div className="lg:col-span-1">
            <PackageBookingSticky pkg={pkg} />
          </div>
        </div>
      </main>
    </div>
  );
}
