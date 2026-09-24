import mongoose from "mongoose";
import Transport from "../models/transport.model.js";
import { generateSlug } from "../utils/generateHotelSlug.js";
import { parseJsonField } from "../services/cloudinary.service.js";
import { processMediaUploads } from "../services/media.service.js";

// Helper to sanitize available cities
const sanitizeCities = (cities) => {
    if (!Array.isArray(cities)) return [];
    return cities
        .map((c) => (typeof c === "string" ? c.toLowerCase().trim() : ""))
        .filter(Boolean);
};

// 1. POST /create - Add new vehicle (Cab, Bus, Bike, Traveller)
export const addTransport = async (req, res) => {
    try {
        const data = { ...req.body };

        // Safely parse JSON strings if sent via multipart/form-data
        data.capacity = parseJsonField(data.capacity, data.capacity);
        data.specifications = parseJsonField(data.specifications, data.specifications);
        data.images = parseJsonField(data.images, data.images || []);
        data.availableCities = parseJsonField(data.availableCities, data.availableCities || []);
        data.serviceTypes = parseJsonField(data.serviceTypes, data.serviceTypes);
        data.pricing = parseJsonField(data.pricing, data.pricing);
        data.routes = parseJsonField(data.routes, data.routes);
        data.policies = parseJsonField(data.policies, data.policies);

        // Handle files and base64 uploads via reusable media service
        data.images = await processMediaUploads({
            files: req.files,
            existingImages: data.images,
            folder: "transports",
            defaultAlt: data.title || "Vehicle Image",
        });

        if (data.availableCities) {
            data.availableCities = sanitizeCities(data.availableCities);
        }

        // Auto-generate slug if missing
        if (!data.slug && data.title) {
            const cityPart = data.availableCities?.[0] || "";
            data.slug = `${generateSlug(data.title)}${cityPart ? `-${generateSlug(cityPart)}` : ""}`;
        } else if (data.slug) {
            data.slug = generateSlug(data.slug);
        }

        const existingTransport = await Transport.findOne({ slug: data.slug });
        if (existingTransport) {
            return res.status(409).json({
                success: false,
                message: "A vehicle with this slug or title already exists in this location.",
            });
        }

        const newVehicle = await Transport.create(data);

        return res.status(201).json({
            success: true,
            message: `${data.category} added successfully`,
            vehicle: newVehicle,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to add vehicle",
            error: error.message,
        });
    }
};

// 2. GET /get-all - Admin list with search, category & status filter + pagination
export const getAllTransportsAdmin = async (req, res) => {
    try {
        const { category, status, city, vehicleType, search, page = 1, limit = 10 } = req.query;
        const query = {};

        if (category) query.category = category;
        if (status) query.status = status;
        if (vehicleType) query.vehicleType = vehicleType;
        if (city) query.availableCities = { $in: [city.toLowerCase().trim()] };

        if (search) {
            query.$or = [
                { title: { $regex: search.trim(), $options: "i" } },
                { brand: { $regex: search.trim(), $options: "i" } },
                { modelName: { $regex: search.trim(), $options: "i" } },
            ];
        }

        const pageNum = Math.max(1, parseInt(page, 10));
        const limitNum = Math.max(1, parseInt(limit, 10));
        const skip = (pageNum - 1) * limitNum;

        const [vehicles, totalVehicles] = await Promise.all([
            Transport.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
            Transport.countDocuments(query),
        ]);

        return res.status(200).json({
            success: true,
            totalVehicles,
            totalPages: Math.ceil(totalVehicles / limitNum),
            currentPage: pageNum,
            vehicles,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch vehicles",
            error: error.message,
        });
    }
};

// 3. GET /:id - Single vehicle details by ID or slug
export const getTransportByIdAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        let vehicle = null;
        if (mongoose.isValidObjectId(id)) {
            vehicle = await Transport.findById(id);
        }

        if (!vehicle) {
            vehicle = await Transport.findOne({ slug: id.toLowerCase().trim() });
        }

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }

        return res.status(200).json({ success: true, vehicle });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch vehicle",
            error: error.message,
        });
    }
};

// 4. PUT /:id - Update vehicle details by ID or slug
export const updateTransport = async (req, res) => {
    try {
        const { id } = req.params;

        let transportId = id;
        if (!mongoose.isValidObjectId(id)) {
            const matched = await Transport.findOne({ slug: id.toLowerCase().trim() });
            if (matched) transportId = matched._id;
            else {
                return res.status(404).json({
                    success: false,
                    message: "Vehicle not found",
                });
            }
        }

        const updates = { ...req.body };

        // Safely parse JSON strings if sent via multipart/form-data
        if (updates.capacity) updates.capacity = parseJsonField(updates.capacity, updates.capacity);
        if (updates.specifications) updates.specifications = parseJsonField(updates.specifications, updates.specifications);
        if (updates.images) updates.images = parseJsonField(updates.images, updates.images);
        if (updates.availableCities) updates.availableCities = parseJsonField(updates.availableCities, updates.availableCities);
        if (updates.serviceTypes) updates.serviceTypes = parseJsonField(updates.serviceTypes, updates.serviceTypes);
        if (updates.pricing) updates.pricing = parseJsonField(updates.pricing, updates.pricing);
        if (updates.routes) updates.routes = parseJsonField(updates.routes, updates.routes);
        if (updates.policies) updates.policies = parseJsonField(updates.policies, updates.policies);

        // Handle files and base64 uploads via reusable media service
        updates.images = await processMediaUploads({
            files: req.files,
            existingImages: updates.images,
            folder: "transports",
            defaultAlt: updates.title || "Transport Image",
        });

        if (updates.availableCities) {
            updates.availableCities = sanitizeCities(updates.availableCities);
        }

        // Update slug if title changes
        if (updates.title && !updates.slug) {
            const current = await Transport.findById(transportId);
            const cityPart = updates.availableCities?.[0] || current?.availableCities?.[0] || "";
            updates.slug = `${generateSlug(updates.title)}${cityPart ? `-${generateSlug(cityPart)}` : ""}`;

            const slugClash = await Transport.findOne({ slug: updates.slug, _id: { $ne: transportId } });
            if (slugClash) {
                return res.status(409).json({
                    success: false,
                    message: "Generated slug already exists for another vehicle.",
                });
            }
        } else if (updates.slug) {
            updates.slug = generateSlug(updates.slug);
            const slugClash = await Transport.findOne({ slug: updates.slug, _id: { $ne: transportId } });
            if (slugClash) {
                return res.status(409).json({
                    success: false,
                    message: "Slug already exists for another vehicle.",
                });
            }
        }

        const updatedVehicle = await Transport.findByIdAndUpdate(
            transportId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedVehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            vehicle: updatedVehicle,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update vehicle",
            error: error.message,
        });
    }
};

// 5. DELETE /:id - Delete vehicle by ID or slug
export const deleteTransport = async (req, res) => {
    try {
        const { id } = req.params;

        let deletedVehicle = null;
        if (mongoose.isValidObjectId(id)) {
            deletedVehicle = await Transport.findByIdAndDelete(id);
        } else {
            deletedVehicle = await Transport.findOneAndDelete({ slug: id.toLowerCase().trim() });
        }

        if (!deletedVehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully",
            deletedId: deletedVehicle._id,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete vehicle",
            error: error.message,
        });
    }
};