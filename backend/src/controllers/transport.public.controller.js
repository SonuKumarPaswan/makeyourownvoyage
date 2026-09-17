import Transport from "../models/transport.model.js";

// GET /api/transports/search
export const searchTransports = async (req, res) => {
    try {
        const {
            category,        // Cab, Bus, Bike, Traveller
            city,            // Delhi, Manali, Goa
            vehicleType,     // Sedan, SUV, Cruiser, Sleeper
            serviceType,     // Outstation One-Way, Daily Rental
            fuelType,
            hasAC,
            isSelfDrive,
            minSeats,
            maxPrice,
            sortBy,
            page = 1,
            limit = 10,
        } = req.query;

        const query = { status: "active" };

        if (category) query.category = category;
        if (city) query.availableCities = { $in: [city.trim().toLowerCase()] };
        if (vehicleType) query.vehicleType = { $in: vehicleType.split(",").map((v) => v.trim()) };
        if (serviceType) query.serviceTypes = { $in: [serviceType.trim()] };
        if (fuelType) query["specifications.fuelType"] = fuelType;
        if (hasAC !== undefined) query["specifications.hasAC"] = hasAC === "true";
        if (isSelfDrive !== undefined) query["specifications.isSelfDrive"] = isSelfDrive === "true";
        if (minSeats) query["capacity.seating"] = { $gte: Number(minSeats) };

        // Dynamic price sorting and filtering according to Category
        let sortOptions = { isFeatured: -1, createdAt: -1 };

        if (category === "Bike") {
            if (maxPrice) query["pricing.dailyRentalPrice"] = { $lte: Number(maxPrice) };
            if (sortBy === "price_asc") sortOptions = { "pricing.dailyRentalPrice": 1 };
            if (sortBy === "price_desc") sortOptions = { "pricing.dailyRentalPrice": -1 };
        } else if (category === "Bus") {
            if (maxPrice) query["pricing.seatTicketPrice"] = { $lte: Number(maxPrice) };
            if (sortBy === "price_asc") sortOptions = { "pricing.seatTicketPrice": 1 };
            if (sortBy === "price_desc") sortOptions = { "pricing.seatTicketPrice": -1 };
        } else {
            // Cabs & Travellers
            if (maxPrice) query["pricing.perKmRate"] = { $lte: Number(maxPrice) };
            if (sortBy === "price_asc") sortOptions = { "pricing.perKmRate": 1 };
            if (sortBy === "price_desc") sortOptions = { "pricing.perKmRate": -1 };
        }

        if (sortBy === "rating_desc") {
            sortOptions = { "rating.average": -1 };
        }

        const pageNum = Math.max(1, parseInt(page, 10));
        const limitNum = Math.max(1, parseInt(limit, 10));
        const skip = (pageNum - 1) * limitNum;

        const [vehicles, totalVehicles] = await Promise.all([
            Transport.find(query).sort(sortOptions).skip(skip).limit(limitNum),
            Transport.countDocuments(query),
        ]);

        return res.status(200).json({
            success: true,
            totalVehicles,
            totalPages: Math.ceil(totalVehicles / limitNum),
            currentPage: pageNum,
            resultsCount: vehicles.length,
            vehicles,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to search transports",
            error: error.message,
        });
    }
};

// GET /api/transports/:slug - Single vehicle details page
export const getTransportBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const vehicle = await Transport.findOne({
            slug: slug.toLowerCase(),
            status: "active",
        });

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found or inactive",
            });
        }

        return res.status(200).json({ success: true, vehicle });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch vehicle details",
            error: error.message,
        });
    }
};