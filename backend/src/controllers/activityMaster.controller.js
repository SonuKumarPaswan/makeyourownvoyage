import ActivityMaster from "../models/activityMaster.model.js";

// Create new activity
export const createActivity = async (req, res) => {
    try {
        const activity = await ActivityMaster.create(req.body);
        return res.status(201).json({
            success: true,
            data: activity
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all activities (Optional filter by destination)
export const getAllActivities = async (req, res) => {
    try {
        const { destination } = req.query;

        const filter = destination ? { destination: new RegExp(destination, 'i') } : {};

        const activities = await ActivityMaster.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: activities.length,
            data: activities
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};