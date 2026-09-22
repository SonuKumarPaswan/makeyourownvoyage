import React from "react";
import { LoaderCircle, Plane } from "lucide-react";

export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary-light blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-secondary-light blur-3xl" />

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Logo / Icon */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg">
          <Plane className="h-9 w-9 rotate-[-10deg] text-white" />

          {/* Spinner */}
          <div className="absolute inset-0 rounded-2xl border-2 border-white/20" />
        </div>

        {/* Brand */}
        <h1 className="mt-6 text-2xl font-bold text-heading">
          Make Your Own{" "}
          <span className="text-primary">Voyage</span>
        </h1>

        {/* Loading Text */}
        <p className="mt-2 text-sm text-muted">
          Preparing your journey...
        </p>

        {/* Loader */}
        <div className="mt-6 flex items-center gap-3">
          <LoaderCircle className="h-6 w-6 animate-spin text-primary" />

          <span className="text-sm font-medium text-muted">
            Loading
          </span>
        </div>

        {/* Loading Dots */}
        <div className="mt-5 flex gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-secondary [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-accent" />
        </div>
      </div>
    </main>
  );
}