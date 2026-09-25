import React from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import type { PriceSlab } from "@/types/package";

interface PackagePriceSlabsProps {
  priceSlabs: PriceSlab[];
}

export default function PackagePriceSlabs({ priceSlabs }: PackagePriceSlabsProps) {
  if (!priceSlabs || priceSlabs.length === 0) return null;

  return (
    <section className="border border-[#e8e3d9] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-[#0a192f]">Tiered Group Pricing (B2B Slabs)</h3>
          <p className="text-xs text-slate-500">Volume rates based on headcount</p>
        </div>
        <MaterialIcon name="groups" size={20} className="text-[#d4af37]" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {priceSlabs.map((slab, idx) => (
          <div
            key={idx}
            className="border border-[#e8e3d9] bg-[#faf8f5] p-4 text-center transition-all hover:border-[#d4af37] hover:bg-white"
          >
            <span className="text-xs font-semibold text-slate-600">
              {slab.minPax} - {slab.maxPax} Persons
            </span>
            <p className="mt-1 text-xl font-extrabold text-[#0a192f]">
              ₹{slab.pricePerPerson?.toLocaleString("en-IN")}
            </p>
            <span className="text-[11px] text-slate-400">per person</span>
          </div>
        ))}
      </div>
    </section>
  );
}
