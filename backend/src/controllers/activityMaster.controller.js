import mongoose from "mongoose";
import ActivityMaster from "../models/activityMaster.model.js";
import Destination from "../models/destination.model.js";

// Helper to resolve destination ObjectId from ID or slug
const resolveDestinationId = async (destParam) => {
    if (!destParam) return null;
    if (mongoose.isValidObjectId(destParam)) return destParam;
    const dest = await Destination.findOne({ slug: String(destParam).toLowerCase() });
    return dest ? dest._id : null;
};

// 1. POST /api/activities/create - Create new activity
export const createActivity = async (req, res) => {
    try {
        const data = { ...req.body };

        if (!data.title || !data.title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Activity title is required",
            });
        }

        if (!data.type) {
            return res.status(400).json({
                success: false,
                message: "Activity type is required",
            });
        }

        if (!data.destination) {
            return res.status(400).json({
                success: false,
                message: "Destination is required",
            });
        }

        const resolvedDestId = await resolveDestinationId(data.destination);
        if (!resolvedDestId) {
            return res.status(400).json({
                success: false,
                message: "Invalid destination ID or slug provided",
            });
        }
        data.destination = resolvedDestId;

        const activity = await ActivityMaster.create(data);
        await activity.populate("destination", "name slug");

        return res.status(201).json({
            success: true,
            message: "Activity created successfully",
            data: activity,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// 2. GET /api/activities/get-all-activities - Get all activities (filters: destination, type, search)
export const getAllActivities = async (req, res) => {
    try {
        const { destination, type, search, page, limit } = req.query;
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

        if (type) {
            filter.type = type;
        }

        if (search) {
            filter.title = { $regex: search.trim(), $options: "i" };
        }

        if (page || limit) {
            const pageNum = Math.max(1, parseInt(page, 10) || 1);
            const limitNum = Math.max(1, parseInt(limit, 10) || 10);
            const skip = (pageNum - 1) * limitNum;

            const [activities, total] = await Promise.all([
                ActivityMaster.find(filter)
                    .populate("destination", "name slug")
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limitNum),
                ActivityMaster.countDocuments(filter),
            ]);

            return res.status(200).json({
                success: true,
                totalActivities: total,
                totalPages: Math.ceil(total / limitNum),
                currentPage: pageNum,
                count: activities.length,
                data: activities,
            });
        }

        const activities = await ActivityMaster.find(filter)
            .populate("destination", "name slug")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: activities.length,
            data: activities,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 3. GET /api/activities/:id - Get single activity by ID
export const getActivityById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid activity ID format",
            });
        }

        const activity = await ActivityMaster.findById(id).populate("destination", "name slug");

        if (!activity) {
            return res.status(404).json({
                success: false,
                message: "Activity not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: activity,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 4. PUT /api/activities/:id - Update activity by ID
export const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid activity ID format",
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

        const updatedActivity = await ActivityMaster.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        ).populate("destination", "name slug");

        if (!updatedActivity) {
            return res.status(404).json({
                success: false,
                message: "Activity not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Activity updated successfully",
            data: updatedActivity,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 5. DELETE /api/activities/:id - Delete activity by ID
export const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid activity ID format",
            });
        }

        const deletedActivity = await ActivityMaster.findByIdAndDelete(id);

        if (!deletedActivity) {
            return res.status(404).json({
                success: false,
                message: "Activity not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Activity deleted successfully",
            deletedId: id,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};