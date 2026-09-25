import React from "react";
import { Metadata } from "next";
import { hotelsApi } from "@/lib/api/hotels.api";
import { HotelsHero } from "@/components/hotels/HotelsHero";
import { HotelsGrid } from "@/components/hotels/HotelsGrid";
import { Hotel } from "@/types/hotel";

export const metadata: Metadata = {
  title: "Hotels & Luxury Resorts | Make Your Own Voyage",
  description: "Book handpicked luxury resorts, heritage palaces, and mountain chalets across India with Make Your Own Voyage.",
};

// Mock fallback stays if backend has empty database initially
const fallbackHotels: Hotel[] = [
  {
    _id: "htl-manali-1",
    name: "The Himalayan Grand Luxury Resort & Spa",
    slug: "himalayan-grand-luxury-resort-manali",
    description: "Nestled amidst Apple Orchards and snowy pine peaks, featuring heated indoor pool, Ayurvedic wellness spa, and fine dining.",
    propertyType: "Resort",
    starCategory: 5,
    destination: "manali",
    location: {
      address: "Hadimba Temple Road, Log Huts Area",
      area: "Old Manali",
      city: "Manali",
      state: "Himachal Pradesh",
      country: "India",
      pincode: "175131",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80", type: "cover", alt: "Himalayan Grand" },
      { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", type: "room", alt: "Deluxe Suite" },
    ],
    rating: { average: 4.9, totalReviews: 128 },
    amenities: ["Free High-Speed WiFi", "Heated Pool", "Spa & Sauna", "Valet Parking", "Multi-Cuisine Buffet"],
    rooms: [
      {
        _id: "r1",
        roomType: "Deluxe Pine View Chalet",
        description: "Private wooden balcony facing Rohtang pass.",
        images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"],
        bedType: "King Bed",
        bedCount: 1,
        occupancy: { adults: 2, children: 1, maxGuests: 3 },
        roomSize: { value: 360, unit: "sqft" },
        amenities: ["WiFi", "Heater", "Balcony"],
        mealPlan: ["Breakfast Included"],
        pricing: { basePrice: 4800, taxPercentage: 18, taxAmount: 864, finalPrice: 5664, currency: "INR" },
        availability: { totalRooms: 10, availableRooms: 4 },
      },
    ],
    status: "active",
    isFeatured: true,
  },
  {
    _id: "htl-goa-2",
    name: "Taj Oceanfront Beach Villa & Suites",
    slug: "taj-oceanfront-beach-villa-goa",
    description: "Exclusive private beach access in North Goa with infinity sea-facing cocktail bar, personal butler, and sunset yacht charters.",
    propertyType: "5 Star",
    starCategory: 5,
    destination: "goa",
    location: {
      address: "Sinquerim Beach Road",
      area: "Candolim",
      city: "Goa",
      state: "Goa",
      country: "India",
      pincode: "403515",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80", type: "cover", alt: "Taj Goa" },
    ],
    rating: { average: 4.8, totalReviews: 210 },
    amenities: ["Private Beach Access", "Infinity Pool", "24/7 Butler", "Seafood Grill"],
    rooms: [
      {
        _id: "r2",
        roomType: "Oceanfront Luxury Villa",
        description: "Direct walk onto the golden sands with private sundeck plunge pool.",
        images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"],
        bedType: "King Bed",
        bedCount: 1,
        occupancy: { adults: 2, children: 1, maxGuests: 3 },
        roomSize: { value: 650, unit: "sqft" },
        amenities: ["Private Pool", "WiFi", "Bathtub"],
        mealPlan: ["Breakfast Included", "Sunset High Tea"],
        pricing: { basePrice: 11500, taxPercentage: 18, taxAmount: 2070, finalPrice: 13570, currency: "INR" },
        availability: { totalRooms: 6, availableRooms: 2 },
      },
    ],
    status: "active",
    isFeatured: true,
  },
  {
    _id: "htl-jaipur-3",
    name: "The Royal Heritage Haveli & Palace",
    slug: "royal-heritage-haveli-jaipur",
    description: "300-year-old royal Rajputana palace restored with hand-painted fresco ceilings, courtyards, and folk cultural dance evenings.",
    propertyType: "Heritage",
    starCategory: 4,
    destination: "jaipur",
    location: {
      address: "Khatipura Road, Near Amber Fort Route",
      area: "Vaishali Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      pincode: "302012",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80", type: "cover", alt: "Jaipur Palace" },
    ],
    rating: { average: 4.7, totalReviews: 95 },
    amenities: ["Courtyard Dining", "Marble Pool", "Folk Dance Shows", "Royal Hospitality"],
    rooms: [
      {
        _id: "r3",
        roomType: "Royal Maharani Suite",
        description: "Antique carved bed with heritage marble bathroom.",
        images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"],
        bedType: "King Bed",
        bedCount: 1,
        occupancy: { adults: 2, children: 0, maxGuests: 2 },
        roomSize: { value: 450, unit: "sqft" },
        amenities: ["WiFi", "Antique Furniture", "Free Breakfast"],
        mealPlan: ["Royal Buffet Breakfast"],
        pricing: { basePrice: 6200, taxPercentage: 18, taxAmount: 1116, finalPrice: 7316, currency: "INR" },
        availability: { totalRooms: 8, availableRooms: 3 },
      },
    ],
    status: "active",
    isFeatured: true,
  },
];

export default async function HotelsPage() {
  let hotels: Hotel[] = [];

  try {
    const res = await hotelsApi.getAllHotels({ limit: 20 });
    if (res && res.data && res.data.length > 0) {
      hotels = res.data;
    } else {
      hotels = fallbackHotels;
    }
  } catch (error) {
    console.error("Hotels page fetch failed:", error);
    hotels = fallbackHotels;
  }

  return (
    <main className="min-h-screen bg-white">
      {/* 1. MakeMyTrip Style Hero Search */}
      <HotelsHero totalHotels={hotels.length} />

      {/* 2. Filtered Hotels Grid Listing */}
      <HotelsGrid hotels={hotels} />
    </main>
  );
}