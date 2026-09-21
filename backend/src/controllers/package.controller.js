import mongoose from "mongoose";
import Package from "../models/package.model.js";
import ItineraryTemplate from "../models/itineraryTemplate.model.js";
import Destination from "../models/destination.model.js";

// Helper to resolve destination ObjectId from ID or slug
const resolveDestinationId = async (destParam) => {
    if (!destParam) return null;
    if (mongoose.isValidObjectId(destParam)) return destParam;
    const dest = await Destination.findOne({ slug: String(destParam).toLowerCase() });
    return dest ? dest._id : null;
};

// Helper to calculate summary counts from itinerary
const calculateSummary = (itinerary = []) => {
    let transfers = 0;
    let hotels = 0;
    let activities = 0;
    let meals = 0;

    for (const day of itinerary) {
        if (day.dayTransport) transfers += 1;
        if (day.overnight && day.overnight.enabled && day.overnight.hotelId) hotels += 1;

        if (Array.isArray(day.activities)) {
            for (const act of day.activities) {
                if (act.type === "transfer" || act.type === "bus_departure" || act.type === "bus_arrival") {
                    transfers += 1;
                } else if (act.type === "breakfast" || act.type === "lunch" || act.type === "dinner") {
                    meals += 1;
                } else if (act.type === "hotel_checkin" || act.type === "hotel_checkout") {
                    // checkin/out handled
                } else {
                    activities += 1;
                }
            }
        }
    }

    return { transfers, hotels, activities, meals };
};

