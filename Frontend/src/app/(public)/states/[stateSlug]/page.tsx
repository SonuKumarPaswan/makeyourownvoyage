import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getStateBySlug } from "@/lib/api/states.api";
import { getDestinations } from "@/lib/api/destinations.api";
import type { State } from "@/types/state";
import type { Destination } from "@/types/destination";
import StateDetailHero from "@/components/states/StateDetailHero";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface Props {
  params: Promise<{ stateSlug: string }>;
}

export default async function StateDetailPage({ params }: Props) {
  const { stateSlug } = await params;
  let state: State | null = null;
  let destinations: Destination[] = [];

  try {
    const res = await getStateBySlug(stateSlug);
    state = res.data;
    if (state?._id) {
      const destRes = await getDestinations({ state: state._id });
      destinations = destRes.data || [];
    }
  } catch {
    notFound();
  }

  if (!state) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <StateDetailHero state={state} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="border-b border-[#e8e3d9] pb-4">
          <h2 className="text-2xl font-bold text-[#0a192f]">Top Destinations in {state.name}</h2>
          <p className="text-sm text-slate-600">Discover cities, hill stations, and attractions across {state.name}</p>
        </div>

        {destinations.length === 0 ? (
          <div className="my-12 border border-[#e8e3d9] bg-white p-8 text-center">
            <p className="text-sm text-slate-600">Destinations are being updated for {state.name}.</p>
            <Link
              href="/packages"
              className="mt-4 inline-flex items-center gap-1.5 bg-gradient-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0a192f]"
            >
              Browse All Packages <MaterialIcon name="arrow_forward" size={14} />
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((dest) => (
              <Link
                key={dest._id}
                href={`/destinations/${state.slug}/${dest.slug}`}
                className="group flex flex-col border border-[#e8e3d9] bg-white shadow-sm transition-all duration-300 hover:border-[#d4af37] hover:shadow-xl"
              >
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={dest.image || "/placeholder.jpg"}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-lg font-bold">{dest.name}</h3>
                    <span className="text-xs text-[#d4af37] capitalize">{dest.type?.join(", ")}</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {dest.shortDescription || dest.description || "Explore top sights and holiday packages."}
                  </p>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 text-xs">
                    <span className="font-semibold text-[#0a192f]">
                      {dest.attractions?.length || 0} Attractions
                    </span>
                    <span className="flex items-center gap-1 font-bold text-[#d4af37]">
                      View Guide <MaterialIcon name="arrow_forward" size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
