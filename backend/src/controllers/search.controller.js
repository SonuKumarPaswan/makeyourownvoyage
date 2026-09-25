import Destination from "../models/destination.model.js";
import Package from "../models/package.model.js";
import Hotel from "../models/hotel.model.js";
import Transport from "../models/transport.model.js";
import State from "../models/state.model.js";
import ActivityMaster from "../models/activityMaster.model.js";
import { formatSearchResults } from "../utils/searchFormatter.js";

// Helper to sanitize regex input to prevent ReDoS
const escapeRegex = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// 1. GET /api/search - Global Multi-Category Search
export const globalSearch = async (req, res) => {
    try {
        const { q, type = "all", limit = 6 } = req.query;
        const cleanQuery = String(q || "").trim();
        const regex = new RegExp(escapeRegex(cleanQuery), "i");
        const maxLimit = Math.min(Math.max(1, Number(limit) || 6), 50);

        const searchType = String(type).toLowerCase().trim();
        const shouldSearchAll = searchType === "all" || !searchType;

        // Parallel tasks preparation
        const tasks = {};

        // 1. Destinations
        if (shouldSearchAll || searchType === "destinations" || searchType === "destination") {
            tasks.destinations = Destination.find({
                isPublished: { $ne: false },
                $or: [
                    { name: regex },
                    { shortDescription: regex },
                    { country: regex },
                    { type: regex },
                    { "attractions.name": regex },
                ],
            })
                .populate("state", "name slug")
                .select("name slug shortDescription type images country state")
                .limit(maxLimit)
                .lean();
        }

        // 2. States
        if (shouldSearchAll || searchType === "states" || searchType === "state") {
            tasks.states = State.find({
                isPublished: { $ne: false },
                $or: [
                    { name: regex },
                    { description: regex },
                ],
            })
                .select("name slug description image")
                .limit(maxLimit)
                .lean();
        }

        // 3. Packages
        if (shouldSearchAll || searchType === "packages" || searchType === "package") {
            tasks.packages = Package.find({
                isActive: { $ne: false },
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

        // 4. Hotels
        if (shouldSearchAll || searchType === "hotels" || searchType === "hotel") {
            tasks.hotels = Hotel.find({
                status: { $ne: "inactive" },
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

        // 5. Transport (Cabs, Bikes, Travellers, Buses)
        if (shouldSearchAll || searchType === "transports" || searchType === "transport" || searchType === "cabs") {
            tasks.transports = Transport.find({
                status: { $ne: "inactive" },
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

        // Format and standardize results using searchFormatter utility
        const { results, combined } = formatSearchResults(resultMap);

        return res.status(200).json({
            success: true,
            query: cleanQuery,
            totalMatches: combined.length,
            counts: {
                destinations: results.destinations?.length || 0,
                states: results.states?.length || 0,
                packages: results.packages?.length || 0,
                hotels: results.hotels?.length || 0,
                transports: results.transports?.length || 0,
                activities: results.activities?.length || 0,
            },
            results,
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
        const cleanQuery = String(q || "").trim();
        const regex = new RegExp(escapeRegex(cleanQuery), "i");
        const maxLimit = Math.min(Math.max(1, Number(limit) || 8), 25);

        // Fetch small projections in parallel across all core entities
        const [destinations, states, packages, hotels, transports] = await Promise.all([
            Destination.find({
                isPublished: { $ne: false },
                $or: [
                    { name: regex },
                    { shortDescription: regex },
                    { country: regex },
                    { "attractions.name": regex },
                ],
            })
                .populate("state", "name slug")
                .select("name slug shortDescription type images state")
                .limit(4)
                .lean(),
            State.find({
                isPublished: { $ne: false },
                $or: [
                    { name: regex },
                    { description: regex },
                ],
            })
                .select("name slug image")
                .limit(4)
                .lean(),
            Package.find({
                isActive: { $ne: false },
                $or: [
                    { title: regex },
                    { region: regex },
                    { packageType: regex },
                ],
            })
                .select("title slug startingPrice image region")
                .limit(4)
                .lean(),
            Hotel.find({
                status: { $ne: "inactive" },
                $or: [
                    { name: regex },
                    { "location.city": regex },
                    { "location.state": regex },
                ],
            })
                .select("name slug location.city images")
                .limit(3)
                .lean(),
            Transport.find({
                status: { $ne: "inactive" },
                $or: [
                    { title: regex },
                    { brand: regex },
                    { availableCities: regex },
                ],
            })
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
                subtitle: d.state?.name ? `Destination in ${d.state.name}` : (d.shortDescription || "Top Destination"),
                image: d.images?.[0]?.url || "",
            })),
            ...states.map((s) => ({
                title: s.name,
                slug: s.slug,
                type: "state",
                url: `/states/${s.slug}`,
                subtitle: "State / Region Catalog",
                image: s.image?.url || "",
            })),
            ...packages.map((p) => ({
                title: p.title,
                slug: p.slug,
                type: "package",
                url: `/packages/${p.slug}`,
                subtitle: `Tour Package • ₹${(p.startingPrice || 0).toLocaleString("en-IN")}`,
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
                url: `/services/transport/cabs`,
                subtitle: `${t.category || "Vehicle"} Rental`,
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
