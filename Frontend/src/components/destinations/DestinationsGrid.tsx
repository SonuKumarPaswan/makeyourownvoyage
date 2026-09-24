import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Destination } from "@/types/destination";
import { ArrowRight, Compass } from "lucide-react";

interface DestinationsGridProps {
  destinations: Destination[];
  activeType?: string;
}

export default function DestinationsGrid({
  destinations,
  activeType = "all",
}: DestinationsGridProps) {
  const categoryTypes = [
    { label: "All Destinations", value: "all" },
    { label: "Hill Stations", value: "hill_station" },
    { label: "Beaches", value: "beach" },
    { label: "Heritage & Forts", value: "heritage" },
    { label: "Wildlife", value: "wildlife" },
    { label: "Adventure", value: "adventure" },
    { label: "Pilgrimage", value: "pilgrimage" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Filters */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-[#e8e3d9] pb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0a192f]">Explore All Destinations</h2>
          <p className="text-sm text-slate-600">Showing {destinations.length} popular travel hubs</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {categoryTypes.map((cat) => (
            <Link
              key={cat.value}
              href={cat.value === "all" ? "/destinations" : `/destinations?type=${cat.value}`}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                activeType === cat.value
                  ? "bg-[#d4af37] text-[#0a192f] border-[#d4af37] shadow-sm"
                  : "bg-white text-slate-700 border-[#e8e3d9] hover:border-[#d4af37] hover:text-[#d4af37]"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {destinations.length === 0 ? (
        <div className="my-16 border border-dashed border-[#d4af37]/40 bg-white p-12 text-center">
          <Compass className="mx-auto h-12 w-12 text-[#d4af37]" />
          <h3 className="mt-4 text-xl font-bold text-[#0a192f]">No Destinations Found</h3>
          <p className="mt-2 text-sm text-slate-600">Explore our states and holiday packages.</p>
          <Link
            href="/states"
            className="mt-6 inline-flex items-center gap-2 bg-gradient-gold px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0a192f]"
          >
            Browse States <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => {
            const stateSlug =
              typeof dest.state === "object"
                ? (dest.state as any)?.slug || "india"
                : "india";

            return (
              <Link
                key={dest._id}
                href={`/destinations/${stateSlug}/${dest.slug}`}
                className="group flex flex-col border border-[#e8e3d9] bg-white shadow-sm transition-all duration-300 hover:border-[#d4af37] hover:shadow-xl"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={dest.image || "/placeholder.jpg"}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37]">
                      {typeof dest.state === "object" ? (dest.state as any)?.name : "India"}
                    </span>
                    <h3 className="text-xl font-bold">{dest.name}</h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {dest.shortDescription || dest.description || "Discover top sights and custom holiday tours."}
                  </p>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 text-xs">
                    <span className="font-semibold text-[#0a192f]">
                      {dest.attractions?.length || 0} Key Sights
                    </span>
                    <span className="flex items-center gap-1 font-bold text-[#d4af37]">
                      View Guide <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
