import mongoose from "mongoose";
import { generateSlug } from "../utils/generateHotelSlug.js";
import State from "../models/state.model.js";

// 1. POST /api/states - Create a new state
export const createState = async (req, res) => {
    try {
        const { name, description, image, isPublished } = req.body;
        let slug = req.body.slug;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "State name is required",
            });
        }

        // Auto-generate slug if not provided
        if (!slug || !slug.trim()) {
            slug = generateSlug(name);
        } else {
            slug = generateSlug(slug);
        }

        // Check if state with same name or slug already exists
        const existingState = await State.findOne({
            $or: [
                { name: { $regex: new RegExp(`^${name.trim()}$`, "i") } },
                { slug },
            ],
        });

        if (existingState) {
            return res.status(409).json({
                success: false,
                message: "A state with this name or slug already exists",
            });
        }

        const state = await State.create({
            name: name.trim(),
            slug,
            description: description || "",
            image: image || {},
            isPublished: isPublished !== undefined ? isPublished : true,
        });

        return res.status(201).json({
            success: true,
            message: "State created successfully",
            data: state,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create state",
            error: error.message,
        });
    }
};

// 2. GET /api/states - Get all states (Supports search, filter by isPublished, pagination)
export const getAllStates = async (req, res) => {
    try {
        const { search, isPublished, page, limit, sortBy } = req.query;
        const query = {};

        if (search) {
            query.name = { $regex: search.trim(), $options: "i" };
        }

        if (isPublished !== undefined) {
            query.isPublished = isPublished === "true";
        }

        // Sort options
        let sort = { name: 1 };
        if (sortBy === "createdAt_desc") {
            sort = { createdAt: -1 };
        } else if (sortBy === "name_desc") {
            sort = { name: -1 };
        }

        // Pagination if page or limit provided
        if (page || limit) {
            const pageNum = Math.max(1, parseInt(page, 10) || 1);
            const limitNum = Math.max(1, parseInt(limit, 10) || 10);
            const skip = (pageNum - 1) * limitNum;

            const [states, totalStates] = await Promise.all([
                State.find(query).sort(sort).skip(skip).limit(limitNum),
                State.countDocuments(query),
            ]);

            return res.status(200).json({
                success: true,
                totalStates,
                totalPages: Math.ceil(totalStates / limitNum),
                currentPage: pageNum,
                count: states.length,
                data: states,
            });
        }

        const states = await State.find(query).sort(sort);

        return res.status(200).json({
            success: true,
            count: states.length,
            data: states,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch states",
            error: error.message,
        });
    }
};

// 3. GET /api/states/:slug - Get single state by slug (or fallback by ID)
export const getStateBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        if (!slug) {
            return res.status(400).json({
                success: false,
                message: "Slug parameter is required",
            });
        }

        const cleanSlug = slug.toLowerCase().trim();

        // Query by slug first
        let state = await State.findOne({ slug: cleanSlug });

        // If not found and slug is a valid MongoDB ObjectId, attempt fallback by ID
        if (!state && mongoose.isValidObjectId(slug)) {
            state = await State.findById(slug);
        }

        if (!state) {
            return res.status(404).json({
                success: false,
                message: "State not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: state,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch state details",
            error: error.message,
        });
    }
};

// 4. PUT /api/states/:id - Update state by ID
export const updateState = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid state ID format",
            });
        }

        const updates = { ...req.body };

        // Handle slug updates or name change without explicit slug
        if (updates.name && !updates.slug) {
            updates.slug = generateSlug(updates.name);
        } else if (updates.slug) {
            updates.slug = generateSlug(updates.slug);
        }

        // Check uniqueness if name or slug updated
        if (updates.name || updates.slug) {
            const conflictQuery = {
                _id: { $ne: id },
                $or: [],
            };

            if (updates.name) {
                conflictQuery.$or.push({
                    name: { $regex: new RegExp(`^${updates.name.trim()}$`, "i") },
                });
            }
            if (updates.slug) {
                conflictQuery.$or.push({ slug: updates.slug });
            }

            const existingState = await State.findOne(conflictQuery);
            if (existingState) {
                return res.status(409).json({
                    success: false,
                    message: "A state with this name or slug already exists",
                });
            }
        }

        if (updates.name) {
            updates.name = updates.name.trim();
        }

        const updatedState = await State.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedState) {
            return res.status(404).json({
                success: false,
                message: "State not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "State updated successfully",
            data: updatedState,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update state",
            error: error.message,
        });
    }
};

// 5. DELETE /api/states/:id - Delete state by ID
export const deleteState = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid state ID format",
            });
        }

        const deletedState = await State.findByIdAndDelete(id);

        if (!deletedState) {
            return res.status(404).json({
                success: false,
                message: "State not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "State deleted successfully",
            deletedId: id,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete state",
            error: error.message,
        });
    }
};
