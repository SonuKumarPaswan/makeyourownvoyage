import React from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface PackageInclusionsProps {
  inclusions?: string[];
  exclusions?: string[];
}

export default function PackageInclusions({
  inclusions = [],
  exclusions = [],
}: PackageInclusionsProps) {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="border border-emerald-200 bg-emerald-50/40 p-6 shadow-sm">
        <h4 className="flex items-center gap-2 text-base font-bold text-emerald-900 uppercase tracking-wider text-xs">
          <MaterialIcon name="verified" size={20} className="text-emerald-600" /> Inclusions
        </h4>
        <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
          {inclusions.map((inc, i) => (
            <li key={i} className="flex items-start gap-2">
              <MaterialIcon name="check_circle" size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>{inc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-rose-200 bg-rose-50/40 p-6 shadow-sm">
        <h4 className="flex items-center gap-2 text-base font-bold text-rose-900 uppercase tracking-wider text-xs">
          <MaterialIcon name="cancel" size={20} className="text-rose-600" /> Exclusions
        </h4>
        <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
          {exclusions.map((exc, i) => (
            <li key={i} className="flex items-start gap-2">
              <MaterialIcon name="cancel" size={16} className="text-rose-500 shrink-0 mt-0.5" />
              <span>{exc}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
