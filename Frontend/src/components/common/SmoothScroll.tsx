"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({
  children,
}: {
  children?: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Only apply momentum interpolation on desktop devices
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (isTouch) return;

    let targetScroll = window.scrollY;
    let animatedScroll = window.scrollY;
    let isRunning = false;
    let rafId: number | null = null;
    let lastTime = performance.now();

    const getMaxScroll = () =>
      Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

    const onRaf = (now: number) => {
      const elapsed = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth exponential decay physics (Lenis-style momentum glide)
      const lerpFactor = 1 - Math.exp(-8 * elapsed);
      const diff = targetScroll - animatedScroll;

      if (Math.abs(diff) > 0.4) {
        animatedScroll += diff * lerpFactor;
        window.scrollTo(0, animatedScroll);
        rafId = requestAnimationFrame(onRaf);
      } else {
        animatedScroll = targetScroll;
        window.scrollTo(0, targetScroll);
        isRunning = false;
        rafId = null;
      }
    };

    const startRaf = () => {
      if (!isRunning) {
        isRunning = true;
        lastTime = performance.now();
        rafId = requestAnimationFrame(onRaf);
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Allow native scroll for nested scrollable elements
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("[data-lenis-prevent]") ||
        target?.closest(".overflow-y-auto") ||
        target?.closest(".overflow-y-scroll")
      ) {
        return;
      }

      e.preventDefault();

      // Normalize delta across different browsers and input devices
      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta *= 36; // Lines mode (Firefox / standard mouse wheel)
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight; // Pages mode
      }

      // Smooth damping multiplier
      delta *= 0.85;

      targetScroll = Math.max(
        0,
        Math.min(getMaxScroll(), targetScroll + delta)
      );
      startRaf();
    };

    const onScroll = () => {
      if (!isRunning) {
        targetScroll = window.scrollY;
        animatedScroll = window.scrollY;
      }
    };

    const onResize = () => {
      targetScroll = Math.min(targetScroll, getMaxScroll());
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [pathname]);

  // Reset scroll on route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
