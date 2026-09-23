import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        subtitle: {
            type: String,
            trim: true,
            default: "",
        },
        slug: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            index: true,
        },
        collectionType: {
            type: String,
            enum: ["weekend", "seasonal", "curated_theme"],
            required: true,
            default: "seasonal",
            trim: true,
            index: true,
        },
        seasonTag: {
            type: String,
            enum: ["all_season", "summer", "monsoon", "autumn", "winter"],
            default: "all_season",
            trim: true,
            index: true,
        },
        badgeText: {
            type: String,
            default: "",
        },
        bannerImage: {
            desktop: { type: String, required: true },
            mobile: { type: String },
        },
        featuredPackages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Package",
            },
        ],
        featuredDestinations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Destination",
            },
        ],
        exploreLink: {
            type: String,
            default: "",
        },
        displayOrder: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
        validFrom: { type: Date, default: null },
        validTill: { type: Date, default: null },
    },
    { timestamps: true }
);

collectionSchema.index({ collectionType: 1, seasonTag: 1, isActive: 1 });

export default mongoose.model("Collection", collectionSchema);