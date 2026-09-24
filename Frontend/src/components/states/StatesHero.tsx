import React from "react";
import { Compass } from "lucide-react";

interface StatesHeroProps {
  title?: string;
  subtitle?: string;
}

export default function StatesHero({
  title = "Explore India State by State",
  subtitle = "From the Himalayas of Himachal to the backwaters of Kerala and forts of Rajasthan.",
}: StatesHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#0a192f] py-16 text-white lg:py-24 border-b border-[#d4af37]/20">
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37]">
          <Compass className="h-3.5 w-3.5" /> India By States
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
          {title.split(" ").slice(0, -2).join(" ")}{" "}
          <span className="text-gradient-gold">
            {title.split(" ").slice(-2).join(" ")}
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-300">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
