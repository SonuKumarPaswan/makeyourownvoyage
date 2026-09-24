import Destination from "../models/destination.model.js";
import Package from "../models/package.model.js";
import Hotel from "../models/hotel.model.js";
import Transport from "../models/transport.model.js";
import State from "../models/state.model.js";
import ActivityMaster from "../models/activityMaster.model.js";

// Helper to sanitize regex input to prevent ReDoS
const escapeRegex = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// 1. GET /api/search - Global Multi-Category Search
export const globalSearch = async (req, res) => {
    try {
        const { q, type = "all", limit = 6 } = req.query;
        const cleanQuery = String(q).trim();
        const regex = new RegExp(escapeRegex(cleanQuery), "i");
        const maxLimit = Math.min(Math.max(1, Number(limit) || 6), 50);

        const searchType = String(type).toLowerCase().trim();
        const shouldSearchAll = searchType === "all" || !searchType;

        // Parallel tasks preparation
        const tasks = {};

        // 1. Destinations
        if (shouldSearchAll || searchType === "destinations" || searchType === "destination") {
            tasks.destinations = Destination.find({
                isPublished: true,
                $or: [
                    { name: regex },
                    { shortDescription: regex },
                    { type: regex },
                    { "attractions.name": regex },
                ],
            })
                .select("name slug shortDescription type images")
                .limit(maxLimit)
                .lean();
        }

        // 2. Packages
        if (shouldSearchAll || searchType === "packages" || searchType === "package") {
            tasks.packages = Package.find({
                isActive: true,
                $or: [
                    { title: regex },
                    { region: regex },
                    { packageType: regex },
                    { duration: regex },
                ],
            })
                .select("title slug region packageType duration days nights startingPrice image")
                .limit(maxLimit)
                .lean();
        }

        // 3. Hotels
        if (shouldSearchAll || searchType === "hotels" || searchType === "hotel") {
            tasks.hotels = Hotel.find({
                status: "active",
                $or: [
                    { name: regex },
                    { "location.city": regex },
                    { "location.state": regex },
                    { "location.area": regex },
                    { propertyType: regex },
                ],
            })
                .select("name slug propertyType starCategory location rooms images")
                .limit(maxLimit)
                .lean();
        }

        // 4. Transport (Cabs, Bikes, Travellers, Buses)
        if (shouldSearchAll || searchType === "transports" || searchType === "transport" || searchType === "cabs") {
            tasks.transports = Transport.find({
                status: "active",
                $or: [
                    { title: regex },
                    { brand: regex },
                    { modelName: regex },
                    { category: regex },
                    { vehicleType: regex },
                    { availableCities: regex },
                ],
            })
                .select("title slug category vehicleType brand modelName capacity pricing images availableCities")
                .limit(maxLimit)
                .lean();
        }

        // 5. States
        if (shouldSearchAll || searchType === "states" || searchType === "state") {
            tasks.states = State.find({
                isPublished: true,
                name: regex,
            })
                .select("name slug description image")
                .limit(maxLimit)
                .lean();
        }

        // 6. Activities
        if (shouldSearchAll || searchType === "activities" || searchType === "activity") {
            tasks.activities = ActivityMaster.find({
                $or: [
                    { title: regex },
                    { type: regex },
                    { description: regex },
                ],
            })
                .populate("destination", "name slug")
                .select("title type approxDuration description image destination")
                .limit(maxLimit)
                .lean();
        }

        // Execute all queries in parallel
        const taskKeys = Object.keys(tasks);
        const rawResults = await Promise.all(Object.values(tasks));

        const resultMap = {};
        taskKeys.forEach((key, index) => {
            resultMap[key] = rawResults[index] || [];
        });

        // Format and standardize results for frontend consumption
        const formattedDestinations = (resultMap.destinations || []).map((d) => ({
            id: d._id,
            title: d.name,
            slug: d.slug,
            subtitle: Array.isArray(d.type) ? d.type.join(", ") : d.shortDescription || "Destination",
            image: d.images?.[0]?.url || "",
            url: `/destinations/${d.slug}`,
            type: "destination",
        }));

        const formattedPackages = (resultMap.packages || []).map((p) => ({
            id: p._id,
            title: p.title,
            slug: p.slug,
            subtitle: p.duration || `${p.days || 3} Days / ${p.nights || 2} Nights`,
            region: p.region,
            packageType: p.packageType,
            price: p.startingPrice || 0,
            image: p.image || "",
            url: `/packages/${p.slug}`,
            type: "package",
        }));

        const formattedHotels = (resultMap.hotels || []).map((h) => {
            const firstRoomPrice = h.rooms?.[0]?.pricing?.finalPrice || h.rooms?.[0]?.pricing?.basePrice || 0;
            const hotelImg = h.images?.[0]?.url || h.rooms?.[0]?.images?.[0] || "";
            return {
                id: h._id,
                title: h.name,
                slug: h.slug,
                subtitle: `${h.location?.city ? h.location.city.charAt(0).toUpperCase() + h.location.city.slice(1) : ""}${h.location?.state ? `, ${h.location.state}` : ""}`,
                city: h.location?.city || "",
                state: h.location?.state || "",
                starCategory: h.starCategory || 3,
                price: firstRoomPrice,
                image: hotelImg,
                url: `/hotels/${h.slug}`,
                type: "hotel",
            };
        });

        const formattedTransports = (resultMap.transports || []).map((t) => {
            let startingPrice = 0;
            if (t.category === "Bike") startingPrice = t.pricing?.dailyRentalPrice || 0;
            else if (t.category === "Bus") startingPrice = t.pricing?.seatTicketPrice || 0;
            else startingPrice = t.pricing?.basePrice || t.pricing?.perKmRate || 0;

            return {
                id: t._id,
                title: t.title,
                slug: t.slug,
                subtitle: `${t.category} • ${t.vehicleType || ""}`,
                category: t.category,
                price: startingPrice,
                seating: t.capacity?.seating || 4,
                image: t.images?.[0]?.url || "",
                url: `/transports/${t.slug}`,
                type: "transport",
            };
        });

        const formattedStates = (resultMap.states || []).map((s) => ({
            id: s._id,
            title: s.name,
            slug: s.slug,
            subtitle: "State / Region",
            image: s.image?.url || "",
            url: `/states/${s.slug}`,
            type: "state",
        }));

        const formattedActivities = (resultMap.activities || []).map((a) => ({
            id: a._id,
            title: a.title,
            subtitle: `${a.type ? a.type.toUpperCase() : "ACTIVITY"} • ${a.approxDuration || ""}`,
            destination: a.destination?.name || "",
            image: a.image || "",
            type: "activity",
        }));

        // Flatten top matches for unified list
        const combined = [
            ...formattedDestinations,
            ...formattedPackages,
            ...formattedHotels,
            ...formattedTransports,
            ...formattedStates,
            ...formattedActivities,
        ];

        const totalMatches = combined.length;

        return res.status(200).json({
            success: true,
            query: cleanQuery,
            totalMatches,
            counts: {
                destinations: formattedDestinations.length,
                packages: formattedPackages.length,
                hotels: formattedHotels.length,
                transports: formattedTransports.length,
                states: formattedStates.length,
                activities: formattedActivities.length,
            },
            results: {
                destinations: formattedDestinations,
                packages: formattedPackages,
                hotels: formattedHotels,
                transports: formattedTransports,
                states: formattedStates,
                activities: formattedActivities,
            },
            combined,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Global search failed",
            error: error.message,
        });
    }
};

