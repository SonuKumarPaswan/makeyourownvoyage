"use client";

import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { adminEnquiriesApi } from "@/lib/api/admin.api";

export default function AdminEventsPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const res = await adminEnquiriesApi.getAll({ category: "custom" });
        if (res?.data) {
          setEnquiries(Array.isArray(res.data) ? res.data : []);
        }
      } catch (err) {
        console.error("Error loading MICE events:", err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Corporate MICE &amp; Events Desk
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Corporate offsites, destination weddings, conferences, and group logistics.
        </p>
      </div>

      <div className="bg-[#0a1526] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#070e17] text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
              <tr>
                <th className="p-3.5">Company / Client</th>
                <th className="p-3.5">Event Scope</th>
                <th className="p-3.5">Delegates</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Loading MICE inquiries...
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No active corporate event enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((e) => (
                  <tr key={e._id} className="hover:bg-gray-800/30 transition">
                    <td className="p-3.5 font-semibold text-white">
                      <div>{e.name || e.fullName || "Corporate Account"}</div>
                      <div className="text-[11px] text-gray-400">{e.email || e.phone}</div>
                    </td>
                    <td className="p-3.5 text-gray-300">{e.destination || "Destination MICE"}</td>
                    <td className="p-3.5 text-gray-400">{e.travellers || 25}+ Pax</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {e.status || "New"}
                      </span>
                    </td>
                    <td className="p-3.5 text-gray-400 text-[11px]">
                      {e.createdAt ? new Date(e.createdAt).toLocaleDateString() : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
