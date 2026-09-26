import React from "react";
import Image from "next/image";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";
import type { Package } from "@/types/package";

interface PackageDetailHeroProps {
  pkg: Package;
}

export default function PackageDetailHero({ pkg }: PackageDetailHeroProps) {
  const destinationName =
    typeof pkg.destination === "object" ? (pkg.destination as any)?.name : pkg.region;

  return (
    <section className="relative h-[480px] w-full bg-[#0a192f] text-white">
      <Image
        src={pkg.image || "/placeholder.jpg"}
        alt={pkg.title}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/40 to-black/20" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          {Array.isArray(pkg.categories) && pkg.categories.length > 0 ? (
            pkg.categories.map((cat) => (
              <span
                key={cat}
                className="bg-[#d4af37] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0a192f] rounded-xs shadow-xs"
              >
                {cat.replace(/_/g, " ")}
              </span>
            ))
          ) : (
            <span className="bg-[#d4af37] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0a192f] rounded-xs shadow-xs">
              {pkg.packageType?.replace(/_/g, " ") || "Sea Beach"}
            </span>
          )}
          <span className="inline-flex items-center gap-1 border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md rounded-xs">
            <MaterialIcon name="location_on" size={14} className="text-[#d4af37]" />
            {destinationName}
          </span>
          <span className="inline-flex items-center gap-1 border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            <MaterialIcon name="schedule" size={14} className="text-[#d4af37]" />
            {pkg.duration || `${pkg.days} Days / ${pkg.nights} Nights`}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
          {pkg.title}
        </h1>

        <p className="mt-2 text-sm text-slate-300">
          Region: <span className="font-semibold text-white">{pkg.region}</span> | Group Capacity:{" "}
          <span className="font-semibold text-[#d4af37]">
            {pkg.minPax} - {pkg.maxPax} Pax
          </span>
        </p>
      </div>
    </section>
  );
}
