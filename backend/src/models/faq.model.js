import mongoose from "mongoose";
const faqSchema = new mongoose.Schema(
    {
        destination: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Destination",
            default: null,
            index: true,
        },

        question: {
            type: String,
            required: true,
        },

        answer: {
            type: String,
            required: true,
        },

        order: {
            type: Number,
            default: 0,
        },

        isPublished: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Faq = mongoose.model("Faq", faqSchema);
export default Faq;