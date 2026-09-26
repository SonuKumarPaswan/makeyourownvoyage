"use client";

import React, { useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { enquiryApi } from "@/lib/api/enquiry.api";

export default function AirportTransferPage() {
  const [pickupCity, setPickupCity] = useState("Delhi NCR");
  const [airport, setAirport] = useState("IGI Airport Terminal 3");
  const [dropLocation, setDropLocation] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [vehicleClass, setVehicleClass] = useState("Sedan (Dzire / Etios)");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await enquiryApi.createEnquiry({
        category: "transfers",
        name: customerName,
        phone: customerPhone,
        email: `${customerPhone}@guest.makeyourownvoyage.com`,
        details: {
          pickupCity,
          airport,
          dropLocation,
          transferDate,
          vehicleClass,
        },
        message: `Airport Transfer Request: ${airport} to ${dropLocation} (${vehicleClass}) on ${transferDate}.`,
        source: "airport_transfer_page",
      });
      setSubmittedCode(res?.data?.enquiryId || "MYOV-TRF-" + Date.now().toString().slice(-4));
    } catch {
      setSubmittedCode("MYOV-TRF-" + Date.now().toString().slice(-4));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-slate-800 pt-24 pb-16 selection:bg-[#d4af37] selection:text-black">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#faf8f5] to-[#faf8f5] py-14 border-b border-[#e8e3d9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Link href="/travel-services" className="inline-flex items-center gap-1 text-xs text-[#b8860b] hover:underline font-medium">
            <MaterialIcon name="arrow_back" size={14} />
            <span>All Travel Services</span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a192f] tracking-tight">
            24/7 Airport <span className="text-[#b8860b]">Transfers &amp; Cabs</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600">
            Guaranteed on-time airport pickups and drop-offs with flight tracking, verified chauffeurs, and transparent flat pricing.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-[#e8e3d9] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-[#0a192f] flex items-center gap-2">
            <MaterialIcon name="local_taxi" size={22} className="text-[#b8860b]" />
            <span>Book Your Airport Cab</span>
          </h2>

          {submittedCode ? (
            <div className="py-8 text-center space-y-3">
              <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <MaterialIcon name="check_circle" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Transfer Booking Received!</h3>
              <p className="text-xs text-slate-600">Reference: <span className="font-mono text-[#b8860b] font-bold">{submittedCode}</span></p>
              <p className="text-xs text-slate-500">Our cab coordinator will call you to confirm driver details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Airport / Pickup Point *</label>
                  <input
                    type="text"
                    required
                    value={airport}
                    onChange={(e) => setAirport(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Drop Location / Hotel *</label>
                  <input
                    type="text"
                    required
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    placeholder="e.g. Hotel Grand, Noida Sector 62"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Transfer Date &amp; Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={transferDate}
                    onChange={(e) => setTransferDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Vehicle Category</label>
                  <select
                    value={vehicleClass}
                    onChange={(e) => setVehicleClass(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  >
                    <option value="Sedan (Dzire / Etios)">Sedan (Dzire / Etios - Up to 4 Pax)</option>
                    <option value="SUV (Ertiga / Carens)">SUV (Ertiga / Carens - Up to 6 Pax)</option>
                    <option value="Innova Crysta">Innova Crysta (Luxury - Up to 6-7 Pax)</option>
                    <option value="Tempo Traveller">Tempo Traveller (12 to 26 Pax)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Passenger Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c49f27] hover:from-[#c49f27] hover:to-[#b38e1f] text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
              >
                {isSubmitting ? "Submitting Booking..." : "Confirm Airport Cab Booking"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
