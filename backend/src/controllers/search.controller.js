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

// Stop words to extract intent keywords from natural English queries
const STOP_WORDS = new Set(["in", "at", "for", "the", "to", "and", "of", "with", "a", "an", "is", "on", "by"]);

// Build smart regex filters supporting multi-word phrases and word tokenization
const buildSmartSearchFilter = (queryString, fields = []) => {
    const raw = String(queryString || "").trim();
    if (!raw) return {};

    const fullRegex = new RegExp(escapeRegex(raw), "i");
    const tokens = raw
        .split(/\s+/)
        .map((t) => t.trim())
        .filter((t) => t.length > 1 && !STOP_WORDS.has(t.toLowerCase()));

    const fieldConditions = [];

    // 1. Direct full match on any specified field
    fields.forEach((field) => {
        fieldConditions.push({ [field]: fullRegex });
    });

    // 2. If multi-word, match individual tokens
    if (tokens.length > 1) {
        tokens.forEach((token) => {
            const tokenRegex = new RegExp(escapeRegex(token), "i");
            fields.forEach((field) => {
                fieldConditions.push({ [field]: tokenRegex });
            });
        });
    }

    return fieldConditions.length > 0 ? { $or: fieldConditions } : {};
};

// 1. GET /api/search - Global Multi-Category Search
export const globalSearch = async (req, res) => {
    try {
        const { q, type = "all", limit = 6 } = req.query;
        const cleanQuery = String(q || "").trim();
        const maxLimit = Math.min(Math.max(1, Number(limit) || 6), 50);

        const searchType = String(type).toLowerCase().trim();
        const shouldSearchAll = searchType === "all" || !searchType;

        // Parallel tasks preparation with intelligent word matching
        const tasks = {};

        // 1. Destinations
        if (shouldSearchAll || searchType === "destinations" || searchType === "destination") {
            const destFilter = buildSmartSearchFilter(cleanQuery, ["name", "slug", "country", "shortDescription", "type", "attractions.name"]);
            tasks.destinations = Destination.find({
                isPublished: { $ne: false },
                ...destFilter,
            })
                .populate("state", "name slug")
                .select("name slug shortDescription type images country state")
                .limit(maxLimit)
                .lean();
        }

        // 2. States
        if (shouldSearchAll || searchType === "states" || searchType === "state") {
            const stateFilter = buildSmartSearchFilter(cleanQuery, ["name", "slug", "description"]);
            tasks.states = State.find({
                isPublished: { $ne: false },
                ...stateFilter,
            })
                .select("name slug description image")
                .limit(maxLimit)
                .lean();
        }

        // 3. Packages
        if (shouldSearchAll || searchType === "packages" || searchType === "package") {
            const pkgFilter = buildSmartSearchFilter(cleanQuery, ["title", "slug", "region", "packageType", "duration", "tags"]);
            tasks.packages = Package.find({
                isActive: { $ne: false },
                ...pkgFilter,
            })
                .select("title slug region packageType duration days nights startingPrice image")
                .limit(maxLimit)
                .lean();
        }

        // 4. Hotels
        if (shouldSearchAll || searchType === "hotels" || searchType === "hotel") {
            const isHotelIntent = cleanQuery.toLowerCase().includes("hotel") || cleanQuery.toLowerCase().includes("resort") || cleanQuery.toLowerCase().includes("stay");
            const hotelFilter = buildSmartSearchFilter(cleanQuery, ["name", "slug", "location.city", "location.state", "location.area", "propertyType", "description"]);
            
            tasks.hotels = Hotel.find({
                status: { $ne: "inactive" },
                ...(isHotelIntent && Object.keys(hotelFilter).length === 0 ? {} : hotelFilter),
            })
                .select("name slug propertyType starCategory location rooms images")
                .limit(maxLimit)
                .lean();
        }

        // 5. Transport (Cabs, Bikes, Travellers, Buses)
        if (shouldSearchAll || searchType === "transports" || searchType === "transport" || searchType === "cabs") {
            const transportFilter = buildSmartSearchFilter(cleanQuery, ["title", "slug", "brand", "modelName", "category", "vehicleType", "availableCities"]);
            tasks.transports = Transport.find({
                status: { $ne: "inactive" },
                ...transportFilter,
            })
                .select("title slug category vehicleType brand modelName capacity pricing images availableCities")
                .limit(maxLimit)
                .lean();
        }

        // 6. Activities
        if (shouldSearchAll || searchType === "activities" || searchType === "activity") {
            const activityFilter = buildSmartSearchFilter(cleanQuery, ["title", "type", "description"]);
            tasks.activities = ActivityMaster.find({
                ...activityFilter,
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

// In-memory cache for high-frequency suggestion queries (60s TTL)
const suggestionsCache = new Map();
const CACHE_TTL_MS = 60 * 1000;

// 2. GET /api/search/suggestions (or /autocomplete) - Live Typeahead Autocomplete
export const searchSuggestions = async (req, res) => {
    try {
        const { q, limit = 8 } = req.query;
        const cleanQuery = String(q || "").trim().toLowerCase();
        if (!cleanQuery) {
            return res.status(200).json({ success: true, query: "", suggestions: [] });
        }

        const cacheKey = `${cleanQuery}:${limit}`;
        const cached = suggestionsCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
            return res.status(200).json({
                success: true,
                query: cleanQuery,
                suggestions: cached.data,
            });
        }

        const regex = new RegExp(escapeRegex(cleanQuery), "i");
        const maxLimit = Math.min(Math.max(1, Number(limit) || 8), 25);

        // Fetch ultra-fast indexed field matches in parallel
        const [destinations, states, packages, hotels, transports] = await Promise.all([
            Destination.find({
                isPublished: { $ne: false },
                $or: [
                    { name: regex },
                    { slug: regex },
                    { country: regex },
                ],
            })
                .populate("state", "name slug image")
                .select("name slug shortDescription type images image media state")
                .limit(4)
                .lean(),
            State.find({
                isPublished: { $ne: false },
                $or: [
                    { name: regex },
                    { slug: regex },
                ],
            })
                .select("name slug image media")
                .limit(4)
                .lean(),
            Package.find({
                isActive: { $ne: false },
                $or: [
                    { title: regex },
                    { slug: regex },
                    { region: regex },
                ],
            })
                .select("title slug startingPrice image gallery thumbnail region")
                .limit(4)
                .lean(),
            Hotel.find({
                status: { $ne: "inactive" },
                $or: [
                    { name: regex },
                    { slug: regex },
                    { "location.city": regex },
                    { "location.state": regex },
                    { "location.area": regex },
                    { propertyType: regex },
                    ...(cleanQuery.includes("hotel") || cleanQuery.includes("stay") || cleanQuery.includes("resort")
                        ? [{ status: "active" }]
                        : []),
                ],
            })
                .select("name slug location images image media starCategory propertyType")
                .limit(4)
                .lean(),
            Transport.find({
                status: { $ne: "inactive" },
                $or: [
                    { title: regex },
                    { slug: regex },
                    { brand: regex },
                ],
            })
                .select("title slug category images image")
                .limit(2)
                .lean(),
        ]);

        const resolveItemImg = (item) => {
            if (!item) return "";
            if (typeof item.image === "string" && item.image.trim()) return item.image;
            if (item.image?.url && typeof item.image.url === "string") return item.image.url;
            if (Array.isArray(item.images) && item.images.length > 0) {
                if (typeof item.images[0] === "string" && item.images[0].trim()) return item.images[0];
                if (item.images[0]?.url) return item.images[0].url;
            }
            if (Array.isArray(item.gallery) && item.gallery.length > 0) {
                if (typeof item.gallery[0] === "string" && item.gallery[0].trim()) return item.gallery[0];
                if (item.gallery[0]?.url) return item.gallery[0].url;
            }
            if (item.media?.coverImage?.url) return item.media.coverImage.url;
            if (item.thumbnail && typeof item.thumbnail === "string") return item.thumbnail;
            return "";
        };

        const suggestions = [
            ...destinations.map((d) => ({
                title: d.name,
                slug: d.slug,
                type: "destination",
                url: d.state?.slug ? `/destinations/${d.state.slug}/${d.slug}` : `/destinations/${d.slug}`,
                subtitle: d.state?.name ? `Destination in ${d.state.name}` : (d.shortDescription || "Top Destination"),
                image: resolveItemImg(d) || resolveItemImg(d.state) || "",
            })),
            ...states.map((s) => ({
                title: s.name,
                slug: s.slug,
                type: "state",
                url: `/states/${s.slug}`,
                subtitle: "State / Region Catalog",
                image: resolveItemImg(s) || "",
            })),
            ...packages.map((p) => ({
                title: p.title,
                slug: p.slug,
                type: "package",
                url: `/packages/${p.slug}`,
                subtitle: `Tour Package • ₹${(p.startingPrice || 0).toLocaleString("en-IN")}`,
                image: resolveItemImg(p) || "",
            })),
            ...hotels.map((h) => ({
                title: h.name,
                slug: h.slug,
                type: "hotel",
                url: `/hotels/${h.slug}`,
                subtitle: `Hotel in ${h.location?.city || "India"}`,
                image: resolveItemImg(h) || "",
            })),
            ...transports.map((t) => ({
                title: t.title,
                slug: t.slug,
                type: "transport",
                url: `/services/transport/cabs`,
                subtitle: `${t.category || "Vehicle"} Rental`,
                image: resolveItemImg(t) || "",
            })),
        ].slice(0, maxLimit);

        suggestionsCache.set(cacheKey, {
            timestamp: Date.now(),
            data: suggestions,
        });

        // Limit cache size to 200 items
        if (suggestionsCache.size > 200) {
            const oldestKey = suggestionsCache.keys().next().value;
            if (oldestKey) suggestionsCache.delete(oldestKey);
        }

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
