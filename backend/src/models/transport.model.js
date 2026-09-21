import mongoose from "mongoose";

const transportSchema = new mongoose.Schema(
    {
        // Basic Details
        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
            // e.g., "Maruti Suzuki Dzire or similar", "Volvo Multi-Axle AC Sleeper", "Royal Enfield Classic 350"
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
        },

        // Category
        category: {
            type: String,
            enum: ["Cab", "Bus", "Bike", "Traveller"],
            required: true,
            index: true,
        },

        // Vehicle Sub-Types
        vehicleType: {
            type: String,
            required: true,
            // Cabs: "Hatchback", "Sedan", "SUV", "Luxury"
            // Bus: "AC Sleeper", "Non-AC Sleeper", "AC Seater", "Volvo Multi-Axle", "BharatBenz"
            // Bike: "Scooter", "Cruiser", "Sports", "Standard Commuter"
            // Traveller: "12 Seater", "17 Seater", "26 Seater"
            index: true,
        },

        brand: {
            type: String, // e.g., "Toyota", "Maruti", "Volvo", "Royal Enfield", "Honda"
            trim: true,
        },
        modelName: {
            type: String, // e.g., "Innova Crysta", "B11R", "Himalayan 450", "Activa 6G"
            trim: true,
        },

        // Capacity Specs
        capacity: {
            seating: {
                type: Number,
                required: true,
                min: 1, // Bike: 1-2, Car: 4-7, Bus: 30-50, Traveller: 12-26
            },
            luggageBags: {
                type: Number,
                default: 0,
            },
        },

        // Mechanical & Comfort Specs
        specifications: {
            fuelType: {
                type: String,
                enum: ["Petrol", "Diesel", "CNG", "Electric"],
                default: "Diesel",
            },
            transmission: {
                type: String,
                enum: ["Manual", "Automatic"],
                default: "Manual",
            },
            hasAC: {
                type: Boolean,
                default: true,
            },
            helmetProvidedCount: {
                type: Number, // Only relevant for Bike rentals (0, 1, or 2)
                default: 0,
            },
            isSelfDrive: {
                type: Boolean,
                default: false, // true for self-drive bikes/cars, false for chauffeur/driver driven
            },
        },

        // Media & Photos
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
                isCover: {
                    type: Boolean,
                    default: false
                },
            },
        ],

        // Operational Coverage
        availableCities: [
            {
                type: String,
                lowercase: true,
                trim: true,
                index: true, // e.g., ["delhi", "manali", "chandigarh", "rishikesh", "goa"]
            },
        ],

        // Service Modes (MMT Tabs)
        serviceTypes: [
            {
                type: String,
                enum: [
                    "Outstation One-Way",
                    "Outstation Round-Trip",
                    "Airport Transfer",
                    "Hourly City Rental",
                    "Daily Rental", // Useful for Bikes/Self-drive
                    "Intercity Scheduled Route", // For Buses
                ],
                required: true,
            },
        ],

        // Multi-Mode Comprehensive Pricing
        pricing: {
            currency: {
                type: String,
                default: "INR",
            },
            // Cab / Traveller Outstation rates
            perKmRate: {
                type: Number,
                default: 0, // e.g. ₹14/km
            },
            baseFare: {
                type: Number,
                default: 0, // Minimum base price (e.g. ₹1200 for airport drop)
            },
            driverAllowancePerDay: {
                type: Number,
                default: 0, // e.g. ₹350/night for long outstation
            },
            tollAndTaxIncluded: {
                type: Boolean,
                default: false,
            },

            // Bike / Self-drive daily & hourly rates
            dailyRentalPrice: {
                type: Number,
                default: 0, // e.g. ₹800/day for Activa, ₹1800/day for Himalayan
            },
            hourlyRentalPrice: {
                type: Number,
                default: 0, // e.g. ₹100/hr
            },
            securityDeposit: {
                type: Number,
                default: 0, // Refundable deposit for self-drive bikes/cars
            },

            // Bus per-seat ticket pricing (if operating scheduled bus)
            seatTicketPrice: {
                type: Number,
                default: 0, // e.g. ₹950 per seat
            },

            taxPercentage: {
                type: Number,
                default: 5, // 5% GST on transport
            },
        },

        // Amenities (MMT badging: WiFi, Water Bottle, Blanket, USB Charger)
        amenities: [
            {
                type: String,
                index: true,
                // ["WiFi", "Live Tracking", "Emergency SOS", "USB Charging Point", "Water Bottle", "Blanket", "Luggage Carrier", "First Aid Kit"]
            },
        ],

        // Policies & Booking Rules
        policies: {
            cancellationPolicy: {
                isFreeCancellation: { type: Boolean, default: true },
                freeCancellationHoursBefore: { type: Number, default: 24 },
                cancellationFee: { type: Number, default: 0 },
            },
            drivingLicenseRequired: {
                type: Boolean,
                default: false, // true for self-drive bikes/cars
            },
            minAgeRequirement: {
                type: Number,
                default: 18,
            },
            fuelPolicy: {
                type: String,
                enum: ["Full-to-Full", "Same-to-Same", "Excluded", "Included"],
                default: "Included", // Included for cabs/buses, Same-to-Same for bikes
            },
        },

        // Rating & Performance
        rating: {
            average: { type: Number, default: 4.5, min: 0, max: 5 },
            totalReviews: { type: Number, default: 0 },
        },

        // Admin & Operational Status
        status: {
            type: String,
            enum: ["active", "inactive", "under_maintenance"],
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
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Production Indexes for Public & Admin Searches
transportSchema.index({ category: 1, status: 1 });
transportSchema.index({ availableCities: 1, status: 1 });
transportSchema.index({ vehicleType: 1, status: 1 });
transportSchema.index({ isFeatured: 1, status: 1 });

// Virtual: Dynamic Display Price based on Category
transportSchema.virtual("displayPrice").get(function () {
    if (this.category === "Bike") {
        return {
            amount: this.pricing.dailyRentalPrice || this.pricing.hourlyRentalPrice,
            unit: this.pricing.dailyRentalPrice ? "per day" : "per hr",
        };
    }
    if (this.category === "Bus") {
        return {
            amount: this.pricing.seatTicketPrice,
            unit: "per seat",
        };
    }
    // For Cabs and Travellers
    return {
        amount: this.pricing.perKmRate,
        unit: "per km",
    };
});

const Transport = mongoose.model("Transport", transportSchema);

export default Transport;