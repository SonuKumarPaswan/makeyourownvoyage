import mongoose from "mongoose";
import Destination from "../models/destination.model.js";
import State from "../models/state.model.js";
import Package from "../models/package.model.js";
import Hotel from "../models/hotel.model.js";
import ActivityMaster from "../models/activityMaster.model.js";
import Faq from "../models/faq.model.js";
import { generateSlug } from "../utils/generateHotelSlug.js";

// Helper to resolve destination by slug or ObjectId
const resolveDestination = async (identifier) => {
    if (!identifier) return null;
    const cleanId = String(identifier).trim();

    if (mongoose.isValidObjectId(cleanId)) {
        const dest = await Destination.findById(cleanId);
        if (dest) return dest;
    }
    return await Destination.findOne({ slug: cleanId.toLowerCase() });
};

// 1. POST /api/destinations - Create a new destination
export const createDestination = async (req, res) => {
    try {
        const destData = { ...req.body };

        if (!destData.name || !destData.name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Destination name is required",
            });
        }

        if (!destData.state) {
            return res.status(400).json({
                success: false,
                message: "State ID or slug is required for a destination",
            });
        }

        // Validate or resolve state
        let stateId = destData.state;
        if (!mongoose.isValidObjectId(stateId)) {
            const matchedState = await State.findOne({ slug: String(stateId).toLowerCase() });
            if (!matchedState) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid state ID or slug provided",
                });
            }
            stateId = matchedState._id;
        }
        destData.state = stateId;

        // Slug generation
        if (!destData.slug || !destData.slug.trim()) {
            destData.slug = generateSlug(destData.name);
        } else {
            destData.slug = generateSlug(destData.slug);
        }

        // Check duplicate within the same state
        const existingDestination = await Destination.findOne({
            state: stateId,
            slug: destData.slug,
        });

        if (existingDestination) {
            return res.status(409).json({
                success: false,
                message: "A destination with this slug already exists in this state",
            });
        }

        const destination = await Destination.create(destData);
        await destination.populate("state", "name slug image");

        return res.status(201).json({
            success: true,
            message: "Destination created successfully",
            data: destination,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create destination",
            error: error.message,
        });
    }
};

// 2. GET /api/destinations - Get all destinations (with filters, search, pagination)
export const getAllDestinations = async (req, res) => {
    try {
        const { state, type, search, isPublished, page, limit, sortBy } = req.query;
        const query = {};

        if (search) {
            query.name = { $regex: search.trim(), $options: "i" };
        }

        if (type) {
            query.type = { $in: type.split(",").map((t) => t.trim().toLowerCase()) };
        }

        if (isPublished !== undefined) {
            query.isPublished = isPublished === "true";
        }

        // Resolve state filter if provided by slug or ObjectId
        if (state) {
            if (mongoose.isValidObjectId(state)) {
                query.state = state;
            } else {
                const matchedState = await State.findOne({ slug: state.toLowerCase() });
                if (matchedState) {
                    query.state = matchedState._id;
                } else {
                    return res.status(200).json({
                        success: true,
                        count: 0,
                        data: [],
                    });
                }
            }
        }

        let sort = { name: 1 };
        if (sortBy === "createdAt_desc") sort = { createdAt: -1 };
        else if (sortBy === "name_desc") sort = { name: -1 };

        if (page || limit) {
            const pageNum = Math.max(1, parseInt(page, 10) || 1);
            const limitNum = Math.max(1, parseInt(limit, 10) || 10);
            const skip = (pageNum - 1) * limitNum;

            const [destinations, totalDestinations] = await Promise.all([
                Destination.find(query)
                    .populate("state", "name slug")
                    .sort(sort)
                    .skip(skip)
                    .limit(limitNum),
                Destination.countDocuments(query),
            ]);

            return res.status(200).json({
                success: true,
                totalDestinations,
                totalPages: Math.ceil(totalDestinations / limitNum),
                currentPage: pageNum,
                count: destinations.length,
                data: destinations,
            });
        }

        const destinations = await Destination.find(query)
            .populate("state", "name slug")
            .sort(sort);

        return res.status(200).json({
            success: true,
            count: destinations.length,
            data: destinations,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch destinations",
            error: error.message,
        });
    }
};

// 3. GET /api/destinations/:slug - Get single destination by slug (or fallback by ID)
export const getDestinationBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const destination = await resolveDestination(slug);

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        await destination.populate("state", "name slug image");

        return res.status(200).json({
            success: true,
            data: destination,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch destination details",
            error: error.message,
        });
    }
};

