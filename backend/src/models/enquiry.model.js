import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
    {
        // Unique Reference Identifier (e.g., ENQ-HTL-17290123)
        enquiryCode: {
            type: String,
            unique: true,
            index: true,
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
                        enum: ["Economy", "Premium Economy", "Business", "First Class"],
                        default: "Economy",
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
                        enum: ["Cab", "Bus", "Bike", "Traveller", "Other"],
                        default: "Cab",
                    },
                    vehicleType: { type: String, default: "" },
                    pickupLocation: { type: String, default: "" },
                    dropLocation: { type: String, default: "" },
                    serviceType: {
                        type: String,
                        enum: [
                            "Outstation One-Way",
                            "Outstation Round-Trip",
                            "Airport Transfer",
                            "Hourly City Rental",
                            "Daily Rental",
                            "Other",
                        ],
                        default: "Outstation One-Way",
                    },
                    pickupDate: { type: Date },
                    pickupTime: { type: String, default: "" },
                    returnDate: { type: Date },
                    passengersCount: { type: Number, default: 1 },
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

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
