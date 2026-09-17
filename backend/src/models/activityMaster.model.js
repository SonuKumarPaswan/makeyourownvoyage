import mongoose from "mongoose";

const ActivityMasterSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
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
                'sightseeing',
                'adventure',
                'other',
            ],
            required: true,
        },
        destination: {
            type: String,
            required: true,
            trim: true,
        },
        approxDuration: {
            type: String,
            default: '2 Hours',
        },
        description: {
            type: String,
            default: '',
            trim: true,
        },
        image: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

const ActivityMaster = mongoose.model('ActivityMaster', ActivityMasterSchema);
export default ActivityMaster;
