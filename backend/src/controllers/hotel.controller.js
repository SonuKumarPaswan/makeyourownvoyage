import mongoose from "mongoose";
import Hotel from "../models/hotel.model.js";
import Destination from "../models/destination.model.js";
import { generateSlug } from "../utils/generateHotelSlug.js";
import {
    uploadToCloudinary,
    uploadMultipleToCloudinary,
    isBase64Image,
    parseJsonField,
    isCloudinaryConfigured,
} from "../services/cloudinary.service.js";

// Helper to resolve destination ObjectId from ID or slug
const resolveDestinationId = async (destParam) => {
    if (!destParam) return null;
    if (mongoose.isValidObjectId(destParam)) return destParam;
    const dest = await Destination.findOne({ slug: String(destParam).toLowerCase() });
    return dest ? dest._id : null;
};

// 1. POST /create - Hotel create karne ke liye
export const addHotel = async (req, res) => {
  try {
    const hotelData = { ...req.body };

    // Safely parse JSON strings if sent via multipart/form-data
    hotelData.location = parseJsonField(hotelData.location, hotelData.location);
    hotelData.contact = parseJsonField(hotelData.contact, hotelData.contact);
    hotelData.amenities = parseJsonField(hotelData.amenities, hotelData.amenities);
    hotelData.rooms = parseJsonField(hotelData.rooms, hotelData.rooms);
    hotelData.policies = parseJsonField(hotelData.policies, hotelData.policies);
    hotelData.images = parseJsonField(hotelData.images, hotelData.images || []);

    // Handle files uploaded via Multer (multipart form)
    if (req.files && Array.isArray(req.files) && req.files.length > 0 && isCloudinaryConfigured()) {
      const uploaded = await uploadMultipleToCloudinary(req.files, "makeyourownvoyage/hotels");
      const formatted = uploaded.map((img, idx) => ({
        url: img.secure_url,
        alt: hotelData.name || "Hotel Image",
        type: idx === 0 && (!hotelData.images || hotelData.images.length === 0) ? "cover" : "room",
        order: (Array.isArray(hotelData.images) ? hotelData.images.length : 0) + idx + 1,
      }));
      hotelData.images = Array.isArray(hotelData.images)
        ? [...hotelData.images, ...formatted]
        : formatted;
    }

    // Handle any Base64 strings sent in hotelData.images
    if (Array.isArray(hotelData.images) && isCloudinaryConfigured()) {
      for (let i = 0; i < hotelData.images.length; i++) {
        const item = hotelData.images[i];
        if (typeof item === "string" && isBase64Image(item)) {
          const uploaded = await uploadToCloudinary(item, "makeyourownvoyage/hotels");
          hotelData.images[i] = {
            url: uploaded.secure_url,
            alt: hotelData.name || "Hotel Image",
            type: i === 0 ? "cover" : "room",
            order: i + 1,
          };
        } else if (item && typeof item === "object" && isBase64Image(item.url)) {
          const uploaded = await uploadToCloudinary(item.url, "makeyourownvoyage/hotels");
          item.url = uploaded.secure_url;
        }
      }
    }

    const resolvedDestId = await resolveDestinationId(hotelData.destination);
    if (!resolvedDestId) {
      return res.status(400).json({
        success: false,
        message: "Invalid destination ID or slug provided",
      });
    }
    hotelData.destination = resolvedDestId;

    // Ensure lowercase city
    if (hotelData.location?.city) {
      hotelData.location.city = hotelData.location.city.toLowerCase().trim();
    }

    // Generate slug without newlines or extra whitespace
    if (!hotelData.slug && hotelData.name) {
      const cityPart = hotelData.location?.city || "";
      hotelData.slug = `${generateSlug(hotelData.name)}${cityPart ? `-${generateSlug(cityPart)}` : ""}`;
    } else if (hotelData.slug) {
      hotelData.slug = generateSlug(hotelData.slug);
    }

    // Check duplicate slug
    const existingHotel = await Hotel.findOne({ slug: hotelData.slug });
    if (existingHotel) {
      return res.status(409).json({
        success: false,
        message: "Hotel with this slug or name already exists in this location.",
      });
    }

    // Auto-calculate room pricing if taxAmount or finalPrice omitted
    if (Array.isArray(hotelData.rooms)) {
      hotelData.rooms = hotelData.rooms.map((room) => {
        if (room.pricing && typeof room.pricing.basePrice === "number") {
          const taxPct = typeof room.pricing.taxPercentage === "number" ? room.pricing.taxPercentage : 18;
          if (room.pricing.taxAmount === undefined) {
            room.pricing.taxAmount = Math.round((room.pricing.basePrice * taxPct) / 100);
          }
          if (room.pricing.finalPrice === undefined) {
            room.pricing.finalPrice = room.pricing.basePrice + room.pricing.taxAmount;
          }
        }
        return room;
      });
    }

    const hotel = await Hotel.create(hotelData);
    await hotel.populate("destination", "name slug");

    return res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      hotel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create hotel",
      error: error.message,
    });
  }
};

