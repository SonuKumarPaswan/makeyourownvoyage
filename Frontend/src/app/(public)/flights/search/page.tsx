import type { Metadata } from "next";

import FlightSearchBar from "@/features/flights/components/search/FlightSearchBar";

import DateFareStrip from "@/features/flights/components/results/DateFareStrip";
import FlightOffers from "@/features/flights/components/results/FlightOffers";
import FlightResults from "@/features/flights/components/results/FlightResults";
import FlightSort from "@/features/flights/components/results/FlightSort";

import AppliedFilters from "@/features/flights/components/filters/AppliedFilters";
import AirlinesFilter from "@/features/flights/components/filters/AirlinesFilter";
import DepartureTimeFilter from "@/features/flights/components/filters/DepartureTimeFilter";
import PopularFilters from "@/features/flights/components/filters/PopularFilters";
import PriceFilter from "@/features/flights/components/filters/PriceFilter";
import SmartFilters from "@/features/flights/components/filters/SmartFilters";
import StopsFilter from "@/features/flights/components/filters/StopsFilter";

interface FlightSearchPageProps {
  searchParams: Promise<{
    itinerary?: string;
    tripType?: string; 
    paxType?: string;
    intl?: string;
    cabinClass?: string;
    lang?: string;
  }>;
}

/**
 * Extract route information from:
 * DEL-BOM-23/09/2026
 */

function getFlightRoute(itinerary?: string) {
  if (!itinerary) {
    return {
      from: "",
      to: "",
      date: "",
    };
  }

  const parts = itinerary.split("-");

  return {
    from: parts[0] || "",
    to: parts[1] || "",
    date: parts.slice(2).join("-") || "",
  };
}

/**
 * Dynamic SEO metadata
 */
export async function generateMetadata({
  searchParams,
}: FlightSearchPageProps): Promise<Metadata> {
  const params = await searchParams;

  const { from, to, date } = getFlightRoute(params.itinerary);

  const route =
    from && to
      ? `Flights from ${from} to ${to}`
      : "Flight Search Results";

  const title = `${route} | Make Your Own Voyage`;

  const description =
    from && to
      ? `Search available flights from ${from} to ${to}${date ? ` for ${date}` : ""}. Compare flight options, fares, timings and airlines with Make Your Own Voyage.`
      : "Search and compare available domestic and international flights with Make Your Own Voyage.";

  return {
    title,
    description,

    robots: {
      index: false,
      follow: true,
    },

    alternates: {
      canonical: "https://www.makeyourownvoyage.com/flights/search",
    },

    openGraph: {
      title,
      description,
      siteName: "Make Your Own Voyage",
      type: "website",
      url: "https://www.makeyourownvoyage.com/flights/search",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function FlightSearchPage({
  searchParams,
}: FlightSearchPageProps) {
  const params = await searchParams;

  const { from, to } = getFlightRoute(params.itinerary);

  const heading =
    from && to
      ? `Flights from ${from} to ${to}`
      : "Flight Search Results";

  return (
    <main className="min-h-screen bg-background">
      {/* Flight Search */}
      <FlightSearchBar />

      {/* Date & Fare */}
      <DateFareStrip />

      <div className="mx-auto max-w-[1600px] px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* =========================
              LEFT FILTER SIDEBAR
          ========================== */}
          <aside className="space-y-4">
            <AppliedFilters />

            <SmartFilters />

            <PopularFilters />

            <StopsFilter />

            <AirlinesFilter />

            <DepartureTimeFilter />

            <PriceFilter />
          </aside>

          {/* =========================
              FLIGHT RESULTS
          ========================== */}
          <section className="min-w-0">
            {/* H1 */}
            <div className="mb-5">
              <h1 className="text-2xl font-bold text-heading sm:text-3xl">
                {heading}
              </h1>

              <p className="mt-2 text-sm text-muted">
                Compare available flights, fares, timings and airlines
                for your journey.
              </p>
            </div>

            {/* Offers */}
            <FlightOffers />

            {/* Sort */}
            <div className="mt-4">
              <FlightSort />
            </div>

            {/* Results */}
            <div className="mt-4">
              <FlightResults />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}