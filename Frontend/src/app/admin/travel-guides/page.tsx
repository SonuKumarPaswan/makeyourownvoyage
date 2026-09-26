"use client";

import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import {
  adminActivitiesApi,
  adminTemplatesApi,
  adminDestinationsApi,
} from "@/lib/api/admin.api";

export default function AdminTravelGuidesPage() {
  const [activeTab, setActiveTab] = useState<"activities" | "templates">("activities");
  const [activities, setActivities] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Activity Form State
  const [activityForm, setActivityForm] = useState({
    name: "",
    destination: "",
    category: "Adventure",
    duration: "2-3 Hours",
    price: 1200,
    description: "Scenic paragliding / river rafting / sightseeing experience with certified guide.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
  });

  // Template Form State
  const [templateForm, setTemplateForm] = useState({
    title: "",
    destination: "",
    days: 3,
    nights: 2,
    description: "Standard 3D/2N heritage and nature itinerary.",
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [actRes, tplRes, destRes] = await Promise.allSettled([
        adminActivitiesApi.getAll(),
        adminTemplatesApi.getAll(),
        adminDestinationsApi.getAll(),
      ]);

      if (actRes.status === "fulfilled" && actRes.value?.data) {
        setActivities(Array.isArray(actRes.value.data) ? actRes.value.data : []);
      }
      if (tplRes.status === "fulfilled" && tplRes.value?.data) {
        setTemplates(Array.isArray(tplRes.value.data) ? tplRes.value.data : []);
      }
      if (destRes.status === "fulfilled" && destRes.value?.data) {
        setDestinations(Array.isArray(destRes.value.data) ? destRes.value.data : []);
      }
    } catch (err) {
      console.error("Error loading activities & templates:", err);
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
    if (activeTab === "activities") {
      setActivityForm({
        name: "",
        destination: destinations[0]?._id || "",
        category: "Adventure",
        duration: "2-3 Hours",
        price: 1200,
        description: "Scenic paragliding / river rafting / sightseeing experience with certified guide.",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
      });
    } else {
      setTemplateForm({
        title: "",
        destination: destinations[0]?._id || "",
        days: 3,
        nights: 2,
        description: "Standard 3D/2N heritage and nature itinerary.",
      });
    }
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setIsEditing(true);
    setCurrentId(item._id);
    if (activeTab === "activities") {
      setActivityForm({
        name: item.name || "",
        destination: typeof item.destination === "object" ? item.destination?._id : item.destination || "",
        category: item.category || "Adventure",
        duration: item.duration || "2-3 Hours",
        price: item.price || 1200,
        description: item.description || "",
        image: item.image || "",
      });
    } else {
      setTemplateForm({
        title: item.title || "",
        destination: typeof item.destination === "object" ? item.destination?._id : item.destination || "",
        days: item.days || 3,
        nights: item.nights || 2,
        description: item.description || "",
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      if (activeTab === "activities") {
        await adminActivitiesApi.delete(id);
        setActivities((prev) => prev.filter((a) => a._id !== id));
      } else {
        await adminTemplatesApi.delete(id);
        setTemplates((prev) => prev.filter((t) => t._id !== id));
      }
      showToast("success", `Deleted "${title}".`);
    } catch (err: any) {
      showToast("error", err.message || "Failed to delete.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (activeTab === "activities") {
        const payload = {
          name: activityForm.name,
          destination: activityForm.destination || undefined,
          category: activityForm.category,
          duration: activityForm.duration,
          price: Number(activityForm.price),
          description: activityForm.description,
          image: activityForm.image,
        };

        if (isEditing && currentId) {
          await adminActivitiesApi.update(currentId, payload);
          showToast("success", "Activity updated!");
        } else {
          await adminActivitiesApi.create(payload);
          showToast("success", "New activity created!");
        }
      } else {
        const payload = {
          title: templateForm.title,
          destination: templateForm.destination || undefined,
          days: Number(templateForm.days),
          nights: Number(templateForm.nights),
          description: templateForm.description,
        };

        if (isEditing && currentId) {
          await adminTemplatesApi.update(currentId, payload);
          showToast("success", "Template updated!");
        } else {
          await adminTemplatesApi.create(payload);
          showToast("success", "New template created!");
        }
      }

      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      showToast("error", err.message || "Operation failed. Check admin auth token.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredActivities = activities.filter((a) =>
    a.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTemplates = templates.filter((t) =>
    t.title?.toLowerCase().includes(searchQuery.toLowerCase())
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
            Activities &amp; Itinerary Templates
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Master repository for tourist activities, excursions, and reusable day-wise itinerary plans.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#c49f27] transition flex items-center gap-1.5 shadow-md self-start sm:self-auto"
        >
          <MaterialIcon name="add" size={16} />
          <span>Add New {activeTab === "activities" ? "Activity" : "Itinerary Template"}</span>
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="bg-[#0a1526] border border-gray-800 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex rounded-lg bg-[#070e17] p-1 border border-gray-800">
          <button
            onClick={() => setActiveTab("activities")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${
              activeTab === "activities"
                ? "bg-[#d4af37] text-black shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Master Activities ({activities.length})
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${
              activeTab === "templates"
                ? "bg-[#d4af37] text-black shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Itinerary Templates ({templates.length})
          </button>
        </div>

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
            placeholder={`Search ${activeTab}...`}
            className="w-full bg-[#070e17] border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
          />
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-[#0a1526] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === "activities" ? (
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#070e17] text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                <tr>
                  <th className="p-3.5">Activity</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Loading activities...
                    </td>
                  </tr>
                ) : filteredActivities.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No activities registered. Click "Add New Activity" to create one.
                    </td>
                  </tr>
                ) : (
                  filteredActivities.map((act) => (
                    <tr key={act._id} className="hover:bg-gray-800/30 transition">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          {act.image ? (
                            <img
                              src={act.image}
                              alt={act.name}
                              className="h-10 w-14 object-cover rounded border border-gray-700 shrink-0"
                            />
                          ) : (
                            <div className="h-10 w-14 rounded bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500 shrink-0">
                              <MaterialIcon name="tour" size={16} />
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-white">{act.name}</div>
                            <div className="text-[11px] text-gray-400">
                              {typeof act.destination === "object" ? act.destination?.name : "Destination"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-gray-800 text-gray-300 border border-gray-700">
                          {act.category || "General"}
                        </span>
                      </td>
                      <td className="p-3.5 text-gray-300">{act.duration || "2 Hours"}</td>
                      <td className="p-3.5 text-[#d4af37] font-bold">
                        ₹{act.price || 0}
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(act)}
                            className="p-1.5 rounded hover:bg-gray-800 text-gray-300 hover:text-white"
                          >
                            <MaterialIcon name="edit" size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(act._id, act.name)}
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
          ) : (
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#070e17] text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                <tr>
                  <th className="p-3.5">Template Title</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Description</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      Loading templates...
                    </td>
                  </tr>
                ) : filteredTemplates.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      No templates created yet. Click "Add New Itinerary Template" to create one.
                    </td>
                  </tr>
                ) : (
                  filteredTemplates.map((tpl) => (
                    <tr key={tpl._id} className="hover:bg-gray-800/30 transition">
                      <td className="p-3.5 font-semibold text-white">{tpl.title}</td>
                      <td className="p-3.5 text-gray-300">
                        {tpl.days || 3} Days / {tpl.nights || 2} Nights
                      </td>
                      <td className="p-3.5 text-gray-400 max-w-sm truncate">{tpl.description || "-"}</td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(tpl)}
                            className="p-1.5 rounded hover:bg-gray-800 text-gray-300 hover:text-white"
                          >
                            <MaterialIcon name="edit" size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(tpl._id, tpl.title)}
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
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e1b2e] border border-gray-700 rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MaterialIcon name="tour" size={20} className="text-[#d4af37]" />
                <span>
                  {isEditing ? "Edit" : "Create"} {activeTab === "activities" ? "Activity" : "Template"}
                </span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <MaterialIcon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === "activities" ? (
                <>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                      Activity Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={activityForm.name}
                      onChange={(e) => setActivityForm({ ...activityForm, name: e.target.value })}
                      placeholder="e.g. Paragliding at Solang Valley"
                      className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Destination
                      </label>
                      <select
                        value={activityForm.destination}
                        onChange={(e) => setActivityForm({ ...activityForm, destination: e.target.value })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      >
                        <option value="">Select</option>
                        {destinations.map((d) => (
                          <option key={d._id} value={d._id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={activityForm.category}
                        onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value })}
                        placeholder="e.g. Adventure / Sightseeing"
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        value={activityForm.price}
                        onChange={(e) => setActivityForm({ ...activityForm, price: Number(e.target.value) })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={activityForm.duration}
                      onChange={(e) => setActivityForm({ ...activityForm, duration: e.target.value })}
                      placeholder="e.g. 2-3 Hours"
                      className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                      Activity Image URL
                    </label>
                    <input
                      type="url"
                      value={activityForm.image}
                      onChange={(e) => setActivityForm({ ...activityForm, image: e.target.value })}
                      className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={activityForm.description}
                      onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                      className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                      Template Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={templateForm.title}
                      onChange={(e) => setTemplateForm({ ...templateForm, title: e.target.value })}
                      placeholder="e.g. 4D/3N Golden Triangle Classic Itinerary"
                      className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Days
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={templateForm.days}
                        onChange={(e) => setTemplateForm({ ...templateForm, days: Number(e.target.value) })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Nights
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={templateForm.nights}
                        onChange={(e) => setTemplateForm({ ...templateForm, nights: Number(e.target.value) })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Destination
                      </label>
                      <select
                        value={templateForm.destination}
                        onChange={(e) => setTemplateForm({ ...templateForm, destination: e.target.value })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      >
                        <option value="">Select Destination</option>
                        {destinations.map((d) => (
                          <option key={d._id} value={d._id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                      Template Summary &amp; Notes
                    </label>
                    <textarea
                      rows={3}
                      value={templateForm.description}
                      onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                      className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </>
              )}

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
                  {isSubmitting ? "Saving..." : isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