// 2. GET /get-all - Saare hotels fetch karne ke liye (Admin with filters and pagination)
export const getAllHotelsAdmin = async (req, res) => {
  try {
    const { search, city, destination, propertyType, status, starCategory, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { "location.city": { $regex: search.trim(), $options: "i" } },
      ];
    }

    if (city) {
      query["location.city"] = city.toLowerCase().trim();
    }

    if (propertyType) {
      query.propertyType = { $regex: propertyType.trim(), $options: "i" };
    }

    if (status) {
      query.status = status;
    }

    if (starCategory) {
      query.starCategory = Number(starCategory);
    }

    if (destination) {
      const destId = await resolveDestinationId(destination);
      if (destId) {
        query.destination = destId;
      } else {
        return res.status(200).json({
          success: true,
          totalHotels: 0,
          totalPages: 0,
          currentPage: Number(page),
          hotels: [],
        });
      }
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const [hotels, totalHotels] = await Promise.all([
      Hotel.find(query)
        .populate("destination", "name slug")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Hotel.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      totalHotels,
      totalPages: Math.ceil(totalHotels / limitNum),
      currentPage: pageNum,
      hotels,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch hotels",
      error: error.message,
    });
  }
};

// 3. GET /:id - Single hotel fetch karne ke liye by ID or slug
export const getHotelByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    let hotel = null;
    if (mongoose.isValidObjectId(id)) {
      hotel = await Hotel.findById(id).populate("destination", "name slug");
    }

    if (!hotel) {
      hotel = await Hotel.findOne({ slug: id.toLowerCase() }).populate("destination", "name slug");
    }

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    return res.status(200).json({
      success: true,
      hotel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch hotel details",
      error: error.message,
    });
  }
};

