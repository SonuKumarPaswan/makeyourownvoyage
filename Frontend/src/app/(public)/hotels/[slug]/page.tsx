import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { hotelsApi } from "@/lib/api/hotels.api";
import { HotelDetailHero } from "@/components/hotels/HotelDetailHero";
import { HotelRoomTypes } from "@/components/hotels/HotelRoomTypes";
import { HotelFacilities } from "@/components/hotels/HotelFacilities";
import { HotelPolicies } from "@/components/hotels/HotelPolicies";
import { Hotel } from "@/types/hotel";

interface HotelDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: HotelDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await hotelsApi.getHotelBySlug(slug);
    if (res?.data) {
      return {
        title: `${res.data.name} | Make Your Own Voyage Stays`,
        description: res.data.description?.slice(0, 160),
      };
    }
  } catch (e) {
    // fallback
  }

  return {
    title: "Luxury Hotel Details | Make Your Own Voyage",
    description: "Book verified luxury hotels and resorts across India with zero booking hassle.",
  };
}

// Fallback hotel data if offline/db empty
const getFallbackHotel = (slug: string): Hotel => ({
  _id: "htl-fallback-1",
  name: slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
  slug,
  description:
    "Experience bespoke luxury with panoramic natural views, award-winning multi-cuisine dining, heated swimming pool, and high-speed Wi-Fi throughout the resort premises.",
  propertyType: "Resort",
  starCategory: 5,
  destination: "manali",
  location: {
    address: "Luxury Valley Boulevard, Forest Road",
    area: "Scenic Highlands",
    city: "Manali",
    state: "Himachal Pradesh",
    country: "India",
    pincode: "175131",
  },
  contact: {
    phone: "+91 98765 43210",
    email: "reservations@makeyourownvoyage.com",
  },
  images: [
    { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80", type: "cover", alt: "Property Cover" },
    { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", type: "room", alt: "Room Interior" },
    { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", type: "pool", alt: "Infinity Pool" },
    { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80", type: "dining", alt: "Dining" },
  ],
  rating: { average: 4.9, totalReviews: 88 },
  amenities: ["Free High-Speed WiFi", "Heated Pool", "Ayurvedic Spa", "Valet Parking", "Multi-Cuisine Buffet", "24/7 Butler Service"],
  rooms: [
    {
      _id: "r1",
      roomType: "Deluxe Valley View Room",
      description: "Spacious private balcony overlooking serene pine valley with premium wooden interiors.",
      images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"],
      bedType: "King Size Bed",
      bedCount: 1,
      occupancy: { adults: 2, children: 1, maxGuests: 3 },
      roomSize: { value: 340, unit: "sqft" },
      amenities: ["Free High-Speed WiFi", "Electric Kettle", "Room Heater", "Balcony View", "LED TV"],
      mealPlan: ["Breakfast Included", "Free Welcome Drink"],
      pricing: {
        basePrice: 4200,
        taxPercentage: 18,
        taxAmount: 756,
        finalPrice: 4956,
        currency: "INR",
      },
      availability: { totalRooms: 8, availableRooms: 4 },
    },
    {
      _id: "r2",
      roomType: "Executive Presidential Suite",
      description: "Luxury master bedroom with dedicated living salon, jacuzzi bathtub, and panoramic glass facade.",
      images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"],
      bedType: "Super King Bed",
      bedCount: 1,
      occupancy: { adults: 3, children: 2, maxGuests: 4 },
      roomSize: { value: 580, unit: "sqft" },
      amenities: ["Jacuzzi Bathtub", "24/7 Butler Service", "Espresso Machine", "Mini Bar", "Complimentary Wine"],
      mealPlan: ["Breakfast & Dinner (MAP Plan)", "Complimentary Airport Transfer"],
      pricing: {
        basePrice: 8500,
        taxPercentage: 18,
        taxAmount: 1530,
        finalPrice: 10030,
        currency: "INR",
      },
      availability: { totalRooms: 4, availableRooms: 2 },
    },
  ],
  dining: {
    restaurants: [
      { name: "The Voyage Brasserie", cuisine: ["North Indian", "Continental", "Pan-Asian"], openingTime: "07:00 AM", closingTime: "11:00 PM" },
      { name: "Pine & Sky Cocktail Lounge", cuisine: ["Finger Food", "Cocktails"], openingTime: "05:00 PM", closingTime: "12:00 AM" },
    ],
  },
  facilities: {
    parking: true,
    swimmingPool: true,
    gym: true,
    spa: true,
    restaurant: true,
    conferenceRoom: true,
  },
  checkIn: { time: "14:00 (2:00 PM)", ageRequirement: 18 },
  checkOut: { time: "11:00 (11:00 AM)" },
  policies: {
    couplesAllowed: true,
    localIdsAccepted: true,
    petsAllowed: false,
    childrenAllowed: true,
  },
  cancellationPolicy: {
    type: "Free Cancellation Available",
    freeCancellationBefore: "24 Hours Prior",
    description: "Full refund if cancelled at least 24 hours prior to standard check-in time.",
  },
  status: "active",
  isFeatured: true,
});

export default async function HotelDetailPage({ params }: HotelDetailPageProps) {
  const { slug } = await params;
  let hotel: Hotel;

  try {
    const res = await hotelsApi.getHotelBySlug(slug);
    if (res?.data) {
      hotel = res.data;
    } else {
      hotel = getFallbackHotel(slug);
    }
  } catch (error) {
    console.error("Failed to fetch hotel by slug:", error);
    hotel = getFallbackHotel(slug);
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      {/* 1. Detail Hero with Photo Gallery */}
      <HotelDetailHero hotel={hotel} />

      {/* 2. Room Types & Rates Table */}
      <HotelRoomTypes hotel={hotel} />

      {/* 3. Facilities & Dining */}
      <HotelFacilities hotel={hotel} />

      {/* 4. Hotel Rules & Policies */}
      <HotelPolicies hotel={hotel} />
    </main>
  );
}