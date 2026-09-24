import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "navy" | "outline" | "success" | "neutral";
}

export function Badge({
  className,
  variant = "gold",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    gold: "bg-[#d4af37]/15 text-[#b89228] border border-[#d4af37]/30",
    navy: "bg-[#0a192f] text-white border border-[#102a45]",
    outline: "bg-transparent text-slate-700 border border-[#e8e3d9]",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    neutral: "bg-slate-100 text-slate-700 border border-slate-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
