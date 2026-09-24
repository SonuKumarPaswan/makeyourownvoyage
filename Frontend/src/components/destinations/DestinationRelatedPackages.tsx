import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PhoneCall, ArrowRight } from "lucide-react";
import type { Package } from "@/types/package";

interface DestinationRelatedPackagesProps {
  destName: string;
  packages: Package[];
}

export default function DestinationRelatedPackages({
  destName,
  packages = [],
}: DestinationRelatedPackagesProps) {
  return (
    <section>
      <div className="flex items-center justify-between border-b border-[#e8e3d9] pb-4">
        <div>
          <h3 className="text-2xl font-bold text-[#0a192f]">Tour Packages for {destName}</h3>
          <p className="text-sm text-slate-600">Curated itineraries and custom holiday tours</p>
        </div>
        <Link href="/packages" className="text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:underline">
          View All Packages →
        </Link>
      </div>

      {packages.length === 0 ? (
        <div className="my-8 border border-dashed border-[#e8e3d9] bg-white p-8 text-center">
          <p className="text-sm text-slate-600">
            Custom tailored itineraries available on request for {destName}.
          </p>
          <Link
            href={`/enquiry?destination=${encodeURIComponent(destName)}`}
            className="mt-4 inline-flex items-center gap-2 bg-gradient-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0a192f]"
          >
            <PhoneCall className="h-3.5 w-3.5" /> Plan Custom Trip to {destName}
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Link
              key={pkg._id}
              href={`/packages/${pkg.slug}`}
              className="group flex flex-col border border-[#e8e3d9] bg-white shadow-sm transition-all duration-300 hover:border-[#d4af37] hover:shadow-xl"
            >
              <div className="relative h-48 w-full bg-slate-100">
                <Image
                  src={pkg.image || "/placeholder.jpg"}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-1 flex-col">
                <span className="text-xs text-[#d4af37] font-bold uppercase tracking-wider">{pkg.duration}</span>
                <h4 className="mt-1 font-bold text-[#0a192f] group-hover:text-[#b89228] line-clamp-1">
                  {pkg.title}
                </h4>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 text-xs">
                  <span className="font-extrabold text-[#0a192f]">
                    ₹{pkg.startingPrice?.toLocaleString("en-IN")} / person
                  </span>
                  <span className="font-bold text-[#d4af37] flex items-center gap-1">
                    Details <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
