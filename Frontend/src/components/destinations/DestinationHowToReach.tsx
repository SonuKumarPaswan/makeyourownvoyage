import React from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface DestinationHowToReachProps {
  destName: string;
  howToReach?: {
    byAir?: string;
    byTrain?: string;
    byRoad?: string;
  };
}

export default function DestinationHowToReach({
  destName,
  howToReach,
}: DestinationHowToReachProps) {
  if (!howToReach) return null;

  return (
    <section className="border border-[#e8e3d9] bg-white p-6 shadow-sm">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-[#0a192f]">How to Reach {destName}</h3>
        <p className="text-xs text-slate-500">Transportation & route options by Air, Train, and Highway</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="border border-sky-100 bg-sky-50/40 p-5">
          <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
            <MaterialIcon name="flight" size={16} className="text-sky-600" /> By Air
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            {howToReach.byAir || "Nearest domestic/international airport connectivity."}
          </p>
        </div>

        <div className="border border-amber-100 bg-amber-50/40 p-5">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
            <MaterialIcon name="train" size={16} className="text-amber-600" /> By Train
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            {howToReach.byTrain || "Nearest major railway station with express train connections."}
          </p>
        </div>

        <div className="border border-emerald-100 bg-emerald-50/40 p-5">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <MaterialIcon name="directions_car" size={16} className="text-emerald-600" /> By Road
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            {howToReach.byRoad || "Scenic national highway road network and state Volvo buses."}
          </p>
        </div>
      </div>
    </section>
  );
}
