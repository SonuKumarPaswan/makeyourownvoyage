"use client";

import React, { useState } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { enquiryApi } from "@/lib/api/enquiry.api";
import { EnquiryCategory } from "@/types/enquiry";
import { Button } from "@/components/ui/Button";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: EnquiryCategory;
  defaultTitle?: string;
  referenceId?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = "package",
  defaultTitle = "Tailored Voyage Consultation",
  referenceId,
}) => {
  const [category, setCategory] = useState<EnquiryCategory>(defaultCategory);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [paxCount, setPaxCount] = useState(2);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [enquiryCode, setEnquiryCode] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMessage("Please fill all required contact fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      let res;
      if (category === "package" || category === "weekend_trip") {
        res = await enquiryApi.submitPackageEnquiry({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          city,
          specialRequests,
          packageDetails: {
            packageId: referenceId,
            packageTitle: defaultTitle,
            travelDate,
            travelers: { adults: paxCount, children: 0 },
            packageCategory: category === "weekend_trip" ? "weekend_trip" : "holiday",
          },
        });
      } else if (category === "hotel") {
        res = await enquiryApi.submitHotelEnquiry({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          city,
          specialRequests,
          hotelDetails: {
            hotelId: referenceId,
            hotelName: defaultTitle,
            checkInDate: travelDate,
            guests: { adults: paxCount, children: 0 },
          },
        });
      } else if (category === "transport") {
        res = await enquiryApi.submitTransportEnquiry({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          city,
          specialRequests,
          transportDetails: {
            transportId: referenceId,
            pickupDate: travelDate,
            passengersCount: paxCount,
          },
        });
      } else {
        res = await enquiryApi.submitUniversal({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          city,
          specialRequests,
          enquiryType: category,
        });
      }

      if (res.success) {
        setIsSuccess(true);
        setEnquiryCode(res.data?.enquiryCode || "ENQ-RECEIVED");
      } else {
        setErrorMessage(res.message || "Failed to submit enquiry. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setName("");
    setEmail("");
    setPhone("");
    setSpecialRequests("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#0a192f] border-2 border-[#d4af37] text-white p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 border border-gray-700 hover:border-[#d4af37] transition-colors"
        >
          <MaterialIcon name="close" size={20} />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-900/40 border border-green-500 text-green-400 mx-auto flex items-center justify-center mb-4">
              <MaterialIcon name="check_circle" size={40} />
            </div>
            <h3 className="text-2xl font-black uppercase text-white mb-2">
              Voyage Request Received!
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mb-4 font-light leading-relaxed">
              Your inquiry has been logged under reference{" "}
              <span className="text-[#d4af37] font-bold">{enquiryCode}</span>. Our luxury concierge will contact you within 30 minutes with tailored quotes.
            </p>
            <Button
              onClick={handleReset}
              variant="primary"
              size="md"
              className="uppercase tracking-widest text-xs font-bold px-8"
            >
              Done
            </Button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-bold uppercase tracking-widest mb-2">
                <MaterialIcon name="auto_awesome" size={14} /> Quick Voyage Consultation
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                {defaultTitle}
              </h2>
              <p className="text-xs text-gray-400 font-light mt-1">
                Share your travel preferences for priority quotes and corporate discounts.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-950/80 border border-red-500 text-red-200 text-xs flex items-center gap-2">
                <MaterialIcon name="error" className="text-red-400 shrink-0" size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold uppercase text-[10px] tracking-wider mb-1">
                    Your Name *
                  </label>
                  <div className="flex items-center bg-[#0f2444] border border-gray-700 px-3 py-2">
                    <MaterialIcon name="person" className="text-[#d4af37] mr-2 shrink-0" size={16} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent text-white w-full focus:outline-none placeholder-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold uppercase text-[10px] tracking-wider mb-1">
                    Contact Phone *
                  </label>
                  <div className="flex items-center bg-[#0f2444] border border-gray-700 px-3 py-2">
                    <MaterialIcon name="call" className="text-[#d4af37] mr-2 shrink-0" size={16} />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-transparent text-white w-full focus:outline-none placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Email & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold uppercase text-[10px] tracking-wider mb-1">
                    Email Address *
                  </label>
                  <div className="flex items-center bg-[#0f2444] border border-gray-700 px-3 py-2">
                    <MaterialIcon name="mail" className="text-[#d4af37] mr-2 shrink-0" size={16} />
                    <input
                      type="email"
                      required
                      placeholder="rahul@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent text-white w-full focus:outline-none placeholder-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold uppercase text-[10px] tracking-wider mb-1">
                    Your City / Departure
                  </label>
                  <div className="flex items-center bg-[#0f2444] border border-gray-700 px-3 py-2">
                    <MaterialIcon name="location_on" className="text-[#d4af37] mr-2 shrink-0" size={16} />
                    <input
                      type="text"
                      placeholder="e.g. Delhi NCR"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-transparent text-white w-full focus:outline-none placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold uppercase text-[10px] tracking-wider mb-1">
                    Tentative Travel Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toLocaleDateString("en-CA")}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-[#0f2444] border border-gray-700 px-3 py-2 text-white focus:outline-none [color-scheme:dark] accent-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold uppercase text-[10px] tracking-wider mb-1">
                    Number of Travelers
                  </label>
                  <select
                    value={paxCount}
                    onChange={(e) => setPaxCount(Number(e.target.value))}
                    className="w-full bg-[#0f2444] border border-gray-700 px-3 py-2 text-white focus:outline-none cursor-pointer"
                  >
                    <option value={1} className="bg-[#0a192f]">1 Solo Traveler</option>
                    <option value={2} className="bg-[#0a192f]">2 Adults (Couple / Pair)</option>
                    <option value={3} className="bg-[#0a192f]">3 Adults (Small Family)</option>
                    <option value={4} className="bg-[#0a192f]">4 Adults (Family / Friends)</option>
                    <option value={6} className="bg-[#0a192f]">6-10 Adults (Small Group)</option>
                    <option value={15} className="bg-[#0a192f]">Corporate MICE (10 - 25 Pax)</option>
                    <option value={50} className="bg-[#0a192f]">Large Group (25 - 50 Pax)</option>
                    <option value={100} className="bg-[#0a192f]">Mega Group / Summit (50+ Pax)</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-gray-300 font-semibold uppercase text-[10px] tracking-wider mb-1">
                  Specific Requests (Meals, Hotel Preference, Transport)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need conference hall with DJ setup and airport pickup..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#0f2444] border border-gray-700 p-2 text-white focus:outline-none placeholder-gray-500"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2 uppercase tracking-widest text-xs font-bold py-3"
                >
                  {isSubmitting ? (
                    <>
                      <MaterialIcon name="progress_activity" className="animate-spin text-black" size={16} />
                      Submitting Enquiry...
                    </>
                  ) : (
                    <>
                      <MaterialIcon name="send" size={16} />
                      Submit For Immediate Quotation
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
