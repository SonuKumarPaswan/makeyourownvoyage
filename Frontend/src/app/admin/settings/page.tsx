"use client";

import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function AdminSettingsPage() {
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [testingHealth, setTestingHealth] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    checkHealth();
  }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 4000);
  };

  const checkHealth = async () => {
    setTestingHealth(true);
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${baseUrl.replace(/\/$/, "")}/health`);
      if (res.ok) {
        const data = await res.json();
        setHealthStatus({ status: "healthy", data });
      } else {
        setHealthStatus({ status: "degraded", code: res.status });
      }
    } catch (err: any) {
      setHealthStatus({ status: "offline", error: err.message });
    } finally {
      setTestingHealth(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg text-xs font-semibold shadow-2xl flex items-center gap-2 ${
            notification.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-rose-600 text-white"
          }`}
        >
          <MaterialIcon
            name={notification.type === "success" ? "check_circle" : "error"}
            size={18}
          />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Admin Portal Settings &amp; API Configuration
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Configure authentication credentials, verify server connectivity, and review backend health.
        </p>
      </div>

      {/* Authenticated Admin Session Card */}
      <div className="bg-[#0a1526] border border-gray-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <MaterialIcon name="verified_user" size={20} className="text-[#d4af37]" />
          <h2>Administrator Session &amp; Security</h2>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          Your administrator session is authenticated directly through the MongoDB database. Write operations (creating, editing, and deleting packages, hotels, transports, and CRM leads) are authorized automatically.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-[#070e17] p-4 rounded-lg border border-gray-800 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MaterialIcon name="shield" size={20} />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-semibold block">Authentication Type</span>
              <span className="text-xs font-bold text-white">Database Verified (Role: Admin)</span>
            </div>
          </div>

          <div className="bg-[#070e17] p-4 rounded-lg border border-gray-800 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#d4af37] flex items-center justify-center">
              <MaterialIcon name="cloud_done" size={20} />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-semibold block">Media Storage</span>
              <span className="text-xs font-bold text-white">Cloudinary Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Backend Health Check Card */}
      <div className="bg-[#0a1526] border border-gray-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <MaterialIcon name="dns" size={20} className="text-[#d4af37]" />
            <h2>Backend Server Health</h2>
          </div>
          <button
            onClick={checkHealth}
            disabled={testingHealth}
            className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold flex items-center gap-1"
          >
            <MaterialIcon name="refresh" size={14} />
            <span>{testingHealth ? "Pinging..." : "Test Connection"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#070e17] p-3.5 rounded-lg border border-gray-800">
            <span className="text-[10px] uppercase text-gray-500 font-semibold block">
              Connection Status
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  healthStatus?.status === "healthy"
                    ? "bg-emerald-400 animate-pulse"
                    : healthStatus?.status === "degraded"
                    ? "bg-amber-400"
                    : "bg-rose-500"
                }`}
              />
              <span className="text-xs font-bold text-white capitalize">
                {healthStatus?.status || "Unknown"}
              </span>
            </div>
          </div>

          <div className="bg-[#070e17] p-3.5 rounded-lg border border-gray-800">
            <span className="text-[10px] uppercase text-gray-500 font-semibold block">
              API Base URL
            </span>
            <div className="mt-1 text-xs text-white font-mono truncate">
              {process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}
            </div>
          </div>

          <div className="bg-[#070e17] p-3.5 rounded-lg border border-gray-800">
            <span className="text-[10px] uppercase text-gray-500 font-semibold block">
              Server Environment
            </span>
            <div className="mt-1 text-xs text-[#d4af37] font-semibold">
              {healthStatus?.data?.environment || "development"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
