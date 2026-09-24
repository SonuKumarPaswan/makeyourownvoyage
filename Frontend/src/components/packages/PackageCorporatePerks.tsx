import React from "react";
import { Briefcase, CheckCircle2 } from "lucide-react";
import type { CorporateFacilities } from "@/types/package";

interface PackageCorporatePerksProps {
  corporateFacilities?: CorporateFacilities;
}

export default function PackageCorporatePerks({
  corporateFacilities,
}: PackageCorporatePerksProps) {
  if (!corporateFacilities) return null;

  return (
    <section className="border border-[#d4af37]/30 bg-gradient-to-r from-[#0a192f] to-[#102a45] p-6 text-white shadow-lg">
      <div className="flex items-center gap-2 text-[#d4af37]">
        <Briefcase className="h-5 w-5" />
        <h3 className="text-lg font-bold">Corporate MICE & Offsite Perks</h3>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 text-xs">
        {corporateFacilities.conferenceHallIncluded && (
          <div className="flex items-center gap-2 text-slate-200">
            <CheckCircle2 className="h-4 w-4 text-[#d4af37]" /> Conference Hall
          </div>
        )}
        {corporateFacilities.projectorAndAVSetup && (
          <div className="flex items-center gap-2 text-slate-200">
            <CheckCircle2 className="h-4 w-4 text-[#d4af37]" /> Projector & AV Setup
          </div>
        )}
        {corporateFacilities.djAndSoundSystem && (
          <div className="flex items-center gap-2 text-slate-200">
            <CheckCircle2 className="h-4 w-4 text-[#d4af37]" /> DJ & Sound System
          </div>
        )}
        {corporateFacilities.teamBuildingFacilitator && (
          <div className="flex items-center gap-2 text-slate-200">
            <CheckCircle2 className="h-4 w-4 text-[#d4af37]" /> Team Facilitator
          </div>
        )}
        {corporateFacilities.stageAndBackdrop && (
          <div className="flex items-center gap-2 text-slate-200">
            <CheckCircle2 className="h-4 w-4 text-[#d4af37]" /> Stage & Backdrop
          </div>
        )}
      </div>
    </section>
  );
}
