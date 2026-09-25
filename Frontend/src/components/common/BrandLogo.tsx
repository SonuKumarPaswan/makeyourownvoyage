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
      <div
        style={{ borderRadius: "9999px" }}
        className="brand-logo-circle relative h-12 w-12 shrink-0 overflow-hidden border border-[#d4af37]/80 bg-[#060b13] shadow-md group-hover:border-[#d4af37] transition-all rounded-full"
      >
        <Image
          src="/logo.png"
          alt="Make Your Own Voyage Logo"
          fill
          priority
          sizes="48px"
          style={{ borderRadius: "9999px" }}
          className="object-cover rounded-full"
        />
      </div>

      {/* Brand Name & Taglines strictly matching official logo */}
      <div className="flex flex-col items-center justify-center text-center">
        {/* Line 1: MAKE YOUR OWN */}
        <span className="font-serif text-[15px] sm:text-[16px] font-bold tracking-[0.24em] uppercase leading-tight text-[#d4af37] drop-shadow-sm">
          MAKE YOUR OWN
        </span>

        {/* Line 2: — V O Y A G E — */}
        <div className="w-full my-0.5 flex items-center justify-center gap-2">
          <span className="h-[1.5px] flex-1 max-w-[34px] bg-[#d4af37]" />
          <span className="font-serif text-[13.5px] sm:text-[14.5px] font-bold tracking-[0.45em] text-[#d4af37] uppercase leading-none pl-1">
            VOYAGE
          </span>
          <span className="h-[1.5px] flex-1 max-w-[34px] bg-[#d4af37]" />
        </div>

        {/* Line 3: EXPLORE • EXPERIENCE • EXTRAORDINARY */}
        <span className="text-[7.5px] sm:text-[8px] font-bold tracking-[0.22em] uppercase leading-none text-[#d4af37] drop-shadow-xs mt-0.5">
          EXPLORE &bull; EXPERIENCE &bull; EXTRAORDINARY
        </span>
      </div>
    </Link>
  );
}
