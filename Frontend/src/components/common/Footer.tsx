import React from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import MaterialIcon from "@/components/ui/MaterialIcon";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071324] text-white border-t-2 border-[#d4af37]/30">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo />
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-sm pt-2">
              Make Your Own Voyage is India's premier bespoke luxury travel and MICE concierge. Crafting extraordinary journeys with zero compromise on comfort.
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37] block mb-2">
                Certified Travel Partner
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#d4af37]/30 bg-[#0a192f] text-gray-300 text-xs">
                <MaterialIcon name="auto_awesome" size={14} className="text-[#d4af37]" /> 100% Verified Inventory & Chauffeurs
              </div>
            </div>
          </div>

          {/* Col 2: Destinations & States */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-4 pb-2 border-b border-[#d4af37]/30">
              Voyage Catalog
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link href="/packages" className="hover:text-[#d4af37] transition-colors">
                  Holiday Packages
                </Link>
              </li>
              <li>
                <Link href="/states" className="hover:text-[#d4af37] transition-colors">
                  States & Regions
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-[#d4af37] transition-colors">
                  Top Destinations
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="hover:text-[#d4af37] transition-colors">
                  Hotels & Resorts
                </Link>
              </li>
              <li>
                <Link href="/packages?type=weekend" className="hover:text-[#d4af37] transition-colors">
                  Weekend Escapes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Transport & Fleet */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-4 pb-2 border-b border-[#d4af37]/30">
              Fleet & Mobility
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link href="/services/transport/cabs" className="hover:text-[#d4af37] transition-colors">
                  Outstation & Airport Cabs
                </Link>
              </li>
              <li>
                <Link href="/services/transport/bikes" className="hover:text-[#d4af37] transition-colors">
                  Royal Enfield & Bike Rentals
                </Link>
              </li>
              <li>
                <Link href="/services/transport/buses" className="hover:text-[#d4af37] transition-colors">
                  Luxury Volvo & Sleeper Buses
                </Link>
              </li>
              <li>
                <Link href="/services/transport/traveller" className="hover:text-[#d4af37] transition-colors">
                  12-26 Seater Tempo Travellers
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#d4af37] transition-colors">
                  Corporate MICE Logistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Concierge Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-4 pb-2 border-b border-[#d4af37]/30">
              Concierge Desk
            </h3>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MaterialIcon name="location_on" size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                <span>Voyage Corporate Towers, Connaught Place, New Delhi, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MaterialIcon name="call" size={16} className="text-[#d4af37] shrink-0" />
                <span>+91 98765 43210 / +91 11 2345 6789</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MaterialIcon name="mail" size={16} className="text-[#d4af37] shrink-0" />
                <span>concierge@makeyourownvoyage.com</span>
              </div>
            </div>

            {/* Newsletter Input */}
            <div className="mt-5">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block mb-2">
                Exclusive Travel Privileges:
              </span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-[#0a192f] border border-gray-700 px-3 py-2 text-xs text-white focus:outline-none placeholder-gray-500 w-full"
                />
                <button
                  type="button"
                  className="bg-[#d4af37] text-[#0a192f] px-3 font-bold border border-[#d4af37] hover:bg-white transition-colors flex items-center justify-center"
                >
                  <MaterialIcon name="send" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} MAKE YOUR OWN VOYAGE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Concierge</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
