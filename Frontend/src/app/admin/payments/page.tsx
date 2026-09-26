"use client";

import React from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Payments &amp; Transactions Overview
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Monitor Razorpay / bank transfer settlements, advance deposits, and invoices.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0a1526] border border-gray-800 p-5 rounded-xl">
          <span className="text-[11px] uppercase text-gray-400 font-semibold">Total Processed</span>
          <div className="text-2xl font-bold text-white mt-1">₹0.00</div>
          <span className="text-[10px] text-emerald-400 mt-1 block">Live Settlement Ready</span>
        </div>
        <div className="bg-[#0a1526] border border-gray-800 p-5 rounded-xl">
          <span className="text-[11px] uppercase text-gray-400 font-semibold">Pending Quotes</span>
          <div className="text-2xl font-bold text-amber-400 mt-1">Active Leads</div>
          <span className="text-[10px] text-gray-400 mt-1 block">Assigned in CRM</span>
        </div>
        <div className="bg-[#0a1526] border border-gray-800 p-5 rounded-xl">
          <span className="text-[11px] uppercase text-gray-400 font-semibold">Gateway Status</span>
          <div className="text-xl font-bold text-emerald-400 mt-1">Active</div>
          <span className="text-[10px] text-gray-400 mt-1 block">Instant UPI &amp; Cards</span>
        </div>
      </div>

      <div className="bg-[#0a1526] border border-gray-800 rounded-xl p-8 text-center text-gray-400 text-xs">
        <MaterialIcon name="receipt_long" size={32} className="mx-auto text-gray-600 mb-2" />
        <p>Real-time payment audit logs will appear here once bookings are converted via the CRM.</p>
      </div>
    </div>
  );
}
