import React from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";
import type { Package } from "@/types/package";

interface PackageBookingStickyProps {
  pkg: Package;
}

export default function PackageBookingSticky({ pkg }: PackageBookingStickyProps) {
  return (
    <aside className="sticky top-28 border border-[#e8e3d9] bg-white p-6 shadow-xl">
      <div className="border-b border-slate-100 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37]">
          Guaranteed Best Rate
        </span>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-[#0a192f]">
            ₹{pkg.startingPrice?.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-slate-500">/ person starting</span>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-xs text-slate-600">
        <div className="flex items-center justify-between">
          <span>Duration</span>
          <strong className="text-[#0a192f]">{pkg.duration || `${pkg.days}D / ${pkg.nights}N`}</strong>
        </div>
        <div className="flex items-center justify-between">
          <span>Min Group Size</span>
          <strong className="text-[#0a192f]">{pkg.minPax} Pax</strong>
        </div>
        <div className="flex items-center justify-between">
          <span>Customization</span>
          <strong className="text-emerald-700 font-bold">100% Flexible</strong>
        </div>
      </div>

      <Link
        href={`/enquiry?packageId=${pkg._id}&packageTitle=${encodeURIComponent(pkg.title)}`}
        className="mt-6 flex w-full items-center justify-center gap-2 bg-gradient-gold py-3.5 text-xs font-bold uppercase tracking-wider text-[#0a192f] shadow-lg transition-transform hover:scale-[1.02]"
      >
        <MaterialIcon name="call" size={16} /> Request Custom Quote
      </Link>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
        <MaterialIcon name="verified" size={14} className="text-[#d4af37]" /> Verified Hotels & Transports
      </div>
    </aside>
  );
}
