"use client";

import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import {
  adminPackagesApi,
  adminDestinationsApi,
  adminHotelsApi,
  adminTransportsApi,
  adminTemplatesApi,
  adminUploadApi,
} from "@/lib/api/admin.api";

export const PACKAGE_CATEGORIES = [
  { key: "sea_beach", label: "Sea & Beach", icon: "beach_access", color: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30" },
  { key: "honeymoon", label: "Honeymoon & Couple", icon: "favorite", color: "bg-rose-500/10 text-rose-300 border-rose-500/30" },
  { key: "family", label: "Family Friendly", icon: "family_restroom", color: "bg-amber-500/10 text-amber-300 border-amber-500/30" },
  { key: "mountain_trips", label: "Mountain & Hills", icon: "terrain", color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" },
  { key: "trekking_tour", label: "Trekking & Hiking", icon: "hiking", color: "bg-green-500/10 text-green-300 border-green-500/30" },
  { key: "weekend_trips", label: "Weekend Trips", icon: "weekend", color: "bg-violet-500/10 text-violet-300 border-violet-500/30" },
  { key: "group_trips", label: "Group Trips", icon: "groups", color: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30" },
  { key: "adventure", label: "Adventure & Wildlife", icon: "explore", color: "bg-orange-500/10 text-orange-300 border-orange-500/30" },
  { key: "single_tour", label: "Solo / Single Tour", icon: "person", color: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30" },
  { key: "corporate", label: "Corporate & MICE", icon: "business_center", color: "bg-blue-500/10 text-blue-300 border-blue-500/30" },
  { key: "luxury", label: "Luxury & Premium", icon: "diamond", color: "bg-amber-400/10 text-amber-200 border-amber-400/30" },
  { key: "pilgrimage", label: "Pilgrimage / Spiritual", icon: "temple_hindu", color: "bg-yellow-600/10 text-yellow-200 border-yellow-600/30" },
  { key: "heritage", label: "Heritage & Culture", icon: "museum", color: "bg-stone-500/10 text-stone-300 border-stone-500/30" },
  { key: "road_trip", label: "Road Trips & Drives", icon: "directions_car", color: "bg-teal-500/10 text-teal-300 border-teal-500/30" },
];

export const PACKAGE_TYPES = PACKAGE_CATEGORIES;

interface Activity {
  time?: string;
  type?: string;
  title: string;
  description?: string;
  location?: string;
  duration?: string;
  image?: string;
}

interface Overnight {
  enabled: boolean;
  location?: string;
  hotelId?: string;
  checkIn?: string;
  roomType?: string;
  description?: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  description?: string;
  dayTransport?: string;
  activities: Activity[];
  overnight: Overnight;
}

interface PriceSlab {
  minPax: number;
  maxPax: number;
  pricePerPerson: number;
}

interface PackageFunction {
  name: string;
  type: string;
  day: number;
  timing?: string;
  duration?: string;
  venue?: string;
  capacity?: number;
  description?: string;
  isIncluded?: boolean;
  extraCost?: number;
}

export default function AdminTourPackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [transports, setTransports] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"general" | "pricing" | "itinerary" | "functions" | "facilities" | "media">("general");
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Deep Form State matching backend PackageSchema
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    destination: "",
    packageType: "sea_beach",
    categories: ["sea_beach", "family", "honeymoon"] as string[],
    region: "North India",
    days: 3,
    nights: 2,
    startingPrice: 15000,
    currency: "INR",
    minPax: 2,
    maxPax: 50,
    primaryHotel: "",
    primaryTransport: "",
    templateId: "",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    gallery: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80\nhttps://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    inclusions: "Luxury Stay with Daily Breakfast & Dinner\nPrivate AC Transport & Sightseeing Transfers\nDedicated 24/7 Tour Concierge Assistance\nAll Tolls, Parking & Driver Allowances",
    exclusions: "Flight / Train Tickets\nPersonal Expenses, Tips & Laundry\nAdventure Activity Tickets & Entry Permits\n5% GST",
    overview: "Embark on an extraordinary curated voyage featuring boutique accommodations, scenic transfers, and unforgettable experiences.",
    cancellationPolicy: "Free cancellation up to 14 days before trip. 50% retention within 7-14 days. Non-refundable within 7 days.",
    terms: "Valid photo ID required for check-in. Customizations available on request.",
    isFeatured: true,
    isActive: true,
    // Corporate Facilities
    conferenceHallIncluded: false,
    projectorAndAVSetup: false,
    djAndSoundSystem: false,
    teamBuildingFacilitator: false,
    stageAndBackdrop: false,
    // Package Functions / Events
    functions: [
      {
        name: "Welcome Dinner & Evening Reception",
        type: "gala_dinner",
        day: 1,
        timing: "07:30 PM - 10:30 PM",
        venue: "Poolside Lawn / Banquet Hall",
        capacity: 50,
        duration: "3 Hours",
        description: "Welcome cocktail drinks, barbecue buffet, ambient lighting and music.",
        isIncluded: true,
        extraCost: 0,
      },
    ] as PackageFunction[],
    // Price Slabs
    priceSlabs: [
      { minPax: 2, maxPax: 5, pricePerPerson: 18000 },
      { minPax: 6, maxPax: 15, pricePerPerson: 15000 },
      { minPax: 16, maxPax: 50, pricePerPerson: 12500 },
    ] as PriceSlab[],
    // Day-by-Day Itinerary
    itinerary: [
      {
        day: 1,
        title: "Arrival & Scenic Welcome",
        description: "Arrival at pickup point, private transfer to hotel, check-in and evening leisure at the promenade.",
        activities: [
          { time: "12:00 PM", type: "hotel_checkin", title: "Resort Check-In & Welcome Drink", duration: "1 Hour" },
          { time: "05:00 PM", type: "sightseeing", title: "Sunset Viewpoint & Local Market Stroll", duration: "2 Hours" },
        ],
        overnight: { enabled: true, location: "Hotel / Resort", checkIn: "12:00 PM", roomType: "Deluxe AC Room" },
      },
      {
        day: 2,
        title: "Full Day Guided Exploration & Excursion",
        description: "Breakfast at resort followed by excursion to top viewpoints, adventure valley, and cultural heritage spots.",
        activities: [
          { time: "09:00 AM", type: "sightseeing", title: "Guided Valley Tour & Heritage Point", duration: "4 Hours" },
          { time: "03:00 PM", type: "adventure", title: "Adventure Sports & Nature Walk", duration: "3 Hours" },
        ],
        overnight: { enabled: true, location: "Hotel / Resort", checkIn: "12:00 PM", roomType: "Deluxe AC Room" },
      },
      {
        day: 3,
        title: "Leisure Breakfast & Departure Transfer",
        description: "Buffet breakfast, checkout from resort, and private transfer back to airport/station with sweet memories.",
        activities: [
          { time: "09:00 AM", type: "breakfast", title: "Buffet Breakfast", duration: "1 Hour" },
          { time: "11:00 AM", type: "transfer", title: "Departure Transfer", duration: "2 Hours" },
        ],
        overnight: { enabled: false },
      },
    ] as ItineraryDay[],
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [pkgRes, destRes, hotelRes, transRes, tplRes] = await Promise.allSettled([
        adminPackagesApi.getAll({ limit: 100 }),
        adminDestinationsApi.getAll(),
        adminHotelsApi.getAll({ limit: 100 }),
        adminTransportsApi.getAll({ limit: 100 }),
        adminTemplatesApi.getAll(),
      ]);

      if (pkgRes.status === "fulfilled" && pkgRes.value?.data) {
        setPackages(Array.isArray(pkgRes.value.data) ? pkgRes.value.data : []);
      }
      if (destRes.status === "fulfilled" && destRes.value?.data) {
        setDestinations(Array.isArray(destRes.value.data) ? destRes.value.data : []);
      }
      if (hotelRes.status === "fulfilled" && hotelRes.value?.data) {
        setHotels(Array.isArray(hotelRes.value.data) ? hotelRes.value.data : []);
      }
      if (transRes.status === "fulfilled" && transRes.value?.data) {
        setTransports(Array.isArray(transRes.value.data) ? transRes.value.data : []);
      }
      if (tplRes.status === "fulfilled" && tplRes.value?.data) {
        setTemplates(Array.isArray(tplRes.value.data) ? tplRes.value.data : []);
      }
    } catch (err) {
      console.error("Error loading package data:", err);
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
    setModalTab("general");
    setFormData({
      title: "",
      slug: "",
      destination: destinations[0]?._id || "",
      packageType: "sea_beach",
      categories: ["sea_beach", "family", "honeymoon"],
      region: "North India",
      days: 3,
      nights: 2,
      startingPrice: 15000,
      currency: "INR",
      minPax: 2,
      maxPax: 50,
      primaryHotel: hotels[0]?._id || "",
      primaryTransport: transports[0]?._id || "",
      templateId: "",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      gallery: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80\nhttps://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
      inclusions: "Luxury Stay with Daily Breakfast & Dinner\nPrivate AC Transport & Sightseeing Transfers\nDedicated 24/7 Tour Concierge Assistance\nAll Tolls, Parking & Driver Allowances",
      exclusions: "Flight / Train Tickets\nPersonal Expenses, Tips & Laundry\nAdventure Activity Tickets & Entry Permits\n5% GST",
      overview: "Embark on an extraordinary curated voyage featuring boutique accommodations, scenic transfers, and unforgettable experiences.",
      cancellationPolicy: "Free cancellation up to 14 days before trip. 50% retention within 7-14 days.",
      terms: "Valid photo ID required for check-in. Customizations available on request.",
      isFeatured: true,
      isActive: true,
      conferenceHallIncluded: false,
      projectorAndAVSetup: false,
      djAndSoundSystem: false,
      teamBuildingFacilitator: false,
      stageAndBackdrop: false,
      functions: [
        {
          name: "Welcome Dinner & Evening Reception",
          type: "gala_dinner",
          day: 1,
          timing: "07:30 PM - 10:30 PM",
          venue: "Poolside Lawn / Main Banquet",
          capacity: 50,
          duration: "3 Hours",
          description: "Exclusive welcome banquet, buffet dining, live DJ and stage sound setup.",
          isIncluded: true,
          extraCost: 0,
        },
      ],
      priceSlabs: [
        { minPax: 2, maxPax: 5, pricePerPerson: 18000 },
        { minPax: 6, maxPax: 15, pricePerPerson: 15000 },
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival & Check-in",
          description: "Arrival at destination, private transfer to hotel and evening leisure.",
          activities: [
            { time: "12:00 PM", type: "hotel_checkin", title: "Resort Check-In & Welcome Drink", duration: "1 Hour" },
          ],
          overnight: { enabled: true, location: "Hotel / Resort", checkIn: "12:00 PM", roomType: "Deluxe AC Room" },
        },
      ],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pkg: any) => {
    setIsEditing(true);
    setCurrentId(pkg._id);
    setModalTab("general");
    setFormData({
      title: pkg.title || "",
      slug: pkg.slug || "",
      destination: typeof pkg.destination === "object" ? pkg.destination?._id : pkg.destination || "",
      packageType: pkg.packageType || "sea_beach",
      categories: Array.isArray(pkg.categories) && pkg.categories.length > 0
        ? pkg.categories
        : (pkg.packageType ? [pkg.packageType] : ["sea_beach"]),
      region: pkg.region || "North India",
      days: pkg.days || pkg.duration?.days || 3,
      nights: pkg.nights !== undefined ? pkg.nights : 2,
      startingPrice: pkg.startingPrice || pkg.pricing?.startingPrice || 15000,
      currency: pkg.currency || "INR",
      minPax: pkg.minPax || 2,
      maxPax: pkg.maxPax || 50,
      primaryHotel: typeof pkg.primaryHotel === "object" ? pkg.primaryHotel?._id : pkg.primaryHotel || "",
      primaryTransport: typeof pkg.primaryTransport === "object" ? pkg.primaryTransport?._id : pkg.primaryTransport || "",
      templateId: typeof pkg.sourceTemplate === "object" ? pkg.sourceTemplate?._id : pkg.sourceTemplate || "",
      image: pkg.image || "",
      gallery: Array.isArray(pkg.gallery) ? pkg.gallery.join("\n") : "",
      inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions.join("\n") : "",
      exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions.join("\n") : "",
      overview: pkg.overview || pkg.description || "",
      cancellationPolicy: pkg.policies?.cancellation || "",
      terms: pkg.policies?.terms || "",
      isFeatured: !!pkg.isFeatured,
      isActive: pkg.isActive !== false,
      conferenceHallIncluded: !!pkg.corporateFacilities?.conferenceHallIncluded,
      projectorAndAVSetup: !!pkg.corporateFacilities?.projectorAndAVSetup,
      djAndSoundSystem: !!pkg.corporateFacilities?.djAndSoundSystem,
      teamBuildingFacilitator: !!pkg.corporateFacilities?.teamBuildingFacilitator,
      stageAndBackdrop: !!pkg.corporateFacilities?.stageAndBackdrop,
      functions: Array.isArray(pkg.functions) && pkg.functions.length > 0 ? pkg.functions : [
        {
          name: "Welcome Dinner & Evening Reception",
          type: "gala_dinner",
          day: 1,
          timing: "07:30 PM - 10:30 PM",
          venue: "Poolside Lawn / Banquet Hall",
          capacity: 50,
          duration: "3 Hours",
          description: "Exclusive welcome dinner, buffet cuisine, music and lighting.",
          isIncluded: true,
          extraCost: 0,
        },
      ],
      priceSlabs: Array.isArray(pkg.priceSlabs) && pkg.priceSlabs.length > 0 ? pkg.priceSlabs : [{ minPax: 2, maxPax: 10, pricePerPerson: 15000 }],
      itinerary: Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0 ? pkg.itinerary : [
        {
          day: 1,
          title: "Day 1 Itinerary",
          description: "Explore the destination",
          activities: [{ time: "12:00 PM", type: "sightseeing", title: "Sightseeing", duration: "2 Hours" }],
          overnight: { enabled: true, location: "Hotel" },
        },
      ],
    });
    setIsModalOpen(true);
  };

  const handleUploadCoverFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingCover(true);
      const res = await adminUploadApi.uploadImage(file, "packages");
      const url = res?.data?.secure_url || res?.data?.url || res?.url;
      if (url) {
        setFormData((prev) => ({ ...prev, image: url }));
        showToast("success", "Cover image uploaded successfully to Cloudinary!");
      }
    } catch (err: any) {
      showToast("error", err.message || "Failed to upload image to Cloudinary");
    } finally {
      setUploadingCover(false);
      e.target.value = "";
    }
  };

  const handleUploadGalleryFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setUploadingGallery(true);
      const res = await adminUploadApi.uploadMultiple(files, "packages");
      const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
      const newUrls = list.map((item: any) => item.secure_url || item.url).filter(Boolean);
      if (newUrls.length > 0) {
        setFormData((prev) => {
          const currentUrls = prev.gallery ? prev.gallery.split("\n").map((s) => s.trim()).filter(Boolean) : [];
          const combined = [...currentUrls, ...newUrls];
          return { ...prev, gallery: combined.join("\n") };
        });
        showToast("success", `${newUrls.length} gallery image(s) uploaded to Cloudinary!`);
      }
    } catch (err: any) {
      showToast("error", err.message || "Failed to upload gallery images to Cloudinary");
    } finally {
      setUploadingGallery(false);
      e.target.value = "";
    }
  };

  const handleAddFunction = () => {
    setFormData({
      ...formData,
      functions: [
        ...formData.functions,
        {
          name: `Function / Event ${formData.functions.length + 1}`,
          type: "conference",
          day: 1,
          timing: "10:00 AM - 01:00 PM",
          venue: "Conference Room / Banquet",
          capacity: 50,
          duration: "3 Hours",
          description: "Audio-visual projector setup, seating, tea/coffee service.",
          isIncluded: true,
          extraCost: 0,
        },
      ],
    });
  };

  const handleRemoveFunction = (index: number) => {
    setFormData({
      ...formData,
      functions: formData.functions.filter((_, i) => i !== index),
    });
  };

  const handleAddDay = () => {
    const nextDay = formData.itinerary.length + 1;
    setFormData({
      ...formData,
      days: nextDay,
      itinerary: [
        ...formData.itinerary,
        {
          day: nextDay,
          title: `Day ${nextDay} - Exploration & Sightseeing`,
          description: "Full day of curated sightseeing and travel.",
          activities: [
            { time: "09:00 AM", type: "sightseeing", title: "Morning Sightseeing", duration: "3 Hours" },
          ],
          overnight: { enabled: true, location: "Hotel / Resort", checkIn: "12:00 PM", roomType: "Deluxe AC Room" },
        },
      ],
    });
  };

  const handleRemoveDay = (index: number) => {
    if (formData.itinerary.length <= 1) return;
    const updated = formData.itinerary.filter((_, i) => i !== index).map((d, idx) => ({ ...d, day: idx + 1 }));
    setFormData({
      ...formData,
      days: updated.length,
      itinerary: updated,
    });
  };

  const handleAddSlab = () => {
    setFormData({
      ...formData,
      priceSlabs: [...formData.priceSlabs, { minPax: 20, maxPax: 50, pricePerPerson: 12000 }],
    });
  };

  const handleRemoveSlab = (index: number) => {
    setFormData({
      ...formData,
      priceSlabs: formData.priceSlabs.filter((_, i) => i !== index),
    });
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await adminPackagesApi.delete(id);
      showToast("success", `Package "${title}" deleted.`);
      setPackages((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      showToast("error", err.message || "Failed to delete package.");
    }
  };

  const handleToggleCategory = (catKey: string) => {
    const currentCats = [...(formData.categories || [])];
    const exists = currentCats.includes(catKey);
    let updated: string[];

    if (exists) {
      if (currentCats.length === 1) {
        showToast("error", "At least one category must be selected.");
        return;
      }
      updated = currentCats.filter((k) => k !== catKey);
    } else {
      updated = [...currentCats, catKey];
    }

    setFormData({
      ...formData,
      categories: updated,
      packageType: updated[0] || "sea_beach",
    });
  };

  const handleApplyCategoryPreset = (cats: string[]) => {
    setFormData({
      ...formData,
      categories: cats,
      packageType: cats[0] || "sea_beach",
    });
    showToast("success", `Applied category preset (${cats.length} selected)`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const categoriesList = formData.categories && formData.categories.length > 0
      ? formData.categories
      : [formData.packageType || "sea_beach"];

    const payload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      destination: formData.destination,
      packageType: categoriesList[0],
      categories: categoriesList,
      region: formData.region,
      days: Number(formData.days),
      nights: Number(formData.nights),
      duration: `${formData.days} Days / ${formData.nights} Nights`,
      startingPrice: Number(formData.startingPrice),
      currency: formData.currency,
      minPax: Number(formData.minPax),
      maxPax: Number(formData.maxPax),
      primaryHotel: formData.primaryHotel || undefined,
      primaryTransport: formData.primaryTransport || undefined,
      sourceTemplate: formData.templateId || undefined,
      templateId: formData.templateId || undefined,
      image: formData.image,
      gallery: formData.gallery.split("\n").map((s) => s.trim()).filter(Boolean),
      inclusions: formData.inclusions.split("\n").map((s) => s.trim()).filter(Boolean),
      exclusions: formData.exclusions.split("\n").map((s) => s.trim()).filter(Boolean),
      overview: formData.overview,
      corporateFacilities: {
        conferenceHallIncluded: formData.conferenceHallIncluded,
        projectorAndAVSetup: formData.projectorAndAVSetup,
        djAndSoundSystem: formData.djAndSoundSystem,
        teamBuildingFacilitator: formData.teamBuildingFacilitator,
        stageAndBackdrop: formData.stageAndBackdrop,
      },
      functions: formData.functions.map((fn) => ({
        name: fn.name,
        type: fn.type,
        day: Number(fn.day) || 1,
        timing: fn.timing || "",
        duration: fn.duration || "",
        venue: fn.venue || "",
        capacity: Number(fn.capacity) || 0,
        description: fn.description || "",
        isIncluded: fn.isIncluded !== false,
        extraCost: Number(fn.extraCost) || 0,
      })),
      priceSlabs: formData.priceSlabs.map((s) => ({
        minPax: Number(s.minPax),
        maxPax: Number(s.maxPax),
        pricePerPerson: Number(s.pricePerPerson),
      })),
      customItinerary: formData.itinerary,
      itinerary: formData.itinerary,
      policies: {
        cancellation: formData.cancellationPolicy,
        terms: formData.terms,
      },
      isFeatured: formData.isFeatured,
      isActive: formData.isActive,
    };

    try {
      if (isEditing && currentId) {
        await adminPackagesApi.update(currentId, payload);
        showToast("success", "Package updated with all itinerary and pricing models!");
      } else {
        await adminPackagesApi.create(payload);
        showToast("success", "New package created with full schema details!");
      }
      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      showToast("error", err.message || "Operation failed. Please verify auth token.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPackages = packages.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === "all" ||
      p.packageType === selectedType ||
      (Array.isArray(p.categories) && p.categories.includes(selectedType));
    return matchesSearch && matchesType;
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
            Tour Packages Enterprise Manager
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Complete management for multi-day itineraries, B2B price slabs, MICE corporate facilities, and master hotel/transport links.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#c49f27] transition flex items-center gap-1.5 shadow-md self-start sm:self-auto"
        >
          <MaterialIcon name="add" size={16} />
          <span>Create Enterprise Package</span>
        </button>
      </div>

      {/* Controls Bar */}
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
            placeholder="Search by package title, slug, region..."
            className="w-full bg-[#070e17] border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-[#070e17] border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 outline-none focus:border-[#d4af37]"
          >
            <option value="all">All Package Types</option>
            {PACKAGE_TYPES.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>

          <button
            onClick={loadData}
            className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:text-white"
            title="Refresh"
          >
            <MaterialIcon name="refresh" size={16} />
          </button>
        </div>
      </div>

      {/* Packages Table */}
      <div className="bg-[#0a1526] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#070e17] text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
              <tr>
                <th className="p-3.5">Package Details</th>
                <th className="p-3.5">Destination &amp; Region</th>
                <th className="p-3.5">Duration</th>
                <th className="p-3.5">Starting Rate</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    Loading package inventory from backend...
                  </td>
                </tr>
              ) : filteredPackages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No packages found. Click "Create Enterprise Package" to create one.
                  </td>
                </tr>
              ) : (
                filteredPackages.map((pkg) => (
                  <tr key={pkg._id} className="hover:bg-gray-800/30 transition">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={pkg.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"}
                          alt={pkg.title}
                          className="h-11 w-16 object-cover rounded border border-gray-700 shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-white">{pkg.title}</div>
                          <div className="text-[11px] text-gray-400 font-mono">
                            /{pkg.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-gray-300">
                      <div>{typeof pkg.destination === "object" ? pkg.destination?.name : "Destination"}</div>
                      <div className="text-[10px] text-gray-400">{pkg.region || "India"}</div>
                    </td>
                    <td className="p-3.5 text-gray-300">
                      {pkg.days || 3}D / {pkg.nights !== undefined ? pkg.nights : 2}N
                    </td>
                    <td className="p-3.5">
                      <span className="text-[#d4af37] font-bold">
                        ₹{pkg.startingPrice || pkg.pricing?.startingPrice || 0}
                      </span>
                      <span className="text-[10px] text-gray-500 block">/ person</span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {Array.isArray(pkg.categories) && pkg.categories.length > 0 ? (
                          pkg.categories.map((cKey: string) => {
                            const cat = PACKAGE_CATEGORIES.find((t) => t.key === cKey);
                            return (
                              <span
                                key={cKey}
                                className={`px-2 py-0.5 rounded-md text-[10px] border font-medium flex items-center gap-1 ${
                                  cat?.color || "bg-amber-500/10 text-amber-300 border-amber-500/20"
                                }`}
                              >
                                <MaterialIcon name={cat?.icon || "sell"} size={11} />
                                <span>{cat?.label || cKey}</span>
                              </span>
                            );
                          })
                        ) : (
                          <span className="px-2 py-0.5 rounded-md text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                            {PACKAGE_CATEGORIES.find((t) => t.key === pkg.packageType)?.label || pkg.packageType || "Sea Beach"}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5">
                      {pkg.isFeatured ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                          Featured
                        </span>
                      ) : (
                        <span className="text-gray-500 text-[11px]">Standard</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(pkg)}
                          className="p-1.5 rounded hover:bg-gray-800 text-gray-300 hover:text-white transition"
                          title="Edit Package"
                        >
                          <MaterialIcon name="edit" size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg._id, pkg.title)}
                          className="p-1.5 rounded hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition"
                          title="Delete Package"
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

      {/* Full Multi-Tab Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e1b2e] border border-gray-700 rounded-xl max-w-4xl w-full p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 shrink-0">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MaterialIcon name="travel_explore" size={20} className="text-[#d4af37]" />
                <span>{isEditing ? "Edit Enterprise Package" : "Create Enterprise Package"}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <MaterialIcon name="close" size={20} />
              </button>
            </div>

            {/* Modal Tabs Header */}
            <div className="flex rounded-lg bg-[#070e17] p-1 border border-gray-800 shrink-0 overflow-x-auto">
              {[
                { id: "general", label: "1. Core & Destination", icon: "info" },
                { id: "pricing", label: "2. Pricing & Slabs", icon: "payments" },
                { id: "itinerary", label: "3. Day-by-Day Itinerary", icon: "calendar_month" },
                { id: "functions", label: "4. Package Functions & Events", icon: "celebration" },
                { id: "facilities", label: "5. MICE & Policies", icon: "corporate_fare" },
                { id: "media", label: "6. Media & Highlights", icon: "photo_library" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setModalTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition ${
                    modalTab === tab.id
                      ? "bg-[#d4af37] text-black shadow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <MaterialIcon name={tab.icon} size={15} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="overflow-y-auto pr-2 space-y-4 flex-1">
              {modalTab === "general" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Package Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            title: e.target.value,
                            slug: isEditing
                              ? formData.slug
                              : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                          })
                        }
                        placeholder="e.g. Royal Rajasthan Heritage & Dunes Circuit"
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
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white font-mono outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  {/* Multi-Category Selector Section */}
                  <div className="bg-[#070e17] border border-gray-800 rounded-xl p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <label className="text-xs font-bold text-white flex items-center gap-1.5">
                          <MaterialIcon name="category" size={16} className="text-[#d4af37]" />
                          <span>Package Categories &amp; Travel Themes (Choose Multiple) *</span>
                        </label>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          A single package can match multiple traveler themes (e.g. Family Friendly + Honeymoon + Sea Beach).
                        </p>
                      </div>

                      <div className="text-[11px] font-semibold text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded-full border border-[#d4af37]/30 self-start sm:self-auto">
                        {formData.categories?.length || 0} Categories Selected
                      </div>
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] text-gray-500 uppercase font-semibold self-center mr-1">
                        Quick Presets:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleApplyCategoryPreset(["family", "honeymoon", "sea_beach"])}
                        className="px-2.5 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-[11px] text-gray-200 border border-gray-700 transition"
                      >
                        🏖️ Family &amp; Honeymoon Beach
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyCategoryPreset(["mountain_trips", "trekking_tour", "adventure"])}
                        className="px-2.5 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-[11px] text-gray-200 border border-gray-700 transition"
                      >
                        ⛰️ Mountain &amp; Trekking Adventure
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyCategoryPreset(["weekend_trips", "group_trips", "road_trip"])}
                        className="px-2.5 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-[11px] text-gray-200 border border-gray-700 transition"
                      >
                        🚗 Weekend Group Road Trip
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyCategoryPreset(["corporate", "luxury", "group_trips"])}
                        className="px-2.5 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-[11px] text-gray-200 border border-gray-700 transition"
                      >
                        👔 Corporate &amp; Luxury MICE
                      </button>
                    </div>

                    {/* Interactive Category Chips Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-2">
                      {PACKAGE_CATEGORIES.map((cat) => {
                        const isSelected = formData.categories?.includes(cat.key);
                        const isPrimary = formData.categories?.[0] === cat.key;
                        return (
                          <button
                            key={cat.key}
                            type="button"
                            onClick={() => handleToggleCategory(cat.key)}
                            className={`p-2.5 rounded-lg border text-left transition flex items-center justify-between gap-2 ${
                              isSelected
                                ? "bg-[#d4af37]/15 border-[#d4af37] text-white shadow-sm"
                                : "bg-[#0a1526] border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div
                                className={`p-1 rounded ${
                                  isSelected ? "bg-[#d4af37] text-black" : "bg-gray-800 text-gray-400"
                                }`}
                              >
                                <MaterialIcon name={cat.icon} size={15} />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-semibold block truncate leading-tight">
                                  {cat.label}
                                </span>
                                {isPrimary && (
                                  <span className="text-[9px] text-[#d4af37] font-mono uppercase font-bold">
                                    Primary
                                  </span>
                                )}
                              </div>
                            </div>

                            <div
                              className={`h-4 w-4 rounded flex items-center justify-center shrink-0 border ${
                                isSelected
                                  ? "bg-[#d4af37] border-[#d4af37] text-black"
                                  : "border-gray-700 bg-gray-900"
                              }`}
                            >
                              {isSelected && <MaterialIcon name="check" size={12} />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Target Destination *
                      </label>
                      <select
                        required
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      >
                        <option value="">Select Target Destination</option>
                        {destinations.map((d) => (
                          <option key={d._id} value={d._id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Region &amp; Circuit
                      </label>
                      <input
                        type="text"
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        placeholder="e.g. Himachal, Uttarakhand, Rajasthan, Goa Coast"
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Duration (Days)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={formData.days}
                        onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Duration (Nights)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={formData.nights}
                        onChange={(e) => setFormData({ ...formData, nights: Number(e.target.value) })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Clone Itinerary Template (Optional)
                      </label>
                      <select
                        value={formData.templateId}
                        onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      >
                        <option value="">No Template (Custom)</option>
                        {templates.map((tpl) => (
                          <option key={tpl._id} value={tpl._id}>
                            {tpl.title} ({tpl.days}D/{tpl.nights}N)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Primary Partner Hotel (Default Stay)
                      </label>
                      <select
                        value={formData.primaryHotel}
                        onChange={(e) => setFormData({ ...formData, primaryHotel: e.target.value })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      >
                        <option value="">Select Hotel</option>
                        {hotels.map((h) => (
                          <option key={h._id} value={h._id}>
                            {h.name} ({h.address?.city || "Stay"})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Primary Transport Vehicle (Fleet)
                      </label>
                      <select
                        value={formData.primaryTransport}
                        onChange={(e) => setFormData({ ...formData, primaryTransport: e.target.value })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      >
                        <option value="">Select Fleet Vehicle</option>
                        {transports.map((t) => (
                          <option key={t._id} value={t._id}>
                            {t.vehicleName || t.title} ({t.category})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {modalTab === "pricing" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Base Starting Price (₹) *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.startingPrice}
                        onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Currency
                      </label>
                      <input
                        type="text"
                        value={formData.currency}
                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Min Group Size (Pax)
                      </label>
                      <input
                        type="number"
                        value={formData.minPax}
                        onChange={(e) => setFormData({ ...formData, minPax: Number(e.target.value) })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Max Group Size (Pax)
                      </label>
                      <input
                        type="number"
                        value={formData.maxPax}
                        onChange={(e) => setFormData({ ...formData, maxPax: Number(e.target.value) })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  {/* B2B Dynamic Price Slabs */}
                  <div className="bg-[#070e17] border border-gray-800 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <MaterialIcon name="table_chart" size={16} className="text-[#d4af37]" />
                        <span>B2B / Group Dynamic Price Slabs</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleAddSlab}
                        className="px-2.5 py-1 rounded bg-[#d4af37] text-black font-semibold text-[11px] hover:bg-[#c49f27]"
                      >
                        + Add Slab
                      </button>
                    </div>

                    <div className="space-y-2">
                      {formData.priceSlabs.map((slab, sIdx) => (
                        <div key={sIdx} className="grid grid-cols-12 gap-2 items-center bg-[#0a1526] p-2.5 rounded border border-gray-800">
                          <div className="col-span-3">
                            <span className="text-[10px] text-gray-400 block">Min Pax</span>
                            <input
                              type="number"
                              value={slab.minPax}
                              onChange={(e) => {
                                const copy = [...formData.priceSlabs];
                                copy[sIdx].minPax = Number(e.target.value);
                                setFormData({ ...formData, priceSlabs: copy });
                              }}
                              className="w-full bg-[#070e17] border border-gray-700 rounded p-1.5 text-xs text-white"
                            />
                          </div>
                          <div className="col-span-3">
                            <span className="text-[10px] text-gray-400 block">Max Pax</span>
                            <input
                              type="number"
                              value={slab.maxPax}
                              onChange={(e) => {
                                const copy = [...formData.priceSlabs];
                                copy[sIdx].maxPax = Number(e.target.value);
                                setFormData({ ...formData, priceSlabs: copy });
                              }}
                              className="w-full bg-[#070e17] border border-gray-700 rounded p-1.5 text-xs text-white"
                            />
                          </div>
                          <div className="col-span-5">
                            <span className="text-[10px] text-gray-400 block">Rate / Person (₹)</span>
                            <input
                              type="number"
                              value={slab.pricePerPerson}
                              onChange={(e) => {
                                const copy = [...formData.priceSlabs];
                                copy[sIdx].pricePerPerson = Number(e.target.value);
                                setFormData({ ...formData, priceSlabs: copy });
                              }}
                              className="w-full bg-[#070e17] border border-gray-700 rounded p-1.5 text-xs text-[#d4af37] font-bold"
                            />
                          </div>
                          <div className="col-span-1 text-right pt-4">
                            <button
                              type="button"
                              onClick={() => handleRemoveSlab(sIdx)}
                              className="text-rose-400 hover:text-rose-300"
                            >
                              <MaterialIcon name="delete" size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalTab === "itinerary" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">
                      Build full day-by-day plan with timings, activities, and hotel stays.
                    </span>
                    <button
                      type="button"
                      onClick={handleAddDay}
                      className="px-3 py-1.5 rounded bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#c49f27] flex items-center gap-1"
                    >
                      <MaterialIcon name="add" size={14} />
                      <span>Add Day {formData.itinerary.length + 1}</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.itinerary.map((dayItem, dIdx) => (
                      <div key={dIdx} className="bg-[#070e17] border border-gray-800 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                          <span className="font-bold text-[#d4af37] text-sm">
                            Day {dayItem.day}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveDay(dIdx)}
                            className="text-xs text-rose-400 hover:underline flex items-center gap-1"
                          >
                            <MaterialIcon name="delete" size={14} />
                            <span>Remove Day</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] text-gray-400 uppercase block mb-1">
                              Day Title
                            </label>
                            <input
                              type="text"
                              value={dayItem.title}
                              onChange={(e) => {
                                const copy = [...formData.itinerary];
                                copy[dIdx].title = e.target.value;
                                setFormData({ ...formData, itinerary: copy });
                              }}
                              className="w-full bg-[#0a1526] border border-gray-700 rounded p-2 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-gray-400 uppercase block mb-1">
                              Day Summary Description
                            </label>
                            <input
                              type="text"
                              value={dayItem.description}
                              onChange={(e) => {
                                const copy = [...formData.itinerary];
                                copy[dIdx].description = e.target.value;
                                setFormData({ ...formData, itinerary: copy });
                              }}
                              className="w-full bg-[#0a1526] border border-gray-700 rounded p-2 text-xs text-white"
                            />
                          </div>
                        </div>

                        {/* Activities for this day */}
                        <div className="bg-[#0a1526] p-3 rounded-lg space-y-2 border border-gray-800">
                          <span className="text-[11px] font-bold text-gray-300 block">Activities &amp; Sightseeing</span>
                          {dayItem.activities?.map((act, aIdx) => (
                            <div key={aIdx} className="grid grid-cols-12 gap-2 items-center bg-[#070e17] p-2 rounded">
                              <input
                                type="text"
                                placeholder="09:00 AM"
                                value={act.time}
                                onChange={(e) => {
                                  const copy = [...formData.itinerary];
                                  copy[dIdx].activities[aIdx].time = e.target.value;
                                  setFormData({ ...formData, itinerary: copy });
                                }}
                                className="col-span-3 bg-transparent border border-gray-700 rounded p-1 text-[11px] text-white"
                              />
                              <input
                                type="text"
                                placeholder="Activity Title"
                                value={act.title}
                                onChange={(e) => {
                                  const copy = [...formData.itinerary];
                                  copy[dIdx].activities[aIdx].title = e.target.value;
                                  setFormData({ ...formData, itinerary: copy });
                                }}
                                className="col-span-8 bg-transparent border border-gray-700 rounded p-1 text-[11px] text-white"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const copy = [...formData.itinerary];
                                  copy[dIdx].activities = copy[dIdx].activities.filter((_, i) => i !== aIdx);
                                  setFormData({ ...formData, itinerary: copy });
                                }}
                                className="col-span-1 text-rose-400"
                              >
                                <MaterialIcon name="close" size={14} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const copy = [...formData.itinerary];
                              copy[dIdx].activities = [
                                ...(copy[dIdx].activities || []),
                                { time: "02:00 PM", type: "sightseeing", title: "New Activity", duration: "2 Hours" },
                              ];
                              setFormData({ ...formData, itinerary: copy });
                            }}
                            className="text-[11px] text-[#d4af37] hover:underline"
                          >
                            + Add Activity
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalTab === "functions" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Package Functions & Special Events
                      </span>
                      <span className="text-[11px] text-gray-400">
                        Add and configure multiple corporate, wedding, gala dinner, cocktail or theme functions for this package.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddFunction}
                      className="px-3 py-1.5 rounded bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#c49f27] flex items-center gap-1 cursor-pointer shadow"
                    >
                      <MaterialIcon name="add" size={14} />
                      <span>Add Function / Event</span>
                    </button>
                  </div>

                  {formData.functions.length === 0 ? (
                    <div className="bg-[#070e17] border border-gray-800 rounded-xl p-6 text-center text-gray-400 text-xs space-y-2">
                      <p>No functions configured for this package yet.</p>
                      <button
                        type="button"
                        onClick={handleAddFunction}
                        className="text-[#d4af37] hover:underline font-semibold"
                      >
                        + Click here to add a function
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {formData.functions.map((fn, fIdx) => (
                        <div key={fIdx} className="bg-[#070e17] border border-gray-800 rounded-xl p-4 space-y-3">
                          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                            <span className="font-bold text-[#d4af37] text-xs flex items-center gap-1.5">
                              <MaterialIcon name="celebration" size={16} />
                              <span>Function {fIdx + 1}: {fn.name || "Untitled Function"}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFunction(fIdx)}
                              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                            >
                              <MaterialIcon name="delete" size={14} />
                              <span>Remove</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="text-[10px] text-gray-400 uppercase block mb-1">Function Name *</label>
                              <input
                                type="text"
                                required
                                value={fn.name}
                                onChange={(e) => {
                                  const copy = [...formData.functions];
                                  copy[fIdx].name = e.target.value;
                                  setFormData({ ...formData, functions: copy });
                                }}
                                placeholder="e.g. Grand Gala Dinner & DJ Night"
                                className="w-full bg-[#0a1526] border border-gray-700 rounded p-2 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] text-gray-400 uppercase block mb-1">Function Type</label>
                              <select
                                value={fn.type}
                                onChange={(e) => {
                                  const copy = [...formData.functions];
                                  copy[fIdx].type = e.target.value;
                                  setFormData({ ...formData, functions: copy });
                                }}
                                className="w-full bg-[#0a1526] border border-gray-700 rounded p-2 text-xs text-white"
                              >
                                <option value="conference">Conference / Meeting</option>
                                <option value="gala_dinner">Gala Dinner</option>
                                <option value="cocktail_night">Cocktail Night</option>
                                <option value="award_ceremony">Award Ceremony</option>
                                <option value="team_building">Team Building</option>
                                <option value="welcome_reception">Welcome Reception</option>
                                <option value="pool_party">Pool Party</option>
                                <option value="theme_night">Theme Night</option>
                                <option value="product_launch">Product Launch</option>
                                <option value="workshop">Workshop</option>
                                <option value="cultural_night">Cultural Night</option>
                                <option value="sightseeing_tour">Sightseeing Tour</option>
                                <option value="custom_event">Custom Event</option>
                                <option value="other">Other</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-[10px] text-gray-400 uppercase block mb-1">Scheduled Day</label>
                              <input
                                type="number"
                                min={1}
                                value={fn.day}
                                onChange={(e) => {
                                  const copy = [...formData.functions];
                                  copy[fIdx].day = Number(e.target.value);
                                  setFormData({ ...formData, functions: copy });
                                }}
                                className="w-full bg-[#0a1526] border border-gray-700 rounded p-2 text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                            <div>
                              <label className="text-[10px] text-gray-400 uppercase block mb-1">Timing</label>
                              <input
                                type="text"
                                value={fn.timing}
                                onChange={(e) => {
                                  const copy = [...formData.functions];
                                  copy[fIdx].timing = e.target.value;
                                  setFormData({ ...formData, functions: copy });
                                }}
                                placeholder="07:00 PM - 11:00 PM"
                                className="w-full bg-[#0a1526] border border-gray-700 rounded p-2 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] text-gray-400 uppercase block mb-1">Duration</label>
                              <input
                                type="text"
                                value={fn.duration}
                                onChange={(e) => {
                                  const copy = [...formData.functions];
                                  copy[fIdx].duration = e.target.value;
                                  setFormData({ ...formData, functions: copy });
                                }}
                                placeholder="3 Hours"
                                className="w-full bg-[#0a1526] border border-gray-700 rounded p-2 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] text-gray-400 uppercase block mb-1">Venue / Hall</label>
                              <input
                                type="text"
                                value={fn.venue}
                                onChange={(e) => {
                                  const copy = [...formData.functions];
                                  copy[fIdx].venue = e.target.value;
                                  setFormData({ ...formData, functions: copy });
                                }}
                                placeholder="Main Banquet / Lawn"
                                className="w-full bg-[#0a1526] border border-gray-700 rounded p-2 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] text-gray-400 uppercase block mb-1">Capacity (Pax)</label>
                              <input
                                type="number"
                                min={0}
                                value={fn.capacity}
                                onChange={(e) => {
                                  const copy = [...formData.functions];
                                  copy[fIdx].capacity = Number(e.target.value);
                                  setFormData({ ...formData, functions: copy });
                                }}
                                placeholder="100"
                                className="w-full bg-[#0a1526] border border-gray-700 rounded p-2 text-xs text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-gray-400 uppercase block mb-1">Description & Inclusions</label>
                            <input
                              type="text"
                              value={fn.description}
                              onChange={(e) => {
                                const copy = [...formData.functions];
                                copy[fIdx].description = e.target.value;
                                setFormData({ ...formData, functions: copy });
                              }}
                              placeholder="Buffet dinner, DJ setup, projector, sound system, bar setup..."
                              className="w-full bg-[#0a1526] border border-gray-700 rounded p-2 text-xs text-white"
                            />
                          </div>

                          <div className="flex items-center gap-6 pt-1">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`fn-included-${fIdx}`}
                                checked={fn.isIncluded !== false}
                                onChange={(e) => {
                                  const copy = [...formData.functions];
                                  copy[fIdx].isIncluded = e.target.checked;
                                  setFormData({ ...formData, functions: copy });
                                }}
                                className="rounded text-[#d4af37]"
                              />
                              <label htmlFor={`fn-included-${fIdx}`} className="text-xs text-gray-200">
                                Included in Base Package Price
                              </label>
                            </div>

                            {fn.isIncluded === false && (
                              <div className="flex items-center gap-2">
                                <label className="text-[10px] text-gray-400 uppercase">Extra Cost (₹):</label>
                                <input
                                  type="number"
                                  min={0}
                                  value={fn.extraCost || 0}
                                  onChange={(e) => {
                                    const copy = [...formData.functions];
                                    copy[fIdx].extraCost = Number(e.target.value);
                                    setFormData({ ...formData, functions: copy });
                                  }}
                                  className="w-28 bg-[#0a1526] border border-gray-700 rounded p-1 text-xs text-[#d4af37] font-bold"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {modalTab === "facilities" && (
                <div className="space-y-4">
                  <div className="bg-[#070e17] p-4 rounded-xl border border-gray-800 space-y-3">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">
                      Corporate MICE &amp; Event Capabilities
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { key: "conferenceHallIncluded", label: "Conference Hall Included" },
                        { key: "projectorAndAVSetup", label: "Projector & AV Sound Setup" },
                        { key: "djAndSoundSystem", label: "DJ & Cocktail Sound System" },
                        { key: "teamBuildingFacilitator", label: "Team Building Facilitator" },
                        { key: "stageAndBackdrop", label: "Stage & Event Backdrop Setup" },
                      ].map((f) => (
                        <div key={f.key} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={f.key}
                            checked={(formData as any)[f.key]}
                            onChange={(e) => setFormData({ ...formData, [f.key]: e.target.checked })}
                            className="rounded text-[#d4af37]"
                          />
                          <label htmlFor={f.key} className="text-xs text-gray-200">
                            {f.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Cancellation Policy
                      </label>
                      <textarea
                        rows={3}
                        value={formData.cancellationPolicy}
                        onChange={(e) => setFormData({ ...formData, cancellationPolicy: e.target.value })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Booking Terms &amp; Conditions
                      </label>
                      <textarea
                        rows={3}
                        value={formData.terms}
                        onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {modalTab === "media" && (
                <div className="space-y-5">
                  {/* Primary Hero Cover Image Upload */}
                  <div className="bg-[#070e17] border border-gray-800 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-white uppercase flex items-center gap-1.5">
                        <MaterialIcon name="image" size={16} className="text-[#d4af37]" />
                        <span>Primary Hero Cover Image *</span>
                      </label>
                      <label className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#c49f27] transition flex items-center gap-1.5 cursor-pointer shadow">
                        <MaterialIcon name="cloud_upload" size={15} />
                        <span>{uploadingCover ? "Uploading to Cloudinary..." : "Upload from Device"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUploadCoverFile}
                          disabled={uploadingCover}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      {formData.image && (
                        <div className="relative group shrink-0">
                          <img
                            src={formData.image}
                            alt="Cover Preview"
                            className="h-24 w-36 object-cover rounded-lg border border-gray-700 shadow-md"
                          />
                          <span className="absolute bottom-1 left-1 bg-black/70 text-[10px] text-white px-1.5 py-0.5 rounded font-mono">
                            Preview
                          </span>
                        </div>
                      )}
                      <div className="flex-1 w-full">
                        <input
                          type="url"
                          required
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="https://res.cloudinary.com/... or upload directly above"
                          className="w-full bg-[#0a1526] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                        />
                        <p className="text-[10px] text-gray-400 mt-1">
                          Upload directly to your connected Cloudinary storage or enter an external image URL.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Photo Gallery Direct Upload */}
                  <div className="bg-[#070e17] border border-gray-800 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-[11px] font-semibold text-white uppercase flex items-center gap-1.5">
                          <MaterialIcon name="photo_library" size={16} className="text-[#d4af37]" />
                          <span>Photo Gallery Images</span>
                        </label>
                        <p className="text-[10px] text-gray-400">
                          Upload multiple high-res destination, resort, and activity photos.
                        </p>
                      </div>
                      <label className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer border border-gray-700 shadow">
                        <MaterialIcon name="add_photo_alternate" size={15} className="text-[#d4af37]" />
                        <span>{uploadingGallery ? "Uploading..." : "+ Upload Gallery Images"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleUploadGalleryFiles}
                          disabled={uploadingGallery}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Gallery Thumbnails */}
                    {formData.gallery && formData.gallery.trim() && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-1">
                        {formData.gallery
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean)
                          .map((url, idx) => (
                            <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-800 bg-black/40 h-20">
                              <img
                                src={url}
                                alt={`Gallery ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const currentList = formData.gallery.split("\n").map((s) => s.trim()).filter(Boolean);
                                  const updated = currentList.filter((_, i) => i !== idx);
                                  setFormData({ ...formData, gallery: updated.join("\n") });
                                }}
                                className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition shadow cursor-pointer"
                                title="Remove photo"
                              >
                                <MaterialIcon name="close" size={12} />
                              </button>
                            </div>
                          ))}
                      </div>
                    )}

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase block mb-1">
                        Gallery URLs (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.gallery}
                        onChange={(e) => setFormData({ ...formData, gallery: e.target.value })}
                        placeholder="https://res.cloudinary.com/...\nhttps://res.cloudinary.com/..."
                        className="w-full bg-[#0a1526] border border-gray-700 rounded-lg p-2.5 text-xs text-white font-mono outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                      Detailed Overview &amp; Highlights
                    </label>
                    <textarea
                      rows={3}
                      value={formData.overview}
                      onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                      className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Inclusions (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.inclusions}
                        onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase block mb-1">
                        Exclusions (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.exclusions}
                        onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })}
                        className="w-full bg-[#070e17] border border-gray-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isFeatured"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="rounded text-[#d4af37]"
                      />
                      <label htmlFor="isFeatured" className="text-xs text-gray-200 font-medium">
                        Mark as Featured Package
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="rounded text-[#d4af37]"
                      />
                      <label htmlFor="isActive" className="text-xs text-gray-200 font-medium">
                        Active (Visible on public booking catalog)
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-800 shrink-0">
                <div className="flex gap-2">
                  {modalTab !== "general" && (
                    <button
                      type="button"
                      onClick={() => {
                        if (modalTab === "media") setModalTab("facilities");
                        else if (modalTab === "facilities") setModalTab("functions");
                        else if (modalTab === "functions") setModalTab("itinerary");
                        else if (modalTab === "itinerary") setModalTab("pricing");
                        else if (modalTab === "pricing") setModalTab("general");
                      }}
                      className="px-3 py-1.5 rounded bg-gray-800 text-gray-300 text-xs hover:bg-gray-700"
                    >
                      ← Previous Tab
                    </button>
                  )}
                  {modalTab !== "media" && (
                    <button
                      type="button"
                      onClick={() => {
                        if (modalTab === "general") setModalTab("pricing");
                        else if (modalTab === "pricing") setModalTab("itinerary");
                        else if (modalTab === "itinerary") setModalTab("functions");
                        else if (modalTab === "functions") setModalTab("facilities");
                        else if (modalTab === "facilities") setModalTab("media");
                      }}
                      className="px-3 py-1.5 rounded bg-gray-800 text-gray-300 text-xs hover:bg-gray-700"
                    >
                      Next Tab →
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
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
                    {isSubmitting ? "Saving Package..." : isEditing ? "Update Package" : "Create Package"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
