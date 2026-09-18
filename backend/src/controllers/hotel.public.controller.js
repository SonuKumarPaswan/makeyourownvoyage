import Hotel from "../models/hotel.model.js";

// GET /api/hotels/search - Public search & filter hotels
export const searchHotels = async (req, res) => {
    try {
        const {
            city,
            minPrice,
            maxPrice,
            starCategory,
            propertyType,
            amenities,
            couplesAllowed,
            swimmingPool,
            sortBy,
            page = 1,
            limit = 10,
        } = req.query;

        const query = { status: "active" };

        // 1. City / Destination Filter (Case-insensitive partial match)
        if (city) {
            query["location.city"] = { $regex: city.trim(), $options: "i" };
        }

        // 2. Star Category (e.g., ?starCategory=4,5)
        if (starCategory) {
            const stars = starCategory.split(",").map(Number);
            query.starCategory = { $in: stars };
        }

        // 3. Property Type (Resort, Hotel, etc.)
        if (propertyType) {
            query.propertyType = { $regex: propertyType.trim(), $options: "i" };
        }

        // 4. Amenities Filter (Matches any or all requested)
        if (amenities) {
            const amenitiesList = amenities.split(",").map((a) => a.trim());
            query.amenities = { $in: amenitiesList };
        }

        // 5. Policy & Facility Flags
        if (couplesAllowed === "true") {
            query["policies.couplesAllowed"] = true;
        }
        if (swimmingPool === "true") {
            query["facilities.swimmingPool"] = true;
        }

        // 6. Price Range Filter (matches on room pricing)
        if (minPrice || maxPrice) {
            query["rooms.pricing.finalPrice"] = {};
            if (minPrice) query["rooms.pricing.finalPrice"].$gte = Number(minPrice);
            if (maxPrice) query["rooms.pricing.finalPrice"].$lte = Number(maxPrice);
        }

        // 7. Sorting Options
        let sortOptions = { isFeatured: -1, createdAt: -1 }; // Default: featured first
        if (sortBy === "price_asc") {
            sortOptions = { "rooms.pricing.finalPrice": 1 };
        } else if (sortBy === "price_desc") {
            sortOptions = { "rooms.pricing.finalPrice": -1 };
        } else if (sortBy === "rating_desc") {
            sortOptions = { "rating.average": -1 };
        }

        // 8. Pagination
        const pageNum = Math.max(1, parseInt(page, 10));
        const limitNum = Math.max(1, parseInt(limit, 10));
        const skip = (pageNum - 1) * limitNum;

        const [hotels, totalHotels] = await Promise.all([
            Hotel.find(query)
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

// GET /api/hotels/:slug - Public Hotel Detail Page by Slug
export const getHotelDetailsBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const hotel = await Hotel.findOne({
            slug: slug.toLowerCase(),
            status: "active",
        });

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