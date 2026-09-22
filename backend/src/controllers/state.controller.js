import mongoose from "mongoose";
import { generateSlug } from "../utils/generateHotelSlug.js";
import State from "../models/state.model.js";
import Destination from "../models/destination.model.js";
import Package from "../models/package.model.js";
import Hotel from "../models/hotel.model.js";
import Transport from "../models/transport.model.js";
import {
    uploadToCloudinary,
    isBase64Image,
    parseJsonField,
    isCloudinaryConfigured,
} from "../services/cloudinary.service.js";

// 1. POST /api/states - Create a new state
export const createState = async (req, res) => {
    try {
        let { name, description, isPublished } = req.body;
        let image = parseJsonField(req.body.image, req.body.image || {});
        let slug = req.body.slug;

        // Handle file uploaded via Multer
        if (req.file && isCloudinaryConfigured()) {
            const uploaded = await uploadToCloudinary(req.file, "makeyourownvoyage/states");
            image = {
                url: uploaded.secure_url,
                alt: name || "State Image",
            };
        } else if (typeof image === "string") {
            if (isBase64Image(image) && isCloudinaryConfigured()) {
                const uploaded = await uploadToCloudinary(image, "makeyourownvoyage/states");
                image = { url: uploaded.secure_url, alt: name || "State Image" };
            } else {
                image = { url: image, alt: name || "State Image" };
            }
        } else if (image && image.url && isBase64Image(image.url) && isCloudinaryConfigured()) {
            const uploaded = await uploadToCloudinary(image.url, "makeyourownvoyage/states");
            image.url = uploaded.secure_url;
        }

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

        if (updates.image) {
            updates.image = parseJsonField(updates.image, updates.image);
        }

        // Handle file uploaded via Multer
        if (req.file && isCloudinaryConfigured()) {
            const uploaded = await uploadToCloudinary(req.file, "makeyourownvoyage/states");
            updates.image = {
                url: uploaded.secure_url,
                alt: updates.name || "State Image",
            };
        } else if (typeof updates.image === "string") {
            if (isBase64Image(updates.image) && isCloudinaryConfigured()) {
                const uploaded = await uploadToCloudinary(updates.image, "makeyourownvoyage/states");
                updates.image = { url: uploaded.secure_url, alt: updates.name || "State Image" };
            } else {
                updates.image = { url: updates.image, alt: updates.name || "State Image" };
            }
        } else if (updates.image && updates.image.url && isBase64Image(updates.image.url) && isCloudinaryConfigured()) {
            const uploaded = await uploadToCloudinary(updates.image.url, "makeyourownvoyage/states");
            updates.image.url = uploaded.secure_url;
        }

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


export const getStateFullDetails = async (req, res) => {
    try {
        const { slug } = req.params;

        // 1. Find State by slug
        const state = await State.findOne({ slug }).lean();
        if (!state) {
            return res.status(404).json({ success: false, message: "State not found" });
        }

        // 2. State ke saare Destinations nikalo
        const destinations = await Destination.find({
            $or: [{ state: state._id }, { state: state.name }]
        }).lean();

        const destinationNames = destinations.map((d) => d.name);
        const destinationIds = destinations.map((d) => d._id);

        // 3. Parallel Fetch: Packages, Hotels, Transports mapped to this State
        const lowerDestinationNames = destinationNames.map((n) => n.toLowerCase());
        const [packages, hotels, transports] = await Promise.all([
            // Packages in this state or its destinations
            Package.find({
                isActive: true,
                $or: [
                    { destination: { $in: destinationIds } },
                    { region: { $regex: new RegExp(state.name, "i") } },
                ]
            })
                .select("title slug duration days nights startingPrice image packageType isFeatured")
                .limit(12)
                .lean(),

            // Hotels in these destinations or state/city matches
            Hotel.find({
                status: "active",
                $or: [
                    { destination: { $in: destinationIds } },
                    { "location.state": { $regex: new RegExp(state.name, "i") } },
                    { "location.city": { $in: lowerDestinationNames } }
                ]
            })
                .select("name slug propertyType starCategory location rooms images")
                .limit(12)
                .lean(),

            // Transports operating in this state/city
            Transport.find({
                status: "active",
                $or: [
                    { availableCities: { $in: lowerDestinationNames } },
                    { availableCities: { $in: [state.name.toLowerCase()] } }
                ]
            })
                .select("title slug category vehicleType brand modelName capacity pricing images availableCities")
                .limit(10)
                .lean()
        ]);

        return res.status(200).json({
            success: true,
            data: {
                state,
                destinations,
                packages,
                hotels,
                transports
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching state voyage catalog",
            error: error.message
        });
    }
};