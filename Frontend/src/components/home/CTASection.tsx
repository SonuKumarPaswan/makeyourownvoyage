import React from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

const CTASection = () => {
  return (
    <section className="px-4 py-16 sm:py-20 lg:px-8 bg-[#faf8f5]">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden bg-[#0a192f] border-2 border-[#d4af37] px-6 py-14 text-center shadow-2xl sm:px-10 sm:py-16 lg:px-16">
          {/* Background Subtle Luxury Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 bg-[#d4af37]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 bg-[#1a5b8c]/20 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl">
            {/* Label */}
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              Your Next Adventure Awaits
            </p>

            {/* Heading */}
            <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              Ready to Start Your Journey?
            </h2>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-gray-300 font-light">
              Explore amazing destinations, discover curated luxury travel deals and
              plan your bespoke voyage with our senior travel specialists.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/packages"
                className="inline-flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#c49f27] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition shadow-lg"
              >
                <span>Explore Packages</span>
                <MaterialIcon name="arrow_forward" size={16} />
              </Link>

              <Link
                href="/flights"
                className="inline-flex items-center justify-center gap-2 border border-[#d4af37]/50 bg-black/40 hover:bg-[#d4af37] hover:text-black px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition shadow-lg group"
              >
                <span>Search Flights</span>
                <MaterialIcon name="flight_takeoff" className="text-[#d4af37] group-hover:text-black" size={16} />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-300">
              <span className="flex items-center gap-1.5">
                <MaterialIcon name="check_circle" className="text-[#d4af37]" size={16} />
                <span>Verified Handcrafted Itineraries</span>
              </span>

              <span className="hidden h-4 w-px bg-white/20 sm:block" />

              <span className="flex items-center gap-1.5">
                <MaterialIcon name="verified" className="text-[#d4af37]" size={16} />
                <span>Best Price & Luxury Promise</span>
              </span>

              <span className="hidden h-4 w-px bg-white/20 sm:block" />

              <span className="flex items-center gap-1.5">
                <MaterialIcon name="support_agent" className="text-[#d4af37]" size={16} />
                <span>24/7 Dedicated Concierge Support</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;