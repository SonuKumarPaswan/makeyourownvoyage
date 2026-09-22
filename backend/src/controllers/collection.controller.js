import Collection from "../models/collection.model.js";
import Package from "../models/package.model.js";
import { uploadBufferToCloudinary, deleteFromCloudinary } from "../services/cloudinary.service.js";

// Helper: Month ke base par current season auto-detect karna
const detectCurrentSeason = () => {
    const month = new Date().getMonth() + 1; // 1 to 12
    if (month >= 4 && month <= 6) return "summer";
    if (month >= 7 && month <= 9) return "monsoon";
    if (month === 10 || month === 11) return "autumn";
    return "winter"; // Dec, Jan, Feb, Mar
};

// 1. PUBLIC: Homepage Feed (Weekend + Current Season)
export const getHomepageFeed = async (req, res) => {
    try {
        const activeSeason = req.query.season || detectCurrentSeason();
        const currentDate = new Date();

        const [weekendCollections, seasonalCollections, directWeekendPackages] = await Promise.all([
            // Evergreen Weekend Section
            Collection.find({
                collectionType: "weekend",
                isActive: true,
            })
                .populate({
                    path: "featuredPackages",
                    select: "title slug duration basePricePerAdult thumbnail destination isWeekendTrip highlights",
                })
                .populate({
                    path: "featuredDestinations",
                    select: "name slug image state city",
                })
                .sort({ displayOrder: 1 })
                .lean(),

            // Auto-detected / Manual Season Section
            Collection.find({
                collectionType: "seasonal",
                isActive: true,
                $or: [{ seasonTag: activeSeason }, { seasonTag: "all_season" }],
                $and: [
                    { $or: [{ validFrom: null }, { validFrom: { $lte: currentDate } }] },
                    { $or: [{ validTill: null }, { validTill: { $gte: currentDate } }] },
                ],
            })
                .populate({
                    path: "featuredPackages",
                    select: "title slug duration basePricePerAdult thumbnail destination",
                })
                .populate({
                    path: "featuredDestinations",
                    select: "name slug image state city",
                })
                .sort({ displayOrder: 1 })
                .lean(),

            // Direct fallback packages tagged with isWeekendTrip
            Package.find({ isWeekendTrip: true, isActive: true })
                .select("title slug duration basePricePerAdult thumbnail destination highlights")
                .limit(8)
                .lean(),
        ]);

        return res.status(200).json({
            success: true,
            currentSeason: activeSeason,
            data: {
                weekendSection: {
                    title: "Popular Weekend Getaways",
                    subtitle: "Quick 2N/3D breaks departing every Friday",
                    badge: "Running Daily",
                    collections: weekendCollections,
                    directPackages: directWeekendPackages,
                },
                seasonalSection: {
                    season: activeSeason,
                    title: `${activeSeason.toUpperCase()} Escapes`,
                    collections: seasonalCollections,
                },
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Homepage collections fetch karne me error aaya",
            error: error.message,
        });
    }
};

// 2. ADMIN: Create Collection (with Cloudinary Buffer Stream)
export const createCollection = async (req, res) => {
    try {
        const {
            title,
            subtitle,
            collectionType,
            seasonTag,
            badgeText,
            exploreLink,
            displayOrder,
            validFrom,
            validTill,
        } = req.body;

        if (!title || !collectionType) {
            return res.status(400).json({
                success: false,
                message: "Title aur collectionType required hain",
            });
        }

        let desktopImageUrl = req.body.desktopImageUrl;
        let mobileImageUrl = req.body.mobileImageUrl;

        // Files buffer upload to Cloudinary
        if (req.files?.desktopImage?.[0]) {
            const uploadRes = await uploadBufferToCloudinary(
                req.files.desktopImage[0].buffer,
                "collections/desktop"
            );
            desktopImageUrl = uploadRes.secure_url;
        }

        if (req.files?.mobileImage?.[0]) {
            const uploadRes = await uploadBufferToCloudinary(
                req.files.mobileImage[0].buffer,
                "collections/mobile"
            );
            mobileImageUrl = uploadRes.secure_url;
        }

        if (!desktopImageUrl) {
            return res.status(400).json({
                success: false,
                message: "Desktop banner image zaroori hai",
            });
        }

        const cleanSlug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

        const slug = `${cleanSlug}-${Date.now().toString().slice(-4)}`;

        let parsedPackages = [];
        if (req.body.featuredPackages) {
            parsedPackages = typeof req.body.featuredPackages === "string"
                ? JSON.parse(req.body.featuredPackages)
                : req.body.featuredPackages;
        }

        let parsedDestinations = [];
        if (req.body.featuredDestinations) {
            parsedDestinations = typeof req.body.featuredDestinations === "string"
                ? JSON.parse(req.body.featuredDestinations)
                : req.body.featuredDestinations;
        }

        const newCollection = await Collection.create({
            title,
            subtitle,
            slug,
            collectionType,
            seasonTag: seasonTag || "all_season",
            badgeText,
            bannerImage: {
                desktop: desktopImageUrl,
                mobile: mobileImageUrl || desktopImageUrl,
            },
            featuredPackages: parsedPackages,
            featuredDestinations: parsedDestinations,
            exploreLink,
            displayOrder: Number(displayOrder) || 0,
            validFrom: validFrom ? new Date(validFrom) : null,
            validTill: validTill ? new Date(validTill) : null,
        });

        return res.status(201).json({
            success: true,
            message: "Collection successfully create ho gayi",
            data: newCollection,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Collection creation failed",
            error: error.message,
        });
    }
};

// 3. ADMIN: Get All Collections
export const getAllCollectionsAdmin = async (req, res) => {
    try {
        const collections = await Collection.find()
            .sort({ displayOrder: 1, createdAt: -1 })
            .lean();

        return res.status(200).json({ success: true, data: collections });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// 4. ADMIN: Update Collection
export const updateCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const updatePayload = { ...req.body };

        if (req.files?.desktopImage?.[0]) {
            const uploadRes = await uploadBufferToCloudinary(
                req.files.desktopImage[0].buffer,
                "collections/desktop"
            );
            updatePayload["bannerImage.desktop"] = uploadRes.secure_url;
        }

        if (req.files?.mobileImage?.[0]) {
            const uploadRes = await uploadBufferToCloudinary(
                req.files.mobileImage[0].buffer,
                "collections/mobile"
            );
            updatePayload["bannerImage.mobile"] = uploadRes.secure_url;
        }

        if (updatePayload.featuredPackages && typeof updatePayload.featuredPackages === "string") {
            updatePayload.featuredPackages = JSON.parse(updatePayload.featuredPackages);
        }

        const updated = await Collection.findByIdAndUpdate(id, updatePayload, { new: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Collection nahi mili" });
        }

        return res.status(200).json({
            success: true,
            message: "Collection update ho gayi",
            data: updated,
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// 5. ADMIN: Delete Collection
export const deleteCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await Collection.findById(id);

        if (!collection) {
            return res.status(404).json({ success: false, message: "Collection nahi mili" });
        }

        if (collection.bannerImage?.desktop) {
            await deleteFromCloudinary(collection.bannerImage.desktop).catch(() => { });
        }

        await Collection.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Collection delete ho gayi",
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};