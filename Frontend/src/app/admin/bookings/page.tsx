"use client";

import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { adminEnquiriesApi } from "@/lib/api/admin.api";

interface EnquiryItem {
  _id: string;
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  category?: string;
  type?: string;
  status?: "new" | "in-progress" | "contacted" | "converted" | "cancelled" | string;
  destination?: string;
  packageName?: string;
  hotelName?: string;
  travelDate?: string;
  travellers?: number;
  message?: string;
  notes?: string;
  quoteAmount?: number;
  assignedTo?: string;
  createdAt?: string;
}

export default function AdminBookingsPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Detail & Status Update Drawer / Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [newStatus, setNewStatus] = useState("new");
  const [agentNotes, setAgentNotes] = useState("");
  const [quoteAmount, setQuoteAmount] = useState<number | undefined>(undefined);
  const [isUpdating, setIsUpdating] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await adminEnquiriesApi.getAll({ limit: 100 });
      if (res?.data) {
        setEnquiries(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      console.error("Error loading enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenDetail = (enq: EnquiryItem) => {
    setSelectedEnquiry(enq);
    setNewStatus(enq.status || "new");
    setAgentNotes(enq.notes || "");
    setQuoteAmount(enq.quoteAmount);
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    setIsUpdating(true);

    try {
      await adminEnquiriesApi.updateStatus(selectedEnquiry._id, {
        status: newStatus,
        notes: agentNotes,
        quoteAmount: quoteAmount ? Number(quoteAmount) : undefined,
      });

      showToast("success", "Enquiry lead status updated successfully!");
      setEnquiries((prev) =>
        prev.map((item) =>
          item._id === selectedEnquiry._id
            ? { ...item, status: newStatus, notes: agentNotes, quoteAmount }
            : item
        )
      );
      setSelectedEnquiry(null);
    } catch (err: any) {
      showToast("error", err.message || "Failed to update status. Check token.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry record?")) return;
    try {
      await adminEnquiriesApi.delete(id);
      showToast("success", "Enquiry deleted.");
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
    } catch (err: any) {
      showToast("error", err.message || "Failed to delete enquiry.");
    }
  };

  const filtered = enquiries.filter((e) => {
    const customer = (e.name || e.fullName || "").toLowerCase();
    const contact = (e.email || e.phone || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = customer.includes(query) || contact.includes(query);
    const matchesStatus = selectedStatus === "all" || e.status === selectedStatus;
    const matchesCategory = selectedCategory === "all" || (e.category || e.type) === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Enquiries &amp; CRM Leads
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage incoming holiday enquiries, hotel quotes, custom itineraries, and lead follow-ups.
          </p>
        </div>

        <button
          onClick={loadData}
          className="px-3.5 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white border border-gray-700 text-xs font-semibold transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <MaterialIcon name="refresh" size={16} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#0a1526] border border-gray-800 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <MaterialIcon
            name="search"
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, phone, email..."
            className="w-full bg-[#070e17] border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#070e17] border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 outline-none focus:border-[#d4af37]"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="in-progress">In-Progress</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#070e17] border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 outline-none focus:border-[#d4af37]"
          >
            <option value="all">All Categories</option>
            <option value="package">Package Enquiry</option>
            <option value="hotel">Hotel Stay</option>
            <option value="flight">Flight Booking</option>
            <option value="transport">Transport / Cab</option>
            <option value="custom">Custom Concierge</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-[#0a1526] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#070e17] text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
              <tr>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Details</th>
                <th className="p-3.5">Quote / Value</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Received</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    Loading CRM leads...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No enquiries match the selected filter.
                  </td>
                </tr>
              ) : (
                filtered.map((enq) => (
                  <tr key={enq._id} className="hover:bg-gray-800/30 transition">
                    <td className="p-3.5">
                      <div className="font-semibold text-white">
                        {enq.name || enq.fullName || "Guest Traveller"}
                      </div>
                      <div className="text-[11px] text-gray-400 font-mono">
                        {enq.phone || "-"}
                      </div>
                      <div className="text-[11px] text-gray-500">{enq.email || "-"}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-gray-800 text-gray-300 border border-gray-700 capitalize">
                        {enq.category || enq.type || "General"}
                      </span>
                    </td>
                    <td className="p-3.5 text-gray-300 max-w-xs truncate">
                      <div>{enq.destination || enq.packageName || enq.hotelName || "Trip Request"}</div>
                      {enq.travelDate && (
                        <div className="text-[10px] text-gray-400">Date: {enq.travelDate}</div>
                      )}
                    </td>
                    <td className="p-3.5">
                      {enq.quoteAmount ? (
                        <span className="text-[#d4af37] font-bold">₹{enq.quoteAmount}</span>
                      ) : (
                        <span className="text-gray-500 text-[11px]">-</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          enq.status === "converted"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : enq.status === "contacted"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : enq.status === "cancelled"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {enq.status || "New"}
                      </span>
                    </td>
                    <td className="p-3.5 text-gray-400 text-[11px]">
                      {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : "-"}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenDetail(enq)}
                          className="px-2.5 py-1 rounded bg-[#d4af37] text-black font-semibold text-[11px] hover:bg-[#c49f27]"
                        >
                          View / Status
                        </button>
                        <button
                          onClick={() => handleDelete(enq._id)}
                          className="p-1 rounded hover:bg-rose-500/20 text-rose-400"
                          title="Delete Lead"
                        >
                          <MaterialIcon name="delete" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail & Status Update Drawer Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e1b2e] border border-gray-700 rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MaterialIcon name="assignment" size={20} className="text-[#d4af37]" />
                <span>Lead Enquiry Details</span>
              </h2>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-gray-400 hover:text-white"
              >
                <MaterialIcon name="close" size={20} />
              </button>
            </div>

            {/* Readonly Info */}
            <div className="bg-[#070e17] border border-gray-800 rounded-lg p-4 space-y-2.5 text-xs text-gray-300">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Customer</span>
                  <span className="font-semibold text-white">
                    {selectedEnquiry.name || selectedEnquiry.fullName || "Guest"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Phone / WhatsApp</span>
                  <span className="font-mono text-white">{selectedEnquiry.phone || "-"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-800/60">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Email</span>
                  <span>{selectedEnquiry.email || "-"}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Category</span>
                  <span className="capitalize">{selectedEnquiry.category || selectedEnquiry.type || "-"}</span>
                </div>
              </div>

              {selectedEnquiry.message && (
                <div className="pt-2 border-t border-gray-800/60">
                  <span className="text-gray-500 block text-[10px] uppercase mb-1">
                    Customer Message / Requirements
                  </span>
                  <p className="bg-[#0a1526] p-2.5 rounded border border-gray-800 text-gray-200">
                    {selectedEnquiry.message}
                  </p>
                </div>
              )}
            </div>

            {/* Status Update Form */}
            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                    Update Lead Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                  >
                    <option value="new">New (Unassigned)</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="contacted">Contacted Customer</option>
                    <option value="converted">Converted (Booked)</option>
                    <option value="cancelled">Cancelled / Lost</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                    Quote / Booking Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={quoteAmount || ""}
                    onChange={(e) => setQuoteAmount(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="e.g. 45000"
                    className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                  Internal Agent Notes
                </label>
                <textarea
                  rows={3}
                  value={agentNotes}
                  onChange={(e) => setAgentNotes(e.target.value)}
                  placeholder="Notes on customer preferences, customized quote shared, or follow-up schedule..."
                  className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 rounded-lg text-xs bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#d4af37] text-black hover:bg-[#c49f27] transition flex items-center gap-1.5"
                >
                  {isUpdating ? "Saving..." : "Save Status & Notes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
