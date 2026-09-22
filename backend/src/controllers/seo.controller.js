// src/controllers/seo.controller.js
import State from "../models/state.model.js";
import Destination from "../models/destination.model.js";
import Package from "../models/package.model.js";
import Hotel from "../models/hotel.model.js";
import { pushUrlsToIndexNow } from "../services/indexnow.service.js";

const SITE_URL = process.env.CLIENT_URL || "https://makeyourownvoyage.com";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "f20cf068aabc4a5c87d6fd39b71f7bcf";

// 1. IndexNow Key Verification Endpoint
export const getIndexNowVerificationKey = (req, res) => {
    res.header("Content-Type", "text/plain");
    return res.status(200).send(INDEXNOW_KEY);
};

export const getRobotsTxt = (req, res) => {
    const robots = `User-agent: *
Allow: /
Disallow: /api/admin/
Disallow: /api/sales/

# AI Crawlers Whitelist (GEO Optimization)
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

    res.header("Content-Type", "text/plain");
    res.header("Cache-Control", "public, max-age=86400");
    return res.status(200).send(robots);
};

// 3. Dynamic XML Sitemap Engine
export const getDynamicSitemap = async (req, res) => {
    try {
        const [states, destinations, packages, hotels] = await Promise.all([
            State.find({ isPublished: true }).select("slug updatedAt").lean(),
            Destination.find({ isPublished: true }).select("slug updatedAt").lean(),
            Package.find({ isActive: true }).select("slug updatedAt").lean(),
            Hotel.find({ status: "active" }).select("slug updatedAt").lean(),
        ]);

        const staticPages = [
            { loc: `${SITE_URL}`, priority: "1.0", changefreq: "daily" },
            { loc: `${SITE_URL}/packages`, priority: "0.9", changefreq: "daily" },
            { loc: `${SITE_URL}/hotels`, priority: "0.9", changefreq: "daily" },
            { loc: `${SITE_URL}/transports`, priority: "0.8", changefreq: "weekly" },
            { loc: `${SITE_URL}/destinations`, priority: "0.9", changefreq: "weekly" },
            { loc: `${SITE_URL}/weekend-trips`, priority: "0.9", changefreq: "daily" },
        ];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        staticPages.forEach((page) => {
            xml += `  <url>\n    <loc>${page.loc}</loc>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
        });

        states.forEach((item) => {
            xml += `  <url>\n    <loc>${SITE_URL}/state/${item.slug}</loc>\n    <lastmod>${new Date(item.updatedAt || Date.now()).toISOString().split("T")[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
        });

        destinations.forEach((item) => {
            xml += `  <url>\n    <loc>${SITE_URL}/destination/${item.slug}</loc>\n    <lastmod>${new Date(item.updatedAt || Date.now()).toISOString().split("T")[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
        });

        packages.forEach((item) => {
            xml += `  <url>\n    <loc>${SITE_URL}/packages/${item.slug}</loc>\n    <lastmod>${new Date(item.updatedAt || Date.now()).toISOString().split("T")[0]}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
        });

        hotels.forEach((item) => {
            xml += `  <url>\n    <loc>${SITE_URL}/hotels/${item.slug}</loc>\n    <lastmod>${new Date(item.updatedAt || Date.now()).toISOString().split("T")[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
        });

        xml += `</urlset>`;

        res.header("Content-Type", "application/xml");
        res.header("Cache-Control", "public, max-age=86400");
        return res.status(200).send(xml);
    } catch (error) {
        return res.status(500).json({
             success: false,
              error: error.message
            });
    }
};

// 4. Schema.org JSON-LD & Dynamic Metadata
export const getPageSeoMetadata = async (req, res) => {
    try {
        const { type, slug } = req.params;

        let metadata = {
            title: "Make Your Own Voyage | Luxury Travel & Custom Itineraries",
            description: "Customized holiday packages, weekend escapes, luxury hotels, and bike rentals.",
            canonicalUrl: `${SITE_URL}`,
            ogImage: `${SITE_URL}/assets/logo.png`,
            schemaJsonLd: null,
        };

        if (type === "package") {
            const pkg = await Package.findOne({ slug, isActive: true })
                .populate("destination", "name")
                .lean();
            if (!pkg) return res.status(404).json({ success: false, message: "Package not found" });

            const destName = pkg.destination?.name || pkg.region || "Incredible Destinations";
            const priceText = pkg.startingPrice ? `₹${Number(pkg.startingPrice).toLocaleString("en-IN")}` : "Best Rates";
            metadata.title = `${pkg.title} | Make Your Own Voyage`;
            metadata.description = `Book custom ${pkg.duration || "tour"} to ${destName} starting from ${priceText}. Includes verified stays and personalized itinerary.`;
            metadata.canonicalUrl = `${SITE_URL}/packages/${pkg.slug}`;
            metadata.ogImage = pkg.image || metadata.ogImage;

            metadata.schemaJsonLd = {
                "@context": "https://schema.org",
                "@type": "TouristTrip",
                name: pkg.title,
                description: metadata.description,
                touristType: "Leisure",
                offers: {
                    "@type": "Offer",
                    price: pkg.startingPrice || 0,
                    priceCurrency: pkg.currency || "INR",
                    availability: "https://schema.org/InStock",
                },
            };
        } else if (type === "hotel") {
            const hotel = await Hotel.findOne({ slug, status: "active" }).lean();
            if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });

            const city = hotel.location?.city
                ? hotel.location.city.charAt(0).toUpperCase() + hotel.location.city.slice(1)
                : "";
            metadata.title = city ? `${hotel.name}, ${city} | Make Your Own Voyage` : `${hotel.name} | Make Your Own Voyage`;
            metadata.description = hotel.description?.slice(0, 160) || `Experience luxury stay at ${hotel.name}${city ? ` in ${city}` : ""}.`;
            metadata.canonicalUrl = `${SITE_URL}/hotels/${hotel.slug}`;
            
            const firstImg = Array.isArray(hotel.images) && hotel.images.length > 0
                ? (typeof hotel.images[0] === "string" ? hotel.images[0] : hotel.images[0]?.url)
                : null;
            metadata.ogImage = firstImg || metadata.ogImage;

            metadata.schemaJsonLd = {
                "@context": "https://schema.org",
                "@type": "LodgingBusiness",
                name: hotel.name,
                address: {
                    "@type": "PostalAddress",
                    addressLocality: hotel.location?.city || "",
                    addressRegion: hotel.location?.state || "",
                    addressCountry: hotel.location?.country || "IN",
                },
            };
        } else if (type === "destination") {
            const dest = await Destination.findOne({ slug, isPublished: true }).lean();
            if (!dest) return res.status(404).json({ success: false, message: "Destination not found" });

            metadata.title = `Explore ${dest.name} Tourism | Custom Voyage Guide`;
            metadata.description = dest.shortDescription || dest.description?.slice(0, 160) || `Plan your custom voyage to ${dest.name}.`;
            metadata.canonicalUrl = `${SITE_URL}/destination/${dest.slug}`;
            const firstDestImg = Array.isArray(dest.images) && dest.images.length > 0
                ? (typeof dest.images[0] === "string" ? dest.images[0] : dest.images[0]?.url)
                : null;
            metadata.ogImage = firstDestImg || metadata.ogImage;
        }

        return res.status(200).json({
            success: true,
            data: metadata
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// 5. Admin: One-Click Instant Indexing to IndexNow
export const triggerFullSiteIndexing = async (req, res) => {
    try {
        const [states, destinations, packages, hotels] = await Promise.all([
            State.find({ isPublished: true }).select("slug").lean(),
            Destination.find({ isPublished: true }).select("slug").lean(),
            Package.find({ isActive: true }).select("slug").lean(),
            Hotel.find({ status: "active" }).select("slug").lean(),
        ]);

        const urls = [
            `${SITE_URL}`,
            `${SITE_URL}/packages`,
            `${SITE_URL}/hotels`,
            `${SITE_URL}/transports`,
            `${SITE_URL}/weekend-trips`,
            ...states.map((s) => `${SITE_URL}/state/${s.slug}`),
            ...destinations.map((d) => `${SITE_URL}/destination/${d.slug}`),
            ...packages.map((p) => `${SITE_URL}/packages/${p.slug}`),
            ...hotels.map((h) => `${SITE_URL}/hotels/${h.slug}`),
        ];

        const statusCode = await pushUrlsToIndexNow(urls);

        return res.status(200).json({
            success: true,
            message: `${urls.length} URLs dispatched to IndexNow search engine protocol.`,
            dispatchedCount: urls.length,
            indexNowStatusCode: statusCode,
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
             error: error.message });
    }
};