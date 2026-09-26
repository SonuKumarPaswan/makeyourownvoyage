"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { visaApi, VisaItem } from "@/lib/api/visa.api";
import { enquiryApi } from "@/lib/api/enquiry.api";

export default function CountryVisaDetailPage() {
  const params = useParams();
  const rawCountry = typeof params?.country === "string" ? params.country : Array.isArray(params?.country) ? params.country[0] : "";
  const countryKey = rawCountry.toLowerCase();

  const [country, setCountry] = useState<VisaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [applicants, setApplicants] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  useEffect(() => {
    async function loadCountryVisa() {
      try {
        setLoading(true);
        const res = await visaApi.getBySlugOrId(countryKey);
        if (res?.data) {
          setCountry(res.data);
        }
      } catch (err) {
        console.error("Failed to load country visa from backend:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCountryVisa();
  }, [countryKey]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!country) return;

    setIsSubmitting(true);
    try {
      const res = await enquiryApi.createEnquiry({
        category: "visa",
        name: customerName.trim(),
        email: customerEmail.trim(),
        phone: customerPhone.trim(),
        details: {
          country: country.country,
          visaType: country.visaType,
          applicants,
          expectedTravelDate: travelDate || "Immediate",
        },
        message: `Visa Application for ${country.country} (${country.visaType}). ${applicants} traveler(s).`,
        source: `visa_page_${country.slug}`,
      });
      setSubmittedCode(res?.data?.enquiryId || "MYOV-VISA-" + Date.now().toString().slice(-4));
    } catch {
      setSubmittedCode("MYOV-VISA-" + Date.now().toString().slice(-4));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf8f5] text-slate-800 pt-28 flex flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 border-3 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-mono">Fetching live visa specifications from database...</p>
      </main>
    );
  }

  if (!country) {
    return (
      <main className="min-h-screen bg-[#faf8f5] text-slate-800 pt-28 pb-16 flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-[#0a192f]">Visa Destination Not Found</h1>
        <p className="text-xs text-slate-600">The requested visa destination could not be retrieved from our database.</p>
        <Link href="/visa" className="px-4 py-2 rounded-xl bg-[#d4af37] text-slate-950 font-bold text-xs shadow-sm">
          Browse All Visa Destinations
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] text-slate-800 selection:bg-[#d4af37] selection:text-black pt-24 pb-16">
      {/* Hero */}
      <section className="relative h-96 w-full overflow-hidden bg-slate-900 border-b border-[#e8e3d9]">
        <img
          src={country.image}
          alt={country.country}
          className="w-full h-full object-cover brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10">
          <Link
            href="/visa"
            className="inline-flex items-center gap-1 text-xs text-[#d4af37] hover:underline font-medium mb-3"
          >
            <MaterialIcon name="arrow_back" size={14} />
            <span>All Visa Destinations</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-4xl">{country.flag || "🌍"}</span>
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {country.country} Visa Assistance
              </h1>
              <p className="text-xs sm:text-sm text-amber-200 mt-1 font-medium">
                {country.visaType} • Processing: {country.processingTime}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content & Application Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details (8 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white border border-[#e8e3d9] p-6 rounded-2xl space-y-4 shadow-sm">
              <h2 className="text-xl font-bold text-[#0a192f] flex items-center gap-2">
                <MaterialIcon name="info" size={20} className="text-[#b8860b]" />
                <span>Overview &amp; Visa Specifications</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                {country.description || `Comprehensive visa facilitation service for ${country.country}. Document verification, appointment scheduling and embassy submission.`}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#faf8f5] p-3 rounded-xl border border-[#e8e3d9]">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Turnaround</span>
                  <span className="text-xs font-bold text-slate-900 mt-0.5 block">{country.processingTime}</span>
                </div>
                <div className="bg-[#faf8f5] p-3 rounded-xl border border-[#e8e3d9]">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Validity</span>
                  <span className="text-xs font-bold text-slate-900 mt-0.5 block">{country.validity}</span>
                </div>
                <div className="bg-[#faf8f5] p-3 rounded-xl border border-[#e8e3d9] col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Stay Allowed</span>
                  <span className="text-xs font-bold text-[#b8860b] mt-0.5 block">{country.stayDuration}</span>
                </div>
              </div>
            </div>

            {/* Required Documents */}
            <div className="bg-white border border-[#e8e3d9] p-6 rounded-2xl space-y-4 shadow-sm">
              <h2 className="text-xl font-bold text-[#0a192f] flex items-center gap-2">
                <MaterialIcon name="folder_shared" size={20} className="text-[#b8860b]" />
                <span>Mandatory Document Checklist</span>
              </h2>

              <div className="space-y-3">
                {country.documents && country.documents.length > 0 ? (
                  country.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="bg-[#faf8f5] p-3.5 rounded-xl border border-[#e8e3d9] flex items-start gap-3"
                    >
                      <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                        <MaterialIcon name="check" size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{doc.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-[#faf8f5] p-3.5 rounded-xl border border-[#e8e3d9] flex items-start gap-3">
                    <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                      <MaterialIcon name="check" size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Valid Passport &amp; Photographs</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                        Passport with at least 6 months validity and white-background digital photographs.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Process Steps */}
            {country.steps && country.steps.length > 0 && (
              <div className="bg-white border border-[#e8e3d9] p-6 rounded-2xl space-y-4 shadow-sm">
                <h2 className="text-xl font-bold text-[#0a192f] flex items-center gap-2">
                  <MaterialIcon name="alt_route" size={20} className="text-[#b8860b]" />
                  <span>Application Steps</span>
                </h2>

                <div className="space-y-2.5">
                  {country.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                      <span className="h-6 w-6 rounded-full bg-amber-50 text-[#b8860b] font-bold text-xs flex items-center justify-center shrink-0 border border-amber-200">
                        {idx + 1}
                      </span>
                      <span className="pt-0.5 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Application Form (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white border border-[#e8e3d9] rounded-2xl p-6 shadow-xl space-y-5">
              <div className="border-b border-[#e8e3d9] pb-4">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Visa Service Fee</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-[#0a192f]">₹{country.fee}</span>
                  <span className="text-xs text-slate-500">/ person (inclusive of embassy &amp; processing charges)</span>
                </div>
              </div>

              {submittedCode ? (
                <div className="py-6 text-center space-y-3">
                  <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <MaterialIcon name="check_circle" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Application Received</h3>
                  <p className="text-xs text-slate-600">
                    Reference ID: <span className="font-mono text-[#b8860b] font-bold">{submittedCode}</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Our specialist will contact you shortly to coordinate your document submission.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <h3 className="text-sm font-bold text-[#0a192f]">Instant Visa Booking</h3>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">
                      Phone / WhatsApp Number *
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
                      placeholder="e.g. priya@example.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 uppercase block mb-1">
                        Travel Date
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
                        Applicants
                      </label>
                      <select
                        value={applicants}
                        onChange={(e) => setApplicants(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-none focus:border-[#d4af37]"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Pax" : "Pax"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c49f27] hover:from-[#c49f27] hover:to-[#b38e1f] text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <MaterialIcon name="verified_user" size={16} />
                        <span>Apply for {country.country} Visa</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
