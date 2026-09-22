import mongoose from "mongoose";
import Faq from "../models/faq.model.js";
import Destination from "../models/destination.model.js";

// Helper to resolve destination ObjectId from ID or slug
const resolveDestinationId = async (destParam) => {
    if (!destParam) return null;
    const cleanParam = String(destParam).trim();

    if (mongoose.isValidObjectId(cleanParam)) {
        return cleanParam;
    }

    const matchedDest = await Destination.findOne({
        $or: [
            { slug: cleanParam.toLowerCase() },
            { name: { $regex: new RegExp(`^${cleanParam}$`, "i") } },
        ],
    });

    return matchedDest ? matchedDest._id : null;
};

// 1. POST /api/faqs - Create a new FAQ (Admin only)
export const createFaq = async (req, res) => {
    try {
        const { question, answer, destination, order, isPublished } = req.body;

        if (!question || !String(question).trim()) {
            return res.status(400).json({
                success: false,
                message: "Question is required",
            });
        }

        if (!answer || !String(answer).trim()) {
            return res.status(400).json({
                success: false,
                message: "Answer is required",
            });
        }

        let resolvedDestinationId = null;
        if (destination) {
            resolvedDestinationId = await resolveDestinationId(destination);
            if (!resolvedDestinationId && !mongoose.isValidObjectId(destination)) {
                return res.status(400).json({
                    success: false,
                    message: "Specified destination was not found",
                });
            }
        }

        const newFaq = await Faq.create({
            question: String(question).trim(),
            answer: String(answer).trim(),
            destination: resolvedDestinationId,
            order: order !== undefined ? Number(order) : 0,
            isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        });

        const populatedFaq = await Faq.findById(newFaq._id).populate("destination", "name slug");

        return res.status(201).json({
            success: true,
            message: "FAQ created successfully",
            data: populatedFaq,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create FAQ",
            error: error.message,
        });
    }
};

// 2. GET /api/faqs - Get all FAQs with optional filters (Public)
export const getFaqs = async (req, res) => {
    try {
        const { destination, search, isPublished, page, limit } = req.query;

        const filter = {};

        // Filter by publication status (default: only published for public users)
        if (isPublished !== undefined) {
            if (isPublished !== "all") {
                filter.isPublished = isPublished === "true";
            }
        } else {
            filter.isPublished = true;
        }

        // Filter by destination (by slug or ObjectId)
        if (destination) {
            if (destination.toLowerCase() === "general" || destination === "null") {
                filter.destination = null;
            } else {
                const destId = await resolveDestinationId(destination);
                if (destId) {
                    filter.destination = destId;
                } else {
                    return res.status(200).json({
                        success: true,
                        count: 0,
                        total: 0,
                        data: [],
                    });
                }
            }
        }

        // Text search across question and answer
        if (search && search.trim()) {
            filter.$or = [
                { question: { $regex: search.trim(), $options: "i" } },
                { answer: { $regex: search.trim(), $options: "i" } },
            ];
        }

        const query = Faq.find(filter)
            .populate("destination", "name slug")
            .sort({ order: 1, createdAt: -1 });

        if (page && limit) {
            const pageNum = Math.max(1, Number(page));
            const limitNum = Math.max(1, Number(limit));
            query.skip((pageNum - 1) * limitNum).limit(limitNum);
        }

        const [faqs, totalCount] = await Promise.all([
            query.exec(),
            Faq.countDocuments(filter),
        ]);

        return res.status(200).json({
            success: true,
            count: faqs.length,
            total: totalCount,
            data: faqs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch FAQs",
            error: error.message,
        });
    }
};

// 3. GET /api/faqs/:id - Get single FAQ by ID (Public)
export const getFaqById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid FAQ ID format",
            });
        }

        const faq = await Faq.findById(id).populate("destination", "name slug");
        if (!faq) {
            return res.status(404).json({
                success: false,
                message: "FAQ not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: faq,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch FAQ",
            error: error.message,
        });
    }
};

// 4. PUT /api/faqs/:id - Update FAQ (Admin only)
export const updateFaq = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid FAQ ID format",
            });
        }

        const updateData = {};
        if (req.body.question !== undefined) updateData.question = String(req.body.question).trim();
        if (req.body.answer !== undefined) updateData.answer = String(req.body.answer).trim();
        if (req.body.order !== undefined) updateData.order = Number(req.body.order);
        if (req.body.isPublished !== undefined) updateData.isPublished = Boolean(req.body.isPublished);

        if (req.body.destination !== undefined) {
            if (req.body.destination === null || req.body.destination === "" || req.body.destination === "null") {
                updateData.destination = null;
            } else {
                const destId = await resolveDestinationId(req.body.destination);
                if (!destId && !mongoose.isValidObjectId(req.body.destination)) {
                    return res.status(400).json({
                        success: false,
                        message: "Specified destination was not found",
                    });
                }
                updateData.destination = destId;
            }
        }

        const updatedFaq = await Faq.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate("destination", "name slug");

        if (!updatedFaq) {
            return res.status(404).json({
                success: false,
                message: "FAQ not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "FAQ updated successfully",
            data: updatedFaq,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update FAQ",
            error: error.message,
        });
    }
};

// 5. DELETE /api/faqs/:id - Delete FAQ (Admin only)
export const deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid FAQ ID format",
            });
        }

        const deletedFaq = await Faq.findByIdAndDelete(id);
        if (!deletedFaq) {
            return res.status(404).json({
                success: false,
                message: "FAQ not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "FAQ deleted successfully",
            deletedId: id,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete FAQ",
            error: error.message,
        });
    }
};
