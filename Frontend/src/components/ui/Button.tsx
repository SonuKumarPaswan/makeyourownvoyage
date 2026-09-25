import React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "gold" | "navy" | "outline" | "ghost" | "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "gold",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-200 rounded-none focus:outline-none focus:ring-1 focus:ring-[#d4af37] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    // Map primary -> gold, secondary -> navy for flexibility
    const normalizedVariant =
      variant === "primary" ? "gold" : variant === "secondary" ? "navy" : variant;

    const variants: Record<string, string> = {
      gold: "bg-[#d4af37] text-black hover:bg-[#c49f27] shadow-md active:scale-[0.98]",
      navy: "bg-[#0a192f] text-white hover:bg-[#102a45] shadow-md active:scale-[0.98]",
      outline:
        "border border-[#d4af37] text-[#0a192f] bg-transparent hover:bg-[#d4af37]/10 active:scale-[0.98]",
      ghost:
        "text-slate-700 hover:text-[#0a192f] hover:bg-slate-100 active:scale-[0.98]",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[normalizedVariant] || variants.gold, sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin border-2 border-current border-t-transparent mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
