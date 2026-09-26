"use client";

import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { adminTransportsApi } from "@/lib/api/admin.api";
import { SingleImageUploader, GalleryUploader } from "@/components/admin/ImageUploader";

export default function AdminTravelServicesPage() {
  const [transports, setTransports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"vehicle" | "specs" | "pricing" | "policies">("vehicle");
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Full Backend-Compliant Transport State
  const [transportForm, setTransportForm] = useState({
    title: "",
    slug: "",
    category: "Cab" as "Cab" | "Bus" | "Bike" | "Traveller",
    vehicleType: "SUV - 7 Seater",
    brand: "Toyota",
    modelName: "Innova Crysta",
    description: "Premium air-conditioned 7-seater SUV with ample luggage space, certified chauffeur, and GPS live tracking for outstation and mountain travel.",
    
    // Capacity Specs
    seating: 7,
    luggageBags: 4,

    // Mechanical Specs
    fuelType: "Diesel" as "Diesel" | "Petrol" | "CNG" | "Electric",
    transmission: "Manual" as "Manual" | "Automatic",
    hasAC: true,
    isSelfDrive: false,
    helmetProvidedCount: 0,

    // Operating Areas
    availableCities: "delhi, chandigarh, shimla, manali, dharamshala, rishikesh, jaipur, dehradun",
    serviceTypes: [
      "Outstation One-Way",
      "Outstation Round-Trip",
      "Airport Transfer",
      "Hourly City Rental",
    ] as string[],

    // Multi-Mode Pricing
    perKmRate: 18,
    baseFare: 3500,
    driverAllowancePerDay: 400,
    dailyRentalPrice: 0,
    hourlyRentalPrice: 0,
    seatTicketPrice: 0,
    securityDeposit: 0,
    tollAndTaxIncluded: false,
    taxPercentage: 5,

    // Amenities
    amenities: "Chauffeur Driven\nDual AC & Climate Control\nBottled Water & Sanitizers\nLuggage Carrier\nGPS Live Tracking\nFastag Enabled\nFirst Aid Kit\nUSB Charging Points",

    // Policies
    isFreeCancellation: true,
    freeCancellationHoursBefore: 24,
    cancellationFee: 0,
    drivingLicenseRequired: false,
    minAgeRequirement: 18,
    fuelPolicy: "Included" as "Included" | "Excluded" | "Same-to-Same" | "Full-to-Full",

    // Media
    coverImageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=80",
    galleryImageUrls: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80\nhttps://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",

    status: "active" as "active" | "inactive" | "under_maintenance",
    isFeatured: true,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await adminTransportsApi.getAll({ limit: 100 });
      if (res?.data) {
        setTransports(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      console.error("Error loading transport fleet:", err);
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
    setModalTab("vehicle");
    setTransportForm({
      title: "",
      slug: "",
      category: "Cab",
      vehicleType: "SUV - 7 Seater",
      brand: "Toyota",
      modelName: "Innova Crysta",
      description: "Premium air-conditioned 7-seater SUV with ample luggage space, certified chauffeur, and GPS live tracking.",
      seating: 7,
      luggageBags: 4,
      fuelType: "Diesel",
      transmission: "Manual",
      hasAC: true,
      isSelfDrive: false,
      helmetProvidedCount: 0,
      availableCities: "delhi, chandigarh, shimla, manali, dharamshala, rishikesh",
      serviceTypes: ["Outstation One-Way", "Outstation Round-Trip", "Airport Transfer", "Hourly City Rental"],
      perKmRate: 18,
      baseFare: 3500,
      driverAllowancePerDay: 400,
      dailyRentalPrice: 0,
      hourlyRentalPrice: 0,
      seatTicketPrice: 0,
      securityDeposit: 0,
      tollAndTaxIncluded: false,
      taxPercentage: 5,
      amenities: "Chauffeur Driven\nDual AC & Climate Control\nBottled Water\nGPS Live Tracking\nFastag Enabled",
      isFreeCancellation: true,
      freeCancellationHoursBefore: 24,
      cancellationFee: 0,
      drivingLicenseRequired: false,
      minAgeRequirement: 18,
      fuelPolicy: "Included",
      coverImageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=80",
      galleryImageUrls: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
      status: "active",
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: any) => {
    setIsEditing(true);
    setCurrentId(t._id);
    setModalTab("vehicle");

    const coverImg = (t.images || []).find((img: any) => typeof img === "object" && img.isCover)?.url ||
      (typeof t.images?.[0] === "object" ? t.images[0].url : t.images?.[0]) || "";

    const galleryText = (t.images || [])
      .filter((img: any) => (typeof img === "object" ? !img.isCover : true))
      .map((img: any) => (typeof img === "object" ? img.url : img))
      .join("\n");

    setTransportForm({
      title: t.title || t.vehicleName || t.name || "",
      slug: t.slug || "",
      category: t.category || "Cab",
      vehicleType: t.vehicleType || t.type || "Sedan",
      brand: t.brand || "",
      modelName: t.modelName || "",
      description: t.description || "",
      seating: t.capacity?.seating || t.capacity?.seats || 4,
      luggageBags: t.capacity?.luggageBags || t.capacity?.luggage || 2,
      fuelType: t.specifications?.fuelType || "Diesel",
      transmission: t.specifications?.transmission || "Manual",
      hasAC: t.specifications?.hasAC ?? true,
      isSelfDrive: t.specifications?.isSelfDrive ?? false,
      helmetProvidedCount: t.specifications?.helmetProvidedCount || 0,
      availableCities: Array.isArray(t.availableCities) ? t.availableCities.join(", ") : "",
      serviceTypes: Array.isArray(t.serviceTypes) ? t.serviceTypes : ["Outstation Round-Trip"],
      perKmRate: t.pricing?.perKmRate || 14,
      baseFare: t.pricing?.baseFare || t.pricing?.basePrice || 1200,
      driverAllowancePerDay: t.pricing?.driverAllowancePerDay || 350,
      dailyRentalPrice: t.pricing?.dailyRentalPrice || t.pricing?.perDayRate || 0,
      hourlyRentalPrice: t.pricing?.hourlyRentalPrice || 0,
      seatTicketPrice: t.pricing?.seatTicketPrice || 0,
      securityDeposit: t.pricing?.securityDeposit || 0,
      tollAndTaxIncluded: t.pricing?.tollAndTaxIncluded ?? false,
      taxPercentage: t.pricing?.taxPercentage || 5,
      amenities: Array.isArray(t.amenities) ? t.amenities.join("\n") : (t.features ? t.features.join("\n") : ""),
      isFreeCancellation: t.policies?.cancellationPolicy?.isFreeCancellation ?? true,
      freeCancellationHoursBefore: t.policies?.cancellationPolicy?.freeCancellationHoursBefore || 24,
      cancellationFee: t.policies?.cancellationPolicy?.cancellationFee || 0,
      drivingLicenseRequired: t.policies?.drivingLicenseRequired ?? false,
      minAgeRequirement: t.policies?.minAgeRequirement || 18,
      fuelPolicy: t.policies?.fuelPolicy || "Included",
      coverImageUrl: coverImg,
      galleryImageUrls: galleryText,
      status: t.status || (t.isAvailable ? "active" : "inactive"),
      isFeatured: t.isFeatured ?? true,
    });
    setIsModalOpen(true);
  };

  const handleToggleServiceType = (st: string) => {
    setTransportForm((prev) => {
      const exists = prev.serviceTypes.includes(st);
      return {
        ...prev,
        serviceTypes: exists ? prev.serviceTypes.filter((x) => x !== st) : [...prev.serviceTypes, st],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transportForm.title.trim()) {
      showToast("error", "Vehicle Title is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const imagesPayload: any[] = [];
      if (transportForm.coverImageUrl.trim()) {
        imagesPayload.push({
          url: transportForm.coverImageUrl.trim(),
          alt: `${transportForm.title} Cover`,
          isCover: true,
        });
      }
      transportForm.galleryImageUrls
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((url, i) => {
          imagesPayload.push({
            url,
            alt: `${transportForm.title} Photo ${i + 1}`,
            isCover: false,
          });
        });

      const cities = transportForm.availableCities
        .split(",")
        .map((c) => c.toLowerCase().trim())
        .filter(Boolean);

      const amenitiesList = transportForm.amenities
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        title: transportForm.title.trim(),
        slug: transportForm.slug.trim() || undefined,
        category: transportForm.category,
        vehicleType: transportForm.vehicleType.trim(),
        brand: transportForm.brand.trim(),
        modelName: transportForm.modelName.trim(),
        description: transportForm.description.trim(),
        capacity: {
          seating: Number(transportForm.seating),
          luggageBags: Number(transportForm.luggageBags),
        },
        specifications: {
          fuelType: transportForm.fuelType,
          transmission: transportForm.transmission,
          hasAC: transportForm.hasAC,
          isSelfDrive: transportForm.isSelfDrive,
          helmetProvidedCount: Number(transportForm.helmetProvidedCount),
        },
        availableCities: cities,
        serviceTypes: transportForm.serviceTypes.length > 0 ? transportForm.serviceTypes : ["Outstation Round-Trip"],
        pricing: {
          currency: "INR",
          perKmRate: Number(transportForm.perKmRate),
          baseFare: Number(transportForm.baseFare),
          driverAllowancePerDay: Number(transportForm.driverAllowancePerDay),
          dailyRentalPrice: Number(transportForm.dailyRentalPrice),
          hourlyRentalPrice: Number(transportForm.hourlyRentalPrice),
          seatTicketPrice: Number(transportForm.seatTicketPrice),
          securityDeposit: Number(transportForm.securityDeposit),
          tollAndTaxIncluded: transportForm.tollAndTaxIncluded,
          taxPercentage: Number(transportForm.taxPercentage),
        },
        amenities: amenitiesList,
        policies: {
          cancellationPolicy: {
            isFreeCancellation: transportForm.isFreeCancellation,
            freeCancellationHoursBefore: Number(transportForm.freeCancellationHoursBefore),
            cancellationFee: Number(transportForm.cancellationFee),
          },
          drivingLicenseRequired: transportForm.drivingLicenseRequired,
          minAgeRequirement: Number(transportForm.minAgeRequirement),
          fuelPolicy: transportForm.fuelPolicy,
        },
        images: imagesPayload,
        status: transportForm.status,
        isFeatured: transportForm.isFeatured,
      };

      if (isEditing && currentId) {
        await adminTransportsApi.update(currentId, payload);
        showToast("success", "Vehicle updated successfully!");
      } else {
        await adminTransportsApi.create(payload);
        showToast("success", "New Vehicle added to fleet!");
      }

      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      console.error("Transport submit error:", err);
      showToast("error", err?.message || "Failed to save vehicle.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the fleet?`)) return;
    try {
      await adminTransportsApi.delete(id);
      showToast("success", `Vehicle removed.`);
      loadData();
    } catch (err: any) {
      showToast("error", err?.message || "Failed to delete vehicle.");
    }
  };

  const filteredTransports = transports.filter((t) => {
    const title = t.title || t.vehicleName || t.name || "";
    const brand = t.brand || "";
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.vehicleType || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || (t.category || "Cab") === selectedCategory;
    const matchesStatus = selectedStatus === "all" || (t.status || "active") === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-semibold text-white ${
            notification.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          <MaterialIcon name={notification.type === "success" ? "check_circle" : "error"} className="text-xl" />
          {notification.msg}
        </div>
      )}

      {/* Header Banner (Light Mode) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-amber-50 text-[#b8860b] border border-amber-200">
            <MaterialIcon name="directions_car" className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Fleet & Travel Services</h1>
            <p className="text-xs text-slate-500">
              Manage outstation cabs, Volvo AC buses, tempo travellers, and self-drive bikes
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c49f27] text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
        >
          <MaterialIcon name="add" className="text-lg" />
          Add New Vehicle
        </button>
      </div>

      {/* Filter Bar (Light Mode) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
        <div className="relative w-full md:w-80">
          <MaterialIcon
            name="search"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg"
          />
          <input
            type="text"
            placeholder="Search vehicle, brand, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {["all", "Cab", "Bus", "Bike", "Traveller"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#d4af37] text-slate-950 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat === "all" ? "All Fleet" : cat}
              </button>
            ))}
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-[#d4af37]"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="under_maintenance">Under Maintenance</option>
          </select>
        </div>
      </div>

      {/* Fleet Cards Grid (Light Mode) */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#d4af37] mb-3" />
          <p className="text-slate-500 text-sm">Loading vehicle fleet...</p>
        </div>
      ) : filteredTransports.length === 0 ? (
        <div className="py-20 text-center bg-white border border-dashed border-slate-300 rounded-2xl p-8">
          <MaterialIcon name="directions_car" className="text-4xl text-slate-400 mb-3" />
          <h3 className="text-base font-semibold text-slate-800">No vehicles found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or click &quot;Add New Vehicle&quot; to register cabs, buses, or bikes.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTransports.map((t) => {
            const title = t.title || t.vehicleName || t.name || "Vehicle";
            const cover = (t.images || []).find((img: any) => typeof img === "object" && img.isCover)?.url ||
              (typeof t.images?.[0] === "object" ? t.images[0].url : t.images?.[0]) ||
              "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80";

            return (
              <div
                key={t._id}
                className="group relative bg-white border border-slate-200 hover:border-[#d4af37]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Image Cover */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={cover}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                    {/* Category & Status */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md border border-amber-200 text-[#b8860b] font-bold text-xs shadow-xs">
                        {t.category || "Cab"}
                      </span>
                      {t.isFeatured && (
                        <span className="px-2 py-0.5 rounded-md bg-[#d4af37] text-slate-950 font-bold text-[10px] uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          t.status === "active" || t.isAvailable
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {t.status || (t.isAvailable ? "active" : "inactive")}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow-sm">
                      <span className="text-xs font-medium">
                        {t.brand} {t.modelName}
                      </span>
                      <span className="text-xs font-semibold text-amber-300">
                        {t.vehicleType || "Standard"}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#b8860b] transition-colors line-clamp-1">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {t.description || "Air-conditioned mobility option for seamless holiday transfers."}
                    </p>

                    {/* Spec Badges */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MaterialIcon name="airline_seat_recline_normal" className="text-[#b8860b] text-sm" />
                        <span>{t.capacity?.seating || t.capacity?.seats || 4} Seats</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MaterialIcon name="luggage" className="text-[#b8860b] text-sm" />
                        <span>{t.capacity?.luggageBags || t.capacity?.luggage || 2} Luggage</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MaterialIcon name="local_gas_station" className="text-[#b8860b] text-sm" />
                        <span>{t.specifications?.fuelType || "Diesel"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MaterialIcon name="ac_unit" className="text-[#b8860b] text-sm" />
                        <span>{t.specifications?.hasAC ? "AC Included" : "Non-AC"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & Actions */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-3">
                  <div>
                    {t.category === "Bike" ? (
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Daily Rent</span>
                        <span className="text-base font-extrabold text-slate-900">
                          ₹{(t.pricing?.dailyRentalPrice || 1200).toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-slate-500"> / day</span>
                      </div>
                    ) : t.category === "Bus" ? (
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Per Seat Fare</span>
                        <span className="text-base font-extrabold text-slate-900">
                          ₹{(t.pricing?.seatTicketPrice || 950).toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-slate-500"> / ticket</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Outstation Rate</span>
                        <span className="text-base font-extrabold text-slate-900">
                          ₹{(t.pricing?.perKmRate || 14)}
                        </span>
                        <span className="text-[10px] text-slate-500"> / km</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(t)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      title="Edit Vehicle"
                    >
                      <MaterialIcon name="edit" className="text-base" />
                    </button>
                    <button
                      onClick={() => handleDelete(t._id, title)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                      title="Delete Vehicle"
                    >
                      <MaterialIcon name="delete" className="text-base" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Enterprise Full-Schema Transport Modal (Light Mode) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-50 text-[#b8860b] border border-amber-200">
                  <MaterialIcon name="directions_car" className="text-xl" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {isEditing ? `Edit Vehicle: ${transportForm.title}` : "Add Fleet Vehicle"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Define seating specs, mechanical parameters, per-km/per-day tariffs, and operational cities
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <MaterialIcon name="close" className="text-xl" />
              </button>
            </div>

            {/* Modal Nav Tabs (Light Mode) */}
            <div className="flex items-center gap-2 px-6 py-3 bg-slate-50/50 border-b border-slate-200 overflow-x-auto text-xs font-semibold">
              {[
                { id: "vehicle", label: "1. Vehicle Details", icon: "directions_car" },
                { id: "specs", label: "2. Specs & Capacities", icon: "engineering" },
                { id: "pricing", label: "3. Pricing & Operational Areas", icon: "payments" },
                { id: "policies", label: "4. Policies, Amenities & Media", icon: "policy" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setModalTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    modalTab === tab.id
                      ? "bg-[#d4af37] text-slate-950 font-bold shadow-xs"
                      : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <MaterialIcon name={tab.icon} className="text-sm" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Scroll Area (Light Mode) */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
              {/* TAB 1: VEHICLE DETAILS */}
              {modalTab === "vehicle" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Vehicle Title / Display Name *</label>
                      <input
                        type="text"
                        required
                        value={transportForm.title}
                        onChange={(e) => setTransportForm({ ...transportForm, title: e.target.value })}
                        placeholder="e.g. Toyota Innova Crysta / Luxury SUV"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">URL Slug (Optional)</label>
                      <input
                        type="text"
                        value={transportForm.slug}
                        onChange={(e) => setTransportForm({ ...transportForm, slug: e.target.value })}
                        placeholder="auto-generated if empty"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Category *</label>
                      <select
                        value={transportForm.category}
                        onChange={(e) => setTransportForm({ ...transportForm, category: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="Cab">Cab (Sedan / SUV)</option>
                        <option value="Bus">Bus (Volvo / Sleeper)</option>
                        <option value="Traveller">Tempo Traveller</option>
                        <option value="Bike">Self-Drive Bike / Scooter</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Vehicle Sub-Type *</label>
                      <input
                        type="text"
                        required
                        value={transportForm.vehicleType}
                        onChange={(e) => setTransportForm({ ...transportForm, vehicleType: e.target.value })}
                        placeholder="e.g. SUV, AC Sleeper, 17-Seater"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Brand / Manufacturer</label>
                      <input
                        type="text"
                        value={transportForm.brand}
                        onChange={(e) => setTransportForm({ ...transportForm, brand: e.target.value })}
                        placeholder="Toyota, Volvo, Royal Enfield"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Model Name</label>
                      <input
                        type="text"
                        value={transportForm.modelName}
                        onChange={(e) => setTransportForm({ ...transportForm, modelName: e.target.value })}
                        placeholder="Innova Crysta, B11R, Himalayan"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Vehicle Overview & Description *</label>
                    <textarea
                      rows={3}
                      value={transportForm.description}
                      onChange={(e) => setTransportForm({ ...transportForm, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Status</label>
                      <select
                        value={transportForm.status}
                        onChange={(e) => setTransportForm({ ...transportForm, status: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900"
                      >
                        <option value="active">Active (Available for booking)</option>
                        <option value="under_maintenance">Under Maintenance</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={transportForm.isFeatured}
                          onChange={(e) => setTransportForm({ ...transportForm, isFeatured: e.target.checked })}
                          className="rounded text-amber-600"
                        />
                        Mark as Featured Vehicle
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SPECS & CAPACITIES */}
              {modalTab === "specs" && (
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold text-[#b8860b] uppercase tracking-wider flex items-center gap-1.5">
                      <MaterialIcon name="airline_seat_recline_normal" className="text-sm" />
                      Passenger & Luggage Capacity
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-600 font-medium">Total Seating Capacity *</label>
                        <input
                          type="number"
                          min={1}
                          max={60}
                          value={transportForm.seating}
                          onChange={(e) => setTransportForm({ ...transportForm, seating: Number(e.target.value) })}
                          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-600 font-medium">Luggage Bags Capacity (Bags)</label>
                        <input
                          type="number"
                          min={0}
                          value={transportForm.luggageBags}
                          onChange={(e) => setTransportForm({ ...transportForm, luggageBags: Number(e.target.value) })}
                          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold text-[#b8860b] uppercase tracking-wider flex items-center gap-1.5">
                      <MaterialIcon name="engineering" className="text-sm" />
                      Mechanical & Comfort Specifications
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-600 font-medium">Fuel Type</label>
                        <select
                          value={transportForm.fuelType}
                          onChange={(e) => setTransportForm({ ...transportForm, fuelType: e.target.value as any })}
                          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900"
                        >
                          <option value="Diesel">Diesel</option>
                          <option value="Petrol">Petrol</option>
                          <option value="CNG">CNG</option>
                          <option value="Electric">Electric</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-slate-600 font-medium">Transmission</label>
                        <select
                          value={transportForm.transmission}
                          onChange={(e) => setTransportForm({ ...transportForm, transmission: e.target.value as any })}
                          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900"
                        >
                          <option value="Manual">Manual</option>
                          <option value="Automatic">Automatic</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-200">
                      <label className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={transportForm.hasAC}
                          onChange={(e) => setTransportForm({ ...transportForm, hasAC: e.target.checked })}
                          className="rounded text-amber-600"
                        />
                        Air Conditioning (AC)
                      </label>

                      <label className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={transportForm.isSelfDrive}
                          onChange={(e) => setTransportForm({ ...transportForm, isSelfDrive: e.target.checked })}
                          className="rounded text-amber-600"
                        />
                        Self-Drive Vehicle
                      </label>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-600 font-medium">Helmets Included (Bikes)</label>
                        <input
                          type="number"
                          value={transportForm.helmetProvidedCount}
                          onChange={(e) => setTransportForm({ ...transportForm, helmetProvidedCount: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PRICING & OPERATING AREAS */}
              {modalTab === "pricing" && (
                <div className="space-y-6">
                  {/* Service Types */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold text-[#b8860b] uppercase tracking-wider">
                      Supported Booking Modes (Service Types)
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                      {[
                        "Outstation One-Way",
                        "Outstation Round-Trip",
                        "Airport Transfer",
                        "Hourly City Rental",
                        "Daily Rental",
                        "Intercity Scheduled Route",
                      ].map((st) => (
                        <label
                          key={st}
                          className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 font-medium cursor-pointer shadow-2xs"
                        >
                          <input
                            type="checkbox"
                            checked={transportForm.serviceTypes.includes(st)}
                            onChange={() => handleToggleServiceType(st)}
                            className="rounded text-amber-600"
                          />
                          {st}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Matrix */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold text-[#b8860b] uppercase tracking-wider flex items-center gap-1.5">
                      <MaterialIcon name="payments" className="text-sm" />
                      Comprehensive Fare Matrix (INR)
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Per KM Rate (₹)</label>
                        <input
                          type="number"
                          value={transportForm.perKmRate}
                          onChange={(e) => setTransportForm({ ...transportForm, perKmRate: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Base Fare (₹)</label>
                        <input
                          type="number"
                          value={transportForm.baseFare}
                          onChange={(e) => setTransportForm({ ...transportForm, baseFare: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Driver Allowance/Day (₹)</label>
                        <input
                          type="number"
                          value={transportForm.driverAllowancePerDay}
                          onChange={(e) => setTransportForm({ ...transportForm, driverAllowancePerDay: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Daily Rental (Bikes/Cars ₹)</label>
                        <input
                          type="number"
                          value={transportForm.dailyRentalPrice}
                          onChange={(e) => setTransportForm({ ...transportForm, dailyRentalPrice: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-200">
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Hourly Rental (₹)</label>
                        <input
                          type="number"
                          value={transportForm.hourlyRentalPrice}
                          onChange={(e) => setTransportForm({ ...transportForm, hourlyRentalPrice: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Bus Seat Ticket Price (₹)</label>
                        <input
                          type="number"
                          value={transportForm.seatTicketPrice}
                          onChange={(e) => setTransportForm({ ...transportForm, seatTicketPrice: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Refundable Deposit (₹)</label>
                        <input
                          type="number"
                          value={transportForm.securityDeposit}
                          onChange={(e) => setTransportForm({ ...transportForm, securityDeposit: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">GST %</label>
                        <input
                          type="number"
                          value={transportForm.taxPercentage}
                          onChange={(e) => setTransportForm({ ...transportForm, taxPercentage: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 pt-2 text-xs text-slate-700 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={transportForm.tollAndTaxIncluded}
                        onChange={(e) => setTransportForm({ ...transportForm, tollAndTaxIncluded: e.target.checked })}
                        className="rounded text-amber-600"
                      />
                      State Toll & Highway Taxes Included in Quote
                    </label>
                  </div>

                  {/* Available Cities */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Operational Coverage Hubs / Available Cities (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={transportForm.availableCities}
                      onChange={(e) => setTransportForm({ ...transportForm, availableCities: e.target.value })}
                      placeholder="delhi, chandigarh, shimla, manali, rishikesh, jaipur"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: POLICIES, AMENITIES & MEDIA */}
              {modalTab === "policies" && (
                <div className="space-y-6">
                  {/* Media with Direct Cloudinary Upload */}
                  <div className="space-y-4">
                    <SingleImageUploader
                      label="Primary Vehicle Cover Image"
                      value={transportForm.coverImageUrl}
                      onChange={(url) => setTransportForm({ ...transportForm, coverImageUrl: url })}
                      folder="transports"
                      required={true}
                      helpText="Primary photo of the luxury vehicle, car, or coach."
                    />

                    <GalleryUploader
                      label="Vehicle Photo Gallery"
                      urlsText={transportForm.galleryImageUrls}
                      onChange={(urls) => setTransportForm({ ...transportForm, galleryImageUrls: urls })}
                      folder="transports"
                      helpText="Upload interior seating, boot space, dashboard, and side angle views."
                    />
                  </div>

                  {/* Amenities */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Vehicle Amenities & Features (1 per line)
                    </label>
                    <textarea
                      rows={3}
                      value={transportForm.amenities}
                      onChange={(e) => setTransportForm({ ...transportForm, amenities: e.target.value })}
                      placeholder="Chauffeur Driven&#10;GPS Live Tracking&#10;Water Bottle"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>

                  {/* Policies */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold text-[#b8860b] uppercase tracking-wider flex items-center gap-1.5">
                      <MaterialIcon name="policy" className="text-sm" />
                      Rental Rules & Cancellation Policy
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Free Cancellation Hours Before</label>
                        <input
                          type="number"
                          value={transportForm.freeCancellationHoursBefore}
                          onChange={(e) => setTransportForm({ ...transportForm, freeCancellationHoursBefore: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Min Age Requirement</label>
                        <input
                          type="number"
                          value={transportForm.minAgeRequirement}
                          onChange={(e) => setTransportForm({ ...transportForm, minAgeRequirement: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Fuel Policy</label>
                        <select
                          value={transportForm.fuelPolicy}
                          onChange={(e) => setTransportForm({ ...transportForm, fuelPolicy: e.target.value as any })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        >
                          <option value="Included">Fuel Included (Cabs & Buses)</option>
                          <option value="Same-to-Same">Same-to-Same (Self Drive)</option>
                          <option value="Full-to-Full">Full-to-Full</option>
                          <option value="Excluded">Excluded</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={transportForm.drivingLicenseRequired}
                          onChange={(e) => setTransportForm({ ...transportForm, drivingLicenseRequired: e.target.checked })}
                          className="rounded text-amber-600"
                        />
                        Valid Driver License Required for Pick-Up
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c49f27] text-slate-950 text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Saving Vehicle...
                    </>
                  ) : (
                    <>
                      <MaterialIcon name="save" className="text-sm" />
                      {isEditing ? "Update Vehicle" : "Register Vehicle"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
