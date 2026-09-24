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
    title: Joi.string().trim().min(3).max(150).required(),
    destination: Joi.string().trim().required(), // ObjectId or slug
    packageType: Joi.string()
        .valid("holiday", "weekend", "honeymoon", "adventure", "pilgrimage", "corporate")
        .default("holiday"),
    startingPrice: Joi.number().min(0).required(),
    templateId: objectId.allow("", null).optional(),
    duration: Joi.alternatives().try(
        Joi.object({
            days: Joi.number().integer().min(1).required(),
            nights: Joi.number().integer().min(0).required(),
        }),
        Joi.string()
    ).optional(),
    customItinerary: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    inclusions: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    exclusions: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    primaryHotel: Joi.alternatives().try(Joi.object(), Joi.string()).optional(),
    primaryTransport: Joi.alternatives().try(Joi.object(), Joi.string()).optional(),
    overview: Joi.string().trim().allow("").optional(),
    featured: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
    isActive: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
});
