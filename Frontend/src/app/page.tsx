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
import { getHomepageFeed } from "@/lib/api/homepage-feed";



export default async function HomePage() {

  const feed = await getHomepageFeed()
 

  return (
    <>
      <Hero data={feed.data.seasonalSection.collections} />
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