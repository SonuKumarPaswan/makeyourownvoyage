"use client";

import React from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          System Alerts &amp; Notifications
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Real-time system events, server alerts, and lead assignment triggers.
        </p>
      </div>

      <div className="bg-[#0a1526] border border-gray-800 rounded-xl p-8 text-center text-gray-400 text-xs">
        <MaterialIcon name="notifications_active" size={32} className="mx-auto text-[#d4af37] mb-2" />
        <p>All system webhooks and lead notifications are operating normally.</p>
      </div>
    </div>
  );
}
