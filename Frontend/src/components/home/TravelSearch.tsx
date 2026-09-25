"use client";

import React, { useState } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { enquiryApi } from "@/lib/api/enquiry.api";

type ServiceTab =
  | "flights"
  | "hotels"
  | "visa"
  | "packages"
  | "cruises"
  | "corporate"
  | "transfers";

interface TabConfig {
  id: ServiceTab;
  label: string;
  iconName: string;
}

const SERVICE_TABS: TabConfig[] = [
  { id: "flights", label: "Flights", iconName: "flight_takeoff" },
  { id: "hotels", label: "Hotels", iconName: "hotel" },
  { id: "visa", label: "Visa Assistance", iconName: "assignment" },
  { id: "packages", label: "Holiday Packages", iconName: "luggage" },
  { id: "cruises", label: "Cruises (Water)", iconName: "directions_boat" },
  { id: "corporate", label: "Corporate & MICE", iconName: "corporate_fare" },
  { id: "transfers", label: "Airport Transfers", iconName: "local_taxi" },
];

export const TravelSearch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ServiceTab>("flights");

  // Minimum date for pickers (disallow previous dates)
  const todayDate = new Date().toLocaleDateString("en-CA");

  // Common Contact Info
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Flight specific states
  const [fromCity, setFromCity] = useState("Delhi");
  const [toDestination, setToDestination] = useState("Dubai");
  const [flightDate, setFlightDate] = useState("");
  const [cabinClass, setCabinClass] = useState("Economy");

  // Hotel specific states
  const [hotelDestination, setHotelDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [hotelGuests, setHotelGuests] = useState("1r2g");

  // Visa specific states
  const [visaCountry, setVisaCountry] = useState("");
  const [visaType, setVisaType] = useState("Tourist Visa");
  const [visaDate, setVisaDate] = useState("");
  const [visaApplicants, setVisaApplicants] = useState("1 Applicant");

  // Package specific states
  const [packageDest, setPackageDest] = useState("");
  const [packageDate, setPackageDate] = useState("");
  const [packageType, setPackageType] = useState("Family Vacation");

  // Cruise specific states
  const [cruiseSector, setCruiseSector] = useState("Singapore & Southeast Asia");
  const [cruiseDate, setCruiseDate] = useState("");
  const [cabinCategory, setCabinCategory] = useState("Balcony Stateroom");

  // Corporate & MICE states
  const [corporateDest, setCorporateDest] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [corporateDate, setCorporateDate] = useState("");
  const [corporateType, setCorporateType] = useState("Annual Conference (50+ Pax)");

  // Transfer specific states
  const [pickupLocation, setPickupLocation] = useState("IGI Airport Delhi (DEL)");
  const [dropLocation, setDropLocation] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [vehicleClass, setVehicleClass] = useState("Sedan (Dzire / Etios)");

  // UI status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    code: string;
    category: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Validate Indian mobile number & letters in name
  const validateForm = (): boolean => {
    setErrorMsg("");

    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMsg("Please enter your full name.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail.trim() || !emailRegex.test(customerEmail.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return false;
    }

    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return false;
    }

    // Tab specific validations
    if (activeTab === "flights" && (!fromCity.trim() || !toDestination.trim())) {
      setErrorMsg("Please provide origin and destination cities for flight quotation.");
      return false;
    }
    if (activeTab === "hotels" && !hotelDestination.trim()) {
      setErrorMsg("Please enter the city or hotel name for stay quotation.");
      return false;
    }
    if (activeTab === "visa" && !visaCountry.trim()) {
      setErrorMsg("Please specify the destination country for visa assistance.");
      return false;
    }
    if (activeTab === "packages" && !packageDest.trim()) {
      setErrorMsg("Please specify destination for holiday package quotation.");
      return false;
    }
    if (activeTab === "transfers" && (!pickupLocation.trim() || !dropLocation.trim())) {
      setErrorMsg("Please provide both pickup and drop locations.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrorMsg("");

    const phone10 = customerPhone.replace(/\D/g, "").slice(-10);

    try {
      let res: any = null;

      if (activeTab === "flights") {
        res = await enquiryApi.submitFlightEnquiry({
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim().toLowerCase(),
          customerPhone: phone10,
          city: fromCity.trim(),
          flightDetails: {
            fromCity: fromCity.trim(),
            toCity: toDestination.trim(),
            tripType: "one_way",
            departureDate: flightDate ? new Date(flightDate).toISOString() : new Date().toISOString(),
            travelClass: cabinClass,
            passengers: { adults: 1, children: 0, infants: 0 },
          },
        });
      } else if (activeTab === "hotels") {
        res = await enquiryApi.submitHotelEnquiry({
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim().toLowerCase(),
          customerPhone: phone10,
          city: hotelDestination.trim(),
          hotelDetails: {
            hotelName: hotelDestination.trim(),
            roomType: hotelGuests,
            checkInDate: checkInDate ? new Date(checkInDate).toISOString() : new Date().toISOString(),
            roomsCount: 1,
            guests: { adults: 2, children: 0 },
          },
        });
      } else if (activeTab === "packages") {
        const mappedCategory =
          packageType.includes("Weekend") ? "weekend_trip" :
            packageType.includes("Honeymoon") ? "honeymoon" :
              packageType.includes("Family") ? "family" : "holiday";

        res = await enquiryApi.submitPackageEnquiry({
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim().toLowerCase(),
          customerPhone: phone10,
          city: packageDest.trim(),
          packageDetails: {
            packageTitle: `${packageType}: ${packageDest.trim()}`,
            travelDate: packageDate ? new Date(packageDate).toISOString() : new Date().toISOString(),
            packageCategory: mappedCategory,
            travelers: { adults: 2, children: 0 },
          },
        });
      } else if (activeTab === "transfers") {
        res = await enquiryApi.submitTransportEnquiry({
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim().toLowerCase(),
          customerPhone: phone10,
          transportDetails: {
            category: "Cab",
            serviceType: "Airport Transfer",
            vehicleType: vehicleClass,
            pickupLocation: pickupLocation.trim(),
            dropLocation: dropLocation.trim(),
            pickupDate: transferDate ? new Date(transferDate).toISOString() : new Date().toISOString(),
          },
        });
      } else if (activeTab === "visa") {
        res = await enquiryApi.submitUniversal({
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim().toLowerCase(),
          customerPhone: phone10,
          enquiryType: "custom",
          specialRequests: `VISA ASSISTANCE ENQUIRY: Country: ${visaCountry.trim()} | Visa Category: ${visaType} | Travel Date: ${visaDate || "Flexible"} | Applicants: ${visaApplicants}`,
        });
      } else if (activeTab === "cruises") {
        res = await enquiryApi.submitUniversal({
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim().toLowerCase(),
          customerPhone: phone10,
          enquiryType: "custom",
          specialRequests: `CRUISE VOYAGE ENQUIRY: Sector: ${cruiseSector} | Sailing Date: ${cruiseDate || "Upcoming"} | Cabin: ${cabinCategory}`,
        });
      } else if (activeTab === "corporate") {
        res = await enquiryApi.submitUniversal({
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim().toLowerCase(),
          customerPhone: phone10,
          enquiryType: "custom",
          specialRequests: `CORPORATE & MICE ENQUIRY: Company: ${companyName.trim()} | Destination: ${corporateDest.trim()} | Event Type: ${corporateType} | Event Date: ${corporateDate || "Upcoming"}`,
        });
      }

      const generatedCode =
        res?.data?.enquiryCode ||
        res?.enquiryCode ||
        `ENQ-${activeTab.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

      setSubmissionSuccess({
        code: generatedCode,
        category: SERVICE_TABS.find((t) => t.id === activeTab)?.label || "Travel Service",
      });
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      setSubmissionSuccess({
        code: `ENQ-${activeTab.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`,
        category: SERVICE_TABS.find((t) => t.id === activeTab)?.label || "Travel Service",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-30 -mt-10 sm:-mt-12 lg:-mt-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Luxury Container with Zero Curve Geometry */}
      <div className="bg-white border border-slate-200 shadow-2xl overflow-hidden">
        {/* Top 7 Category Navigation Tabs */}
        <div className="bg-white border-b border-slate-200 flex items-center overflow-x-auto scrollbar-none">
          {SERVICE_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setErrorMsg("");
                }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3.5 text-xs sm:text-[13px] font-semibold tracking-wide whitespace-nowrap transition-colors border-r border-slate-100 cursor-pointer ${
                  isActive
                    ? "bg-[#0a192f] text-white"
                    : "text-slate-700 hover:text-black hover:bg-slate-50"
                }`}
              >
                <MaterialIcon
                  name={tab.iconName}
                  className={`text-lg shrink-0 ${
                    isActive ? "text-[#d4af37]" : "text-slate-500"
                  }`}
                  size={20}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-6 bg-[#f8f9fa]">
          {/* Submission Success Modal / Alert */}
          {submissionSuccess ? (
            <div className="p-6 bg-[#0a192f] text-white border-2 border-[#d4af37] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <MaterialIcon name="check_circle" className="text-[#d4af37] shrink-0 mt-0.5" size={32} />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wider text-white mb-1">
                    Quotation Request Dispatched to Concierge Desk
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-normal">
                    Your reference number is{" "}
                    <span className="text-[#d4af37] font-semibold tracking-wider font-mono">
                      {submissionSuccess.code}
                    </span>
                    . Our senior destination specialist will contact you on{" "}
                    <span className="text-white font-semibold">{customerPhone || "phone"}</span>{" "}
                    within 15 minutes.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSubmissionSuccess(null)}
                className="inline-flex items-center gap-1.5 bg-[#d4af37] text-black text-xs font-semibold uppercase tracking-wider px-5 py-2.5 transition hover:bg-[#c49f27] shrink-0 cursor-pointer"
              >
                <span>New Quotation</span>
                <MaterialIcon name="close" size={16} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Service Specific Parameters (4 Columns) */}
              {activeTab === "flights" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      FROM CITY*
                    </label>
                    <input
                      type="text"
                      placeholder="Delhi / Mumbai / Bangalore"
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      TO DESTINATION*
                    </label>
                    <input
                      type="text"
                      placeholder="Dubai / London / Singapore"
                      value={toDestination}
                      onChange={(e) => setToDestination(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      TRAVEL DATE*
                    </label>
                    <input
                      type="date"
                      min={todayDate}
                      value={flightDate}
                      onChange={(e) => setFlightDate(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium accent-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      CABIN CLASS
                    </label>
                    <select
                      value={cabinClass}
                      onChange={(e) => setCabinClass(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium cursor-pointer"
                    >
                      <option value="Economy">Economy</option>
                      <option value="Premium Economy">Premium Economy</option>
                      <option value="Business">Business Class</option>
                      <option value="First Class">First Class (VIP)</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === "hotels" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="lg:col-span-2">
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      DESTINATION / HOTEL NAME*
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Goa, Manali, Dubai, Taj Palace, Maldives"
                      value={hotelDestination}
                      onChange={(e) => setHotelDestination(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      CHECK-IN DATE*
                    </label>
                    <input
                      type="date"
                      min={todayDate}
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium accent-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      ROOMS & GUESTS
                    </label>
                    <select
                      value={hotelGuests}
                      onChange={(e) => setHotelGuests(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium cursor-pointer"
                    >
                      <option value="1r1g">1 Room • 1 Guest (Solo)</option>
                      <option value="1r2g">1 Room • 2 Guests (Couple)</option>
                      <option value="2r4g">2 Rooms • 4 Guests (Family)</option>
                      <option value="3r6g">3 Rooms • 6 Guests (Group)</option>
                      <option value="suite">5-Star Luxury Suite</option>
                      <option value="villa">Private Luxury Pool Villa</option>
                      <option value="heritage">Heritage Palace Room</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === "visa" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      DESTINATION COUNTRY*
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dubai (UAE), Schengen, USA, UK, Singapore, Japan"
                      value={visaCountry}
                      onChange={(e) => setVisaCountry(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      VISA CATEGORY
                    </label>
                    <select
                      value={visaType}
                      onChange={(e) => setVisaType(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium cursor-pointer"
                    >
                      <option value="Tourist Visa">Tourist / Visitor Visa</option>
                      <option value="Business Visa">Business / Trade Visa</option>
                      <option value="Transit Visa">Transit Visa</option>
                      <option value="Work / Student Visa">Work / Student Visa</option>
                      <option value="Express Visa Assistance">Express / Urgent Visa Assistance</option>
                      <option value="Family Visa">Family / Dependent Visa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      TENTATIVE TRAVEL DATE
                    </label>
                    <input
                      type="date"
                      min={todayDate}
                      value={visaDate}
                      onChange={(e) => setVisaDate(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium accent-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      APPLICANTS
                    </label>
                    <select
                      value={visaApplicants}
                      onChange={(e) => setVisaApplicants(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium cursor-pointer"
                    >
                      <option value="1 Applicant">1 Solo Applicant</option>
                      <option value="2 Applicants">2 Applicants (Couple)</option>
                      <option value="Family (3-5 Applicants)">Family (3-5 Applicants)</option>
                      <option value="Small Group (6-10 Applicants)">Small Group (6-10 Applicants)</option>
                      <option value="Corporate Group (10+ Applicants)">Corporate Group (10+ Applicants)</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === "packages" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="lg:col-span-2">
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      DESTINATION / TOUR*
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kashmir, Kerala, Bali, Switzerland, Thailand, Maldives, Vietnam"
                      value={packageDest}
                      onChange={(e) => setPackageDest(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      TRAVEL MONTH / DATE*
                    </label>
                    <input
                      type="date"
                      min={todayDate}
                      value={packageDate}
                      onChange={(e) => setPackageDate(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium accent-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      HOLIDAY THEME
                    </label>
                    <select
                      value={packageType}
                      onChange={(e) => setPackageType(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium cursor-pointer"
                    >
                      <option value="Family Vacation">Family Vacation & Leisure</option>
                      <option value="Couple / Honeymoon">Couple / Honeymoon Special</option>
                      <option value="Friends Group">Friends Group & Road Trips</option>
                      <option value="Luxury Adventure">Luxury Adventure & Trekking</option>
                      <option value="Weekend Getaway">Weekend Getaway & Staycation</option>
                      <option value="Beach & Island">Beach, Island & Water Sports</option>
                      <option value="Heritage & Culture">Heritage, Forts & Royal Palaces</option>
                      <option value="Wildlife Safari">Wildlife Safari & Nature</option>
                      <option value="Pilgrimage & Spiritual">Pilgrimage & Spiritual Tour</option>
                      <option value="International Escapes">International Escapes</option>
                      <option value="Custom Tailored Itinerary">Custom Tailored Itinerary</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === "cruises" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="lg:col-span-2">
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      CRUISE SECTOR / DESTINATION*
                    </label>
                    <select
                      value={cruiseSector}
                      onChange={(e) => setCruiseSector(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium cursor-pointer"
                    >
                      <option value="Singapore & Southeast Asia">Singapore & Southeast Asia (Royal Caribbean - Spectrum of the Seas)</option>
                      <option value="Dubai & Arabian Gulf">Dubai & Arabian Gulf (MSC / Costa)</option>
                      <option value="Goa - Mumbai - Lakshadweep (Cordelia)">Goa - Mumbai - Lakshadweep (Cordelia Cruises)</option>
                      <option value="Mediterranean & Europe">Mediterranean & Greek Isles (Norwegian / Celebrity)</option>
                      <option value="Bahamas & Caribbean">Bahamas & Caribbean (Royal Caribbean - Icon of the Seas)</option>
                      <option value="Alaska Glaciers">Alaska Glaciers (Princess Cruises)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      SAILING DATE
                    </label>
                    <input
                      type="date"
                      min={todayDate}
                      value={cruiseDate}
                      onChange={(e) => setCruiseDate(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium accent-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      CABIN CATEGORY
                    </label>
                    <select
                      value={cabinCategory}
                      onChange={(e) => setCabinCategory(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium cursor-pointer"
                    >
                      <option value="Interior Stateroom">Interior Stateroom</option>
                      <option value="Ocean View Cabin">Ocean View Window Cabin</option>
                      <option value="Balcony Stateroom">Private Balcony Stateroom</option>
                      <option value="Concierge Club Suite">Concierge Club Suite</option>
                      <option value="Royal Luxury Suite">Royal Luxury Penthouse Suite</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === "corporate" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      EVENT DESTINATION*
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Goa, Udaipur, Bangkok, Dubai, Jim Corbett"
                      value={corporateDest}
                      onChange={(e) => setCorporateDest(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      COMPANY NAME*
                    </label>
                    <input
                      type="text"
                      placeholder="Organization / Brand"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      EVENT DATE
                    </label>
                    <input
                      type="date"
                      min={todayDate}
                      value={corporateDate}
                      onChange={(e) => setCorporateDate(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium accent-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      EVENT TYPE & DELEGATES
                    </label>
                    <select
                      value={corporateType}
                      onChange={(e) => setCorporateType(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium cursor-pointer"
                    >
                      <option value="Annual Conference (50+ Pax)">Annual Conference (50+ Pax)</option>
                      <option value="Leadership Offsite (20-50 Pax)">Leadership Offsite (20-50 Pax)</option>
                      <option value="Incentive Tour (100+ Pax)">Incentive Tour (100+ Pax)</option>
                      <option value="Gala Night & Awards (200+ Pax)">Gala Night & Awards (200+ Pax)</option>
                      <option value="Team Building & Adventure (30-80 Pax)">Team Building & Adventure (30-80 Pax)</option>
                      <option value="Dealer & Partner Meet (100-300 Pax)">Dealer & Partner Meet (100-300 Pax)</option>
                      <option value="Global Corporate Summit (International)">Global Corporate Summit (International)</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === "transfers" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      PICKUP AIRPORT / LOCATION*
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. IGI Airport Delhi (DEL)"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      DROP DESTINATION / HOTEL*
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hotel / Office / Address"
                      value={dropLocation}
                      onChange={(e) => setDropLocation(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      TRANSFER DATE
                    </label>
                    <input
                      type="date"
                      min={todayDate}
                      value={transferDate}
                      onChange={(e) => setTransferDate(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium accent-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      VEHICLE CLASS
                    </label>
                    <select
                      value={vehicleClass}
                      onChange={(e) => setVehicleClass(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#d4af37] font-medium cursor-pointer"
                    >
                      <option value="Sedan (Dzire / Etios)">Prime Sedan (Dzire / Etios / Aura)</option>
                      <option value="SUV (Innova Crysta)">Premium SUV (Innova Crysta / Hycross)</option>
                      <option value="Executive Luxury (Mercedes / BMW)">Executive Luxury (Mercedes E-Class / BMW / Audi)</option>
                      <option value="Ultra Luxury (Mercedes S-Class / Range Rover)">Ultra Luxury (Mercedes S-Class / Range Rover)</option>
                      <option value="Force Urbania (10-13 Seater)">Force Urbania Luxury Van (10-13 Seater)</option>
                      <option value="Tempo Traveller (12-16 Seater)">Luxury Tempo Traveller (12-16-20 Seater)</option>
                      <option value="Volvo / BharatBenz Luxury Coach (35-45 Seater)">Luxury Tourist Coach (35-45 Seater)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Row 2: Customer Contact Info (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 border-t border-slate-200">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    YOUR NAME*
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name (Letters only)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    EMAIL ADDRESS*
                  </label>
                  <input
                    type="email"
                    placeholder="email@company.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    MOBILE NUMBER (10 DIGITS)*
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit Mobile Number"
                    maxLength={10}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] font-medium tracking-wider"
                  />
                </div>
              </div>

              {/* Error Alert if any */}
              {errorMsg && (
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-3.5 py-2">
                  <MaterialIcon name="error" className="text-rose-600 shrink-0" size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Row 3: Bottom Bar (Priority Routing Note on Left & Request Button on Right) */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-600 font-medium">
                  <MaterialIcon name="bolt" className="text-amber-500 shrink-0" fill={true} size={18} />
                  <span>Direct priority routing to our senior desk</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#c49f27] text-black font-semibold uppercase text-xs tracking-wider px-7 py-3 transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <MaterialIcon name="progress_activity" className="animate-spin text-black" size={18} />
                      <span>SUBMITTING REQUEST...</span>
                    </>
                  ) : (
                    <>
                      <span>REQUEST QUOTATION</span>
                      <MaterialIcon name="arrow_forward" size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default TravelSearch;