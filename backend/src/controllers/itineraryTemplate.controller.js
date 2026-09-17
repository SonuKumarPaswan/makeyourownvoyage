import ItineraryTemplate from "../models/itineraryTemplate.model.js";

// Create a template with days and activities
export const createTemplate = async (req, res) => {
    try {
        const template = await ItineraryTemplate.create(req.body);
        return res.status(201).json({
            success: true,
            data: template
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// List templates by destination
export const getAllTemplates = async (req, res) => {
    try {
        const { destination } = req.query;

        const filter = destination ? { destination: new RegExp(destination, 'i') } : {};

        const templates = await ItineraryTemplate.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: templates.length,
            data: templates
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single template
export const getTemplateById = async (req, res) => {
    try {
        const template = await ItineraryTemplate.findById(req.params.id);
        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'Template not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: template
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};