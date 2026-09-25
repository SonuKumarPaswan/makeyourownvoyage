"use client";

import React from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Hotel } from "@/types/hotel";

interface HotelPoliciesProps {
  hotel: Hotel;
}

export const HotelPolicies: React.FC<HotelPoliciesProps> = ({ hotel }) => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#0a192f]">
            Hotel Rules & <span className="text-[#d4af37]">Booking Policies</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-light mt-1">
            Important guidelines and standard hotel policies for smooth check-in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Check-In / Check-Out */}
          <div className="border border-gray-200 p-6 bg-[#f8f9fa]">
            <div className="flex items-center gap-2 text-[#0a192f] font-bold text-sm uppercase tracking-wider mb-4">
              <MaterialIcon name="schedule" size={16} className="text-[#d4af37]" /> Timings
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Standard Check-In</span>
                <span className="font-bold text-[#0a192f]">{hotel.checkIn?.time || "14:00 (2:00 PM)"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Standard Check-Out</span>
                <span className="font-bold text-[#0a192f]">{hotel.checkOut?.time || "11:00 (11:00 AM)"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Min. Age Requirement</span>
                <span className="font-bold text-[#0a192f]">{hotel.checkIn?.ageRequirement || 18} Years</span>
              </div>
            </div>
          </div>

          {/* Guest Rules */}
          <div className="border border-gray-200 p-6 bg-[#f8f9fa]">
            <div className="flex items-center gap-2 text-[#0a192f] font-bold text-sm uppercase tracking-wider mb-4">
              <MaterialIcon name="verified_user" size={16} className="text-[#d4af37]" /> Guest Guidelines
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-700">
                {hotel.policies?.couplesAllowed ?? true ? (
                  <MaterialIcon name="check" size={16} className="text-green-600 shrink-0" />
                ) : (
                  <MaterialIcon name="close" size={16} className="text-red-500 shrink-0" />
                )}
                <span>Couples & Unmarried Guests Welcome</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                {hotel.policies?.localIdsAccepted ?? true ? (
                  <MaterialIcon name="check" size={16} className="text-green-600 shrink-0" />
                ) : (
                  <MaterialIcon name="close" size={16} className="text-red-500 shrink-0" />
                )}
                <span>Local IDs Accepted with Valid Gov. Photo ID</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                {hotel.policies?.petsAllowed ? (
                  <MaterialIcon name="check" size={16} className="text-green-600 shrink-0" />
                ) : (
                  <MaterialIcon name="close" size={16} className="text-gray-400 shrink-0" />
                )}
                <span>{hotel.policies?.petsAllowed ? "Pets are allowed" : "Pets are not allowed"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                {hotel.policies?.childrenAllowed ?? true ? (
                  <MaterialIcon name="check" size={16} className="text-green-600 shrink-0" />
                ) : (
                  <MaterialIcon name="close" size={16} className="text-gray-400 shrink-0" />
                )}
                <span>Children & Families Allowed</span>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="border border-gray-200 p-6 bg-[#f8f9fa]">
            <div className="flex items-center gap-2 text-[#0a192f] font-bold text-sm uppercase tracking-wider mb-4">
              <MaterialIcon name="description" size={16} className="text-[#d4af37]" /> Cancellation Policy
            </div>
            <div className="text-xs text-gray-600 leading-relaxed">
              <span className="font-bold text-green-700 block mb-1">
                {hotel.cancellationPolicy?.type || "Free Cancellation"}
              </span>
              <p className="font-light">
                {hotel.cancellationPolicy?.description ||
                  "Cancel up to 24 hours before check-in for a 100% refund. Cancellations made within 24 hours of check-in may incur a 1-night retention charge."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
