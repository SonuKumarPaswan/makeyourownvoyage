import mongoose from "mongoose";


// for activities in a package 
const ActivitySchema = new mongoose.Schema(
    {
        time: {
            type: String,
            default: '',
            trim: true,
        },
        type: {
            type: String,
            enum: [
                'conference',
                'team_building',
                'gala_dinner',
                'cocktail_night',
                'award_ceremony',
                'breakfast',
                'lunch',
                'dinner',
                'transfer',
                'bus_departure',
                'bus_arrival',
                'hotel_checkin',
                'hotel_checkout',
                'sightseeing',
                'adventure',
                'free_time',
                'other',
            ],
            default: 'activity',
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: '',
            trim: true,
        },
        location: {
            type: String,
            default: '',
            trim: true,
        },
        duration: {
            type: String,
            default: '',
            trim: true,
        },
        image: {
            type: String,
            default: '',
            trim: true,
        },
    },
    { _id: true }
);


// for overnight stays in a package
const OvernightSchema = new mongoose.Schema(
    {
        enabled: {
            type: Boolean,
            default: true,
        },
        location: {
            type: String,
            default: '',
            trim: true,
        },
        hotelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hotel', // References your Hotel model
        },
        checkIn: {
            type: String,
            default: '12:00 PM',
            trim: true,
        },
        roomType: {
            type: String,
            default: 'Twin Sharing Deluxe',
            trim: true,
        },
        description: {
            type: String,
            default: '',
            trim: true,
        },
    },
    { _id: false }
);



//for each day in a package
const ItineraryDaySchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: '',
        },
        dayTransport: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transport', // References your Transport model for specific day travel
        },
        activities: [ActivitySchema],
        overnight: {
            type: OvernightSchema,
            default: () => ({ enabled: true }),
        },
    },
    { _id: true }
);


//main package model
const PackageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Package title is required'],
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            index: true,
        },
        destination: {
            type: String,
            required: [true, 'Destination name is required'],
            trim: true,
            index: true,
        },
        region: {
            type: String,
            required: true,
            trim: true,
        },
        days: {
            type: Number,
            default: 3,
            min: 1,
        },
        nights: {
            type: Number,
            default: 2,
            min: 0,
        },
        duration: {
            type: String,
            default: '3 Days / 2 Nights',
        },

        // Master references to Hotel & Transport models
        primaryHotel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hotel',
        },
        primaryTransport: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transport',
        },
        sourceTemplate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ItineraryTemplate',
            default: null,
        },

        // Corporate MICE Specific Features
        corporateFacilities: {
            conferenceHallIncluded: { type: Boolean, default: false },
            projectorAndAVSetup: { type: Boolean, default: false },
            djAndSoundSystem: { type: Boolean, default: false },
            teamBuildingFacilitator: { type: Boolean, default: false },
            stageAndBackdrop: { type: Boolean, default: false },
        },

        // B2B Pricing Slabs
        startingPrice: {
            type: Number,
            required: [true, 'Starting price is required'],
        },
        currency: {
            type: String,
            default: 'INR',
        },
        minPax: {
            type: Number,
            default: 20,
        },
        maxPax: {
            type: Number,
            default: 200,
        },
        priceSlabs: [
            {
                minPax: { type: Number, required: true },
                maxPax: { type: Number, required: true },
                pricePerPerson: { type: Number, required: true },
            },
        ],

        // Media & Terms
        image: {
            type: String,
            required: [true, 'Primary image URL is required'],
        },
        gallery: [{ type: String }],
        inclusions: [{ type: String }],
        exclusions: [{ type: String }],

        // Day-by-Day Full Customized Itinerary
        itinerary: {
            type: [ItineraryDaySchema],
            default: [],
        },

        summary: {
            transfers: { type: Number, default: 0 },
            hotels: { type: Number, default: 0 },
            activities: { type: Number, default: 0 },
            meals: { type: Number, default: 0 },
        },
        policies: {
            cancellation: { type: String, default: '' },
            terms: { type: String, default: '' },
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);




PackageSchema.pre('save', function () {
    if (this.isModified('title') || !this.slug) {
        this.slug =
            this.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '') +
            '-' +
            Date.now().toString().slice(-4);
    }
    this.duration = `${this.days} Days / ${this.nights} Nights`;
});
const Package = mongoose.model('Package', PackageSchema);
export default Package;