"use client";

import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { adminCollectionsApi } from "@/lib/api/admin.api";

interface CollectionItem {
  _id: string;
  title: string;
  subtitle?: string;
  type?: string;
  desktopImage?: string;
  mobileImage?: string;
  link?: string;
  isActive?: boolean;
  priority?: number;
}

export default function AdminOffersPage() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "Special monsoon discounts & luxury upgrades",
    type: "hero-banner",
    desktopImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    mobileImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    link: "/packages?type=weekend",
    isActive: true,
    priority: 1,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await adminCollectionsApi.getAll();
      if (res?.data) {
        setCollections(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      console.error("Error loading collections:", err);
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
      title: "",
      subtitle: "Special discounts & luxury upgrades",
      type: "hero-banner",
      desktopImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
      mobileImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      link: "/packages",
      isActive: true,
      priority: 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CollectionItem) => {
    setIsEditing(true);
    setCurrentId(item._id);
    setFormData({
      title: item.title || "",
      subtitle: item.subtitle || "",
      type: item.type || "hero-banner",
      desktopImage: item.desktopImage || "",
      mobileImage: item.mobileImage || "",
      link: item.link || "/packages",
      isActive: item.isActive !== false,
      priority: item.priority || 1,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete banner "${title}"?`)) return;
    try {
      await adminCollectionsApi.delete(id);
      showToast("success", `Collection "${title}" deleted.`);
      setCollections((prev) => prev.filter((c) => c._id !== id));
    } catch (err: any) {
      showToast("error", err.message || "Failed to delete collection.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title: formData.title,
      subtitle: formData.subtitle,
      type: formData.type,
      desktopImage: formData.desktopImage,
      mobileImage: formData.mobileImage,
      link: formData.link,
      isActive: formData.isActive,
      priority: Number(formData.priority),
    };

    try {
      if (isEditing && currentId) {
        await adminCollectionsApi.update(currentId, payload);
        showToast("success", "Collection updated!");
      } else {
        await adminCollectionsApi.create(payload);
        showToast("success", "New collection created!");
      }
      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      showToast("error", err.message || "Operation failed. Check admin auth token.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = collections.filter((c) =>
    c.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Offers &amp; Homepage Collections
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage promotional hero banners, seasonal spotlight collections, and campaign redirects.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#c49f27] transition flex items-center gap-1.5 shadow-md self-start sm:self-auto"
        >
          <MaterialIcon name="add" size={16} />
          <span>Add New Collection</span>
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
            placeholder="Search collections..."
            className="w-full bg-[#070e17] border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
          />
        </div>

        <button
          onClick={loadData}
          className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:text-white"
          title="Refresh Collections"
        >
          <MaterialIcon name="refresh" size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#0a1526] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#070e17] text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
              <tr>
                <th className="p-3.5">Banner Details</th>
                <th className="p-3.5">Target Link</th>
                <th className="p-3.5">Priority</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Loading collections...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No promotional collections found. Click "Add New Collection" to create one.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-800/30 transition">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.desktopImage || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"}
                          alt={c.title}
                          className="h-10 w-16 object-cover rounded border border-gray-700 shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-white">{c.title}</div>
                          <div className="text-[11px] text-gray-400">{c.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-gray-300 font-mono text-[11px]">
                      {c.link || "/packages"}
                    </td>
                    <td className="p-3.5 text-gray-300">{c.priority || 1}</td>
                    <td className="p-3.5">
                      {c.isActive !== false ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-gray-700 text-gray-400">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(c)}
                          className="p-1.5 rounded hover:bg-gray-800 text-gray-300 hover:text-white"
                        >
                          <MaterialIcon name="edit" size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(c._id, c.title)}
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
                <MaterialIcon name="local_offer" size={20} className="text-[#d4af37]" />
                <span>{isEditing ? "Edit Collection" : "Add Collection"}</span>
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
                  Collection Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Summer Himalayan Escapes - 25% Off"
                  className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                    Target URL / Route
                  </label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white font-mono outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                    Display Priority (Order)
                  </label>
                  <input
                    type="number"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) })}
                    className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                  Desktop Banner Image URL
                </label>
                <input
                  type="url"
                  value={formData.desktopImage}
                  onChange={(e) => setFormData({ ...formData, desktopImage: e.target.value })}
                  className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-[#d4af37]"
                />
                <label htmlFor="isActive" className="text-xs text-gray-200">
                  Active (Visible on public feeds)
                </label>
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
                  {isSubmitting ? "Saving..." : isEditing ? "Update Collection" : "Save Collection"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