// 2. GET /api/search/suggestions (or /autocomplete) - Live Typeahead Autocomplete
export const searchSuggestions = async (req, res) => {
    try {
        const { q, limit = 8 } = req.query;
        const cleanQuery = String(q).trim();
        const regex = new RegExp(escapeRegex(cleanQuery), "i");
        const maxLimit = Math.min(Math.max(1, Number(limit) || 8), 20);

        // Fetch small projections in parallel
        const [destinations, packages, hotels, transports] = await Promise.all([
            Destination.find({ isPublished: true, name: regex })
                .select("name slug images")
                .limit(3)
                .lean(),
            Package.find({ isActive: true, title: regex })
                .select("title slug startingPrice image")
                .limit(3)
                .lean(),
            Hotel.find({ status: "active", name: regex })
                .select("name slug location.city images")
                .limit(3)
                .lean(),
            Transport.find({ status: "active", $or: [{ title: regex }, { brand: regex }] })
                .select("title slug category images")
                .limit(2)
                .lean(),
        ]);

        const suggestions = [
            ...destinations.map((d) => ({
                title: d.name,
                slug: d.slug,
                type: "destination",
                url: `/destinations/${d.slug}`,
                subtitle: "Destination",
                image: d.images?.[0]?.url || "",
            })),
            ...packages.map((p) => ({
                title: p.title,
                slug: p.slug,
                type: "package",
                url: `/packages/${p.slug}`,
                subtitle: `Tour Package • ₹${p.startingPrice || 0}`,
                image: p.image || "",
            })),
            ...hotels.map((h) => ({
                title: h.name,
                slug: h.slug,
                type: "hotel",
                url: `/hotels/${h.slug}`,
                subtitle: `Hotel in ${h.location?.city || "India"}`,
                image: h.images?.[0]?.url || "",
            })),
            ...transports.map((t) => ({
                title: t.title,
                slug: t.slug,
                type: "transport",
                url: `/transports/${t.slug}`,
                subtitle: `${t.category} Rental`,
                image: t.images?.[0]?.url || "",
            })),
        ].slice(0, maxLimit);

        return res.status(200).json({
            success: true,
            query: cleanQuery,
            suggestions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch suggestions",
            error: error.message,
        });
    }
};

// 3. GET /api/search/trending - Popular Search Tags & Featured Picks
export const getTrendingSearches = async (req, res) => {
    try {
        const [topDestinations, featuredPackages] = await Promise.all([
            Destination.find({ isPublished: true })
                .select("name slug images")
                .limit(6)
                .lean(),
            Package.find({ isActive: true, isFeatured: true })
                .select("title slug startingPrice")
                .limit(4)
                .lean(),
        ]);

        const trendingTags = [
            ...topDestinations.map((d) => ({ title: d.name, slug: d.slug, type: "destination" })),
            ...featuredPackages.map((p) => ({ title: p.title, slug: p.slug, type: "package" })),
        ];

        return res.status(200).json({
            success: true,
            trending: trendingTags,
            popularDestinations: topDestinations,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch trending searches",
            error: error.message,
        });
    }
};
