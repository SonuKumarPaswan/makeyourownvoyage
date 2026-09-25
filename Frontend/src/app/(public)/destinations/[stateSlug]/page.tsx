import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getStateBySlug } from "@/lib/api/states.api";
import { getDestinations, getDestinationBySlug } from "@/lib/api/destinations.api";
import { redirect } from "next/navigation";
import type { Destination } from "@/types/destination";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface Props {
  params: Promise<{ stateSlug: string }>;
}

export default async function StateDestinationsPage({ params }: Props) {
  const { stateSlug } = await params;

  // Check if it's a State slug
  try {
    const stateRes = await getStateBySlug(stateSlug);
    const state = stateRes.data;
    if (state?._id) {
      const destRes = await getDestinations({ state: state._id });
      const destinations: Destination[] = destRes.data || [];

      return (
        <div className="min-h-screen bg-[#faf8f5]">
          <div className="relative h-[320px] w-full bg-[#0a192f] text-white">
            <Image
              src={state.bannerImage || state.image || "/placeholder.jpg"}
              alt={state.name}
              fill
              priority
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/50 to-transparent" />
            <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8">
              <nav className="flex items-center gap-2 text-xs font-semibold text-[#d4af37]">
                <Link href="/destinations" className="hover:underline">Destinations</Link>
                <span>/</span>
                <span className="text-white">{state.name}</span>
              </nav>
              <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl text-white">
                Destinations in <span className="text-gradient-gold">{state.name}</span>
              </h1>
            </div>
          </div>

          <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((dest) => (
                <Link
                  key={dest._id}
                  href={`/destinations/${state.slug}/${dest.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8e3d9] bg-white shadow-sm transition-all hover:shadow-xl hover:border-[#d4af37]"
                >
                  <div className="relative h-48 w-full bg-slate-100">
                    <Image
                      src={dest.image || "/placeholder.jpg"}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-5 flex flex-1 flex-col">
                    <h3 className="font-bold text-lg text-[#0a192f] group-hover:text-[#b89228]">{dest.name}</h3>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">{dest.shortDescription || dest.description}</p>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 text-xs text-[#d4af37] font-bold">
                      <span>Explore Destination</span>
                      <MaterialIcon name="arrow_forward" size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      );
    }
  } catch {
    // Fall through to destination check
  }

  // If not state, check if someone visited a direct destination slug like /destinations/manali
  try {
    const destRes = await getDestinationBySlug(stateSlug);
    const dest = destRes.data;
    if (dest) {
      const parentStateSlug =
        typeof dest.state === "object" ? (dest.state as any)?.slug || "india" : "india";
      redirect(`/destinations/${parentStateSlug}/${dest.slug}`);
    }
  } catch {
    // ignore
  }

  notFound();
}
