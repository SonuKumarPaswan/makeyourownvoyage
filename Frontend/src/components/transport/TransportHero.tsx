import React from "react";
import { Car, Bike, Bus, Users, Sparkles } from "lucide-react";
import type { TransportCategory } from "@/types/transport";

interface TransportHeroProps {
  category: TransportCategory;
  title: string;
  subtitle: string;
}

export default function TransportHero({
  category,
  title,
  subtitle,
}: TransportHeroProps) {
  const getIcon = () => {
    switch (category) {
      case "Cab":
        return <Car className="h-4 w-4" />;
      case "Bike":
        return <Bike className="h-4 w-4" />;
      case "Bus":
        return <Bus className="h-4 w-4" />;
      case "Traveller":
        return <Users className="h-4 w-4" />;
      default:
        return <Car className="h-4 w-4" />;
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0a192f] py-16 text-white lg:py-20 border-b border-[#d4af37]/20">
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37]">
          {getIcon()} Verified Fleet Services
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
          {title.split(" ").slice(0, -2).join(" ")}{" "}
          <span className="text-gradient-gold">
            {title.split(" ").slice(-2).join(" ")}
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
