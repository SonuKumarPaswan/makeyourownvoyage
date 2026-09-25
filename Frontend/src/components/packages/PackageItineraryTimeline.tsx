import React from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import type { ItineraryDay } from "@/types/package";

interface PackageItineraryTimelineProps {
  itinerary: ItineraryDay[];
}

export default function PackageItineraryTimeline({
  itinerary,
}: PackageItineraryTimelineProps) {
  return (
    <section className="border border-[#e8e3d9] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <MaterialIcon name="calendar_month" size={20} className="text-[#d4af37]" />
        <h3 className="text-xl font-bold text-[#0a192f]">Day-by-Day Itinerary</h3>
      </div>

      <div className="mt-6 space-y-8">
        {itinerary && itinerary.length > 0 ? (
          itinerary.map((day) => (
            <div key={day.day} className="relative border-l-2 border-[#d4af37] pl-6 ml-3">
              <div className="absolute -left-3.5 top-0 flex h-7 w-7 items-center justify-center bg-[#0a192f] text-xs font-bold text-[#d4af37] shadow-md">
                {day.day}
              </div>
              <h4 className="text-base font-bold text-[#0a192f]">{day.title}</h4>
              {day.description && <p className="mt-1 text-sm text-slate-600">{day.description}</p>}

              {/* Day Activities */}
              {day.activities && day.activities.length > 0 && (
                <div className="mt-4 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Schedule & Activities:
                  </span>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {day.activities.map((act, aIdx) => (
                      <div
                        key={aIdx}
                        className="flex items-start gap-2.5 border border-[#e8e3d9] bg-[#faf8f5] p-3 text-xs"
                      >
                        <MaterialIcon name="auto_awesome" size={16} className="shrink-0 text-[#d4af37] mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#0a192f]">
                            {act.time ? `[${act.time}] ` : ""}
                            {act.title}
                          </p>
                          {act.location && <p className="text-slate-500">{act.location}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Overnight Hotel */}
              {day.overnight?.enabled && (
                <div className="mt-4 flex items-center gap-2 bg-amber-50/60 p-3 text-xs border border-amber-200 text-amber-900">
                  <MaterialIcon name="hotel" size={16} className="text-[#d4af37] shrink-0" />
                  <span>
                    <strong>Night Stay:</strong> {day.overnight.location || "Luxury Hotel"} •{" "}
                    {day.overnight.roomType || "Deluxe Room"} (Check-in: {day.overnight.checkIn || "12:00 PM"})
                  </span>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">Detailed day plan available on request.</p>
        )}
      </div>
    </section>
  );
}
