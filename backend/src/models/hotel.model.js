import mongoose from "mongoose";

// Sub-schema: Room Level
const roomSchema = new mongoose.Schema(
    {
        roomType: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        images: [String],
        bedType: {
            type: String,
            default: "King Bed"
        },
        bedCount: {
            type: Number,
            default: 1
        },
        occupancy: {
            adults: {
                type: Number, required: true
            },
            children: {
                type: Number, default: 0
            },
            maxGuests: {
                type: Number, required: true
            },
        },
        roomSize: {
            value: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                default: "sqft"
            },
        },
        amenities: [String],
        mealPlan: [String], // e.g. ["Breakfast Included", "Half Board"]
        pricing: {
            basePrice: {
                type: Number,
                required: true
            },
            taxPercentage: {
                type: Number,
                default: 18
            },
            taxAmount: {
                type: Number,
                required: true
            },
            finalPrice: {
                type: Number,
                required: true
            },
            currency: {
                type: String,
                default: "INR"
            },
        },
        availability: {
            totalRooms: {
                type: Number,
                required: true
            },
            availableRooms: {
                type: Number,
                required: true
            },
        },
    },
    {
        _id: true
    }
);

// Main Hotel Schema
const hotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true
        },
        description: {
            type: String, required: true
        },
        propertyType: { type: String, required: true, index: true },
        starCategory: {
            type: Number,
            min: 1,
            max: 5,
            default: 3
        },
        destination: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Destination",
            required: true,
            index: true,
        },

        location: {
            address: {
                type: String,
                required: true
            },
            area: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true,
                lowercase: true,
                index: true
            },
            state: {
                type: String,
                required: true
            },
            country: {
                type: String,
                default: "India"
            },
            pincode: {
                type: String,
                required: true
            },
            coordinates: {
                latitude: {
                    type: Number,
                    required: true
                },
                longitude: {
                    type: Number,
                    required: true
                },
            },
        },

        contact: {
            phone: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                lowercase: true
            },
        },

        images: [
            {
                url: {
                    type: String,
                    required: true
                },
                alt: {
                    type: String,
                    default: ""
                },
                type: {
                    type: String,
                    enum: ["cover", "room", "view", "amenity", "spa", "pool", "beach"], default: "room"
                },
                order: {
                    type: Number,
                    default: 1
                },
            },
        ],

        rating: {
            average: {
                type: Number,
                default: 0,
                min: 0,
                max: 5
            },
            totalReviews: {
                type: Number,
                default: 0
            },
        },

        amenities: [{
            type: String,
            index: true
        }],

        rooms: [roomSchema],

        dining: {
            restaurants: [
                {
                    name: String,
                    cuisine: [String],
                    openingTime: String,
                    closingTime: String,
                },
            ],
            breakfast: {
                available: {
                    type: Boolean,
                    default: false
                },
                timing: String,
                type: {
                    type: String,
                    default: "Buffet"
                },
            },
        },

        facilities: {
            parking: {
                type: Boolean,
                default: false
            },
            swimmingPool: {
                type: Boolean,
                default: false
            },
            gym: {
                type: Boolean,
                default: false
            },
            spa: {
                type: Boolean,
                default: false
            },
            restaurant: {
                type: Boolean,
                default: false
            },
            conferenceRoom: {
                type: Boolean,
                default: false
            },
        },

        checkIn: {
            time: {
                type: String,
                default: "14:00"
            },
            ageRequirement: {
                type: Number,
                default: 18
            },
        },

        checkOut: {
            time: {
                type: String,
                default: "11:00"
            },
        },

        policies: {
            petsAllowed: {
                type: Boolean,
                default: false
            },
            smokingAllowed: {
                type: Boolean,
                default: false
            },
            couplesAllowed: {
                type: Boolean,
                default: true
            },
            localIdsAccepted: {
                type: Boolean,
                default: true
            },
            childrenAllowed: {
                type: Boolean,
                default: true
            },
            extraBedAvailable: {
                type: Boolean,
                default: false
            },
        },

        cancellationPolicy: {
            type: {
                type: String,
                default: "Free Cancellation"
            },
            freeCancellationBefore: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
        },

        nearbyAttractions: [
            {
                name: String,
                distance: String,
            },
        ],

        status: {
            type: String,
            enum: ["active", "inactive", "under_review"],
            default: "active",
            index: true,
        },
        isFeatured: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;