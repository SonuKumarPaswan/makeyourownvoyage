"use client";

import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { adminVisaApi, adminEnquiriesApi } from "@/lib/api/admin.api";
import { SingleImageUploader } from "@/components/admin/ImageUploader";

export default function AdminVisaPage() {
  const [activeTab, setActiveTab] = useState<"catalog" | "applications">("catalog");
  const [visas, setVisas] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const [formData, setFormData] = useState({
    country: "",
    flag: "🌍",
    visaType: "Tourist E-Visa",
    processingTime: "24 - 48 Hours",
    validity: "60 Days",
    stayDuration: "30 Days",
    fee: 4500,
    entryType: "Single Entry",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    description: "Fast-track electronic visa processing directly with official embassy portals.",
    isPopular: false,
    isActive: true,
  });

  const showToast = (type: "success" | "error", msg: string) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [visaRes, enquiryRes] = await Promise.allSettled([
        adminVisaApi.getAll(),
        adminEnquiriesApi.getAll({ category: "visa" }),
      ]);

      if (visaRes.status === "fulfilled" && visaRes.value?.data) {
        setVisas(Array.isArray(visaRes.value.data) ? visaRes.value.data : []);
      }
      if (enquiryRes.status === "fulfilled" && enquiryRes.value?.data) {
        setEnquiries(Array.isArray(enquiryRes.value.data) ? enquiryRes.value.data : []);
      }
    } catch (err) {
      console.error("Error loading visa dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      country: "",
      flag: "🌍",
      visaType: "Tourist E-Visa",
      processingTime: "24 - 48 Hours",
      validity: "60 Days",
      stayDuration: "30 Days",
      fee: 4500,
      entryType: "Single Entry",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      description: "Fast-track electronic visa processing directly with official embassy portals.",
      isPopular: false,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v: any) => {
    setIsEditing(true);
    setCurrentId(v._id);
    setFormData({
      country: v.country || "",
      flag: v.flag || "🌍",
      visaType: v.visaType || "Tourist E-Visa",
      processingTime: v.processingTime || "24 - 48 Hours",
      validity: v.validity || "60 Days",
      stayDuration: v.stayDuration || "30 Days",
      fee: v.fee || 4500,
      entryType: v.entryType || "Single Entry",
      image: v.image || "",
      description: v.description || "",
      isPopular: !!v.isPopular,
      isActive: v.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete ${name} visa?`)) return;
    try {
      await adminVisaApi.delete(id);
      showToast("success", `${name} visa deleted.`);
      setVisas((prev) => prev.filter((v) => v._id !== id));
    } catch (err: any) {
      showToast("error", err.message || "Failed to delete visa.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentId) {
        const res = await adminVisaApi.update(currentId, formData);
        showToast("success", "Visa destination updated in MongoDB!");
        setVisas((prev) => prev.map((v) => (v._id === currentId ? res.data : v)));
      } else {
        const res = await adminVisaApi.create(formData);
        showToast("success", "New visa destination created in MongoDB!");
        setVisas((prev) => [res.data, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      showToast("error", err.message || "Failed to save visa.");
    }
  };

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
            Visa Assistance Desk &amp; Catalog
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage live visa country products in MongoDB and process applicant enquiries.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#c49f27] transition flex items-center gap-1.5 shadow-md self-start sm:self-auto"
        >
          <MaterialIcon name="add" size={16} />
          <span>Add Visa Destination</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
        <button
          onClick={() => setActiveTab("catalog")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
            activeTab === "catalog"
              ? "bg-[#d4af37] text-black shadow-sm"
              : "text-gray-400 hover:text-white bg-[#0a1526]"
          }`}
        >
          <MaterialIcon name="public" size={16} />
          <span>Visa Country Catalog ({visas.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
            activeTab === "applications"
              ? "bg-[#d4af37] text-black shadow-sm"
              : "text-gray-400 hover:text-white bg-[#0a1526]"
          }`}
        >
          <MaterialIcon name="assignment" size={16} />
          <span>Visa Applications &amp; Leads ({enquiries.length})</span>
        </button>
      </div>

      {/* Catalog Tab */}
      {activeTab === "catalog" && (
        <div className="bg-[#0a1526] border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#070e17] text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                <tr>
                  <th className="p-3.5">Country &amp; Visa Type</th>
                  <th className="p-3.5">Processing Time</th>
                  <th className="p-3.5">Validity / Stay</th>
                  <th className="p-3.5">Visa Fee</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      Loading visa catalog from database...
                    </td>
                  </tr>
                ) : visas.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No visa destinations found. Click "Add Visa Destination" to create one.
                    </td>
                  </tr>
                ) : (
                  visas.map((v) => (
                    <tr key={v._id} className="hover:bg-gray-800/30 transition">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{v.flag || "🌍"}</span>
                          <div>
                            <div className="font-semibold text-white">{v.country}</div>
                            <div className="text-[11px] text-amber-300">{v.visaType}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 text-gray-300">{v.processingTime}</td>
                      <td className="p-3.5 text-gray-300">
                        {v.validity} / {v.stayDuration}
                      </td>
                      <td className="p-3.5 font-bold text-[#d4af37]">₹{v.fee}</td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            v.isActive !== false
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-gray-800 text-gray-500"
                          }`}
                        >
                          {v.isActive !== false ? "Active" : "Disabled"}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(v)}
                            className="p-1.5 rounded hover:bg-gray-800 text-gray-300 hover:text-white transition"
                          >
                            <MaterialIcon name="edit" size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(v._id, v.country)}
                            className="p-1.5 rounded hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition"
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
      )}

      {/* Applications Tab */}
      {activeTab === "applications" && (
        <div className="bg-[#0a1526] border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#070e17] text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                <tr>
                  <th className="p-3.5">Applicant Details</th>
                  <th className="p-3.5">Target Destination</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Applied On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No customer visa applications recorded yet.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((e) => (
                    <tr key={e._id} className="hover:bg-gray-800/30 transition">
                      <td className="p-3.5">
                        <div className="font-semibold text-white">{e.name || "Applicant"}</div>
                        <div className="text-[11px] text-gray-400 font-mono">{e.phone || e.email}</div>
                      </td>
                      <td className="p-3.5 text-gray-300">
                        {e.details?.country || e.country || "International"}
                      </td>
                      <td className="p-3.5 text-gray-400">
                        {e.details?.visaType || e.visaType || "Tourist Visa"}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {e.status || "New Lead"}
                        </span>
                      </td>
                      <td className="p-3.5 text-gray-400 text-[11px]">
                        {e.createdAt ? new Date(e.createdAt).toLocaleDateString() : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e1b2e] border border-gray-700 rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MaterialIcon name="public" size={20} className="text-[#d4af37]" />
                <span>{isEditing ? "Edit Visa Offering" : "Add New Visa Destination"}</span>
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <MaterialIcon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">Country Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Dubai / UAE, Singapore"
                    className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">Flag Emoji</label>
                  <input
                    type="text"
                    value={formData.flag}
                    onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
                    placeholder="🇦🇪"
                    className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">Visa Type *</label>
                  <input
                    type="text"
                    required
                    value={formData.visaType}
                    onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                    placeholder="e.g. Tourist E-Visa"
                    className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">Fee (INR) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.fee}
                    onChange={(e) => setFormData({ ...formData, fee: Number(e.target.value) })}
                    className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">Turnaround</label>
                  <input
                    type="text"
                    value={formData.processingTime}
                    onChange={(e) => setFormData({ ...formData, processingTime: e.target.value })}
                    placeholder="24 - 48 Hours"
                    className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">Validity</label>
                  <input
                    type="text"
                    value={formData.validity}
                    onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
                    placeholder="60 Days"
                    className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">Stay Duration</label>
                  <input
                    type="text"
                    value={formData.stayDuration}
                    onChange={(e) => setFormData({ ...formData, stayDuration: e.target.value })}
                    placeholder="30 Days"
                    className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Country Cover Image with Cloudinary Direct Upload */}
              <SingleImageUploader
                label="Country / Destination Cover Image"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                folder="visas"
                required={true}
                helpText="Scenic hero photo of the visa destination country."
              />

              <div>
                <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    className="accent-[#d4af37]"
                  />
                  <span>Highlight as Popular Destination</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="accent-[#d4af37]"
                  />
                  <span>Active &amp; Published</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#d4af37] hover:bg-[#c49f27] text-xs font-semibold text-black shadow-md"
                >
                  {isEditing ? "Save Changes" : "Create Visa Offering"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
