import Package from "../models/package.model.js";
import ItineraryTemplate from "../models/itineraryTemplate.model.js";

export const createPackage = async (req, res) => {
    try {
        const {
            templateId,
            customItinerary,
            primaryHotel,
            primaryTransport,
            ...restPackageData
        } = req.body;

        let finalItinerary = [];

        // 1. Agar admin ne Template ID bheji hai, toh clone karo
        if (templateId) {
            const template = await ItineraryTemplate.findById(templateId);
            if (!template) {
                return res.status(404).json({
                    success: false,
                    message: 'Selected template not found'
                });
            }

            // Clone template days into package format
            finalItinerary = template.daysPlan.map((dayPlan) => ({
                day: dayPlan.day,
                title: dayPlan.title,
                description: dayPlan.description,
                dayTransport: primaryTransport || null,
                activities: dayPlan.activities.map((act) => ({
                    time: act.time,
                    type: act.type,
                    title: act.title,
                    description: act.description,
                    location: act.location,
                    duration: act.duration,
                })),
                overnight: {
                    enabled: true,
                    hotelId: primaryHotel || null,
                },
            }));
        }
        // 2. Agar admin ne frontend par customize kiya hua itinerary bheja hai
        else if (customItinerary && customItinerary.length > 0) {
            finalItinerary = customItinerary;
        }

        const newPackage = new Package({
            ...restPackageData,
            primaryHotel,
            primaryTransport,
            sourceTemplate: templateId || null,
            itinerary: finalItinerary,
        });

        await newPackage.save();
        return res.status(201).json({
            success: true,
            data: newPackage
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get Full Package with all details populated (MMT View)
export const getPackageBySlug = async (req, res) => {
    try {
        const pkg = await Package.findOne({ slug: req.params.slug })
            .populate('primaryHotel')
            .populate('primaryTransport')
            .populate('itinerary.overnight.hotelId')
            .populate('itinerary.dayTransport');

        if (!pkg) {
            return res.status(404).json({
                success: false,
                message: 'Package not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: pkg
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all packages
export const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find({ isActive: true })
            .populate('primaryHotel', 'name rating city')
            .populate('primaryTransport', 'vehicleType capacity')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: packages.length,
            data: packages
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};