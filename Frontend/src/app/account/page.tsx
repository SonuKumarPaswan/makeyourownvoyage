"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("voyage_user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h1 className="text-xl font-bold text-heading">Account Overview</h1>
        <p className="text-xs text-muted mt-1">
          Manage your personal details, verified contact number, and travel account settings.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-background border border-border">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
              Full Name
            </span>
            <span className="text-sm font-bold text-heading mt-1 block">
              {user?.name || "Guest Traveller"}
            </span>
          </div>

          <div className="p-4 rounded-lg bg-background border border-border">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
              Email Address
            </span>
            <span className="text-sm font-bold text-heading mt-1 block">
              {user?.email || "Not provided"}
            </span>
          </div>

          <div className="p-4 rounded-lg bg-background border border-border">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
              Phone Number
            </span>
            <span className="text-sm font-bold text-heading mt-1 block font-mono">
              {user?.phoneNumber || user?.phone || "+91 72910 00328"}
            </span>
          </div>

          <div className="p-4 rounded-lg bg-background border border-border">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
              Account Role
            </span>
            <span className="text-sm font-bold text-primary mt-1 block capitalize">
              {user?.role || "Customer"}
            </span>
          </div>
        </div>

        {user?.role === "admin" && (
          <div className="mt-6 p-4 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-heading text-sm">Enterprise Administrator Access</h3>
              <p className="text-xs text-muted mt-0.5">
                Your account is verified with full CRUD access to the admin enterprise portal.
              </p>
            </div>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#c49f27] transition shrink-0"
            >
              Open Admin Portal →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
