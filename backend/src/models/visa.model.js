import mongoose from "mongoose";

const VisaDocumentSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, default: "", trim: true },
    },
    { _id: false }
);

const VisaSchema = new mongoose.Schema(
    {
        country: {
            type: String,
            required: [true, "Country name is required"],
            trim: true,
            index: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        flag: {
            type: String,
            default: "🌍",
            trim: true,
        },
        visaType: {
            type: String,
            required: true,
            trim: true,
            default: "Tourist E-Visa",
        },
        processingTime: {
            type: String,
            default: "24 - 48 Hours",
            trim: true,
        },
        validity: {
            type: String,
            default: "60 Days",
            trim: true,
        },
        stayDuration: {
            type: String,
            default: "30 Days",
            trim: true,
        },
        fee: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            default: "INR",
        },
        entryType: {
            type: String,
            enum: ["Single Entry", "Multiple Entry", "Single / Multi"],
            default: "Single Entry",
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },
        documents: {
            type: [VisaDocumentSchema],
            default: [],
        },
        steps: {
            type: [String],
            default: [],
        },
        isPopular: {
            type: Boolean,
            default: false,
            index: true,
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

VisaSchema.pre("save", function (next) {
    if (this.isModified("country") || !this.slug) {
        this.slug =
            this.country
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");
    }
    if (typeof next === "function") next();
});

const Visa = mongoose.model("Visa", VisaSchema);
export default Visa;
