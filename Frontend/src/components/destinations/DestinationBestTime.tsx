import React from "react";
import { Sun } from "lucide-react";

interface DestinationBestTimeProps {
  bestTimeToVisit?: {
    months?: string[];
    description?: string;
  };
}

export default function DestinationBestTime({
  bestTimeToVisit,
}: DestinationBestTimeProps) {
  if (!bestTimeToVisit) return null;

  return (
    <section className="border border-[#d4af37]/30 bg-gradient-to-br from-[#0a192f] to-[#102a45] p-6 text-white shadow-lg">
      <div className="flex items-center gap-2 text-[#d4af37]">
        <Sun className="h-5 w-5" />
        <h3 className="text-lg font-bold">Best Time to Visit</h3>
      </div>
      {bestTimeToVisit.months && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {bestTimeToVisit.months.map((m) => (
            <span
              key={m}
              className="bg-[#d4af37]/20 border border-[#d4af37]/40 px-2.5 py-1 text-xs font-bold text-[#d4af37]"
            >
              {m}
            </span>
          ))}
        </div>
      )}
      {bestTimeToVisit.description && (
        <p className="mt-3 text-xs leading-relaxed text-slate-300">
          {bestTimeToVisit.description}
        </p>
      )}
    </section>
  );
}
