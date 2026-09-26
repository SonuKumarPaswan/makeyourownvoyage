"use client";

import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { adminFaqsApi } from "@/lib/api/admin.api";

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
  isFeatured?: boolean;
}

export default function AdminReviewsFaqsPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
    order: 1,
    isFeatured: true,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await adminFaqsApi.getAll();
      if (res?.data) {
        setFaqs(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      console.error("Error loading FAQs:", err);
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

  const handleOpenCreate = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      question: "",
      answer: "",
      category: "general",
      order: 1,
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FaqItem) => {
    setIsEditing(true);
    setCurrentId(faq._id);
    setFormData({
      question: faq.question || "",
      answer: faq.answer || "",
      category: faq.category || "general",
      order: faq.order || 1,
      isFeatured: !!faq.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, question: string) => {
    if (!window.confirm(`Are you sure you want to delete FAQ: "${question}"?`)) return;
    try {
      await adminFaqsApi.delete(id);
      showToast("success", "FAQ deleted successfully.");
      setFaqs((prev) => prev.filter((f) => f._id !== id));
    } catch (err: any) {
      showToast("error", err.message || "Failed to delete FAQ.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      question: formData.question,
      answer: formData.answer,
      category: formData.category,
      order: Number(formData.order),
      isFeatured: formData.isFeatured,
    };

    try {
      if (isEditing && currentId) {
        await adminFaqsApi.update(currentId, payload);
        showToast("success", "FAQ updated successfully!");
      } else {
        await adminFaqsApi.create(payload);
        showToast("success", "New FAQ added successfully!");
      }
      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      showToast("error", err.message || "Operation failed. Check admin auth token.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = faqs.filter((f) => {
    const q = f.question?.toLowerCase() || "";
    const a = f.answer?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    const matchesSearch = q.includes(query) || a.includes(query);
    const matchesCategory = selectedCategory === "all" || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
            FAQs &amp; Content Management
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage customer knowledge base, answers to common queries, and booking policies.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#c49f27] transition flex items-center gap-1.5 shadow-md self-start sm:self-auto"
        >
          <MaterialIcon name="add" size={16} />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Controls */}
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
            placeholder="Search FAQs by question or answer..."
            className="w-full bg-[#070e17] border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#070e17] border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 outline-none focus:border-[#d4af37]"
          >
            <option value="all">All Categories</option>
            <option value="general">General Queries</option>
            <option value="packages">Tour Packages</option>
            <option value="hotels">Hotels &amp; Stays</option>
            <option value="transport">Transport &amp; Cabs</option>
            <option value="cancellation">Cancellation &amp; Refunds</option>
          </select>

          <button
            onClick={loadData}
            className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:text-white"
            title="Refresh FAQs"
          >
            <MaterialIcon name="refresh" size={16} />
          </button>
        </div>
      </div>

      {/* FAQs List / Table */}
      <div className="bg-[#0a1526] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#070e17] text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
              <tr>
                <th className="p-3.5">Question &amp; Answer</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Order</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    Loading FAQs...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No FAQs found. Click "Add New FAQ" to create one.
                  </td>
                </tr>
              ) : (
                filtered.map((faq) => (
                  <tr key={faq._id} className="hover:bg-gray-800/30 transition">
                    <td className="p-3.5 max-w-lg">
                      <div className="font-semibold text-white text-sm">{faq.question}</div>
                      <div className="text-gray-400 text-xs mt-1 line-clamp-2">{faq.answer}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-gray-800 text-gray-300 border border-gray-700 capitalize">
                        {faq.category || "General"}
                      </span>
                    </td>
                    <td className="p-3.5 text-gray-300">{faq.order || 1}</td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(faq)}
                          className="p-1.5 rounded hover:bg-gray-800 text-gray-300 hover:text-white"
                        >
                          <MaterialIcon name="edit" size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(faq._id, faq.question)}
                          className="p-1.5 rounded hover:bg-rose-500/20 text-rose-400 hover:text-rose-300"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e1b2e] border border-gray-700 rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MaterialIcon name="help_outline" size={20} className="text-[#d4af37]" />
                <span>{isEditing ? "Edit FAQ" : "Add New FAQ"}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <MaterialIcon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. Can I customize a package itinerary with private transfers?"
                  className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                  >
                    <option value="general">General Queries</option>
                    <option value="packages">Tour Packages</option>
                    <option value="hotels">Hotels &amp; Stays</option>
                    <option value="transport">Fleet &amp; Mobility</option>
                    <option value="cancellation">Cancellation &amp; Policy</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Comprehensive and concise answer for customers..."
                  className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#d4af37] text-black hover:bg-[#c49f27] transition flex items-center gap-1.5"
                >
                  {isSubmitting ? "Saving..." : isEditing ? "Update FAQ" : "Save FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
