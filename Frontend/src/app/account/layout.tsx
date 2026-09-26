"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { removeAdminToken } from "@/lib/api/admin.api";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("voyage_user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          // ignore parse error
        }
      }
    }
  }, []);

  const handleLogout = () => {
    removeAdminToken();
    if (typeof window !== "undefined") {
      localStorage.removeItem("voyage_user");
    }
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center text-lg shadow">
                    {user?.name?.[0]?.toUpperCase() || "V"}
                  </div>
                  <div>
                    <h3 className="font-bold text-heading text-sm">{user?.name || "Guest Traveller"}</h3>
                    <span className="text-[11px] text-muted block truncate max-w-[160px]">{user?.email || "Account Profile"}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/60 space-y-1 text-xs">
                  <Link
                    href="/account"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-heading font-medium hover:bg-background hover:text-primary transition"
                  >
                    <MaterialIcon name="person" size={16} />
                    <span>My Profile</span>
                  </Link>

                  {user?.role === "admin" && (
                    <Link
                      href="/admin/dashboard"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#d4af37]/10 text-primary font-semibold hover:bg-[#d4af37]/20 transition"
                    >
                      <MaterialIcon name="admin_panel_settings" size={16} />
                      <span>Enterprise Admin Portal</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-500 font-medium hover:bg-rose-50 transition text-left"
                  >
                    <MaterialIcon name="logout" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <section className="lg:col-span-9">{children}</section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
