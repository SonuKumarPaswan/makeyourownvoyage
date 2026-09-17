import mongoose from "mongoose";

const TemplateActivitySchema = new mongoose.Schema(
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
    },
    { _id: true }
);

const TemplateDaySchema = new mongoose.Schema(
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
        activities: [TemplateActivitySchema],
    },
    { _id: true }
);

const ItineraryTemplateSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Template title is required'],
            trim: true,
        },
        destination: {
            type: String,
            required: [true, 'Destination is required'],
            trim: true,
        },
        days: {
            type: Number,
            default: 3,
        },
        nights: {
            type: Number,
            default: 2,
        },
        category: {
            type: String,
            default: 'Corporate Offsite',
        },
        daysPlan: [TemplateDaySchema],
    },
    { timestamps: true }
);

const ItineraryTemplate = mongoose.model('ItineraryTemplate', ItineraryTemplateSchema);
export default ItineraryTemplate;