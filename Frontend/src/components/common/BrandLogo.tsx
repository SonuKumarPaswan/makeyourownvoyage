import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  theme?: "light" | "dark";
  className?: string;
  onClick?: () => void;
}

export default function BrandLogo({
  className,
  onClick,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("inline-flex items-center gap-3 select-none cursor-pointer group", className)}
    >
      {/* Emblem Logo */}
      <div className="brand-logo-circle relative h-12 w-12 shrink-0 overflow-hidden border border-[#d4af37]/70 bg-[#0a192f] shadow-md group-hover:border-[#d4af37] transition-colors rounded-full">
        <Image
          src="/logo.png"
          alt="Make Your Own Voyage Logo"
          fill
          priority
          className="object-cover rounded-full"
        />
      </div>

      {/* Brand Name & Taglines */}
      <div className="flex flex-col">
        {/* Line 1: MAKE YOUR OWN */}
        <span className="font-serif text-[14.5px] font-normal tracking-[0.24em] uppercase leading-none text-[#d4af37]">
          Make Your Own
        </span>

        {/* Line 2: —— VOYAGE —— */}
        <div className="my-0.5 flex items-center justify-center gap-2">
          <span className="h-[1px] w-6 bg-gradient-to-r from-transparent via-[#d4af37] to-[#d4af37]" />
          <span className="font-serif text-[13px] font-normal tracking-[0.38em] text-[#d4af37] uppercase leading-none">
            Voyage
          </span>
          <span className="h-[1px] w-6 bg-gradient-to-l from-transparent via-[#d4af37] to-[#d4af37]" />
        </div>

        {/* Line 3: EXPLORE • EXPERIENCE • EXTRAORDINARY */}
        <span className="text-[7.5px] font-normal tracking-[0.2em] uppercase leading-none text-center text-[#d4af37]/90">
          Explore &bull; Experience &bull; Extraordinary
        </span>
      </div>
    </Link>
  );
}
