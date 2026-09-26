"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";
import {
  adminHotelsApi,
  adminPackagesApi,
  adminTransportsApi,
  adminDestinationsApi,
  adminStatesApi,
  adminEnquiriesApi,
  adminFaqsApi,
  adminTemplatesApi,
} from "@/lib/api/admin.api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    packages: 0,
    hotels: 0,
    transports: 0,
    destinations: 0,
    states: 0,
    enquiries: 0,
    faqs: 0,
    templates: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [
          pkgsRes,
          hotelsRes,
          transRes,
          destsRes,
          statesRes,
          enqRes,
          faqRes,
          tplRes,
        ] = await Promise.allSettled([
          adminPackagesApi.getAll({ limit: 1 }),
          adminHotelsApi.getAll({ limit: 1 }),
          adminTransportsApi.getAll({ limit: 1 }),
          adminDestinationsApi.getAll(),
          adminStatesApi.getAll(),
          adminEnquiriesApi.getAll({ limit: 5 }),
          adminFaqsApi.getAll(),
          adminTemplatesApi.getAll(),
        ]);

        const getCount = (res: PromiseSettledResult<any>) => {
          if (res.status === "fulfilled" && res.value) {
            return (
              res.value.totalPackages ??
              res.value.totalHotels ??
              res.value.totalVehicles ??
              res.value.totalEnquiries ??
              res.value.totalUsers ??
              res.value.total ??
              res.value.totalCount ??
              res.value.count ??
              (Array.isArray(res.value.data) ? res.value.data.length : undefined) ??
              (Array.isArray(res.value) ? res.value.length : 0)
            );
          }
          return 0;
        };

        setStats({
          packages: getCount(pkgsRes),
          hotels: getCount(hotelsRes),
          transports: getCount(transRes),
          destinations: getCount(destsRes),
          states: getCount(statesRes),
          enquiries: getCount(enqRes),
          faqs: getCount(faqRes),
          templates: getCount(tplRes),
        });

        if (enqRes.status === "fulfilled" && enqRes.value?.data) {
          setRecentEnquiries(
            Array.isArray(enqRes.value.data) ? enqRes.value.data.slice(0, 5) : []
          );
        }
      } catch (err) {
        console.error("Error loading dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const statCards = [
    {
      title: "Tour Packages",
      count: stats.packages,
      icon: "travel_explore",
      href: "/admin/tour-packages",
      color: "bg-amber-50 text-amber-700 border-amber-200",
      accent: "#b8860b",
    },
    {
      title: "Hotels & Stays",
      count: stats.hotels,
      icon: "hotel",
      href: "/admin/hotels",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      accent: "#2563eb",
    },
    {
      title: "Fleet & Mobility",
      count: stats.transports,
      icon: "directions_car",
      href: "/admin/travel-services",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      accent: "#059669",
    },
    {
      title: "Destinations",
      count: stats.destinations,
      icon: "location_on",
      href: "/admin/destinations",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
      accent: "#6366f1",
    },
    {
      title: "States / Regions",
      count: stats.states,
      icon: "map",
      href: "/admin/destinations",
      color: "bg-purple-50 text-purple-700 border-purple-200",
      accent: "#9333ea",
    },
    {
      title: "Active Leads & CRM",
      count: stats.enquiries,
      icon: "assignment",
      href: "/admin/bookings",
      color: "bg-rose-50 text-rose-700 border-rose-200",
      accent: "#e11d48",
    },
    {
      title: "Templates",
      count: stats.templates,
      icon: "tour",
      href: "/admin/travel-guides",
      color: "bg-cyan-50 text-cyan-700 border-cyan-200",
      accent: "#0891b2",
    },
    {
      title: "Knowledge FAQs",
      count: stats.faqs,
      icon: "help_outline",
      href: "/admin/reviews",
      color: "bg-teal-50 text-teal-700 border-teal-200",
      accent: "#0d9488",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner (Clean Light Mode) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#b8860b] text-[11px] font-bold tracking-wide uppercase">
            <span className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
            Make Your Own Voyage Operations
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Enterprise Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Live metrics, day-by-day package builder, multi-room hotel inventory, fleet management, and real-time CRM lead pipelines.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 z-10">
          <Link
            href="/admin/tour-packages"
            className="px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c49f27] text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-xs cursor-pointer"
          >
            <MaterialIcon name="add" size={18} />
            <span>Create Package</span>
          </Link>
          <Link
            href="/admin/bookings"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-2 transition border border-slate-200 cursor-pointer"
          >
            <MaterialIcon name="inbox" size={18} />
            <span>View Leads</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
            System Inventory & Stats
          </h2>
          <span className="text-xs text-slate-500">
            {loading ? "Refreshing..." : "Updated live from MongoDB"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white border border-slate-200/90 hover:border-[#d4af37]/60 p-5 rounded-2xl transition duration-200 hover:shadow-md flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center ${card.color}`}
                >
                  <MaterialIcon name={card.icon} size={20} />
                </div>
                <MaterialIcon
                  name="arrow_forward"
                  size={16}
                  className="text-slate-300 group-hover:text-slate-700 transition"
                />
              </div>

              <div>
                <span className="text-2xl font-extrabold text-slate-900 block leading-tight">
                  {loading ? "..." : card.count}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {card.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Leads Feed & Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MaterialIcon
                name="chat"
                size={20}
                className="text-[#b8860b]"
              />
              <h2 className="font-bold text-slate-900 text-sm">
                Recent Customer Enquiries & Quotes
              </h2>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs text-[#b8860b] hover:underline font-semibold"
            >
              View all leads →
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <MaterialIcon name="inbox" size={32} className="mx-auto mb-2 opacity-50 text-slate-300" />
              <p className="text-xs text-slate-500">No leads recorded in the CRM yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentEnquiries.map((enq) => (
                <div
                  key={enq._id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">
                        {enq.customerName || "Traveller"}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {enq.enquiryType || "Custom"}
                      </span>
                    </div>
                    <p className="text-slate-500 mt-0.5">
                      {enq.customerEmail} • {enq.customerPhone}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                        enq.status === "converted"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : enq.status === "contacted"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {enq.status || "new"}
                    </span>
                    <Link
                      href="/admin/bookings"
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition"
                    >
                      <MaterialIcon name="edit" size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Operations Actions */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <MaterialIcon name="bolt" size={20} className="text-[#b8860b]" />
            <h2 className="font-bold text-slate-900 text-sm">Quick Actions</h2>
          </div>

          <div className="space-y-2">
            {[
              {
                label: "Add Tour Package",
                href: "/admin/tour-packages",
                icon: "add_circle_outline",
                desc: "Day-by-day custom itinerary & pricing slabs",
              },
              {
                label: "Register Hotel & Resort",
                href: "/admin/hotels",
                icon: "domain",
                desc: "Room types, facilities & coordinates",
              },
              {
                label: "Add Vehicle to Fleet",
                href: "/admin/travel-services",
                icon: "directions_car",
                desc: "Cabs, Volvo buses & tempo travellers",
              },
              {
                label: "Add State or Destination",
                href: "/admin/destinations",
                icon: "add_location_alt",
                desc: "SEO tags, attractions & travel guides",
              },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 transition flex items-start gap-3 group"
              >
                <MaterialIcon
                  name={action.icon}
                  size={20}
                  className="text-slate-500 group-hover:text-[#b8860b] mt-0.5 transition"
                />
                <div>
                  <span className="font-bold text-slate-900 text-xs block group-hover:text-[#b8860b] transition">
                    {action.label}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {action.desc}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
