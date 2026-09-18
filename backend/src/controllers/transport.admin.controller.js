import mongoose from "mongoose";
import Transport from "../models/transport.model.js";
import { generateSlug } from "../utils/generateHotelSlug.js";

// 1. POST /create - Add new vehicle (Cab, Bus, Bike, Traveller)
export const addTransport = async (req, res) => {
    try {
        const data = { ...req.body };

        // Auto-generate slug if missing
        if (!data.slug && data.title) {
            const cityPart = data.availableCities?.[0] || "";
            data.slug = `${generateSlug(data.title)}${cityPart ? `-${generateSlug(cityPart)}` : ""}`;
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

// 2. GET /get-all - Admin list with category & status filter + pagination
export const getAllTransportsAdmin = async (req, res) => {
    try {
        const { category, status, page = 1, limit = 10 } = req.query;
        const query = {};

        if (category) query.category = category;
        if (status) query.status = status;

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

// 3. GET /:id - Single vehicle details
export const getTransportByIdAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID format" });
        }

        const vehicle = await Transport.findById(id);
        if (!vehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
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

// 4. PUT /:id - Update vehicle details
export const updateTransport = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID format" });
        }

        const updates = { ...req.body };

        // Update slug if title changes
        if (updates.title && !updates.slug) {
            const cityPart = updates.availableCities?.[0] || "";
            updates.slug = `${generateSlug(updates.title)}${cityPart ? `-${generateSlug(cityPart)}` : ""}`;

            const slugClash = await Transport.findOne({ slug: updates.slug, _id: { $ne: id } });
            if (slugClash) {
                return res.status(409).json({
                    success: false,
                    message: "Generated slug already exists for another vehicle.",
                });
            }
        }

        const updatedVehicle = await Transport.findByIdAndUpdate(
            id,
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

// 5. DELETE /:id - Delete vehicle
export const deleteTransport = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID format" });
        }

        const deletedVehicle = await Transport.findByIdAndDelete(id);
        if (!deletedVehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully",
            deletedId: id,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete vehicle",
            error: error.message,
        });
    }
};