import mongoose from "mongoose";
import Hotel from "../models/hotel.model.js";
import Destination from "../models/destination.model.js";

// Helper to resolve destination ObjectId from ID or slug
const resolveDestinationId = async (destParam) => {
    if (!destParam) return null;
    if (mongoose.isValidObjectId(destParam)) return destParam;
    const dest = await Destination.findOne({ slug: String(destParam).toLowerCase() });
    return dest ? dest._id : null;
};

// GET /api/hotels/search - Public search & filter hotels
export const searchHotels = async (req, res) => {
    try {
        const {
            city,
            destination,
            minPrice,
            maxPrice,
            starCategory,
            propertyType,
            amenities,
            couplesAllowed,
            swimmingPool,
            gym,
            spa,
            restaurant,
            conferenceRoom,
            parking,
            sortBy,
            page = 1,
            limit = 10,
        } = req.query;

        const query = { status: "active" };

        // 1. City Filter (Case-insensitive partial match)
        if (city) {
            query["location.city"] = { $regex: city.trim(), $options: "i" };
        }

        // 2. Destination Filter (by slug or ObjectId)
        if (destination) {
            const destId = await resolveDestinationId(destination);
            if (destId) {
                query.destination = destId;
            } else {
                return res.status(200).json({
                    success: true,
                    totalHotels: 0,
                    totalPages: 0,
                    currentPage: Number(page),
                    resultsCount: 0,
                    hotels: [],
                });
            }
        }

        // 3. Star Category (e.g., ?starCategory=4,5)
        if (starCategory) {
            const stars = starCategory.split(",").map(Number);
            query.starCategory = { $in: stars };
        }

        // 4. Property Type (Resort, Hotel, etc.)
        if (propertyType) {
            query.propertyType = { $regex: propertyType.trim(), $options: "i" };
        }

        // 5. Amenities Filter
        if (amenities) {
            const amenitiesList = amenities.split(",").map((a) => a.trim());
            query.amenities = { $in: amenitiesList };
        }

        // 6. Policy & Facility Flags
        if (couplesAllowed === "true") query["policies.couplesAllowed"] = true;
        if (swimmingPool === "true") query["facilities.swimmingPool"] = true;
        if (gym === "true") query["facilities.gym"] = true;
        if (spa === "true") query["facilities.spa"] = true;
        if (restaurant === "true") query["facilities.restaurant"] = true;
        if (conferenceRoom === "true") query["facilities.conferenceRoom"] = true;
        if (parking === "true") query["facilities.parking"] = true;

        // 7. Price Range Filter (matches on room pricing)
        if (minPrice || maxPrice) {
            query["rooms.pricing.finalPrice"] = {};
            if (minPrice) query["rooms.pricing.finalPrice"].$gte = Number(minPrice);
            if (maxPrice) query["rooms.pricing.finalPrice"].$lte = Number(maxPrice);
        }

        // 8. Sorting Options
        let sortOptions = { isFeatured: -1, createdAt: -1 };
        if (sortBy === "price_asc") {
            sortOptions = { "rooms.pricing.finalPrice": 1 };
        } else if (sortBy === "price_desc") {
            sortOptions = { "rooms.pricing.finalPrice": -1 };
        } else if (sortBy === "rating_desc") {
            sortOptions = { "rating.average": -1 };
        }

        // 9. Pagination
        const pageNum = Math.max(1, parseInt(page, 10));
        const limitNum = Math.max(1, parseInt(limit, 10));
        const skip = (pageNum - 1) * limitNum;

        const [hotels, totalHotels] = await Promise.all([
            Hotel.find(query)
                .populate("destination", "name slug state")
                .sort(sortOptions)
                .skip(skip)
                .limit(limitNum)
                .select("-rooms.pricing.taxAmount -rooms.pricing.taxPercentage"),
            Hotel.countDocuments(query),
        ]);

        return res.status(200).json({
            success: true,
            totalHotels,
            totalPages: Math.ceil(totalHotels / limitNum),
            currentPage: pageNum,
            resultsCount: hotels.length,
            hotels,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to search hotels",
            error: error.message,
        });
    }
};

// GET /api/hotels/:slug - Public Hotel Detail Page by Slug (or ID fallback)
export const getHotelDetailsBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        let hotel = await Hotel.findOne({
            slug: slug.toLowerCase().trim(),
            status: "active",
        }).populate("destination", "name slug location state");

        if (!hotel && mongoose.isValidObjectId(slug)) {
            hotel = await Hotel.findOne({
                _id: slug,
                status: "active",
            }).populate("destination", "name slug location state");
        }

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found",
            });
        }

        return res.status(200).json({
            success: true,
            hotel,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch hotel details",
            error: error.message,
        });
    }
};