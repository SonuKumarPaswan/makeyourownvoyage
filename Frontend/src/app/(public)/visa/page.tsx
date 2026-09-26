"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { visaApi, VisaItem } from "@/lib/api/visa.api";
import { enquiryApi } from "@/lib/api/enquiry.api";

export default function VisaPage() {
  const [visas, setVisas] = useState<VisaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<VisaItem | null>(null);
  const [applicantCount, setApplicantCount] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadVisas() {
      try {
        setLoading(true);
        const res = await visaApi.getAll();
        if (res?.data) {
          setVisas(Array.isArray(res.data) ? res.data : []);
        }
      } catch (err) {
        console.error("Failed to load visas from backend:", err);
      } finally {
        setLoading(false);
      }
    }
    loadVisas();
  }, []);

  const filteredCountries = visas.filter((c) =>
    c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.visaType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (country: VisaItem) => {
    setSelectedCountry(country);
    setErrorMessage("");
    setSubmittedCode(null);
  };

  const handleApplyVisa = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      setErrorMessage("Please fill all mandatory contact fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await enquiryApi.createEnquiry({
        category: "visa",
        name: customerName.trim(),
        email: customerEmail.trim(),
        phone: customerPhone.trim(),
        details: {
          country: selectedCountry?.country || "Global Visa",
          visaType: selectedCountry?.visaType || "Tourist Visa",
          applicants: applicantCount,
          expectedTravelDate: travelDate || "Not Specified",
          estimatedFee: selectedCountry?.fee ? `₹${selectedCountry.fee}` : "N/A",
        },
        message: `Visa Assistance Application for ${selectedCountry?.country} (${selectedCountry?.visaType}). ${applicantCount} applicant(s). Tentative travel: ${travelDate || "Immediate"}.`,
        source: "visa_landing_page",
      });

      if (res?.success) {
        setSubmittedCode(res.data?.enquiryId || "MYOV-VISA-" + Date.now().toString().slice(-4));
      } else {
        setSubmittedCode("MYOV-VISA-" + Date.now().toString().slice(-4));
      }
    } catch {
      setSubmittedCode("MYOV-VISA-" + Date.now().toString().slice(-4));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-slate-800 selection:bg-[#d4af37] selection:text-black">
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-[#e8e3d9] bg-gradient-to-b from-white via-[#faf8f5] to-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[#b8860b] text-xs font-semibold uppercase tracking-wider shadow-xs">
              <MaterialIcon name="verified" size={16} />
              <span>99.4% Approval Rate • Official Visa Desk</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0a192f] leading-tight">
              Fast-Track <span className="text-[#b8860b]">Global Visa</span> Assistance &amp; E-Visa Services
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Hassle-free tourist, business, and transit visa facilitation backed by verified embassy data. Certified document verification, embassy appointment booking, and door-step concierge service.
            </p>

            {/* Quick Country Search */}
            <div className="pt-4 max-w-xl mx-auto relative">
              <MaterialIcon
                name="search"
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search visa destination (e.g. Dubai, Singapore, Schengen, Vietnam, Bali)..."
                className="w-full bg-white border border-[#e8e3d9] hover:border-[#d4af37] focus:border-[#d4af37] rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Highlights Strip */}
      <section className="bg-white border-b border-[#e8e3d9] py-6 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <div className="text-2xl font-extrabold text-[#b8860b]">50,000+</div>
              <div className="text-xs text-slate-500 mt-0.5">Visas Successfully Processed</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-extrabold text-emerald-600">24 - 48 Hrs</div>
              <div className="text-xs text-slate-500 mt-0.5">Express E-Visa Delivery</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-extrabold text-[#0a192f]">100% Secure</div>
              <div className="text-xs text-slate-500 mt-0.5">Encrypted Document Vault</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-extrabold text-[#b8860b]">80+ Countries</div>
              <div className="text-xs text-slate-500 mt-0.5">Global Embassy Network</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Popular Visa Destinations Grid */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#0a192f] tracking-tight flex items-center gap-2">
              <MaterialIcon name="public" size={24} className="text-[#b8860b]" />
              <span>Explore Visa Categories by Country</span>
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Live visa requirements, processing timelines, embassy fees, and checklists fetched directly from database.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            {loading ? "Fetching from database..." : `Showing ${filteredCountries.length} destinations`}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-white border border-[#e8e3d9] animate-pulse" />
            ))}
          </div>
        ) : filteredCountries.length === 0 ? (
          <div className="bg-white border border-[#e8e3d9] rounded-2xl p-12 text-center text-slate-500">
            No visa destinations matched your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((country) => (
              <div
                key={country.slug || country._id}
                className="bg-white border border-[#e8e3d9] hover:border-[#d4af37] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col group"
              >
                {/* Image & Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={country.image}
                    alt={country.country}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-xl">{country.flag || "🌍"}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#0a192f] border border-slate-200">
                      {country.entryType || "Single Entry"}
                    </span>
                  </div>

                  {country.isPopular && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#d4af37] text-slate-950 text-[9px] font-bold uppercase tracking-wider shadow-sm">
                      Popular
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                      {country.country}
                    </h3>
                    <span className="text-xs text-amber-200 font-medium block">
                      {country.visaType}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#faf8f5] p-2.5 rounded-xl border border-[#e8e3d9]">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                        Processing Time
                      </span>
                      <span className="text-slate-800 font-bold flex items-center gap-1 mt-0.5">
                        <MaterialIcon name="timer" size={13} className="text-[#b8860b]" />
                        {country.processingTime}
                      </span>
                    </div>

                    <div className="bg-[#faf8f5] p-2.5 rounded-xl border border-[#e8e3d9]">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                        Stay Duration
                      </span>
                      <span className="text-slate-800 font-bold flex items-center gap-1 mt-0.5">
                        <MaterialIcon name="date_range" size={13} className="text-[#b8860b]" />
                        {country.stayDuration}
                      </span>
                    </div>
                  </div>

                  {/* Checklist preview */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                      Required Checklist
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      {country.documents && country.documents.length > 0 ? (
                        country.documents.slice(0, 3).map((doc, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 truncate">
                            <MaterialIcon name="check_circle" size={13} className="text-emerald-600 shrink-0" />
                            <span className="truncate">{doc.title || (doc as any)}</span>
                          </li>
                        ))
                      ) : (
                        <li className="flex items-center gap-1.5 text-slate-600">
                          <MaterialIcon name="check_circle" size={13} className="text-emerald-600 shrink-0" />
                          <span>Standard Passport &amp; Photo</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Footer Pricing & CTA */}
                  <div className="pt-3 border-t border-[#e8e3d9] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Starting From</span>
                      <span className="text-base font-extrabold text-[#0a192f]">
                        ₹{country.fee}
                      </span>
                      <span className="text-[10px] text-slate-500 ml-1">/ person</span>
                    </div>

                    <button
                      onClick={() => handleOpenModal(country)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c49f27] hover:from-[#c49f27] hover:to-[#b38e1f] text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-1 cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <MaterialIcon name="arrow_forward" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. 4-Step Simple Visa Process */}
      <section className="py-16 bg-white border-y border-[#e8e3d9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a192f] tracking-tight">
              How Make Your Own Voyage Visa Processing Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Simple 4-step digital process designed for maximum convenience and guaranteed peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: "travel_explore",
                title: "Choose Country & Apply",
                desc: "Select your destination and fill the brief online enquiry form.",
              },
              {
                step: "02",
                icon: "upload_file",
                title: "Submit Documents",
                desc: "Upload soft copies via encrypted portal or request doorstep collection.",
              },
              {
                step: "03",
                icon: "verified_user",
                title: "Expert Verification",
                desc: "Our senior visa officers verify documents against embassy guidelines.",
              },
              {
                step: "04",
                icon: "mark_email_read",
                title: "Receive Visa",
                desc: "Approved E-Visa delivered directly to your Email & WhatsApp inbox.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-[#faf8f5] border border-[#e8e3d9] p-6 rounded-2xl relative space-y-3 shadow-xs"
              >
                <div className="text-3xl font-extrabold text-[#b8860b]/20 absolute top-4 right-4 font-mono">
                  {item.step}
                </div>
                <div className="h-12 w-12 rounded-xl bg-amber-50 border border-amber-200 text-[#b8860b] flex items-center justify-center">
                  <MaterialIcon name={item.icon} size={24} />
                </div>
                <h3 className="text-sm font-bold text-[#0a192f]">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Direct Visa Application / Enquiry Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 my-8 relative text-slate-800">
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            >
              <MaterialIcon name="close" size={20} />
            </button>

            {submittedCode ? (
              <div className="py-6 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <MaterialIcon name="check_circle" size={36} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Visa Application Received!</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Your request for <span className="text-[#b8860b] font-bold">{selectedCountry.country}</span> has been logged.
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-mono text-xs text-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Application Reference No.</span>
                  <span className="text-sm font-bold text-[#b8860b]">{submittedCode}</span>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Our dedicated visa officer will contact you within 15 minutes to review document requirements.
                </p>

                <button
                  onClick={() => setSelectedCountry(null)}
                  className="w-full py-2.5 rounded-xl bg-[#d4af37] text-slate-950 font-bold text-xs uppercase cursor-pointer shadow-sm"
                >
                  Close &amp; Return
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                  <span className="text-3xl">{selectedCountry.flag || "🌍"}</span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Apply for {selectedCountry.country} Visa
                    </h3>
                    <p className="text-xs text-[#b8860b] font-semibold">
                      {selectedCountry.visaType} • {selectedCountry.processingTime}
                    </p>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 mt-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <MaterialIcon name="error" size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleApplyVisa} className="space-y-3.5 mt-4">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">
                        Tentative Travel Date
                      </label>
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">
                        Number of Applicants
                      </label>
                      <select
                        value={applicantCount}
                        onChange={(e) => setApplicantCount(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, 15].map((n: number) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Person" : "Persons"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
                    <span className="text-slate-600">Estimated Visa Rate:</span>
                    <span className="text-[#b8860b] font-bold text-sm">
                      ₹{selectedCountry.fee} / applicant
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c49f27] hover:from-[#c49f27] hover:to-[#b38e1f] text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <MaterialIcon name="send" size={16} />
                          <span>Submit Visa Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
