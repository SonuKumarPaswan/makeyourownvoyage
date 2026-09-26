"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { getAdminToken, setAdminToken, removeAdminToken, adminAuthApi } from "@/lib/api/admin.api";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
  { label: "Tour Packages", href: "/admin/tour-packages", icon: "travel_explore", badge: "CRUD" },
  { label: "Hotels & Stays", href: "/admin/hotels", icon: "hotel", badge: "CRUD" },
  { label: "Fleet & Mobility", href: "/admin/travel-services", icon: "directions_car", badge: "CRUD" },
  { label: "Destinations & States", href: "/admin/destinations", icon: "location_on", badge: "CRUD" },
  { label: "Enquiries & CRM", href: "/admin/bookings", icon: "assignment", badge: "Leads" },
  { label: "Activities & Templates", href: "/admin/travel-guides", icon: "tour", badge: "Itinerary" },
  { label: "Offers & Collections", href: "/admin/offers", icon: "local_offer" },
  { label: "FAQs & Content", href: "/admin/reviews", icon: "help_outline" },
  { label: "Users & Team", href: "/admin/users", icon: "group" },
  { label: "Portal Settings", href: "/admin/settings", icon: "settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Authenticate & Verify Role Directly Against MongoDB via /auth/me
  useEffect(() => {
    let isMounted = true;

    const verifyAccessAgainstDB = async () => {
      setCheckingAuth(true);
      const savedToken = getAdminToken();

      if (!savedToken) {
        if (isMounted) {
          setIsAdmin(false);
          setCurrentUser(null);
          setCheckingAuth(false);
        }
        return;
      }

      try {
        // Query backend database to verify active token and actual MongoDB user role
        const res = await adminAuthApi.getMe();
        if (isMounted) {
          if (res?.user && res.user.role === "admin") {
            setCurrentUser(res.user);
            setIsAdmin(true);
            if (typeof window !== "undefined") {
              localStorage.setItem("voyage_user", JSON.stringify(res.user));
            }
          } else {
            // User exists in DB but role is not admin
            setCurrentUser(res?.user || null);
            setIsAdmin(false);
          }
          setCheckingAuth(false);
        }
      } catch (err: any) {
        console.error("[Admin Auth DB Check] Verification failed:", err?.message || err);
        if (isMounted) {
          // If token is expired or invalid on DB, clear it
          removeAdminToken();
          setCurrentUser(null);
          setIsAdmin(false);
          setCheckingAuth(false);
        }
      }
    };

    verifyAccessAgainstDB();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  const handleLogout = () => {
    removeAdminToken();
    if (typeof window !== "undefined") {
      localStorage.removeItem("voyage_user");
      localStorage.removeItem("token");
    }
    router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
  };

  // 1. Checking Authentication Loader (Clean Light Mode)
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-800 space-y-4">
        <div className="h-10 w-10 border-3 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-medium tracking-wider uppercase">
          Verifying Administrator Privileges...
        </p>
      </div>
    );
  }

  // 2. Not Authenticated or Non-Admin Access Denied (Clean Light Card)
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 text-center font-sans">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-[#b8860b] flex items-center justify-center mx-auto shadow-sm">
            <MaterialIcon name="lock" className="text-3xl" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Administrator Login Required
            </h1>
            {currentUser ? (
              <p className="text-xs text-rose-600 font-medium">
                Signed in as <span className="font-bold">{currentUser.name || currentUser.email}</span> (Role:{" "}
                <span className="uppercase font-bold">{currentUser.role || "user"}</span>). Only accounts with{" "}
                <span className="text-amber-700 font-bold">&apos;admin&apos;</span> role can access this portal.
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                The Make Your Own Voyage Admin Portal is restricted to verified administrators only. Please sign in to proceed.
              </p>
            )}
          </div>

          <div className="pt-2 space-y-3">
            <Link
              href={`/login?redirect=${encodeURIComponent(pathname)}&error=admin_only`}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c49f27] hover:from-[#c49f27] hover:to-[#b38e1f] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MaterialIcon name="login" className="text-base" />
              Sign In with Admin Account
            </Link>

            {currentUser && (
              <button
                onClick={handleLogout}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Sign Out & Switch Account
              </button>
            )}

            <Link
              href="/"
              className="inline-block text-xs text-slate-500 hover:text-[#b8860b] transition-colors pt-2"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Admin Portal Shell (Light Mode)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            title="Toggle Sidebar"
          >
            <MaterialIcon name="menu" size={22} />
          </button>

          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#d4af37] to-[#f3e5ab] flex items-center justify-center text-[#0a1526] font-extrabold text-sm shadow-sm">
              V
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm tracking-wide block leading-none">
                VOYAGE ADMIN
              </span>
              <span className="text-[10px] text-[#b8860b] tracking-widest font-mono uppercase font-bold">
                Enterprise Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-[#b8860b] px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition font-medium"
          >
            <MaterialIcon name="open_in_new" size={14} />
            <span>Public Website</span>
          </Link>

          {currentUser && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs">
              <span className="text-slate-800 font-bold">{currentUser.name || "Admin"}</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-100 text-[#b8860b] text-[10px] uppercase font-mono font-bold">
                Admin
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
            title="Sign Out"
          >
            <MaterialIcon name="logout" size={18} />
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Light Mode) */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between shrink-0 overflow-y-auto shadow-xs`}
        >
          <div className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              {sidebarOpen ? "Management Modules" : "Menu"}
            </div>

            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 ${
                    active
                      ? "bg-[#d4af37] text-slate-950 font-bold shadow-sm shadow-[#d4af37]/30"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <MaterialIcon
                      name={item.icon}
                      size={20}
                      className={active ? "text-slate-950" : "text-slate-500"}
                    />
                    {sidebarOpen && (
                      <span className="text-xs truncate">{item.label}</span>
                    )}
                  </div>
                  {sidebarOpen && item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                        active
                          ? "bg-black/15 text-slate-950"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          {sidebarOpen && (
            <div className="p-4 border-t border-slate-200 text-xs text-slate-500 space-y-2 bg-slate-50/50">
              <div className="flex items-center justify-between text-[11px]">
                <span>API Status</span>
                <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live v1.0
                </span>
              </div>
              <div className="text-[10px] text-slate-400 text-center font-mono">
                Make Your Own Voyage © 2026
              </div>
            </div>
          )}
        </aside>

        {/* Content Area (Light Mode) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
