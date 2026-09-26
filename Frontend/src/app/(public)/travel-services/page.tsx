import React from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

export const metadata = {
  title: "Travel Services & Transport Fleet | Make Your Own Voyage",
  description:
    "Comprehensive travel services: Airport transfers, luxury chauffeur cab rentals, self-drive vehicles, Volvo coaches, travel insurance and customized travel logistics across India.",
};

const TRAVEL_SERVICES = [
  {
    title: "Airport Transfers & Doorstep Pickups",
    description: "24/7 dedicated airport transfers with flight tracking, professional chauffeurs, zero waiting surges, and sanitized cabs.",
    icon: "local_taxi",
    href: "/travel-services/airport-transfer",
    badge: "24/7 Guaranteed",
    features: ["Meet & Greet at Arrivals", "Flight Delay Tracking", "Fixed Flat Fares", "Zero Surge Pricing"],
  },
  {
    title: "Car & Fleet Rentals",
    description: "Wide range of Sedan, SUV, Innova Crysta, and luxury tempo travellers for outstation vacations and local sightseeing.",
    icon: "directions_car",
    href: "/travel-services/car-rental",
    badge: "Outstation & Local",
    features: ["Sedan / SUV / Innova", "Verified Professional Drivers", "All Tolls & Parking Covered", "Doorstep Pickup"],
  },
  {
    title: "Comprehensive Travel Insurance",
    description: "Complete overseas and domestic travel insurance covering medical emergencies, trip delays, baggage loss, and passport loss.",
    icon: "shield",
    href: "/travel-services/travel-insurance",
    badge: "Instant Policy",
    features: ["Cashless Hospitalization", "Loss of Passport & Luggage", "Trip Cancellation Cover", "Global 24/7 Assistance"],
  },
  {
    title: "Global Visa Assistance",
    description: "Fast-track tourist, business, and e-visa processing for over 80+ countries with 99.4% approval success rate.",
    icon: "assignment",
    href: "/visa",
    badge: "80+ Countries",
    features: ["24-48 Hr Express E-Visa", "Expert Document Verification", "Embassy Appointment Booking", "Doorstep Document Pickup"],
  },
  {
    title: "Curated Holiday Packages",
    description: "Tailor-made itineraries with handpicked 3-star to 5-star boutique resorts, guided transfers, and cultural experiences.",
    icon: "luggage",
    href: "/packages",
    badge: "Custom Itineraries",
    features: ["Bespoke Itinerary Planning", "Handpicked Verified Hotels", "Private Chauffeur Transfers", "24/7 Tour Concierge"],
  },
  {
    title: "Corporate MICE & Offsites",
    description: "End-to-end corporate event planning: Conference halls, audio-visual stage setups, team building activities, and gala banquets.",
    icon: "business_center",
    href: "/packages?type=corporate",
    badge: "B2B Specialists",
    features: ["Conference AV Systems", "Team Building Facilitators", "Live DJ & Gala Banquets", "GST Invoicing & Group Rates"],
  },
];

export default function TravelServicesPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-slate-800 pt-24 pb-16 selection:bg-[#d4af37] selection:text-black">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#faf8f5] to-[#faf8f5] py-14 border-b border-[#e8e3d9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[#b8860b] text-xs font-semibold uppercase tracking-wider shadow-xs">
            <MaterialIcon name="verified" size={16} />
            <span>End-to-End Travel &amp; Mobility Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0a192f] uppercase">
            Our Premium <span className="text-[#b8860b]">Travel Services</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
            Everything you need for seamless, stress-free journeys: Airport cabs, car rentals, global visas, travel insurance, and bespoke holiday packages.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRAVEL_SERVICES.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e8e3d9] hover:border-[#d4af37] rounded-2xl p-6 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-xl bg-amber-50 border border-amber-200 text-[#b8860b] flex items-center justify-center transition-transform group-hover:scale-105">
                    <MaterialIcon name={srv.icon} size={24} />
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#faf8f5] text-[10px] font-bold uppercase tracking-wider text-[#b8860b] border border-[#e8e3d9]">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0a192f] group-hover:text-[#b8860b] transition-colors leading-tight">
                  {srv.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {srv.description}
                </p>

                {/* Bullet Features */}
                <div className="pt-2 border-t border-[#e8e3d9] space-y-1.5">
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-700">
                      <MaterialIcon name="check_circle" size={13} className="text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#e8e3d9]">
                <Link
                  href={srv.href}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#faf8f5] hover:bg-[#d4af37] text-slate-700 hover:text-slate-950 text-xs font-bold uppercase tracking-wider border border-[#e8e3d9] hover:border-[#d4af37] transition flex items-center justify-between shadow-xs"
                >
                  <span>Explore Service</span>
                  <MaterialIcon name="arrow_forward" size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
