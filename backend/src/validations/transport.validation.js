import Joi from "joi";

const objectId = Joi.string().hex().length(24).messages({
    "string.length": "Invalid ID format",
    "string.hex": "Invalid ID format",
});

export const transportIdParamSchema = Joi.object({
    id: objectId.required(),
});

export const transportSlugParamSchema = Joi.object({
    slug: Joi.string().trim().required(),
});

export const createTransportSchema = Joi.object({
    title: Joi.string().trim().min(2).max(120).required(),
    description: Joi.string().trim().min(5).required(),
    category: Joi.string().valid("Cab", "Bus", "Bike", "Traveller").required(),
    vehicleType: Joi.string().trim().required(),
    brand: Joi.string().trim().allow("").optional(),
    modelName: Joi.string().trim().allow("").optional(),
    capacity: Joi.alternatives().try(Joi.object(), Joi.string()).optional(),
    pricing: Joi.alternatives().try(Joi.object(), Joi.string()).optional(),
    features: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    includedServices: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    excludedServices: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    images: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    serviceLocations: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    fuelType: Joi.string().allow("").optional(),
    transmission: Joi.string().allow("").optional(),
    featured: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
    isActive: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
});