// 1. POST /api/packages/create - Create new package
export const createPackage = async (req, res) => {
    try {
        const {
            templateId,
            customItinerary,
            primaryHotel,
            primaryTransport,
            destination,
            ...restPackageData
        } = req.body;

        if (!restPackageData.title || !restPackageData.title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Package title is required",
            });
        }

        if (!destination) {
            return res.status(400).json({
                success: false,
                message: "Destination is required",
            });
        }

        const resolvedDestId = await resolveDestinationId(destination);
        if (!resolvedDestId) {
            return res.status(400).json({
                success: false,
                message: "Invalid destination ID or slug provided",
            });
        }

        let finalItinerary = [];

        // 1. Agar admin ne Template ID bheji hai, toh clone karo
        if (templateId) {
            const template = await ItineraryTemplate.findById(templateId);
            if (!template) {
                return res.status(404).json({
                    success: false,
                    message: "Selected template not found",
                });
            }

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
                    image: act.image || "",
                })),
                overnight: {
                    enabled: true,
                    hotelId: primaryHotel || null,
                },
            }));
        } else if (customItinerary && customItinerary.length > 0) {
            finalItinerary = customItinerary;
        }

        // Auto-calculate summary if omitted
        const summary = restPackageData.summary || calculateSummary(finalItinerary);

        const newPackage = new Package({
            ...restPackageData,
            destination: resolvedDestId,
            primaryHotel: primaryHotel || null,
            primaryTransport: primaryTransport || null,
            sourceTemplate: templateId || null,
            itinerary: finalItinerary,
            summary,
        });

        await newPackage.save();
        await newPackage.populate("destination", "name slug");

        return res.status(201).json({
            success: true,
            message: "Package created successfully",
            data: newPackage,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// 2. GET /api/packages/:slug - Single package by slug (with ID fallback)
export const getPackageBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const cleanSlug = String(slug).toLowerCase().trim();

        let pkg = await Package.findOne({ slug: cleanSlug })
            .populate("destination", "name slug location")
            .populate("primaryHotel")
            .populate("primaryTransport")
            .populate("itinerary.overnight.hotelId")
            .populate("itinerary.dayTransport")
            .populate("sourceTemplate");

        if (!pkg && mongoose.isValidObjectId(slug)) {
            pkg = await Package.findById(slug)
                .populate("destination", "name slug location")
                .populate("primaryHotel")
                .populate("primaryTransport")
                .populate("itinerary.overnight.hotelId")
                .populate("itinerary.dayTransport")
                .populate("sourceTemplate");
        }

        if (!pkg) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: pkg,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 3. GET /api/packages/get-all-packages - Get all packages (with filters & pagination)
export const getAllPackages = async (req, res) => {
    try {
        const {
            destination,
            packageType,
            region,
            minPrice,
            maxPrice,
            days,
            isFeatured,
            search,
            page,
            limit,
            sortBy,
        } = req.query;

        const query = { isActive: true };

        if (destination) {
            const destId = await resolveDestinationId(destination);
            if (destId) {
                query.destination = destId;
            } else {
                return res.status(200).json({
                    success: true,
                    count: 0,
                    data: [],
                });
            }
        }

        if (packageType) {
            query.packageType = packageType;
        }

        if (region) {
            query.region = { $regex: region.trim(), $options: "i" };
        }

        if (days) {
            query.days = Number(days);
        }

        if (isFeatured !== undefined) {
            query.isFeatured = isFeatured === "true";
        }

        if (search) {
            query.$or = [
                { title: { $regex: search.trim(), $options: "i" } },
                { region: { $regex: search.trim(), $options: "i" } },
            ];
        }

        if (minPrice || maxPrice) {
            query.startingPrice = {};
            if (minPrice) query.startingPrice.$gte = Number(minPrice);
            if (maxPrice) query.startingPrice.$lte = Number(maxPrice);
        }

        let sort = { isFeatured: -1, createdAt: -1 };
        if (sortBy === "price_asc") sort = { startingPrice: 1 };
        else if (sortBy === "price_desc") sort = { startingPrice: -1 };
        else if (sortBy === "days_asc") sort = { days: 1 };
        else if (sortBy === "days_desc") sort = { days: -1 };

        if (page || limit) {
            const pageNum = Math.max(1, parseInt(page, 10) || 1);
            const limitNum = Math.max(1, parseInt(limit, 10) || 10);
            const skip = (pageNum - 1) * limitNum;

            const [packages, totalPackages] = await Promise.all([
                Package.find(query)
                    .populate("destination", "name slug")
                    .populate("primaryHotel", "name rating location.city images starCategory")
                    .populate("primaryTransport", "vehicleType capacity brand modelName")
                    .sort(sort)
                    .skip(skip)
                    .limit(limitNum),
                Package.countDocuments(query),
            ]);

            return res.status(200).json({
                success: true,
                totalPackages,
                totalPages: Math.ceil(totalPackages / limitNum),
                currentPage: pageNum,
                count: packages.length,
                data: packages,
            });
        }

        const packages = await Package.find(query)
            .populate("destination", "name slug")
            .populate("primaryHotel", "name rating location.city images starCategory")
            .populate("primaryTransport", "vehicleType capacity brand modelName")
            .sort(sort);

        return res.status(200).json({
            success: true,
            count: packages.length,
            data: packages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 4. GET /api/packages/id/:id - Single package by ID
export const getPackageById = async (req, res) => {
    try {
        const { id } = req.params;

        let pkg = null;
        if (mongoose.isValidObjectId(id)) {
            pkg = await Package.findById(id)
                .populate("destination", "name slug")
                .populate("primaryHotel")
                .populate("primaryTransport")
                .populate("itinerary.overnight.hotelId")
                .populate("itinerary.dayTransport")
                .populate("sourceTemplate");
        } else {
            pkg = await Package.findOne({ slug: id.toLowerCase() })
                .populate("destination", "name slug")
                .populate("primaryHotel")
                .populate("primaryTransport")
                .populate("itinerary.overnight.hotelId")
                .populate("itinerary.dayTransport")
                .populate("sourceTemplate");
        }

        if (!pkg) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: pkg,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 5. PUT /api/packages/:id - Update package by ID
export const updatePackage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid package ID format",
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

        // Recalculate summary if itinerary changed and summary not provided
        if (updates.itinerary && !updates.summary) {
            updates.summary = calculateSummary(updates.itinerary);
        }

        // Recalculate duration if days or nights updated
        const currentPkg = await Package.findById(id);
        if (!currentPkg) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }

        const days = updates.days || currentPkg.days;
        const nights = updates.nights !== undefined ? updates.nights : currentPkg.nights;
        updates.duration = `${days} Days / ${nights} Nights`;

        const updatedPackage = await Package.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        )
            .populate("destination", "name slug")
            .populate("primaryHotel", "name rating location.city images starCategory")
            .populate("primaryTransport", "vehicleType capacity brand modelName");

        return res.status(200).json({
            success: true,
            message: "Package updated successfully",
            data: updatedPackage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 6. DELETE /api/packages/:id - Delete package by ID
export const deletePackage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid package ID format",
            });
        }

        const deleted = await Package.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Package deleted successfully",
            deletedId: id,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};