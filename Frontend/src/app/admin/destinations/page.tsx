"use client";

import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { adminDestinationsApi, adminStatesApi, adminUploadApi } from "@/lib/api/admin.api";
import { SingleImageUploader, GalleryUploader } from "@/components/admin/ImageUploader";

export default function AdminDestinationsPage() {
  const [activeTab, setActiveTab] = useState<"destinations" | "states">("destinations");
  const [destinations, setDestinations] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [destModalTab, setDestModalTab] = useState<"basic" | "travel" | "attractions" | "seo">("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [uploadingDestCover, setUploadingDestCover] = useState(false);
  const [uploadingDestGallery, setUploadingDestGallery] = useState(false);
  const [uploadingStateCover, setUploadingStateCover] = useState(false);

  // Deep Destination Form State
  const [destForm, setDestForm] = useState({
    name: "",
    slug: "",
    state: "",
    country: "India",
    shortDescription: "Iconic hill resort surrounded by snow-capped peaks and pine forests.",
    description: "Nestled in the breathtaking Himalayas, featuring lush green valleys, rushing rivers, serene temples, and adventurous trekking trails.",
    destinationTypes: ["hill_station", "adventure"] as string[],
    latitude: 32.2432,
    longitude: 77.1892,
    bestMonths: "October, November, December, March, April, May, June",
    bestSeasonDescription: "Pleasant summer weather and snow-covered peaks in winter.",
    minDays: 3,
    maxDays: 5,
    byAir: "Nearest airport is Bhuntar Airport (KUU), approximately 50 km away.",
    byTrain: "Nearest broad-gauge railway station is Chandigarh / Kalka.",
    byRoad: "Well connected via NH-21 from Delhi and Chandigarh by Volvo and private cabs.",
    minBudget: 12000,
    maxBudget: 45000,
    coverImageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
    galleryImageUrls: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&q=80\nhttps://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    attractions: "Solang Valley - Famous for paragliding & snow activities\nRohtang Pass - High mountain pass with glaciers\nHadimba Temple - Ancient wooden temple in cedar forest\nOld Town Cafes - Vibrant boutique dining and music",
    activities: "Paragliding, River Rafting, Trekking, Skiing, Camping, Cafe Hopping",
    suitableFor: ["family", "couple", "friends", "adventure"] as string[],
    travelTips: "Carry warm woollens even in summer evenings.\nBook Rohtang Pass permits in advance.\nAlways hire registered local adventure instructors.",
    seoTitle: "Visit - Best Tour Packages & Travel Guide | Make Your Own Voyage",
    seoDescription: "Plan your trip with customized packages, luxury stays, and seamless transfers.",
    seoKeywords: "travel, holiday packages, hotel booking, tour guide",
    isPublished: true,
  });

  // Deep State Form State
  const [stateForm, setStateForm] = useState({
    name: "",
    slug: "",
    description: "A northern Indian state in the Himalayas, known for its dramatic mountain scenery, trekking, climbing, and skiing destinations.",
    imageUrl: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=1200&q=80",
    imageAlt: "State Landscape",
    isPublished: true,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [destRes, stateRes] = await Promise.allSettled([
        adminDestinationsApi.getAll(),
        adminStatesApi.getAll(),
      ]);

      if (destRes.status === "fulfilled" && destRes.value?.data) {
        setDestinations(Array.isArray(destRes.value.data) ? destRes.value.data : []);
      }
      if (stateRes.status === "fulfilled" && stateRes.value?.data) {
        setStates(Array.isArray(stateRes.value.data) ? stateRes.value.data : []);
      }
    } catch (err) {
      console.error("Error loading destinations and states:", err);
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
    setDestModalTab("basic");
    if (activeTab === "destinations") {
      setDestForm({
        name: "",
        slug: "",
        state: states[0]?._id || "",
        country: "India",
        shortDescription: "Iconic tourist destination with breathtaking vistas.",
        description: "Detailed overview of regional culture, nature, and highlights.",
        destinationTypes: ["hill_station"],
        latitude: 32.2432,
        longitude: 77.1892,
        bestMonths: "October to June",
        bestSeasonDescription: "Pleasant temperatures and seasonal snowfalls.",
        minDays: 3,
        maxDays: 5,
        byAir: "Nearest airport details...",
        byTrain: "Nearest railway hub...",
        byRoad: "National Highway route...",
        minBudget: 12000,
        maxBudget: 45000,
        coverImageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
        galleryImageUrls: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&q=80",
        attractions: "Top Viewpoint - Scenic panorama\nOld Heritage Point - Cultural site",
        activities: "Sightseeing, Trekking, Nature Photography, Food Walks",
        suitableFor: ["family", "couple", "friends"],
        travelTips: "Always keep identity proof handy.\nPre-book transfers in peak season.",
        seoTitle: "Tour Packages & Stays | Make Your Own Voyage",
        seoDescription: "Book verified holiday packages and boutique hotels.",
        seoKeywords: "destination travel, tours, hotels",
        isPublished: true,
      });
    } else {
      setStateForm({
        name: "",
        slug: "",
        description: "Explore the picturesque landscapes, cultural heritage, and pristine getaways.",
        imageUrl: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=1200&q=80",
        imageAlt: "State Panorama",
        isPublished: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setIsEditing(true);
    setCurrentId(item._id);
    setDestModalTab("basic");
    if (activeTab === "destinations") {
      const cover = item.images?.find((img: any) => img.type === "cover")?.url || item.coverImage || item.image || "";
      const gallery = item.images?.filter((img: any) => img.type !== "cover")?.map((img: any) => img.url).join("\n") || "";

      setDestForm({
        name: item.name || "",
        slug: item.slug || "",
        state: typeof item.state === "object" ? item.state?._id : item.state || "",
        country: item.country || "India",
        shortDescription: item.shortDescription || "",
        description: item.description || "",
        destinationTypes: Array.isArray(item.type) ? item.type : ["hill_station"],
        latitude: item.location?.latitude || 0,
        longitude: item.location?.longitude || 0,
        bestMonths: Array.isArray(item.bestTimeToVisit?.months) ? item.bestTimeToVisit.months.join(", ") : item.bestTimeToVisit || "",
        bestSeasonDescription: item.bestTimeToVisit?.description || "",
        minDays: item.recommendedDuration?.minDays || 3,
        maxDays: item.recommendedDuration?.maxDays || 5,
        byAir: item.howToReach?.byAir || "",
        byTrain: item.howToReach?.byTrain || "",
        byRoad: item.howToReach?.byRoad || "",
        minBudget: item.estimatedBudget?.min || 12000,
        maxBudget: item.estimatedBudget?.max || 45000,
        coverImageUrl: cover,
        galleryImageUrls: gallery,
        attractions: Array.isArray(item.attractions)
          ? item.attractions.map((a: any) => `${a.name} - ${a.description}`).join("\n")
          : "",
        activities: Array.isArray(item.activities)
          ? item.activities.map((act: any) => act.name || act).join(", ")
          : "",
        suitableFor: Array.isArray(item.suitableFor) ? item.suitableFor : ["family", "couple"],
        travelTips: Array.isArray(item.travelTips) ? item.travelTips.join("\n") : "",
        seoTitle: item.seo?.title || "",
        seoDescription: item.seo?.description || "",
        seoKeywords: Array.isArray(item.seo?.keywords) ? item.seo.keywords.join(", ") : "",
        isPublished: item.isPublished !== false,
      });
    } else {
      setStateForm({
        name: item.name || "",
        slug: item.slug || "",
        description: item.description || "",
        imageUrl: typeof item.image === "object" ? item.image?.url : item.image || "",
        imageAlt: typeof item.image === "object" ? item.image?.alt : "State Landscape",
        isPublished: item.isPublished !== false,
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      if (activeTab === "destinations") {
        await adminDestinationsApi.delete(id);
        setDestinations((prev) => prev.filter((d) => d._id !== id));
      } else {
        await adminStatesApi.delete(id);
        setStates((prev) => prev.filter((s) => s._id !== id));
      }
      showToast("success", `Deleted "${name}" successfully.`);
    } catch (err: any) {
      showToast("error", err.message || "Failed to delete item.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (activeTab === "destinations") {
        const attractionsParsed = destForm.attractions
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const parts = line.split("-");
            return {
              name: parts[0]?.trim() || "Attraction",
              description: parts[1]?.trim() || "",
            };
          });

        const activitiesParsed = destForm.activities
          .split(",")
          .map((act) => act.trim())
          .filter(Boolean)
          .map((name) => ({ name, description: "" }));

        const imagesArray: any[] = [];
        if (destForm.coverImageUrl) {
          imagesArray.push({ url: destForm.coverImageUrl, alt: destForm.name, type: "cover", order: 1 });
        }
        destForm.galleryImageUrls
          .split("\n")
          .map((url) => url.trim())
          .filter(Boolean)
          .forEach((url, i) => {
            imagesArray.push({ url, alt: `${destForm.name} ${i + 1}`, type: "gallery", order: i + 2 });
          });

        const payload = {
          name: destForm.name,
          slug: destForm.slug || destForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          state: destForm.state,
          country: destForm.country,
          shortDescription: destForm.shortDescription,
          description: destForm.description,
          type: destForm.destinationTypes,
          location: {
            latitude: Number(destForm.latitude),
            longitude: Number(destForm.longitude),
          },
          bestTimeToVisit: {
            months: destForm.bestMonths.split(",").map((m) => m.trim()).filter(Boolean),
            description: destForm.bestSeasonDescription,
          },
          recommendedDuration: {
            minDays: Number(destForm.minDays),
            maxDays: Number(destForm.maxDays),
          },
          howToReach: {
            byAir: destForm.byAir,
            byTrain: destForm.byTrain,
            byRoad: destForm.byRoad,
          },
          estimatedBudget: {
            min: Number(destForm.minBudget),
            max: Number(destForm.maxBudget),
            currency: "INR",
          },
          attractions: attractionsParsed,
          activities: activitiesParsed,
          suitableFor: destForm.suitableFor,
          travelTips: destForm.travelTips.split("\n").map((t) => t.trim()).filter(Boolean),
          images: imagesArray,
          coverImage: destForm.coverImageUrl,
          seo: {
            title: destForm.seoTitle,
            description: destForm.seoDescription,
            keywords: destForm.seoKeywords.split(",").map((k) => k.trim()).filter(Boolean),
          },
          isPublished: destForm.isPublished,
        };

        if (isEditing && currentId) {
          await adminDestinationsApi.update(currentId, payload);
          showToast("success", "Destination model updated with full specs!");
        } else {
          await adminDestinationsApi.create(payload);
          showToast("success", "New destination created with complete schema!");
        }
      } else {
        const payload = {
          name: stateForm.name,
          slug: stateForm.slug || stateForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          description: stateForm.description,
          image: {
            url: stateForm.imageUrl,
            alt: stateForm.imageAlt || stateForm.name,
          },
          isPublished: stateForm.isPublished,
        };

        if (isEditing && currentId) {
          await adminStatesApi.update(currentId, payload);
          showToast("success", "State updated with complete schema!");
        } else {
          await adminStatesApi.create(payload);
          showToast("success", "New state created!");
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

  const filteredDestinations = destinations.filter((d) =>
    d.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStates = states.filter((s) =>
    s.name?.toLowerCase().includes(searchQuery.toLowerCase())
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
            Destinations &amp; States Master Hub
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Complete database of tourist circuits, how-to-reach transport guides, attractions, suitable audiences, and regional SEO metadata.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#c49f27] transition flex items-center gap-1.5 shadow-md self-start sm:self-auto"
        >
          <MaterialIcon name="add" size={16} />
          <span>Add New {activeTab === "destinations" ? "Destination" : "State"}</span>
        </button>
      </div>

      {/* Tabs & Search Bar */}
      <div className="bg-[#0a1526] border border-gray-800 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex rounded-lg bg-[#070e17] p-1 border border-gray-800">
          <button
            onClick={() => setActiveTab("destinations")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${
              activeTab === "destinations"
                ? "bg-[#d4af37] text-black shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Destinations ({destinations.length})
          </button>
          <button
            onClick={() => setActiveTab("states")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${
              activeTab === "states"
                ? "bg-[#d4af37] text-black shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            States &amp; Regions ({states.length})
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

      {/* Table Content */}
      <div className="bg-[#0a1526] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === "destinations" ? (
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#070e17] text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                <tr>
                  <th className="p-3.5">Destination</th>
                  <th className="p-3.5">State</th>
                  <th className="p-3.5">Circuit Type</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Est. Budget</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      Loading destinations from backend database...
                    </td>
                  </tr>
                ) : filteredDestinations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      No destinations found. Click "Add New Destination" to register one.
                    </td>
                  </tr>
                ) : (
                  filteredDestinations.map((d) => {
                    const cover = d.images?.find((i: any) => i.type === "cover")?.url || d.coverImage || d.image || "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80";
                    return (
                      <tr key={d._id} className="hover:bg-gray-800/30 transition">
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={cover}
                              alt={d.name}
                              className="h-10 w-14 object-cover rounded border border-gray-700 shrink-0"
                            />
                            <div>
                              <div className="font-semibold text-white">{d.name}</div>
                              <div className="text-[11px] text-gray-400 font-mono">
                                /{d.slug}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 text-gray-300">
                          {typeof d.state === "object" ? d.state?.name : "State"}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-gray-800 text-gray-300 border border-gray-700 capitalize">
                            {Array.isArray(d.type) ? d.type.join(", ") : d.type || "hill_station"}
                          </span>
                        </td>
                        <td className="p-3.5 text-gray-300">
                          {d.recommendedDuration ? `${d.recommendedDuration.minDays}-${d.recommendedDuration.maxDays} Days` : d.idealDays || "3-4 Days"}
                        </td>
                        <td className="p-3.5 text-[#d4af37] font-semibold">
                          ₹{d.estimatedBudget?.min || 12000} - ₹{d.estimatedBudget?.max || 45000}
                        </td>
                        <td className="p-3.5">
                          {d.isPublished !== false ? (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                              Published
                            </span>
                          ) : (
                            <span className="text-gray-500 text-[11px]">Draft</span>
                          )}
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(d)}
                              className="p-1.5 rounded hover:bg-gray-800 text-gray-300 hover:text-white"
                            >
                              <MaterialIcon name="edit" size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(d._id, d.name)}
                              className="p-1.5 rounded hover:bg-rose-500/20 text-rose-400 hover:text-rose-300"
                            >
                              <MaterialIcon name="delete" size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#070e17] text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                <tr>
                  <th className="p-3.5">State / Region</th>
                  <th className="p-3.5">Description</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      Loading states...
                    </td>
                  </tr>
                ) : filteredStates.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      No states found. Click "Add New State" to register one.
                    </td>
                  </tr>
                ) : (
                  filteredStates.map((s) => (
                    <tr key={s._id} className="hover:bg-gray-800/30 transition">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={typeof s.image === "object" ? s.image?.url : s.image || "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&q=80"}
                            alt={s.name}
                            className="h-10 w-14 object-cover rounded border border-gray-700 shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-white">{s.name}</div>
                            <div className="text-[11px] text-gray-400 font-mono">
                              /{s.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 text-gray-300 max-w-md truncate">{s.description || "-"}</td>
                      <td className="p-3.5">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                          Published
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(s)}
                            className="p-1.5 rounded hover:bg-gray-800 text-gray-300 hover:text-white"
                          >
                            <MaterialIcon name="edit" size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(s._id, s.name)}
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

      {/* Comprehensive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e1b2e] border border-gray-700 rounded-xl max-w-3xl w-full p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 shrink-0">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MaterialIcon name="location_on" size={20} className="text-[#d4af37]" />
                <span>
                  {isEditing ? "Edit" : "Create"} {activeTab === "destinations" ? "Destination" : "State"}
                </span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <MaterialIcon name="close" size={20} />
              </button>
            </div>

            {activeTab === "destinations" && (
              <div className="flex rounded-lg bg-[#070e17] p-1 border border-gray-800 shrink-0 overflow-x-auto">
                {[
                  { id: "basic", label: "1. Core & Type", icon: "info" },
                  { id: "travel", label: "2. How to Reach & Seasons", icon: "directions" },
                  { id: "attractions", label: "3. Attractions & Activities", icon: "tour" },
                  { id: "seo", label: "4. SEO & Gallery", icon: "photo_library" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setDestModalTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition ${
                      destModalTab === tab.id
                        ? "bg-[#d4af37] text-black shadow"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <MaterialIcon name={tab.icon} size={15} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="overflow-y-auto pr-2 space-y-4 flex-1">
              {activeTab === "destinations" ? (
                <>
                  {destModalTab === "basic" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                            Destination Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={destForm.name}
                            onChange={(e) =>
                              setDestForm({
                                ...destForm,
                                name: e.target.value,
                                slug: isEditing
                                  ? destForm.slug
                                  : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                              })
                            }
                            placeholder="e.g. Manali, Shimla, Rishikesh"
                            className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                            Slug Key *
                          </label>
                          <input
                            type="text"
                            required
                            value={destForm.slug}
                            onChange={(e) => setDestForm({ ...destForm, slug: e.target.value })}
                            className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white font-mono outline-none focus:border-[#d4af37]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                            Parent State *
                          </label>
                          <select
                            required
                            value={destForm.state}
                            onChange={(e) => setDestForm({ ...destForm, state: e.target.value })}
                            className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          >
                            <option value="">Select State</option>
                            {states.map((s) => (
                              <option key={s._id} value={s._id}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                            Country
                          </label>
                          <input
                            type="text"
                            value={destForm.country}
                            onChange={(e) => setDestForm({ ...destForm, country: e.target.value })}
                            className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                            Coordinates (Lat / Long)
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="number"
                              step="any"
                              value={destForm.latitude}
                              onChange={(e) => setDestForm({ ...destForm, latitude: Number(e.target.value) })}
                              placeholder="Lat"
                              className="w-full bg-[#070e17] border border-gray-700 rounded p-2 text-xs text-white"
                            />
                            <input
                              type="number"
                              step="any"
                              value={destForm.longitude}
                              onChange={(e) => setDestForm({ ...destForm, longitude: Number(e.target.value) })}
                              placeholder="Long"
                              className="w-full bg-[#070e17] border border-gray-700 rounded p-2 text-xs text-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                          Short Catchy Tagline Description
                        </label>
                        <input
                          type="text"
                          value={destForm.shortDescription}
                          onChange={(e) => setDestForm({ ...destForm, shortDescription: e.target.value })}
                          className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                          Full Destination Overview &amp; Narrative
                        </label>
                        <textarea
                          rows={3}
                          value={destForm.description}
                          onChange={(e) => setDestForm({ ...destForm, description: e.target.value })}
                          className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                        />
                      </div>
                    </div>
                  )}

                  {destModalTab === "travel" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                            Best Visiting Months (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={destForm.bestMonths}
                            onChange={(e) => setDestForm({ ...destForm, bestMonths: e.target.value })}
                            placeholder="e.g. October, November, December, May, June"
                            className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                            Season Climate Overview
                          </label>
                          <input
                            type="text"
                            value={destForm.bestSeasonDescription}
                            onChange={(e) => setDestForm({ ...destForm, bestSeasonDescription: e.target.value })}
                            placeholder="e.g. Pleasant cool summer & snowfall in winter"
                            className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                            Min Days
                          </label>
                          <input
                            type="number"
                            value={destForm.minDays}
                            onChange={(e) => setDestForm({ ...destForm, minDays: Number(e.target.value) })}
                            className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                            Max Days
                          </label>
                          <input
                            type="number"
                            value={destForm.maxDays}
                            onChange={(e) => setDestForm({ ...destForm, maxDays: Number(e.target.value) })}
                            className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                            Min Budget (₹)
                          </label>
                          <input
                            type="number"
                            value={destForm.minBudget}
                            onChange={(e) => setDestForm({ ...destForm, minBudget: Number(e.target.value) })}
                            className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                            Max Budget (₹)
                          </label>
                          <input
                            type="number"
                            value={destForm.maxBudget}
                            onChange={(e) => setDestForm({ ...destForm, maxBudget: Number(e.target.value) })}
                            className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 bg-[#070e17] p-4 rounded-xl border border-gray-800">
                        <span className="text-xs font-bold text-white uppercase tracking-wider block">
                          How to Reach Guide
                        </span>
                        <div>
                          <label className="text-[10px] text-gray-400 block mb-1">By Air (Flight / Airport)</label>
                          <input
                            type="text"
                            value={destForm.byAir}
                            onChange={(e) => setDestForm({ ...destForm, byAir: e.target.value })}
                            className="w-full bg-[#0a1526] border border-gray-700 rounded p-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400 block mb-1">By Train (Railway Station)</label>
                          <input
                            type="text"
                            value={destForm.byTrain}
                            onChange={(e) => setDestForm({ ...destForm, byTrain: e.target.value })}
                            className="w-full bg-[#0a1526] border border-gray-700 rounded p-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400 block mb-1">By Road (Highways &amp; Buses)</label>
                          <input
                            type="text"
                            value={destForm.byRoad}
                            onChange={(e) => setDestForm({ ...destForm, byRoad: e.target.value })}
                            className="w-full bg-[#0a1526] border border-gray-700 rounded p-2 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {destModalTab === "attractions" && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                          Key Attractions (one per line, format: Spot Name - Description)
                        </label>
                        <textarea
                          rows={4}
                          value={destForm.attractions}
                          onChange={(e) => setDestForm({ ...destForm, attractions: e.target.value })}
                          className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                          Recommended Activities (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={destForm.activities}
                          onChange={(e) => setDestForm({ ...destForm, activities: e.target.value })}
                          className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                          Essential Travel Tips &amp; Advisory (one per line)
                        </label>
                        <textarea
                          rows={3}
                          value={destForm.travelTips}
                          onChange={(e) => setDestForm({ ...destForm, travelTips: e.target.value })}
                          className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                        />
                      </div>
                    </div>
                  )}

                  {/* TAB 4: MEDIA & SEO */}
                  {destModalTab === "seo" && (
                    <div className="space-y-4">
                      {/* Destination Cover Image */}
                      <SingleImageUploader
                        label="Destination Cover Image"
                        value={destForm.coverImageUrl}
                        onChange={(url) => setDestForm({ ...destForm, coverImageUrl: url })}
                        folder="destinations"
                        required={true}
                        helpText="Primary hero image representing this destination."
                      />

                      {/* Destination Gallery Images */}
                      <GalleryUploader
                        label="Destination Photo Gallery"
                        urlsText={destForm.galleryImageUrls}
                        onChange={(urls) => setDestForm({ ...destForm, galleryImageUrls: urls })}
                        folder="destinations"
                        helpText="Upload scenic spots, resorts, viewpoints, and cultural experiences."
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                            SEO Meta Title
                          </label>
                          <input
                            type="text"
                            value={destForm.seoTitle}
                            onChange={(e) => setDestForm({ ...destForm, seoTitle: e.target.value })}
                            className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                            SEO Meta Keywords
                          </label>
                          <input
                            type="text"
                            value={destForm.seoKeywords}
                            onChange={(e) => setDestForm({ ...destForm, seoKeywords: e.target.value })}
                            className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                          SEO Meta Description
                        </label>
                        <textarea
                          rows={2}
                          value={destForm.seoDescription}
                          onChange={(e) => setDestForm({ ...destForm, seoDescription: e.target.value })}
                          className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="checkbox"
                          id="isPublished"
                          checked={destForm.isPublished}
                          onChange={(e) => setDestForm({ ...destForm, isPublished: e.target.checked })}
                          className="rounded text-[#d4af37]"
                        />
                        <label htmlFor="isPublished" className="text-xs text-gray-200 font-medium">
                          Publish Destination immediately
                        </label>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* State Form */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        State / Region Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={stateForm.name}
                        onChange={(e) =>
                          setStateForm({
                            ...stateForm,
                            name: e.target.value,
                            slug: isEditing
                              ? stateForm.slug
                              : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                          })
                        }
                        placeholder="e.g. Himachal Pradesh, Rajasthan"
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Slug Key *
                      </label>
                      <input
                        type="text"
                        required
                        value={stateForm.slug}
                        onChange={(e) => setStateForm({ ...stateForm, slug: e.target.value })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white font-mono outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  {/* State Cover Image with Direct Cloudinary Upload */}
                  <SingleImageUploader
                    label="State Cover Image"
                    value={stateForm.imageUrl}
                    onChange={(url) => setStateForm({ ...stateForm, imageUrl: url })}
                    folder="states"
                    required={true}
                    helpText="Primary hero landscape for this state or province."
                  />

                  <div>
                    <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                      State Description &amp; Regional Overview
                    </label>
                    <textarea
                      rows={4}
                      value={stateForm.description}
                      onChange={(e) => setStateForm({ ...stateForm, description: e.target.value })}
                      className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="statePublished"
                      checked={stateForm.isPublished}
                      onChange={(e) => setStateForm({ ...stateForm, isPublished: e.target.checked })}
                      className="rounded text-[#d4af37]"
                    />
                    <label htmlFor="statePublished" className="text-xs text-gray-200 font-medium">
                      Publish State Circuit
                    </label>
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800 shrink-0">
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
                  className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#d4af37] text-black hover:bg-[#c49f27] transition flex items-center gap-1.5 shadow-md"
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
