"use client";

import React, { useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { enquiryApi } from "@/lib/api/enquiry.api";

export default function CarRentalPage() {
  const [city, setCity] = useState("Delhi NCR");
  const [tripType, setTripType] = useState("Outstation Roundtrip");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [carType, setCarType] = useState("Innova Crysta");
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
          city,
          tripType,
          destination,
          travelDate,
          returnDate,
          carType,
        },
        message: `Car Rental Request: ${tripType} from ${city} to ${destination} (${carType}) from ${travelDate} to ${returnDate}.`,
        source: "car_rental_page",
      });
      setSubmittedCode(res?.data?.enquiryId || "MYOV-CAR-" + Date.now().toString().slice(-4));
    } catch {
      setSubmittedCode("MYOV-CAR-" + Date.now().toString().slice(-4));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-slate-800 pt-24 pb-16 selection:bg-[#d4af37] selection:text-black">
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#faf8f5] to-[#faf8f5] py-14 border-b border-[#e8e3d9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Link href="/travel-services" className="inline-flex items-center gap-1 text-xs text-[#b8860b] hover:underline font-medium">
            <MaterialIcon name="arrow_back" size={14} />
            <span>All Travel Services</span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a192f] tracking-tight">
            Chauffeur &amp; <span className="text-[#b8860b]">Car Rentals</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600">
            Outstation vacations, local city tours, and luxury fleet hire with verified drivers and sanitised vehicles.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-[#e8e3d9] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-[#0a192f] flex items-center gap-2">
            <MaterialIcon name="directions_car" size={22} className="text-[#b8860b]" />
            <span>Book Your Rental Car</span>
          </h2>

          {submittedCode ? (
            <div className="py-8 text-center space-y-3">
              <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <MaterialIcon name="check_circle" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Car Rental Request Received!</h3>
              <p className="text-xs text-slate-600">Reference: <span className="font-mono text-[#b8860b] font-bold">{submittedCode}</span></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Pickup City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Trip Destination *</label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Jaipur, Manali, Shimla, Agra"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Trip Type</label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  >
                    <option value="Outstation Roundtrip">Outstation Roundtrip</option>
                    <option value="One Way Outstation">One Way Drop</option>
                    <option value="Local 8Hr / 80Km">Local Full Day (8Hr / 80Km)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Vehicle Model</label>
                  <select
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  >
                    <option value="Innova Crysta">Toyota Innova Crysta</option>
                    <option value="Maruti Dzire">Maruti Dzire / Etios</option>
                    <option value="Maruti Ertiga">Maruti Ertiga</option>
                    <option value="Tempo Traveller 12 Seater">Tempo Traveller 12 Seater</option>
                    <option value="Luxury Fortuner">Toyota Fortuner 4x4</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Phone Number *</label>
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
                {isSubmitting ? "Submitting Request..." : "Request Car Rental Quote"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
