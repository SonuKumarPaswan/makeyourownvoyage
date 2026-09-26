import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Package } from "@/types/package";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface PackagesGridProps {
  packages: Package[];
  activeType?: string;
}

export default function PackagesGrid({ packages, activeType = "all" }: PackagesGridProps) {
  const filterTypes = [
    { label: "All Packages", value: "all" },
    { label: "Sea & Beach", value: "sea_beach" },
    { label: "Honeymoon & Couple", value: "honeymoon" },
    { label: "Family Friendly", value: "family" },
    { label: "Mountain & Hills", value: "mountain_trips" },
    { label: "Weekend Trips", value: "weekend_trips" },
    { label: "Group Trips", value: "group_trips" },
    { label: "Trekking", value: "trekking_tour" },
    { label: "Adventure", value: "adventure" },
    { label: "Corporate", value: "corporate" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Filter Bar */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-[#e8e3d9] pb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0a192f]">Featured Itineraries</h2>
          <p className="text-sm text-slate-600">Showing {packages.length} curated voyages</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filterTypes.map((t) => (
            <Link
              key={t.value}
              href={t.value === "all" ? "/packages" : `/packages?type=${t.value}`}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border rounded-md ${
                activeType === t.value
                  ? "bg-[#d4af37] text-[#0a192f] border-[#d4af37] shadow-sm"
                  : "bg-white text-slate-700 border-[#e8e3d9] hover:border-[#d4af37] hover:text-[#d4af37]"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>

      {packages.length === 0 ? (
        <div className="my-16 border border-dashed border-[#d4af37]/40 bg-white p-12 text-center">
          <h3 className="text-xl font-bold text-[#0a192f]">No Packages Available</h3>
          <p className="mt-2 text-sm text-slate-600">
            Please try another category or browse our destinations.
          </p>
          <Link
            href="/destinations"
            className="mt-6 inline-flex items-center gap-2 bg-gradient-gold px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0a192f] shadow-md"
          >
            Explore Destinations <MaterialIcon name="arrow_forward" size={16} />
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg._id}
              className="group flex flex-col border border-[#e8e3d9] bg-white shadow-sm transition-all duration-300 hover:border-[#d4af37] hover:shadow-xl"
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <Image
                  src={pkg.image || "/placeholder.jpg"}
                  alt={pkg.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Category Badges (Multi-Category Support) */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[80%]">
                  {Array.isArray(pkg.categories) && pkg.categories.length > 0 ? (
                    pkg.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="bg-[#0a192f]/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/40 rounded-sm"
                      >
                        {cat.replace(/_/g, " ")}
                      </span>
                    ))
                  ) : (
                    <span className="bg-[#0a192f] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/30 rounded-sm">
                      {pkg.packageType?.replace(/_/g, " ") || "Sea Beach"}
                    </span>
                  )}
                  {Array.isArray(pkg.categories) && pkg.categories.length > 2 && (
                    <span className="bg-[#0a192f]/80 px-1.5 py-0.5 text-[9px] font-bold text-gray-300 rounded-sm">
                      +{pkg.categories.length - 2}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-semibold text-white">
                  <MaterialIcon name="location_on" size={14} className="text-[#d4af37]" />
                  <span>{typeof pkg.destination === "object" ? (pkg.destination as any)?.name : pkg.region}</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <MaterialIcon name="schedule" size={14} className="text-[#d4af37]" />
                    {pkg.duration || `${pkg.days}D / ${pkg.nights}N`}
                  </span>
                  {pkg.rating && (
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <MaterialIcon name="star" size={14} fill className="text-amber-500" />
                      {pkg.rating}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-lg font-bold text-[#0a192f] transition-colors group-hover:text-[#b89228] line-clamp-2">
                  {pkg.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pkg.inclusions?.slice(0, 3).map((inc, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 bg-[#faf8f5] px-2.5 py-1 text-[11px] font-medium text-slate-700 border border-[#e8e3d9]"
                    >
                      <MaterialIcon name="verified" size={12} className="text-emerald-600" /> {inc}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400">Starting from</span>
                    <p className="text-xl font-extrabold text-[#0a192f]">
                      ₹{pkg.startingPrice?.toLocaleString("en-IN")}
                      <span className="text-xs font-normal text-slate-500"> / pax</span>
                    </p>
                  </div>

                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="inline-flex items-center gap-1.5 bg-gradient-gold px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0a192f] shadow-sm transition-transform hover:scale-105"
                  >
                    View Tour <MaterialIcon name="arrow_forward" size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