// 4. PUT /:id - Hotel update/edit karne ke liye
export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;

    let hotelId = id;
    if (!mongoose.isValidObjectId(id)) {
      const matched = await Hotel.findOne({ slug: id.toLowerCase() });
      if (matched) hotelId = matched._id;
      else {
        return res.status(404).json({
          success: false,
          message: "Hotel not found",
        });
      }
    }

    const updates = { ...req.body };

    // Safely parse JSON strings if sent via multipart/form-data
    if (updates.location) updates.location = parseJsonField(updates.location, updates.location);
    if (updates.contact) updates.contact = parseJsonField(updates.contact, updates.contact);
    if (updates.amenities) updates.amenities = parseJsonField(updates.amenities, updates.amenities);
    if (updates.rooms) updates.rooms = parseJsonField(updates.rooms, updates.rooms);
    if (updates.policies) updates.policies = parseJsonField(updates.policies, updates.policies);
    if (updates.images) updates.images = parseJsonField(updates.images, updates.images);

    // Handle files uploaded via Multer
    if (req.files && Array.isArray(req.files) && req.files.length > 0 && isCloudinaryConfigured()) {
      const uploaded = await uploadMultipleToCloudinary(req.files, "makeyourownvoyage/hotels");
      const formatted = uploaded.map((img, idx) => ({
        url: img.secure_url,
        alt: updates.name || "Hotel Image",
        type: "room",
        order: idx + 1,
      }));
      updates.images = Array.isArray(updates.images)
        ? [...updates.images, ...formatted]
        : formatted;
    }

    // Handle any Base64 strings sent in updates.images
    if (Array.isArray(updates.images) && isCloudinaryConfigured()) {
      for (let i = 0; i < updates.images.length; i++) {
        const item = updates.images[i];
        if (typeof item === "string" && isBase64Image(item)) {
          const uploaded = await uploadToCloudinary(item, "makeyourownvoyage/hotels");
          updates.images[i] = {
            url: uploaded.secure_url,
            alt: updates.name || "Hotel Image",
            type: "room",
            order: i + 1,
          };
        } else if (item && typeof item === "object" && isBase64Image(item.url)) {
          const uploaded = await uploadToCloudinary(item.url, "makeyourownvoyage/hotels");
          item.url = uploaded.secure_url;
        }
      }
    }

    if (updates.destination) {
      const destId = await resolveDestinationId(updates.destination);
      if (!destId) {
        return res.status(400).json({
          success: false,
          message: "Invalid destination ID or slug provided",
        });
      }
      updates.destination = destId;
    }

    if (updates.location?.city) {
      updates.location.city = updates.location.city.toLowerCase().trim();
    }

    // Slug update
    if ((updates.name || updates.location?.city) && !updates.slug) {
      const existingHotel = await Hotel.findById(hotelId).select("name location.city");
      if (!existingHotel) {
        return res.status(404).json({
          success: false,
          message: "Hotel not found",
        });
      }

      const targetName = updates.name || existingHotel.name;
      const targetCity = updates.location?.city || existingHotel.location?.city || "";
      updates.slug = `${generateSlug(targetName)}${targetCity ? `-${generateSlug(targetCity)}` : ""}`;

      const slugClash = await Hotel.findOne({
        slug: updates.slug,
        _id: { $ne: hotelId },
      });

      if (slugClash) {
        return res.status(409).json({
          success: false,
          message: "Updated name/city generates a slug that already belongs to another hotel.",
        });
      }
    } else if (updates.slug) {
      updates.slug = generateSlug(updates.slug);
      const slugClash = await Hotel.findOne({
        slug: updates.slug,
        _id: { $ne: hotelId },
      });
      if (slugClash) {
        return res.status(409).json({
          success: false,
          message: "Slug already exists for another hotel",
        });
      }
    }

    if (Array.isArray(updates.rooms)) {
      updates.rooms = updates.rooms.map((room) => {
        if (room.pricing && typeof room.pricing.basePrice === "number") {
          const taxPct = typeof room.pricing.taxPercentage === "number" ? room.pricing.taxPercentage : 18;
          if (room.pricing.taxAmount === undefined) {
            room.pricing.taxAmount = Math.round((room.pricing.basePrice * taxPct) / 100);
          }
          if (room.pricing.finalPrice === undefined) {
            room.pricing.finalPrice = room.pricing.basePrice + room.pricing.taxAmount;
          }
        }
        return room;
      });
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate("destination", "name slug");

    if (!updatedHotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      hotel: updatedHotel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update hotel",
      error: error.message,
    });
  }
};

// 5. DELETE /:id - Hotel delete karne ke liye
export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    let deletedHotel = null;
    if (mongoose.isValidObjectId(id)) {
      deletedHotel = await Hotel.findByIdAndDelete(id);
    } else {
      deletedHotel = await Hotel.findOneAndDelete({ slug: id.toLowerCase() });
    }

    if (!deletedHotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
      deletedHotelId: deletedHotel._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete hotel",
      error: error.message,
    });
  }
};