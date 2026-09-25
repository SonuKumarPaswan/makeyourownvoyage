import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/types/destination";

interface DestinationDetailHeroProps {
  dest: Destination;
  stateSlug: string;
}

export default function DestinationDetailHero({
  dest,
  stateSlug,
}: DestinationDetailHeroProps) {
  const stateName = typeof dest.state === "object" ? (dest.state as any)?.name : stateSlug;

  return (
    <section className="relative h-[440px] w-full bg-[#0a192f] text-white">
      <Image
        src={dest.image || "/placeholder.jpg"}
        alt={dest.name}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/40 to-black/20" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
          <Link href="/states" className="hover:underline">States</Link>
          <span>/</span>
          <Link href={`/states/${stateSlug}`} className="hover:underline capitalize">{stateName}</Link>
          <span>/</span>
          <span className="text-white">{dest.name}</span>
        </nav>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {dest.type?.map((t: string) => (
            <span key={t} className="bg-[#d4af37] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0a192f]">
              {t.replace("_", " ")}
            </span>
          ))}
        </div>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
          {dest.name} <span className="text-gradient-gold">Travel Guide</span>
        </h1>

        {dest.shortDescription && (
          <p className="mt-2 max-w-3xl text-sm sm:text-base text-slate-300">{dest.shortDescription}</p>
        )}
      </div>
    </section>
  );
}
