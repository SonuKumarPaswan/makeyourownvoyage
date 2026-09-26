"use client";

import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { adminHotelsApi, adminDestinationsApi } from "@/lib/api/admin.api";
import { SingleImageUploader, GalleryUploader } from "@/components/admin/ImageUploader";

interface RoomItem {
  roomType: string;
  description: string;
  bedType: string;
  bedCount: number;
  occupancy: {
    adults: number;
    children: number;
    maxGuests: number;
  };
  roomSize: {
    value: number;
    unit: string;
  };
  pricing: {
    basePrice: number;
    taxPercentage: number;
    taxAmount: number;
    finalPrice: number;
    currency: string;
  };
  availability: {
    totalRooms: number;
    availableRooms: number;
  };
  amenities: string[];
  mealPlan: string[];
  images: string[];
}

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStar, setSelectedStar] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"basic" | "rooms" | "dining" | "policies">("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Full Backend-Compliant Hotel State
  const [hotelForm, setHotelForm] = useState({
    name: "",
    slug: "",
    propertyType: "Luxury Resort",
    starCategory: 5,
    destination: "",
    description: "Nestled in serene hill landscapes with panoramic mountain vistas, world-class hospitality, and signature wellness spa facilities.",
    
    // Location
    address: "The Mall Road, Near Heritage Point",
    area: "Mall Road",
    city: "shimla",
    state: "Himachal Pradesh",
    country: "India",
    pincode: "171001",
    latitude: 31.1048,
    longitude: 77.1734,

    // Contact
    phone: "+91 98765 43210",
    email: "reservations@luxuryresort.com",

    // Media
    coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    galleryImages: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80\nhttps://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",

    // Global Amenities
    amenities: "Free High-Speed WiFi\nInfinity Heated Pool\nAyurvedic Luxury Spa\nFitness Center & Gym\nMulti-Cuisine Restaurant\n24/7 Concierge",

    // Multi-Room Inventory
    rooms: [
      {
        roomType: "Deluxe Mountain View",
        description: "Spacious luxury room with private sit-out balcony overlooking the valley.",
        bedType: "King Bed",
        bedCount: 1,
        occupancy: { adults: 2, children: 1, maxGuests: 3 },
        roomSize: { value: 380, unit: "sqft" },
        pricing: { basePrice: 6500, taxPercentage: 18, taxAmount: 1170, finalPrice: 7670, currency: "INR" },
        availability: { totalRooms: 12, availableRooms: 8 },
        amenities: ["AC", "Smart TV", "Mini Bar", "Balcony"],
        mealPlan: ["Breakfast Included"],
        images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80"],
      }
    ] as RoomItem[],

    // Facilities Switches
    facilities: {
      parking: true,
      swimmingPool: true,
      gym: true,
      spa: true,
      restaurant: true,
      conferenceRoom: true,
    },

    // Dining
    breakfast: {
      available: true,
      timing: "07:30 AM - 10:30 AM",
      type: "Buffet Spread",
    },
    restaurantsText: "The Pine View Grill - Indian & Continental - 12:00 PM to 11:00 PM",

    // Policies
    checkInTime: "14:00",
    checkOutTime: "11:00",
    ageRequirement: 18,
    policies: {
      petsAllowed: false,
      smokingAllowed: false,
      couplesAllowed: true,
      localIdsAccepted: true,
      childrenAllowed: true,
      extraBedAvailable: true,
    },

    // Cancellation
    cancellationType: "Free Cancellation",
    freeCancellationBefore: "48 hours before check-in",
    cancellationDescription: "100% full refund if cancelled at least 48 hours before check-in.",

    // Nearby Attractions
    nearbyAttractionsText: "Mall Road Shimla - 0.5 km\nJakhoo Temple Ropeway - 1.8 km",

    status: "active" as "active" | "inactive" | "under_review",
    isFeatured: true,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [hotelsRes, destRes] = await Promise.allSettled([
        adminHotelsApi.getAll({ limit: 100 }),
        adminDestinationsApi.getAll(),
      ]);

      if (hotelsRes.status === "fulfilled" && hotelsRes.value?.data) {
        setHotels(Array.isArray(hotelsRes.value.data) ? hotelsRes.value.data : []);
      }
      if (destRes.status === "fulfilled" && destRes.value?.data) {
        setDestinations(Array.isArray(destRes.value.data) ? destRes.value.data : []);
      }
    } catch (err) {
      console.error("Error loading hotels:", err);
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
    setModalTab("basic");
    setHotelForm({
      name: "",
      slug: "",
      propertyType: "Luxury Resort",
      starCategory: 5,
      destination: destinations[0]?._id || "",
      description: "Nestled in serene hill landscapes with panoramic mountain vistas, world-class hospitality, and signature wellness spa facilities.",
      address: "The Mall Road, Near Heritage Point",
      area: "Mall Road",
      city: "shimla",
      state: "Himachal Pradesh",
      country: "India",
      pincode: "171001",
      latitude: 31.1048,
      longitude: 77.1734,
      phone: "+91 98765 43210",
      email: "reservations@luxuryresort.com",
      coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      galleryImages: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80\nhttps://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
      amenities: "Free High-Speed WiFi\nInfinity Heated Pool\nAyurvedic Luxury Spa\nFitness Center & Gym\nMulti-Cuisine Restaurant\n24/7 Concierge",
      rooms: [
        {
          roomType: "Deluxe Mountain View",
          description: "Spacious luxury room with private sit-out balcony overlooking the valley.",
          bedType: "King Bed",
          bedCount: 1,
          occupancy: { adults: 2, children: 1, maxGuests: 3 },
          roomSize: { value: 380, unit: "sqft" },
          pricing: { basePrice: 6500, taxPercentage: 18, taxAmount: 1170, finalPrice: 7670, currency: "INR" },
          availability: { totalRooms: 12, availableRooms: 8 },
          amenities: ["AC", "Smart TV", "Mini Bar", "Balcony"],
          mealPlan: ["Breakfast Included"],
          images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80"],
        }
      ],
      facilities: {
        parking: true,
        swimmingPool: true,
        gym: true,
        spa: true,
        restaurant: true,
        conferenceRoom: true,
      },
      breakfast: {
        available: true,
        timing: "07:30 AM - 10:30 AM",
        type: "Buffet Spread",
      },
      restaurantsText: "The Pine View Grill - Indian & Continental - 12:00 PM to 11:00 PM",
      checkInTime: "14:00",
      checkOutTime: "11:00",
      ageRequirement: 18,
      policies: {
        petsAllowed: false,
        smokingAllowed: false,
        couplesAllowed: true,
        localIdsAccepted: true,
        childrenAllowed: true,
        extraBedAvailable: true,
      },
      cancellationType: "Free Cancellation",
      freeCancellationBefore: "48 hours before check-in",
      cancellationDescription: "100% full refund if cancelled at least 48 hours before check-in.",
      nearbyAttractionsText: "Mall Road Shimla - 0.5 km\nJakhoo Temple Ropeway - 1.8 km",
      status: "active",
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (h: any) => {
    setIsEditing(true);
    setCurrentId(h._id);
    setModalTab("basic");

    const galleryText = (h.images || [])
      .filter((img: any) => (typeof img === "object" ? img.type !== "cover" : true))
      .map((img: any) => (typeof img === "object" ? img.url : img))
      .join("\n");

    const coverImg = (h.images || []).find((img: any) => typeof img === "object" && img.type === "cover")?.url ||
      (typeof h.images?.[0] === "object" ? h.images[0].url : h.images?.[0]) || "";

    const nearbyText = (h.nearbyAttractions || [])
      .map((n: any) => `${n.name} - ${n.distance}`)
      .join("\n");

    const diningText = (h.dining?.restaurants || [])
      .map((r: any) => `${r.name} - ${Array.isArray(r.cuisine) ? r.cuisine.join(", ") : r.cuisine || "Multi-Cuisine"} - ${r.openingTime || "12:00 PM"} to ${r.closingTime || "11:00 PM"}`)
      .join("\n");

    setHotelForm({
      name: h.name || "",
      slug: h.slug || "",
      propertyType: h.propertyType || "Luxury Resort",
      starCategory: h.starCategory || h.starRating || 5,
      destination: typeof h.destination === "object" ? h.destination?._id : h.destination || "",
      description: h.description || "",
      address: h.location?.address || h.address?.fullAddress || "",
      area: h.location?.area || "",
      city: h.location?.city || h.address?.city || "",
      state: h.location?.state || h.address?.state || "",
      country: h.location?.country || "India",
      pincode: h.location?.pincode || "",
      latitude: h.location?.coordinates?.latitude || 31.1048,
      longitude: h.location?.coordinates?.longitude || 77.1734,
      phone: h.contact?.phone || "",
      email: h.contact?.email || "",
      coverImage: coverImg,
      galleryImages: galleryText,
      amenities: Array.isArray(h.amenities) ? h.amenities.join("\n") : "",
      rooms: Array.isArray(h.rooms) && h.rooms.length > 0 ? h.rooms : [
        {
          roomType: "Deluxe Room",
          description: "Comfortable luxury accommodation",
          bedType: "King Bed",
          bedCount: 1,
          occupancy: { adults: 2, children: 1, maxGuests: 3 },
          roomSize: { value: 350, unit: "sqft" },
          pricing: { basePrice: h.pricing?.basePrice || 5000, taxPercentage: 18, taxAmount: 900, finalPrice: 5900, currency: "INR" },
          availability: { totalRooms: 10, availableRooms: 8 },
          amenities: ["AC", "TV", "WiFi"],
          mealPlan: ["Breakfast Included"],
          images: [],
        }
      ],
      facilities: {
        parking: h.facilities?.parking ?? true,
        swimmingPool: h.facilities?.swimmingPool ?? true,
        gym: h.facilities?.gym ?? true,
        spa: h.facilities?.spa ?? true,
        restaurant: h.facilities?.restaurant ?? true,
        conferenceRoom: h.facilities?.conferenceRoom ?? false,
      },
      breakfast: {
        available: h.dining?.breakfast?.available ?? true,
        timing: h.dining?.breakfast?.timing || "07:30 AM - 10:30 AM",
        type: h.dining?.breakfast?.type || "Buffet",
      },
      restaurantsText: diningText || "The Grand Dining - Multi-Cuisine - 12:00 PM to 11:00 PM",
      checkInTime: h.checkIn?.time || "14:00",
      checkOutTime: h.checkOut?.time || "11:00",
      ageRequirement: h.checkIn?.ageRequirement || 18,
      policies: {
        petsAllowed: h.policies?.petsAllowed ?? false,
        smokingAllowed: h.policies?.smokingAllowed ?? false,
        couplesAllowed: h.policies?.couplesAllowed ?? true,
        localIdsAccepted: h.policies?.localIdsAccepted ?? true,
        childrenAllowed: h.policies?.childrenAllowed ?? true,
        extraBedAvailable: h.policies?.extraBedAvailable ?? true,
      },
      cancellationType: h.cancellationPolicy?.type || "Free Cancellation",
      freeCancellationBefore: h.cancellationPolicy?.freeCancellationBefore || "48 hours before check-in",
      cancellationDescription: h.cancellationPolicy?.description || "Full refund up to 48 hours prior to check-in.",
      nearbyAttractionsText: nearbyText,
      status: h.status || "active",
      isFeatured: h.isFeatured ?? true,
    });
    setIsModalOpen(true);
  };

  const handleAddRoom = () => {
    setHotelForm((prev) => ({
      ...prev,
      rooms: [
        ...prev.rooms,
        {
          roomType: "Executive Valley Suite",
          description: "Premium suite with master bedroom and luxury bathroom amenities.",
          bedType: "King Bed",
          bedCount: 1,
          occupancy: { adults: 2, children: 1, maxGuests: 3 },
          roomSize: { value: 450, unit: "sqft" },
          pricing: { basePrice: 8500, taxPercentage: 18, taxAmount: 1530, finalPrice: 10030, currency: "INR" },
          availability: { totalRooms: 6, availableRooms: 4 },
          amenities: ["AC", "Smart TV", "Balcony", "Jacuzzi", "WiFi"],
          mealPlan: ["Breakfast Included"],
          images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80"],
        },
      ],
    }));
  };

  const handleRemoveRoom = (index: number) => {
    setHotelForm((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateRoom = (index: number, field: string, val: any) => {
    setHotelForm((prev) => {
      const updated = [...prev.rooms];
      const target = { ...updated[index] };

      if (field.startsWith("occupancy.")) {
        const sub = field.split(".")[1];
        target.occupancy = { ...target.occupancy, [sub]: Number(val) };
      } else if (field.startsWith("roomSize.")) {
        const sub = field.split(".")[1];
        target.roomSize = { ...target.roomSize, [sub]: sub === "value" ? Number(val) : val };
      } else if (field.startsWith("pricing.")) {
        const sub = field.split(".")[1];
        const numVal = Number(val);
        const newPricing = { ...target.pricing, [sub]: numVal };
        if (sub === "basePrice" || sub === "taxPercentage") {
          const bp = sub === "basePrice" ? numVal : target.pricing.basePrice;
          const tp = sub === "taxPercentage" ? numVal : target.pricing.taxPercentage;
          newPricing.taxAmount = Math.round((bp * tp) / 100);
          newPricing.finalPrice = bp + newPricing.taxAmount;
        }
        target.pricing = newPricing;
      } else if (field.startsWith("availability.")) {
        const sub = field.split(".")[1];
        target.availability = { ...target.availability, [sub]: Number(val) };
      } else {
        (target as any)[field] = val;
      }

      updated[index] = target;
      return { ...prev, rooms: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotelForm.name.trim() || !hotelForm.destination) {
      showToast("error", "Hotel Name and Destination are required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const imagesPayload: any[] = [];
      if (hotelForm.coverImage.trim()) {
        imagesPayload.push({
          url: hotelForm.coverImage.trim(),
          alt: `${hotelForm.name} Cover`,
          type: "cover",
          order: 1,
        });
      }
      hotelForm.galleryImages
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((url, i) => {
          imagesPayload.push({
            url,
            alt: `${hotelForm.name} Gallery ${i + 1}`,
            type: "room",
            order: i + 2,
          });
        });

      const amenitiesList = hotelForm.amenities
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const nearbyList = hotelForm.nearbyAttractionsText
        .split("\n")
        .map((line) => {
          const parts = line.split("-");
          return {
            name: parts[0]?.trim() || "",
            distance: parts[1]?.trim() || "Nearby",
          };
        })
        .filter((item) => item.name);

      const restaurantList = hotelForm.restaurantsText
        .split("\n")
        .map((line) => {
          const parts = line.split("-");
          return {
            name: parts[0]?.trim() || "Restaurant",
            cuisine: (parts[1] || "Multi-Cuisine").split(",").map((c) => c.trim()),
            openingTime: parts[2]?.split("to")?.[0]?.trim() || "12:00 PM",
            closingTime: parts[2]?.split("to")?.[1]?.trim() || "11:00 PM",
          };
        })
        .filter((r) => r.name);

      const payload = {
        name: hotelForm.name.trim(),
        slug: hotelForm.slug.trim() || undefined,
        propertyType: hotelForm.propertyType,
        starCategory: Number(hotelForm.starCategory),
        destination: hotelForm.destination,
        description: hotelForm.description,
        location: {
          address: hotelForm.address,
          area: hotelForm.area,
          city: hotelForm.city.toLowerCase().trim(),
          state: hotelForm.state,
          country: hotelForm.country,
          pincode: hotelForm.pincode,
          coordinates: {
            latitude: Number(hotelForm.latitude),
            longitude: Number(hotelForm.longitude),
          },
        },
        contact: {
          phone: hotelForm.phone,
          email: hotelForm.email.toLowerCase().trim(),
        },
        images: imagesPayload,
        amenities: amenitiesList,
        rooms: hotelForm.rooms,
        facilities: hotelForm.facilities,
        dining: {
          breakfast: hotelForm.breakfast,
          restaurants: restaurantList,
        },
        checkIn: {
          time: hotelForm.checkInTime,
          ageRequirement: Number(hotelForm.ageRequirement),
        },
        checkOut: {
          time: hotelForm.checkOutTime,
        },
        policies: hotelForm.policies,
        cancellationPolicy: {
          type: hotelForm.cancellationType,
          freeCancellationBefore: hotelForm.freeCancellationBefore,
          description: hotelForm.cancellationDescription,
        },
        nearbyAttractions: nearbyList,
        status: hotelForm.status,
        isFeatured: hotelForm.isFeatured,
      };

      if (isEditing && currentId) {
        await adminHotelsApi.update(currentId, payload);
        showToast("success", "Hotel updated successfully!");
      } else {
        await adminHotelsApi.create(payload);
        showToast("success", "New Hotel created successfully!");
      }

      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      console.error("Hotel submit error:", err);
      showToast("error", err?.message || "Failed to save hotel.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete hotel "${name}"?`)) return;
    try {
      await adminHotelsApi.delete(id);
      showToast("success", `Hotel "${name}" deleted.`);
      loadData();
    } catch (err: any) {
      showToast("error", err?.message || "Failed to delete hotel.");
    }
  };

  const filteredHotels = hotels.filter((h) => {
    const matchesSearch =
      (h.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (h.location?.city || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (h.propertyType || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || (h.status || "active") === selectedStatus;
    const matchesStar = selectedStar === "all" || String(h.starCategory || h.starRating) === selectedStar;
    return matchesSearch && matchesStatus && matchesStar;
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
            <MaterialIcon name="hotel" className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Hotels & Luxury Resorts</h1>
            <p className="text-xs text-slate-500">
              Manage room inventories, seasonal tariffs, amenities, coordinates, and dining
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c49f27] text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
        >
          <MaterialIcon name="add" className="text-lg" />
          Add New Hotel
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
            placeholder="Search hotel name, city, tier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-[#d4af37]"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="under_review">Under Review</option>
          </select>

          <select
            value={selectedStar}
            onChange={(e) => setSelectedStar(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-[#d4af37]"
          >
            <option value="all">All Stars</option>
            <option value="5">5 Star</option>
            <option value="4">4 Star</option>
            <option value="3">3 Star</option>
            <option value="2">2 Star</option>
          </select>

          <div className="text-xs text-slate-500 font-medium whitespace-nowrap">
            Showing <span className="text-slate-900 font-bold">{filteredHotels.length}</span> properties
          </div>
        </div>
      </div>

      {/* Grid of Hotels (Light Mode Cards) */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#d4af37] mb-3" />
          <p className="text-slate-500 text-sm">Loading properties from database...</p>
        </div>
      ) : filteredHotels.length === 0 ? (
        <div className="py-20 text-center bg-white border border-dashed border-slate-300 rounded-2xl p-8">
          <MaterialIcon name="hotel" className="text-4xl text-slate-400 mb-3" />
          <h3 className="text-base font-semibold text-slate-800">No properties found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or click &quot;Add New Hotel&quot; to create your first listing.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((h) => {
            const cover = (h.images || []).find((img: any) => typeof img === "object" && img.type === "cover")?.url ||
              (typeof h.images?.[0] === "object" ? h.images[0].url : h.images?.[0]) ||
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80";

            const minRate = h.rooms?.[0]?.pricing?.basePrice || h.pricing?.basePrice || 4500;

            return (
              <div
                key={h._id}
                className="group relative bg-white border border-slate-200 hover:border-[#d4af37]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Image Cover */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={cover}
                      alt={h.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                    {/* Star & Status Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md border border-amber-200 text-[#b8860b] font-bold text-xs flex items-center gap-1 shadow-xs">
                        <MaterialIcon name="star" className="text-sm" />
                        {h.starCategory || h.starRating || 5} Star
                      </span>
                      {h.isFeatured && (
                        <span className="px-2 py-0.5 rounded-md bg-[#d4af37] text-slate-950 font-bold text-[10px] uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          h.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-300"
                        }`}
                      >
                        {h.status || "active"}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow-sm">
                      <span className="text-xs font-medium flex items-center gap-1">
                        <MaterialIcon name="location_on" className="text-amber-300 text-sm" />
                        {h.location?.city || h.address?.city || "Himachal Pradesh"}
                      </span>
                      <span className="text-xs font-semibold text-amber-300">
                        {h.propertyType || "Resort"}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#b8860b] transition-colors line-clamp-1">
                      {h.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {h.description || "Luxury accommodation with premium facilities and scenic views."}
                    </p>

                    {/* Room Stats */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MaterialIcon name="bed" className="text-[#b8860b] text-sm" />
                        <span>{h.rooms?.length || 1} Room Types</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MaterialIcon name="room_service" className="text-[#b8860b] text-sm" />
                        <span>{h.amenities?.length || 6}+ Amenities</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Tariff & Actions */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Starts from</span>
                    <span className="text-base font-extrabold text-slate-900">
                      ₹{minRate.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-slate-500"> / night</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(h)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      title="Edit Hotel"
                    >
                      <MaterialIcon name="edit" className="text-base" />
                    </button>
                    <button
                      onClick={() => handleDelete(h._id, h.name)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                      title="Delete Hotel"
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

      {/* Enterprise Full-Schema Hotel Modal (Light Mode) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-50 text-[#b8860b] border border-amber-200">
                  <MaterialIcon name="hotel" className="text-xl" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {isEditing ? `Edit Hotel: ${hotelForm.name}` : "Create New Luxury Property"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Define complete room inventory, GPS coordinates, facilities, and policies
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
                { id: "basic", label: "1. Basic & Location", icon: "domain" },
                { id: "rooms", label: "2. Rooms & Inventory", icon: "bed" },
                { id: "dining", label: "3. Facilities & Dining", icon: "restaurant" },
                { id: "policies", label: "4. Policies & Media", icon: "policy" },
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
              {/* TAB 1: BASIC & LOCATION */}
              {modalTab === "basic" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Property Name *</label>
                      <input
                        type="text"
                        required
                        value={hotelForm.name}
                        onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                        placeholder="e.g. Wildflower Hall, An Oberoi Resort"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Custom URL Slug (Optional)</label>
                      <input
                        type="text"
                        value={hotelForm.slug}
                        onChange={(e) => setHotelForm({ ...hotelForm, slug: e.target.value })}
                        placeholder="auto-generated if blank"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Destination *</label>
                      <select
                        required
                        value={hotelForm.destination}
                        onChange={(e) => setHotelForm({ ...hotelForm, destination: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="">Select Destination</option>
                        {destinations.map((d) => (
                          <option key={d._id} value={d._id}>
                            {d.name} ({d.state?.name || "India"})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Property Type *</label>
                      <select
                        value={hotelForm.propertyType}
                        onChange={(e) => setHotelForm({ ...hotelForm, propertyType: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="Luxury Resort">Luxury Resort</option>
                        <option value="Heritage Palace">Heritage Palace</option>
                        <option value="5 Star Hotel">5 Star Hotel</option>
                        <option value="Boutique Hotel">Boutique Hotel</option>
                        <option value="Luxury Villa">Luxury Villa</option>
                        <option value="Scenic Homestay">Scenic Homestay</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Star Rating (1-5)</label>
                      <select
                        value={hotelForm.starCategory}
                        onChange={(e) => setHotelForm({ ...hotelForm, starCategory: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value={5}>5 Star Luxury</option>
                        <option value={4}>4 Star Premium</option>
                        <option value={3}>3 Star Comfort</option>
                        <option value={2}>2 Star Standard</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Status</label>
                      <select
                        value={hotelForm.status}
                        onChange={(e) => setHotelForm({ ...hotelForm, status: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="active">Active (Public)</option>
                        <option value="under_review">Under Review</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Property Overview & Description *</label>
                    <textarea
                      rows={3}
                      value={hotelForm.description}
                      onChange={(e) => setHotelForm({ ...hotelForm, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  {/* Location & GPS */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold text-[#b8860b] uppercase tracking-wider flex items-center gap-1.5">
                      <MaterialIcon name="pin_drop" className="text-sm" />
                      Physical Address & GPS Coordinates
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Full Address *</label>
                        <input
                          type="text"
                          value={hotelForm.address}
                          onChange={(e) => setHotelForm({ ...hotelForm, address: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Area / Landmark *</label>
                        <input
                          type="text"
                          value={hotelForm.area}
                          onChange={(e) => setHotelForm({ ...hotelForm, area: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">City *</label>
                        <input
                          type="text"
                          value={hotelForm.city}
                          onChange={(e) => setHotelForm({ ...hotelForm, city: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">State *</label>
                        <input
                          type="text"
                          value={hotelForm.state}
                          onChange={(e) => setHotelForm({ ...hotelForm, state: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Pincode *</label>
                        <input
                          type="text"
                          value={hotelForm.pincode}
                          onChange={(e) => setHotelForm({ ...hotelForm, pincode: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Latitude (GPS)</label>
                        <input
                          type="number"
                          step="any"
                          value={hotelForm.latitude}
                          onChange={(e) => setHotelForm({ ...hotelForm, latitude: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Longitude (GPS)</label>
                        <input
                          type="number"
                          step="any"
                          value={hotelForm.longitude}
                          onChange={(e) => setHotelForm({ ...hotelForm, longitude: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Front Desk Phone *</label>
                        <input
                          type="text"
                          value={hotelForm.phone}
                          onChange={(e) => setHotelForm({ ...hotelForm, phone: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Official Email *</label>
                        <input
                          type="email"
                          value={hotelForm.email}
                          onChange={(e) => setHotelForm({ ...hotelForm, email: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ROOMS & INVENTORY */}
              {modalTab === "rooms" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Multi-Room Types & Pricing Slabs</h3>
                      <p className="text-xs text-slate-500">Configure room occupancy, bed type, size, tariffs, and availability</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddRoom}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-50 text-[#b8860b] hover:bg-amber-100 border border-amber-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <MaterialIcon name="add" className="text-sm" />
                      Add Another Room Type
                    </button>
                  </div>

                  <div className="space-y-4">
                    {hotelForm.rooms.map((room, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 relative shadow-2xs"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                          <span className="text-xs font-bold text-[#b8860b] uppercase tracking-wider">
                            Room Category #{idx + 1}
                          </span>
                          {hotelForm.rooms.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveRoom(idx)}
                              className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer font-medium"
                            >
                              <MaterialIcon name="delete" className="text-sm" />
                              Remove Room
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] text-slate-600 font-medium">Room Type Name *</label>
                            <input
                              type="text"
                              value={room.roomType}
                              onChange={(e) => handleUpdateRoom(idx, "roomType", e.target.value)}
                              placeholder="e.g. Deluxe Balcony Suite"
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] text-slate-600 font-medium">Bed Type</label>
                            <input
                              type="text"
                              value={room.bedType}
                              onChange={(e) => handleUpdateRoom(idx, "bedType", e.target.value)}
                              placeholder="King Bed / Twin Beds"
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] text-slate-600 font-medium">Room Size (sqft)</label>
                            <input
                              type="number"
                              value={room.roomSize.value}
                              onChange={(e) => handleUpdateRoom(idx, "roomSize.value", e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                            />
                          </div>
                        </div>

                        {/* Occupancy & Pricing */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 font-medium">Max Adults</label>
                            <input
                              type="number"
                              value={room.occupancy.adults}
                              onChange={(e) => handleUpdateRoom(idx, "occupancy.adults", e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-900"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 font-medium">Max Guests</label>
                            <input
                              type="number"
                              value={room.occupancy.maxGuests}
                              onChange={(e) => handleUpdateRoom(idx, "occupancy.maxGuests", e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-900"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 font-medium">Base Tariff (₹)</label>
                            <input
                              type="number"
                              value={room.pricing.basePrice}
                              onChange={(e) => handleUpdateRoom(idx, "pricing.basePrice", e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-900 font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 font-medium">Final Price (Incl Tax)</label>
                            <input
                              type="number"
                              value={room.pricing.finalPrice}
                              readOnly
                              className="w-full px-2.5 py-1.5 bg-slate-100 border border-slate-200 rounded-md text-xs text-emerald-700 font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 font-medium">Available Rooms</label>
                            <input
                              type="number"
                              value={room.availability.availableRooms}
                              onChange={(e) => handleUpdateRoom(idx, "availability.availableRooms", e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-900"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] text-slate-600 font-medium">Room Description</label>
                          <input
                            type="text"
                            value={room.description}
                            onChange={(e) => handleUpdateRoom(idx, "description", e.target.value)}
                            placeholder="Scenic view, jacuzzi, king mattress..."
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: FACILITIES & DINING */}
              {modalTab === "dining" && (
                <div className="space-y-6">
                  {/* Master Facilities Toggles */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold text-[#b8860b] uppercase tracking-wider flex items-center gap-1.5">
                      <MaterialIcon name="spa" className="text-sm" />
                      Property Facilities & Amenities
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { key: "swimmingPool", label: "Swimming Pool", icon: "pool" },
                        { key: "spa", label: "Spa & Ayurvedic Wellness", icon: "spa" },
                        { key: "gym", label: "Fitness Gym", icon: "fitness_center" },
                        { key: "restaurant", label: "Multi-Cuisine Restaurant", icon: "restaurant" },
                        { key: "conferenceRoom", label: "Conference / Banquet Hall", icon: "meeting_room" },
                        { key: "parking", label: "Free Private Parking", icon: "local_parking" },
                      ].map((fac) => (
                        <label
                          key={fac.key}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 cursor-pointer text-xs text-slate-700 font-medium shadow-2xs"
                        >
                          <input
                            type="checkbox"
                            checked={(hotelForm.facilities as any)[fac.key]}
                            onChange={(e) =>
                              setHotelForm({
                                ...hotelForm,
                                facilities: {
                                  ...hotelForm.facilities,
                                  [fac.key]: e.target.checked,
                                },
                              })
                            }
                            className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                          />
                          <MaterialIcon name={fac.icon} className="text-[#b8860b] text-sm" />
                          {fac.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Breakfast & Dining */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold text-[#b8860b] uppercase tracking-wider flex items-center gap-1.5">
                      <MaterialIcon name="free_breakfast" className="text-sm" />
                      Breakfast & On-Site Restaurants
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <label className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hotelForm.breakfast.available}
                          onChange={(e) =>
                            setHotelForm({
                              ...hotelForm,
                              breakfast: { ...hotelForm.breakfast, available: e.target.checked },
                            })
                          }
                          className="rounded text-amber-600"
                        />
                        Breakfast Available
                      </label>
                      <input
                        type="text"
                        value={hotelForm.breakfast.timing}
                        onChange={(e) =>
                          setHotelForm({
                            ...hotelForm,
                            breakfast: { ...hotelForm.breakfast, timing: e.target.value },
                          })
                        }
                        placeholder="Timing (e.g. 07:30 AM - 10:30 AM)"
                        className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        value={hotelForm.breakfast.type}
                        onChange={(e) =>
                          setHotelForm({
                            ...hotelForm,
                            breakfast: { ...hotelForm.breakfast, type: e.target.value },
                          })
                        }
                        placeholder="Type (e.g. Buffet Spread)"
                        className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Restaurants (Format: Name - Cuisine - Hours)
                      </label>
                      <textarea
                        rows={3}
                        value={hotelForm.restaurantsText}
                        onChange={(e) => setHotelForm({ ...hotelForm, restaurantsText: e.target.value })}
                        placeholder="The Pine Grill - Continental, North Indian - 12:00 PM to 11:00 PM"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: POLICIES & MEDIA */}
              {modalTab === "policies" && (
                <div className="space-y-6">
                  {/* Media URLs with Direct Cloudinary Upload */}
                  <div className="space-y-4">
                    <SingleImageUploader
                      label="Primary Hotel Cover Image"
                      value={hotelForm.coverImage}
                      onChange={(url) => setHotelForm({ ...hotelForm, coverImage: url })}
                      folder="hotels"
                      required={true}
                      helpText="Primary hero photo of the hotel facade or luxury lobby."
                    />

                    <GalleryUploader
                      label="Hotel Photo Gallery"
                      urlsText={hotelForm.galleryImages}
                      onChange={(urls) => setHotelForm({ ...hotelForm, galleryImages: urls })}
                      folder="hotels"
                      helpText="Upload resort rooms, pool, dining, views, and amenities."
                    />
                  </div>

                  {/* Rules & Checkin */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold text-[#b8860b] uppercase tracking-wider flex items-center gap-1.5">
                      <MaterialIcon name="policy" className="text-sm" />
                      Guest Policies & Timings
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Check-in Time</label>
                        <input
                          type="text"
                          value={hotelForm.checkInTime}
                          onChange={(e) => setHotelForm({ ...hotelForm, checkInTime: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Check-out Time</label>
                        <input
                          type="text"
                          value={hotelForm.checkOutTime}
                          onChange={(e) => setHotelForm({ ...hotelForm, checkOutTime: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-600 font-medium">Min Age Requirement</label>
                        <input
                          type="number"
                          value={hotelForm.ageRequirement}
                          onChange={(e) => setHotelForm({ ...hotelForm, ageRequirement: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { key: "couplesAllowed", label: "Couples Friendly" },
                        { key: "localIdsAccepted", label: "Local IDs Accepted" },
                        { key: "petsAllowed", label: "Pets Allowed" },
                        { key: "smokingAllowed", label: "Smoking Rooms" },
                        { key: "childrenAllowed", label: "Children Allowed" },
                        { key: "extraBedAvailable", label: "Extra Bed Available" },
                      ].map((pol) => (
                        <label
                          key={pol.key}
                          className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 font-medium cursor-pointer shadow-2xs"
                        >
                          <input
                            type="checkbox"
                            checked={(hotelForm.policies as any)[pol.key]}
                            onChange={(e) =>
                              setHotelForm({
                                ...hotelForm,
                                policies: {
                                  ...hotelForm.policies,
                                  [pol.key]: e.target.checked,
                                },
                              })
                            }
                            className="rounded text-amber-600"
                          />
                          {pol.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Cancellation */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold text-[#b8860b] uppercase tracking-wider">
                      Cancellation Policy & Terms
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={hotelForm.cancellationType}
                        onChange={(e) => setHotelForm({ ...hotelForm, cancellationType: e.target.value })}
                        placeholder="Policy Title (e.g. Free Cancellation)"
                        className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        value={hotelForm.freeCancellationBefore}
                        onChange={(e) => setHotelForm({ ...hotelForm, freeCancellationBefore: e.target.value })}
                        placeholder="Free before (e.g. 48 hours before check-in)"
                        className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={hotelForm.cancellationDescription}
                      onChange={(e) => setHotelForm({ ...hotelForm, cancellationDescription: e.target.value })}
                      placeholder="Policy fine print..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>

                  {/* Nearby Attractions */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Nearby Attractions (Format: Name - Distance)
                    </label>
                    <textarea
                      rows={3}
                      value={hotelForm.nearbyAttractionsText}
                      onChange={(e) => setHotelForm({ ...hotelForm, nearbyAttractionsText: e.target.value })}
                      placeholder="Mall Road - 0.5 km&#10;Jakhoo Temple - 2 km"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
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
                      Saving Property...
                    </>
                  ) : (
                    <>
                      <MaterialIcon name="save" className="text-sm" />
                      {isEditing ? "Update Hotel" : "Publish Hotel"}
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
