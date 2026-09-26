import Joi from "joi";

const objectId = Joi.string().hex().length(24).messages({
    "string.length": "Invalid ID format",
    "string.hex": "Invalid ID format",
});

export const packageIdParamSchema = Joi.object({
    id: objectId.required(),
});

export const packageSlugParamSchema = Joi.object({
    slug: Joi.string().trim().required(),
});

// Admin Create / Update Package Schema
export const createPackageSchema = Joi.object({
    title: Joi.string().trim().min(2).max(200).required(),
    slug: Joi.string().trim().allow("").optional(),
    destination: Joi.string().trim().required(), // ObjectId or slug
    categories: Joi.alternatives().try(
        Joi.array().items(Joi.string().trim()),
        Joi.string()
    ).optional(),
    packageType: Joi.string()
        .valid(
            "sea_beach",
            "trekking_tour",
            "single_tour",
            "weekend_trips",
            "mountain_trips",
            "group_trips",
            "honeymoon",
            "family",
            "couple",
            "corporate",
            "adventure",
            "luxury",
            "pilgrimage",
            "heritage",
            "road_trip",
            "domestic",
            "weekend",
            "group",
            "custom",
            "holiday"
        )
        .default("sea_beach"),
    region: Joi.string().trim().allow("").optional(),
    days: Joi.number().integer().min(1).optional(),
    nights: Joi.number().integer().min(0).optional(),
    duration: Joi.alternatives().try(
        Joi.object({
            days: Joi.number().integer().min(1).required(),
            nights: Joi.number().integer().min(0).required(),
        }),
        Joi.string()
    ).optional(),
    startingPrice: Joi.number().min(0).required(),
    currency: Joi.string().trim().default("INR").optional(),
    minPax: Joi.number().integer().min(1).optional(),
    maxPax: Joi.number().integer().min(1).optional(),
    templateId: objectId.allow("", null).optional(),
    sourceTemplate: objectId.allow("", null).optional(),
    primaryHotel: Joi.alternatives().try(objectId, Joi.object(), Joi.string().allow("", null)).optional(),
    primaryTransport: Joi.alternatives().try(objectId, Joi.object(), Joi.string().allow("", null)).optional(),
    customItinerary: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    itinerary: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    functions: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    priceSlabs: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    corporateFacilities: Joi.alternatives().try(Joi.object(), Joi.string()).optional(),
    inclusions: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    exclusions: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    image: Joi.string().allow("").optional(),
    gallery: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    overview: Joi.string().trim().allow("").optional(),
    policies: Joi.alternatives().try(Joi.object(), Joi.string()).optional(),
    summary: Joi.alternatives().try(Joi.object(), Joi.string()).optional(),
    isFeatured: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
    featured: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
    isActive: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
}).unknown(true);

