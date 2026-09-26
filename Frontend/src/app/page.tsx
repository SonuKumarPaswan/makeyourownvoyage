import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import TravelSearch from "@/components/home/TravelSearch";
import TravelStyles from "@/components/home/TravelStyles";
import PopularDestinations from "@/components/home/PopularDestinations";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import HomeBannerSlider from "@/components/home/HomeBannerSlider";
import TourExperiences from "@/components/home/TourExperiences";
import FlightDeals from "@/components/home/FlightDeals";
import HotelDeals from "@/components/home/HotelDeals";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import TravelBlog from "@/components/home/TravelBlog";
import FAQ from "@/components/home/FAQ";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Make Your Own Voyage | Flights, Hotels & Holiday Packages",

  description:
    "Book flights, hotels and holiday packages with Make Your Own Voyage. Explore domestic and international destinations, visa assistance, airport transfers and customized travel experiences.",

  keywords: [
    "Make Your Own Voyage",
    "flight booking",
    "hotel booking",
    "holiday packages",
    "tour packages",
    "travel agency",
    "domestic tour packages",
    "international holiday packages",
    "visa assistance",
    "airport transfers",
  ],

  alternates: {
    canonical: "https://www.makeyourownvoyage.com/",
  },

  openGraph: {
    title: "Make Your Own Voyage | Flights, Hotels & Holiday Packages",

    description:
      "Book flights, hotels and holiday packages with Make Your Own Voyage. Explore destinations and plan your next journey.",

    url: "https://www.makeyourownvoyage.com/",
    siteName: "Make Your Own Voyage",
    type: "website",

    images: [
      {
        url: "https://www.makeyourownvoyage.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Make Your Own Voyage - Travel and Holiday Packages",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Make Your Own Voyage | Flights, Hotels & Holiday Packages",

    description:
      "Book flights, hotels and holiday packages with Make Your Own Voyage.",

    images: ["https://www.makeyourownvoyage.com/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

import { getHomepageFeed } from "@/lib/api/homepage-feed";
import { getPackages } from "@/lib/api/packages.api";
import { getDestinations } from "@/lib/api/destinations.api";
import { getStates } from "@/lib/api/states.api";
import { hotelsApi } from "@/lib/api/hotels.api";
import type { Collection } from "@/types/homepage-feed";

export default async function HomePage() {
  let feedData = null;
  let packagesData = null;
  let destinationsData = null;
  let statesData = null;
  let hotelsData = null;

  try {
    const [feedRes, pkgRes, destRes, statesRes, hotelRes] = await Promise.all([
      getHomepageFeed().catch(() => null),
      getPackages({ limit: 12 }).catch(() => null),
      getDestinations({ limit: 12 }).catch(() => null),
      getStates().catch(() => null),
      hotelsApi.getAllHotels({ limit: 10 }).catch(() => null),
    ]);
    feedData = feedRes;
    packagesData = Array.isArray(pkgRes?.data) ? pkgRes.data : [];
    destinationsData = Array.isArray(destRes?.data) ? destRes.data : [];
    statesData = Array.isArray(statesRes?.data) ? statesRes.data : [];
    hotelsData = Array.isArray((hotelRes as any)?.data?.hotels)
      ? (hotelRes as any).data.hotels
      : Array.isArray((hotelRes as any)?.hotels)
      ? (hotelRes as any).hotels
      : Array.isArray((hotelRes as any)?.data)
      ? (hotelRes as any).data
      : [];
  } catch (error) {
    console.error("Failed to fetch backend homepage data:", error);
  }

  return (
    <>
      <Hero initialFeed={feedData} initialPackages={packagesData} />

      <TravelSearch />

      <TravelStyles />

      <PopularDestinations
        initialDestinations={destinationsData}
        initialStates={statesData}
      />

      <FeaturedPackages />

      <HomeBannerSlider />

      <HotelDeals initialHotels={hotelsData} />

      <FlightDeals />
      <TourExperiences />


      <WhyChooseUs />

      <HowItWorks />

      <Testimonials />

      <TravelBlog />

      <FAQ />

      <CTASection />
    </>
  );
}