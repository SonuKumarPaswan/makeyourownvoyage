import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
    {
        // Unique Reference Identifier (e.g., ENQ-HTL-17290123)
        enquiryCode: {
            type: String,
            unique: true,
        },

        // Category / Form Type
        enquiryType: {
            type: String,
            enum: ["hotel", "flight", "package", "weekend_trip", "transport", "custom"],
            required: true,
            index: true,
        },

        // Customer Contact Information (Common to all forms)
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        customerName: {
            type: String,
            required: [true, "Customer name is required"],
            trim: true,
        },
        customerEmail: {
            type: String,
            required: [true, "Customer email is required"],
            lowercase: true,
            trim: true,
        },
        customerPhone: {
            type: String,
            required: [true, "Customer phone number is required"],
            trim: true,
        },
        city: {
            type: String,
            trim: true,
            default: "",
        },
        specialRequests: {
            type: String,
            trim: true,
            default: "",
        },

        // 1. HOTEL SPECIFIC DETAILS
        hotelDetails: {
            type: new mongoose.Schema(
                {
                    hotelId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Hotel",
                        default: null,
                    },
                    hotelName: { type: String, default: "" },
                    roomType: { type: String, default: "" },
                    roomsCount: { type: Number, default: 1, min: 1 },
                    checkInDate: { type: Date },
                    checkOutDate: { type: Date },
                    guests: {
                        adults: { type: Number, default: 1, min: 1 },
                        children: { type: Number, default: 0, min: 0 },
                    },
                    mealPlan: { type: String, default: "" },
                    pricePerNight: { type: Number, default: 0 },
                    totalEstimatedPrice: { type: Number, default: 0 },
                    currency: { type: String, default: "INR" },
                },
                { _id: false }
            ),
            default: undefined,
        },

        // 2. FLIGHT SPECIFIC DETAILS
        flightDetails: {
            type: new mongoose.Schema(
                {
                    fromCity: { type: String, default: "" },
                    toCity: { type: String, default: "" },
                    tripType: {
                        type: String,
                        enum: ["one_way", "round_trip"],
                        default: "one_way",
                    },
                    departureDate: { type: Date },
                    returnDate: { type: Date },
                    travelClass: {
                        type: String,
                        default: "Economy",
                        set: (val) => {
                            if (!val) return "Economy";
                            const s = String(val).toLowerCase().trim();
                            if (s.includes("prem")) return "Premium Economy";
                            if (s.includes("busi")) return "Business";
                            if (s.includes("first")) return "First Class";
                            return "Economy";
                        },
                        enum: [
                            "Economy",
                            "Premium Economy",
                            "Business",
                            "First Class",
                            "economy",
                            "premium economy",
                            "premium_economy",
                            "business",
                            "first class",
                            "first_class",
                        ],
                    },
                    passengers: {
                        adults: { type: Number, default: 1, min: 1 },
                        children: { type: Number, default: 0, min: 0 },
                        infants: { type: Number, default: 0, min: 0 },
                    },
                },
                { _id: false }
            ),
            default: undefined,
        },

        // 3. PACKAGE & WEEKEND TRIP SPECIFIC DETAILS
        packageDetails: {
            type: new mongoose.Schema(
                {
                    packageId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Package",
                        default: null,
                    },
                    destinationId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Destination",
                        default: null,
                    },
                    packageTitle: { type: String, default: "" },
                    travelDate: { type: Date },
                    durationDays: { type: Number, default: 3 },
                    travelers: {
                        adults: { type: Number, default: 1, min: 1 },
                        children: { type: Number, default: 0, min: 0 },
                    },
                    packageCategory: {
                        type: String,
                        enum: ["holiday", "weekend_trip", "corporate", "honeymoon", "family", "other"],
                        default: "holiday",
                    },
                    corporateFacilitiesNeeded: {
                        conferenceHall: { type: Boolean, default: false },
                        teamBuilding: { type: Boolean, default: false },
                        djAndSound: { type: Boolean, default: false },
                    },
                    pricePerPerson: { type: Number, default: 0 },
                    totalEstimatedPrice: { type: Number, default: 0 },
                    currency: { type: String, default: "INR" },
                },
                { _id: false }
            ),
            default: undefined,
        },

        // 4. TRANSPORT / CAB SPECIFIC DETAILS
        transportDetails: {
            type: new mongoose.Schema(
                {
                    transportId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Transport",
                        default: null,
                    },
                    category: {
                        type: String,
                        default: "Cab",
                        set: (val) => {
                            if (!val) return "Cab";
                            const s = String(val).toLowerCase().trim();
                            if (s.includes("bus")) return "Bus";
                            if (s.includes("bike")) return "Bike";
                            if (s.includes("travel")) return "Traveller";
                            if (s.includes("cab") || s.includes("car") || s.includes("taxi")) return "Cab";
                            return "Other";
                        },
                        enum: ["Cab", "Bus", "Bike", "Traveller", "Other", "cab", "bus", "bike", "traveller", "other", "car", "taxi"],
                    },
                    vehicleType: { type: String, default: "" },
                    pickupLocation: { type: String, default: "" },
                    dropLocation: { type: String, default: "" },
                    serviceType: {
                        type: String,
                        default: "Outstation One-Way",
                        set: (val) => {
                            if (!val) return "Outstation One-Way";
                            const s = String(val).toLowerCase().trim();
                            if (s.includes("round")) return "Outstation Round-Trip";
                            if (s.includes("airport")) return "Airport Transfer";
                            if (s.includes("hour")) return "Hourly City Rental";
                            if (s.includes("day") || s.includes("daily") || s.includes("rental")) return "Daily Rental";
                            if (s.includes("outstation")) return "Outstation One-Way";
                            return "Other";
                        },
                        enum: [
                            "Outstation One-Way",
                            "Outstation Round-Trip",
                            "Airport Transfer",
                            "Hourly City Rental",
                            "Daily Rental",
                            "Other",
                            "outstation",
                            "rental",
                            "transfer",
                            "round_trip",
                            "one_way",
                        ],
                    },
                    pickupDate: { type: Date },
                    pickupTime: { type: String, default: "" },
                    returnDate: { type: Date },
                    passengersCount: { type: Number, default: 1 },
                    estimatedPrice: { type: Number, default: 0 },
                    currency: { type: String, default: "INR" },
                },
                { _id: false }
            ),
            default: undefined,
        },

        // Admin CRM & Status Management
        status: {
            type: String,
            enum: ["new", "in_progress", "contacted", "quoted", "converted", "cancelled"],
            default: "new",
            index: true,
        },
        quotedPrice: {
            type: Number,
            default: 0,
        },
        adminNotes: [
            {
                note: { type: String, required: true },
                addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                if (ret.enquiryType !== "hotel") delete ret.hotelDetails;
                if (ret.enquiryType !== "flight") delete ret.flightDetails;
                if (ret.enquiryType !== "package" && ret.enquiryType !== "weekend_trip") delete ret.packageDetails;
                if (ret.enquiryType !== "transport") delete ret.transportDetails;
                return ret;
            },
        },
    }
);

// Auto-generate unique enquiryCode before save if missing
enquirySchema.pre("save", function (next) {
    if (!this.enquiryCode) {
        const typePrefixMap = {
            hotel: "HTL",
            flight: "FLT",
            package: "PKG",
            weekend_trip: "WKD",
            transport: "TRP",
            custom: "CST",
        };
        const prefix = typePrefixMap[this.enquiryType] || "ENQ";
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const timestamp = Date.now().toString().slice(-4);
        this.enquiryCode = `ENQ-${prefix}-${timestamp}${randomNum}`;
    }
    if (typeof next === "function") next();
});

// Production Indexes for High-Frequency Queries
enquirySchema.index({ customerEmail: 1, createdAt: -1 });
enquirySchema.index({ customerPhone: 1, createdAt: -1 });
enquirySchema.index({ enquiryType: 1, status: 1, createdAt: -1 });

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
