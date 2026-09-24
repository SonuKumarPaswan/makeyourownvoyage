import React from "react";
import { getStates } from "@/lib/api/states.api";
import type { State } from "@/types/state";
import StatesHero from "@/components/states/StatesHero";
import StatesGrid from "@/components/states/StatesGrid";

export const metadata = {
  title: "Explore Destinations by State | Make Your Own Voyage",
  description: "Browse India's top tourist states from Himachal Pradesh to Kerala and Rajasthan. Discover handcrafted packages and local travel guides.",
};

export default async function StatesPage() {
  let states: State[] = [];

  try {
    const res = await getStates();
    states = res.data || [];
  } catch {
    states = [];
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <StatesHero />
      <StatesGrid states={states} />
    </div>
  );
}
