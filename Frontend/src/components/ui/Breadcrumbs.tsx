import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-xs font-semibold text-[#d4af37]", className)}
    >
      <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <React.Fragment key={idx}>
            <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
            {isLast || !item.href ? (
              <span className="text-white truncate max-w-[200px]">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-white transition-colors capitalize truncate max-w-[200px]">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
