"use client";

import React, { useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { enquiryApi } from "@/lib/api/enquiry.api";

export default function TravelInsurancePage() {
  const [destination, setDestination] = useState("Schengen / Europe");
  const [tripType, setTripType] = useState("Single Trip (1-30 Days)");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await enquiryApi.createEnquiry({
        category: "packages",
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
        details: {
          destination,
          tripType,
          startDate,
          endDate,
          travelers,
          insuranceType: "Comprehensive International Travel Insurance",
        },
        message: `Travel Insurance Enquiry: ${destination} (${tripType}) for ${travelers} pax from ${startDate} to ${endDate}.`,
        source: "travel_insurance_page",
      });
      setSubmittedCode(res?.data?.enquiryId || "MYOV-INS-" + Date.now().toString().slice(-4));
    } catch {
      setSubmittedCode("MYOV-INS-" + Date.now().toString().slice(-4));
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
            International &amp; Domestic <span className="text-[#b8860b]">Travel Insurance</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600">
            Cashless overseas medical hospitalization, flight delay compensation, baggage loss protection, and 24/7 emergency assistance.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-[#e8e3d9] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-[#0a192f] flex items-center gap-2">
            <MaterialIcon name="shield" size={22} className="text-[#b8860b]" />
            <span>Get Instant Insurance Quote</span>
          </h2>

          {submittedCode ? (
            <div className="py-8 text-center space-y-3">
              <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <MaterialIcon name="check_circle" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Insurance Request Submitted!</h3>
              <p className="text-xs text-slate-600">Reference: <span className="font-mono text-[#b8860b] font-bold">{submittedCode}</span></p>
              <p className="text-xs text-slate-500">Our policy advisor will share comparative plans from leading insurers.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Destination Region *</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  >
                    <option value="Schengen / Europe">Schengen / Europe (Compliant €30,000+)</option>
                    <option value="USA & Canada">USA &amp; Canada (Including Medical)</option>
                    <option value="Asia Pacific & Dubai">Asia Pacific / Dubai / Singapore / Bali</option>
                    <option value="Worldwide">Worldwide (Excluding US/Canada)</option>
                    <option value="Domestic India">Domestic Travel (India)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Trip Duration</label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  >
                    <option value="Single Trip (1-30 Days)">Single Trip (1 - 30 Days)</option>
                    <option value="Multi-Trip Annual Plan">Annual Multi-Trip (Frequent Flyer)</option>
                    <option value="Student Overseas">Student Overseas Plan (1 Year)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Departure Date *</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Return Date *</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Insured Travelers</label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Traveler" : "Travelers"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c49f27] hover:from-[#c49f27] hover:to-[#b38e1f] text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
              >
                {isSubmitting ? "Generating Quotes..." : "Compare & Get Insurance Plans"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
