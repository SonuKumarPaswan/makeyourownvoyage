"use client";

import React, { useState } from "react";
import Image from "next/image";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Hotel, HotelRoom } from "@/types/hotel";
import { Button } from "@/components/ui/Button";

interface HotelRoomTypesProps {
  hotel: Hotel;
  onSelectRoom?: (room: HotelRoom) => void;
}

export const HotelRoomTypes: React.FC<HotelRoomTypesProps> = ({
  hotel,
  onSelectRoom,
}) => {
  // Default mock rooms if backend has none in seed
  const rooms: HotelRoom[] =
    hotel.rooms && hotel.rooms.length > 0
      ? hotel.rooms
      : [
        {
          _id: "room-deluxe-1",
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
          _id: "room-suite-2",
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
      ];

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0a192f] text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-2">
            <MaterialIcon name="auto_awesome" size={14} />
            MakeMyTrip Verified Inventory
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#0a192f]">
            Select Your <span className="text-[#d4af37]">Room Type & Plan</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-light mt-1">
            Transparent pricing with all taxes & service breakdown. Zero hidden surcharges.
          </p>
        </div>

        <div className="space-y-6">
          {rooms.map((room) => {
            const roomImage =
              room.images && room.images.length > 0
                ? room.images[0]
                : "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80";

            return (
              <div
                key={room._id}
                className="border-2 border-gray-200 hover:border-[#d4af37] transition-colors p-5 sm:p-6 bg-white flex flex-col lg:flex-row gap-6 shadow-sm"
              >
                {/* Left: Room Thumbnail & Specs */}
                <div className="lg:w-1/3 flex flex-col">
                  <div className="relative h-48 w-full bg-gray-900 overflow-hidden mb-3">
                    <Image
                      src={roomImage}
                      alt={room.roomType}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-[#0a192f] uppercase tracking-wide mb-2">
                    {room.roomType}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1.5 font-medium">
                      <MaterialIcon name="square_foot" size={14} className="text-[#d4af37]" />
                      {room.roomSize?.value || 320} {room.roomSize?.unit || "sqft"}
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <MaterialIcon name="bed" size={14} className="text-[#d4af37]" />
                      {room.bedType || "King Bed"}
                    </div>
                    <div className="flex items-center gap-1.5 font-medium col-span-2">
                      <MaterialIcon name="group" size={14} className="text-[#d4af37]" />
                      Max {room.occupancy?.maxGuests || 3} Guests ({room.occupancy?.adults || 2} Adults, {room.occupancy?.children || 1} Child)
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 font-light">
                    {room.description}
                  </p>
                </div>

                {/* Middle: Amenities & Meal Plans */}
                <div className="lg:w-5/12 border-t lg:border-t-0 lg:border-l lg:border-r border-gray-200 pt-4 lg:pt-0 lg:px-6 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Included In This Plan:
                    </h4>
                    <div className="space-y-2 mb-4">
                      {room.mealPlan && room.mealPlan.length > 0 ? (
                        room.mealPlan.map((mp, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 p-2 border border-green-200">
                            <MaterialIcon name="coffee" size={16} className="text-green-600 shrink-0" />
                            {mp}
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-700 bg-gray-50 p-2 border border-gray-200">
                          <MaterialIcon name="check" size={16} className="text-gray-600 shrink-0" />
                          Room Only Plan (EP)
                        </div>
                      )}
                    </div>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Room Amenities:
                    </h4>
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-gray-600">
                      {room.amenities?.map((amenity, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <MaterialIcon name="check" size={12} className="text-[#d4af37]" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-500">
                    <MaterialIcon name="verified_user" size={16} className="text-[#d4af37]" />
                    Free cancellation up to 24 hours prior to check-in
                  </div>
                </div>

                {/* Right: Pricing Breakdown & Select Button */}
                <div className="lg:w-1/4 flex flex-col justify-between pt-4 lg:pt-0">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                      Price per night
                    </span>
                    <div className="flex items-baseline justify-end gap-1 my-1">
                      <span className="text-2xl font-black text-[#0a192f]">
                        ₹{room.pricing?.finalPrice ? room.pricing.finalPrice.toLocaleString("en-IN") : (room.pricing?.basePrice || 4200).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 block">
                      + ₹{room.pricing?.taxAmount || Math.round((room.pricing?.basePrice || 4200) * 0.18)} (18% GST)
                    </span>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider">
                      Best Price Guaranteed
                    </span>
                  </div>

                  <div className="mt-6">
                    <Button
                      onClick={() => onSelectRoom && onSelectRoom(room)}
                      variant="primary"
                      size="md"
                      className="w-full uppercase tracking-widest text-xs font-bold py-3"
                    >
                      Select Room
                    </Button>
                    <span className="text-[10px] text-center text-gray-400 block mt-2">
                      Only {room.availability?.availableRooms || 3} rooms left at this price
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
