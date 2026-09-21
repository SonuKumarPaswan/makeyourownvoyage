import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
      index: true,
    },

    country: {
      type: String,
      default: "India",
    },

    shortDescription: String,

    description: String,

    type: [
      {
        type: String,
        enum: [
          "hill_station",
          "beach",
          "wildlife",
          "heritage",
          "pilgrimage",
          "adventure",
          "city",
          "desert",
          "island",
          "other",
        ],
      },
    ],

    location: {
      latitude: Number,
      longitude: Number,
    },

    bestTimeToVisit: {
      months: [String],
      description: String,
    },

    recommendedDuration: {
      minDays: Number,
      maxDays: Number,
    },

    howToReach: {
      byAir: String,
      byTrain: String,
      byRoad: String,
    },

    estimatedBudget: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "INR",
      },
    },

    attractions: [
      {
        name: String,
        description: String,
        image: {
          url: String,
          alt: String,
        },
      },
    ],

    activities: [
      {
        name: String,
        description: String,
      },
    ],

    suitableFor: [
      {
        type: String,
        enum: [
          "family",
          "couple",
          "friends",
          "corporate",
          "solo",
          "group",
        ],
      },
    ],

    travelTips: [String],

    images: [
      {
        url: String,
        alt: String,
        type: {
          type: String,
          enum: ["cover", "gallery"],
        },
        order: Number,
      },
    ],

    seo: {
      title: String,
      description: String,
      keywords: [String],
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

destinationSchema.index({ state: 1, slug: 1 }, { unique: true });

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;
