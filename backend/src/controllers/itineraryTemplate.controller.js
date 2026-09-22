import mongoose from "mongoose";
import ItineraryTemplate from "../models/itineraryTemplate.model.js";
import Destination from "../models/destination.model.js";

// Helper to resolve destination ObjectId from ID or slug
const resolveDestinationId = async (destParam) => {
    if (!destParam) return null;
    if (mongoose.isValidObjectId(destParam)) return destParam;
    const dest = await Destination.findOne({ slug: String(destParam).toLowerCase() });
    return dest ? dest._id : null;
};

// 1. POST /api/itinerary-templates/create - Create a template with days and activities
export const createTemplate = async (req, res) => {
    try {
        const templateData = { ...req.body };

        if (!templateData.title || !templateData.title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Template title is required",
            });
        }

        if (!templateData.destination) {
            return res.status(400).json({
                success: false,
                message: "Destination is required for template",
            });
        }

        const resolvedDestId = await resolveDestinationId(templateData.destination);
        if (!resolvedDestId) {
            return res.status(400).json({
                success: false,
                message: "Invalid destination ID or slug provided",
            });
        }
        templateData.destination = resolvedDestId;

        const template = await ItineraryTemplate.create(templateData);
        await template.populate("destination", "name slug");

        return res.status(201).json({
            success: true,
            message: "Itinerary template created successfully",
            data: template,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// 2. GET /api/itinerary-templates/get-all-templates - List templates (filters: destination, category, search)
export const getAllTemplates = async (req, res) => {
    try {
        const { destination, category, search, page, limit } = req.query;
        const filter = {};

        if (destination) {
            const destId = await resolveDestinationId(destination);
            if (destId) {
                filter.destination = destId;
            } else {
                return res.status(200).json({
                    success: true,
                    count: 0,
                    data: [],
                });
            }
        }

        if (category) {
            filter.category = { $regex: category.trim(), $options: "i" };
        }

        if (search) {
            filter.title = { $regex: search.trim(), $options: "i" };
        }

        if (page || limit) {
            const pageNum = Math.max(1, parseInt(page, 10) || 1);
            const limitNum = Math.max(1, parseInt(limit, 10) || 10);
            const skip = (pageNum - 1) * limitNum;

            const [templates, total] = await Promise.all([
                ItineraryTemplate.find(filter)
                    .populate("destination", "name slug")
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limitNum),
                ItineraryTemplate.countDocuments(filter),
            ]);

            return res.status(200).json({
                success: true,
                totalTemplates: total,
                totalPages: Math.ceil(total / limitNum),
                currentPage: pageNum,
                count: templates.length,
                data: templates,
            });
        }

        const templates = await ItineraryTemplate.find(filter)
            .populate("destination", "name slug")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: templates.length,
            data: templates,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 3. GET /api/itinerary-templates/:id - Get single template
export const getTemplateById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid template ID format",
            });
        }

        const template = await ItineraryTemplate.findById(id).populate("destination", "name slug");
        if (!template) {
            return res.status(404).json({
                success: false,
                message: "Template not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: template,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 4. PUT /api/itinerary-templates/:id - Update template by ID
export const updateTemplate = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid template ID format",
            });
        }

        const updates = { ...req.body };

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

        const updatedTemplate = await ItineraryTemplate.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        ).populate("destination", "name slug");

        if (!updatedTemplate) {
            return res.status(404).json({
                success: false,
                message: "Template not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Template updated successfully",
            data: updatedTemplate,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 5. DELETE /api/itinerary-templates/:id - Delete template by ID
export const deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid template ID format",
            });
        }

        const deleted = await ItineraryTemplate.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Template not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Template deleted successfully",
            deletedId: id,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};