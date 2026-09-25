"use client";

import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { apiFetch } from "@/lib/api/client";

interface EnquiryItem {
  _id: string;
  enquiryCode: string;
  enquiryType: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  city?: string;
  specialRequests?: string;
  status: string;
  createdAt: string;
  flightDetails?: {
    fromCity?: string;
    toCity?: string;
    departureDate?: string;
    returnDate?: string;
    travelClass?: string;
  };
  hotelDetails?: {
    hotelName?: string;
    city?: string;
    roomType?: string;
    checkInDate?: string;
    checkOutDate?: string;
  };
  packageDetails?: {
    packageTitle?: string;
    travelDate?: string;
    packageCategory?: string;
  };
  transportDetails?: {
    pickupLocation?: string;
    dropLocation?: string;
    vehicleType?: string;
    serviceType?: string;
    pickupDate?: string;
  };
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const res = await apiFetch<{ success: boolean; data: EnquiryItem[] }>(
        "/enquiries/admin/all"
      ).catch(() => null);

      if (res?.data && Array.isArray(res.data)) {
        setEnquiries(res.data);
      }
    } catch (err) {
      console.error("Admin enquiries fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setStatusUpdateLoading(true);
    try {
      await apiFetch(`/enquiries/admin/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });

      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "flight":
        return <MaterialIcon name="flight" size={16} className="text-sky-400" />;
      case "hotel":
        return <MaterialIcon name="apartment" size={16} className="text-amber-400" />;
      case "package":
      case "weekend_trip":
        return <MaterialIcon name="travel_explore" size={16} className="text-emerald-400" />;
      case "transport":
        return <MaterialIcon name="directions_car" size={16} className="text-purple-400" />;
      default:
        return <MaterialIcon name="description" size={16} className="text-[#d4af37]" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "new":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "in_progress":
      case "contacted":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "quoted":
      case "converted":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "cancelled":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/40";
    }
  };

  const filteredEnquiries = enquiries.filter((item) => {
    if (filterType !== "all" && item.enquiryType !== filterType) return false;
    if (filterStatus !== "all" && item.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.customerName?.toLowerCase().includes(q) ||
        item.customerEmail?.toLowerCase().includes(q) ||
        item.customerPhone?.toLowerCase().includes(q) ||
        item.enquiryCode?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#060b13] text-white p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#d4af37]">
              Concierge CRM & Leads
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            Customer Enquiries & Quotations
          </h1>
        </div>

        <button
          type="button"
          onClick={fetchEnquiries}
          className="inline-flex items-center gap-2 bg-[#0a192f] border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold uppercase tracking-wider px-4 py-2.5 hover:bg-[#d4af37] hover:text-black transition cursor-pointer"
        >
          <MaterialIcon name="refresh" size={14} className={isLoading ? "animate-spin" : ""} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <MaterialIcon name="search" size={16} className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Name, Phone, Email, Code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a192f] border border-white/15 pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        {/* Filter by Category */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-[#0a192f] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
        >
          <option value="all">All Service Categories</option>
          <option value="flight">Flights</option>
          <option value="hotel">Hotels</option>
          <option value="package">Holiday Packages</option>
          <option value="transport">Airport Transfers / Fleet</option>
          <option value="custom">Visa / Cruise / Corporate / Custom</option>
        </select>

        {/* Filter by Status */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-[#0a192f] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
        >
          <option value="all">All Lead Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="quoted">Quoted</option>
          <option value="converted">Converted</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Enquiries Table / List */}
      <div className="bg-[#0a192f] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#081325] border-b border-white/10 uppercase tracking-wider text-[10px] text-gray-400 font-bold">
              <tr>
                <th className="py-3.5 px-4">Code / Service</th>
                <th className="py-3.5 px-4">Customer Contact</th>
                <th className="py-3.5 px-4">Requirement Details</th>
                <th className="py-3.5 px-4">Date / Time</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <MaterialIcon name="refresh" size={24} className="animate-spin text-[#d4af37] mx-auto mb-2" />
                    <span>Loading real-time quotation requests...</span>
                  </td>
                </tr>
              ) : filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <span>No enquiries found matching your filters.</span>
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enq) => (
                  <tr
                    key={enq._id}
                    className="hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => setSelectedEnquiry(enq)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {getServiceIcon(enq.enquiryType)}
                        <div>
                          <span className="font-bold text-[#d4af37] font-mono block">
                            {enq.enquiryCode}
                          </span>
                          <span className="text-[10px] uppercase text-gray-400">
                            {enq.enquiryType}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{enq.customerName}</div>
                      <div className="text-[11px] text-gray-300 flex items-center gap-1">
                        <MaterialIcon name="call" size={12} className="text-[#d4af37]" />
                        <span>{enq.customerPhone}</span>
                      </div>
                      <div className="text-[10px] text-gray-400">{enq.customerEmail}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs truncate">
                      {enq.flightDetails && (
                        <span>
                          {enq.flightDetails.fromCity} ➔ {enq.flightDetails.toCity} (
                          {enq.flightDetails.travelClass || "Economy"})
                        </span>
                      )}
                      {enq.hotelDetails && (
                        <span>
                          {enq.hotelDetails.hotelName || enq.hotelDetails.city} (
                          {enq.hotelDetails.roomType || "Standard"})
                        </span>
                      )}
                      {enq.packageDetails && (
                        <span>{enq.packageDetails.packageTitle || "Holiday Package"}</span>
                      )}
                      {enq.transportDetails && (
                        <span>
                          {enq.transportDetails.pickupLocation} ➔ {enq.transportDetails.dropLocation} (
                          {enq.transportDetails.vehicleType})
                        </span>
                      )}
                      {enq.specialRequests && !enq.flightDetails && !enq.hotelDetails && (
                        <span className="text-gray-300">{enq.specialRequests}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-gray-400 text-[11px]">
                      {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(
                          enq.status
                        )}`}
                      >
                        {enq.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEnquiry(enq);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-[#d4af37] hover:underline"
                      >
                        <MaterialIcon name="visibility" size={14} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail Drawer / Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a192f] border-2 border-[#d4af37] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                {getServiceIcon(selectedEnquiry.enquiryType)}
                <div>
                  <h3 className="text-lg font-bold uppercase text-white font-mono">
                    {selectedEnquiry.enquiryCode}
                  </h3>
                  <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-bold">
                    {selectedEnquiry.enquiryType} Quotation Lead
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="text-gray-400 hover:text-white p-1"
              >
                <MaterialIcon name="close" size={20} />
              </button>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#081325] border border-white/10 p-3.5 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Name</span>
                <span className="text-sm font-bold text-white">{selectedEnquiry.customerName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Phone</span>
                <a
                  href={`tel:${selectedEnquiry.customerPhone}`}
                  className="text-sm font-bold text-[#d4af37] hover:underline"
                >
                  {selectedEnquiry.customerPhone}
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Email</span>
                <a
                  href={`mailto:${selectedEnquiry.customerEmail}`}
                  className="text-xs font-medium text-gray-200 hover:underline break-all"
                >
                  {selectedEnquiry.customerEmail}
                </a>
              </div>
            </div>

            {/* Service Specific Information */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#d4af37]">
                Requirement Breakdown
              </h4>

              {selectedEnquiry.flightDetails && (
                <div className="bg-white/5 p-3.5 space-y-2 border border-white/10">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Route:</span>
                    <span className="font-bold text-white">
                      {selectedEnquiry.flightDetails.fromCity} ➔ {selectedEnquiry.flightDetails.toCity}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Cabin Class:</span>
                    <span className="font-bold text-white">
                      {selectedEnquiry.flightDetails.travelClass || "Economy"}
                    </span>
                  </div>
                  {selectedEnquiry.flightDetails.departureDate && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Departure Date:</span>
                      <span className="font-bold text-white">
                        {new Date(selectedEnquiry.flightDetails.departureDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {selectedEnquiry.hotelDetails && (
                <div className="bg-white/5 p-3.5 space-y-2 border border-white/10">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Property / Destination:</span>
                    <span className="font-bold text-white">
                      {selectedEnquiry.hotelDetails.hotelName || selectedEnquiry.hotelDetails.city}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Room & Guest Configuration:</span>
                    <span className="font-bold text-white">
                      {selectedEnquiry.hotelDetails.roomType || "Standard"}
                    </span>
                  </div>
                </div>
              )}

              {selectedEnquiry.packageDetails && (
                <div className="bg-white/5 p-3.5 space-y-2 border border-white/10">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Package Title:</span>
                    <span className="font-bold text-white">
                      {selectedEnquiry.packageDetails.packageTitle}
                    </span>
                  </div>
                </div>
              )}

              {selectedEnquiry.transportDetails && (
                <div className="bg-white/5 p-3.5 space-y-2 border border-white/10">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Pickup Location:</span>
                    <span className="font-bold text-white">
                      {selectedEnquiry.transportDetails.pickupLocation}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Drop Destination:</span>
                    <span className="font-bold text-white">
                      {selectedEnquiry.transportDetails.dropLocation}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Vehicle Type:</span>
                    <span className="font-bold text-white">
                      {selectedEnquiry.transportDetails.vehicleType}
                    </span>
                  </div>
                </div>
              )}

              {selectedEnquiry.specialRequests && (
                <div className="bg-white/5 p-3.5 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                    Special Inquiries & Notes:
                  </span>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    {selectedEnquiry.specialRequests}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Status Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs uppercase font-bold text-gray-400">Update Lead Status:</span>
              <div className="flex flex-wrap gap-2">
                {["new", "contacted", "quoted", "converted", "cancelled"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    disabled={statusUpdateLoading}
                    onClick={() => handleUpdateStatus(selectedEnquiry._id, st)}
                    className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border transition cursor-pointer ${
                      selectedEnquiry.status === st
                        ? "bg-[#d4af37] text-black border-[#d4af37]"
                        : "bg-[#081325] text-gray-300 border-white/20 hover:border-[#d4af37]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
