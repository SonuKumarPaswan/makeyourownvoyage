import React from "react";
import Image from "next/image";
import type { DestinationAttraction } from "@/types/destination";

interface DestinationAttractionsProps {
  destName: string;
  attractions?: DestinationAttraction[];
}

export default function DestinationAttractions({
  destName,
  attractions = [],
}: DestinationAttractionsProps) {
  if (!attractions || attractions.length === 0) return null;

  return (
    <section>
      <div className="border-b border-[#e8e3d9] pb-4">
        <h3 className="text-2xl font-bold text-[#0a192f]">Top Attractions in {destName}</h3>
        <p className="text-sm text-slate-600">Must-visit sights and experiences</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {attractions.map((att, idx) => (
          <article
            key={idx}
            className="group overflow-hidden border border-[#e8e3d9] bg-white shadow-sm transition-all hover:border-[#d4af37]"
          >
            <div className="relative h-44 w-full bg-slate-100">
              <Image
                src={att.image || "/placeholder.jpg"}
                alt={att.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-[#0a192f] text-sm">{att.name}</h4>
              {att.description && (
                <p className="mt-1 text-xs text-slate-500 line-clamp-2">{att.description}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
