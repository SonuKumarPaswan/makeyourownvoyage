import React from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

export const metadata = {
  title: "Travel Services & Transport Fleet | Make Your Own Voyage",
  description:
    "Complete travel services across India: Curated holiday packages, cab rentals, self-drive bikes, Volvo buses, luxury hotels, and corporate MICE events.",
};

const services = [
  {
    title: "Tour & Holiday Packages",
    description: "Curated domestic holidays, honeymoon packages, and family vacations with verified stays.",
    icon: "explore",
    href: "/packages",
    badge: "Bespoke Itineraries",
  },
  {
    title: "Chauffeur Cab Rentals",
    description: "Sedan, SUV, and Innova Crysta for local sightseeing, airport transfers, and outstation trips.",
    icon: "directions_car",
    href: "/services/transport/cabs",
    badge: "Per Km & Per Day",
  },
  {
    title: "Self-Drive Bike Rentals",
    description: "Royal Enfield Himalayan, Classic 350, and Scooters in Manali, Leh, Goa, and Rishikesh.",
    icon: "two_wheeler",
    href: "/services/transport/bikes",
    badge: "Helmets Included",
  },
  {
    title: "Volvo & Luxury Buses",
    description: "Multi-Axle Volvo, BharatBenz, and Sleeper coaches for weddings and large groups.",
    icon: "directions_bus",
    href: "/services/transport/buses",
    badge: "AC Sleeper / Seater",
  },
  {
    title: "Tempo Travellers",
    description: "12, 17, 20, and 26-seater luxury pushback travellers for family and corporate groups.",
    icon: "groups",
    href: "/services/transport/traveller",
    badge: "Group Comfort",
  },
  {
    title: "Hotels & Luxury Resorts",
    description: "Handpicked 3-star to 5-star luxury resorts, heritage palaces, and boutique homestays.",
    icon: "apartment",
    href: "/hotels",
    badge: "Verified Stays",
  },
  {
    title: "Corporate MICE & Offsites",
    description: "Conference halls, DJ & sound systems, team-building facilitators, and gala dinners.",
    icon: "business_center",
    href: "/packages?type=corporate",
    badge: "B2B Specialists",
  },
];

export default function ServicesHubPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0a192f] pt-28 pb-16 text-white border-b border-[#d4af37]/20">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 border border-[#d4af37]/40 bg-[#0a192f] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
            <MaterialIcon name="auto_awesome" size={14} /> End-to-End Travel Solutions
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white uppercase">
            Our Premium <span className="text-[#d4af37]">Travel Services</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-gray-300 font-light">
            Everything you need for seamless journeys: Fleet rentals, bespoke tours, stays, and corporate MICE logistics.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((srv, idx) => (
            <Link
              key={idx}
              href={srv.href}
              className="group flex flex-col justify-between border-2 border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#d4af37] hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center bg-[#0a192f] text-[#d4af37] border border-[#d4af37]/30 transition-transform group-hover:scale-105">
                    <MaterialIcon name={srv.icon} size={24} />
                  </div>
                  <span className="bg-[#0a192f]/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0a192f] border border-gray-300">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold uppercase tracking-wide text-[#0a192f] transition-colors group-hover:text-[#d4af37]">
                  {srv.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600 font-light">
                  {srv.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0a192f] border-t border-gray-100 pt-4 group-hover:text-[#d4af37]">
                <span>Explore Service</span>
                <MaterialIcon name="arrow_forward" size={16} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
