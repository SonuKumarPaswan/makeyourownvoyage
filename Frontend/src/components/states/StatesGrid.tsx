import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import type { State } from "@/types/state";

interface StatesGridProps {
  states: State[];
}

export default function StatesGrid({ states }: StatesGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="border-b border-[#e8e3d9] pb-4">
        <h2 className="text-2xl font-bold text-[#0a192f]">All Indian States & Regions</h2>
        <p className="text-sm text-slate-600">Select a state to explore its top travel destinations and packages</p>
      </div>

      {states.length === 0 ? (
        <div className="my-16 border border-dashed border-[#d4af37]/40 bg-white p-12 text-center">
          <h3 className="text-xl font-bold text-[#0a192f]">States Loading</h3>
          <p className="mt-2 text-sm text-slate-600">Explore our featured packages across India.</p>
          <Link
            href="/packages"
            className="mt-6 inline-flex items-center gap-2 bg-gradient-gold px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0a192f] shadow-md"
          >
            Explore Packages <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {states.map((st) => (
            <Link
              key={st._id}
              href={`/states/${st.slug}`}
              className="group relative flex h-72 flex-col justify-end overflow-hidden border border-[#e8e3d9] bg-[#0a192f] p-6 shadow-sm transition-all duration-300 hover:border-[#d4af37] hover:shadow-xl"
            >
              <Image
                src={st.image || st.bannerImage || "/placeholder.jpg"}
                alt={st.name}
                fill
                className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/40 to-transparent" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#d4af37]">
                  <MapPin className="h-3.5 w-3.5" /> India
                </span>
                <h3 className="mt-1 text-2xl font-bold text-white transition-colors group-hover:text-[#d4af37]">
                  {st.name}
                </h3>
                {st.description && (
                  <p className="mt-1 text-xs text-slate-300 line-clamp-2">{st.description}</p>
                )}
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                  Explore Destinations <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