// 4. PUT /api/destinations/:id - Update destination by ID
export const updateDestination = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid destination ID format",
            });
        }

        const updates = { ...req.body };

        // Handle slug formatting or auto-regeneration
        if (updates.name && !updates.slug) {
            updates.slug = generateSlug(updates.name);
        } else if (updates.slug) {
            updates.slug = generateSlug(updates.slug);
        }

        // Validate state reference if updated
        if (updates.state) {
            if (!mongoose.isValidObjectId(updates.state)) {
                const matchedState = await State.findOne({ slug: String(updates.state).toLowerCase() });
                if (!matchedState) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid state ID or slug provided",
                    });
                }
                updates.state = matchedState._id;
            }
        }

        // Check slug conflict if slug or state updated
        if (updates.slug || updates.state) {
            const currentDoc = await Destination.findById(id);
            if (!currentDoc) {
                return res.status(404).json({
                    success: false,
                    message: "Destination not found",
                });
            }

            const targetState = updates.state || currentDoc.state;
            const targetSlug = updates.slug || currentDoc.slug;

            const existingClash = await Destination.findOne({
                _id: { $ne: id },
                state: targetState,
                slug: targetSlug,
            });

            if (existingClash) {
                return res.status(409).json({
                    success: false,
                    message: "Another destination in this state already uses this slug",
                });
            }
        }

        const updatedDestination = await Destination.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        ).populate("state", "name slug");

        if (!updatedDestination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Destination updated successfully",
            data: updatedDestination,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update destination",
            error: error.message,
        });
    }
};

// 5. DELETE /api/destinations/:id - Delete destination by ID
export const deleteDestination = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid destination ID format",
            });
        }

        const deletedDestination = await Destination.findByIdAndDelete(id);

        if (!deletedDestination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Destination deleted successfully",
            deletedId: id,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete destination",
            error: error.message,
        });
    }
};

// 6. GET /api/destinations/:destinationId/packages - Packages for destination
export const getDestinationPackages = async (req, res) => {
    try {
        const { destinationId } = req.params;
        const destination = await resolveDestination(destinationId);

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        const packages = await Package.find({
            destination: destination._id,
            isActive: true,
        })
            .populate("primaryHotel", "name rating location.city images starCategory")
            .populate("primaryTransport", "vehicleType capacity brand modelName")
            .sort({ isFeatured: -1, createdAt: -1 });

        return res.status(200).json({
            success: true,
            destination: {
                _id: destination._id,
                name: destination.name,
                slug: destination.slug,
            },
            count: packages.length,
            data: packages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch destination packages",
            error: error.message,
        });
    }
};

// 7. GET /api/destinations/:destinationId/hotels - Hotels for destination
export const getDestinationHotels = async (req, res) => {
    try {
        const { destinationId } = req.params;
        const destination = await resolveDestination(destinationId);

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        const hotels = await Hotel.find({
            destination: destination._id,
            status: "active",
        })
            .select("-rooms.pricing.taxAmount -rooms.pricing.taxPercentage")
            .sort({ isFeatured: -1, "rating.average": -1 });

        return res.status(200).json({
            success: true,
            destination: {
                _id: destination._id,
                name: destination.name,
                slug: destination.slug,
            },
            count: hotels.length,
            data: hotels,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch destination hotels",
            error: error.message,
        });
    }
};

// 8. GET /api/destinations/:destinationId/activities - Activities for destination
export const getDestinationActivities = async (req, res) => {
    try {
        const { destinationId } = req.params;
        const destination = await resolveDestination(destinationId);

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        const activities = await ActivityMaster.find({
            destination: destination._id,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            destination: {
                _id: destination._id,
                name: destination.name,
                slug: destination.slug,
            },
            count: activities.length,
            data: activities,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch destination activities",
            error: error.message,
        });
    }
};

// 9. GET /api/destinations/:destinationId/faqs - FAQs for destination
export const getDestinationFaqs = async (req, res) => {
    try {
        const { destinationId } = req.params;
        const destination = await resolveDestination(destinationId);

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        const faqs = await Faq.find({
            destination: destination._id,
            isPublished: true,
        }).sort({ order: 1, createdAt: -1 });

        return res.status(200).json({
            success: true,
            destination: {
                _id: destination._id,
                name: destination.name,
                slug: destination.slug,
            },
            count: faqs.length,
            data: faqs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch destination FAQs",
            error: error.message,
        });
    }
};

// 10. GET /api/destinations/:destinationId/guides - Complete travel guide for destination
export const getDestinationGuides = async (req, res) => {
    try {
        const { destinationId } = req.params;
        const destination = await resolveDestination(destinationId);

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found",
            });
        }

        await destination.populate("state", "name slug");

        const guideData = {
            destinationId: destination._id,
            name: destination.name,
            slug: destination.slug,
            state: destination.state,
            country: destination.country,
            shortDescription: destination.shortDescription,
            description: destination.description,
            type: destination.type,
            location: destination.location,
            bestTimeToVisit: destination.bestTimeToVisit,
            recommendedDuration: destination.recommendedDuration,
            howToReach: destination.howToReach,
            estimatedBudget: destination.estimatedBudget,
            attractions: destination.attractions,
            activities: destination.activities,
            suitableFor: destination.suitableFor,
            travelTips: destination.travelTips,
            images: destination.images,
            seo: destination.seo,
        };

        return res.status(200).json({
            success: true,
            data: guideData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch destination travel guide",
            error: error.message,
        });
    }
};
