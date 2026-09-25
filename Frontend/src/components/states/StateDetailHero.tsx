import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { State } from "@/types/state";

interface StateDetailHeroProps {
  state: State;
}

export default function StateDetailHero({ state }: StateDetailHeroProps) {
  return (
    <section className="relative h-[380px] w-full bg-[#0a192f] text-white">
      <Image
        src={state.bannerImage || state.image || "/placeholder.jpg"}
        alt={state.name}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/40 to-black/20" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
          <Link href="/states" className="hover:underline">States</Link>
          <span>/</span>
          <span>{state.name}</span>
        </div>

        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
          Travel Guide to <span className="text-gradient-gold">{state.name}</span>
        </h1>
        {state.description && (
          <p className="mt-2 max-w-2xl text-sm text-slate-300">{state.description}</p>
        )}
      </div>
    </section>
  );
}
