import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TravelSearch from "@/components/home/TravelSearch";
import PopularDestinations from "@/components/home/PopularDestinations";
import FeaturedPackages from "@/components/home/FeaturedPackages";
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

export default async function HomePage() {
 

  return (
    <>
      <Hero />

      <TravelSearch />

      <PopularDestinations />

      <FeaturedPackages />

      <FlightDeals />

      <HotelDeals />

      <WhyChooseUs />

      <HowItWorks />

      <Testimonials />

      <TravelBlog />

      <FAQ />

      <CTASection />
    </>
  );
}