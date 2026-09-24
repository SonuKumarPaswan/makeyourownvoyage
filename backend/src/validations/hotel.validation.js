import Joi from "joi";

const objectId = Joi.string().hex().length(24).messages({
    "string.length": "Invalid ID format",
    "string.hex": "Invalid ID format",
});

export const hotelIdParamSchema = Joi.object({
    id: objectId.required(),
});

export const hotelSlugParamSchema = Joi.object({
    slug: Joi.string().trim().required(),
});

// Admin Create Hotel Validation
// Accepts objects or JSON strings because Multer parses multipart/form-data fields as strings
export const createHotelSchema = Joi.object({
    name: Joi.string().trim().min(2).max(150).required(),
    propertyType: Joi.string().trim().required(),
    starCategory: Joi.number().integer().min(1).max(5).default(3),
    description: Joi.string().trim().min(10).required(),
    destination: Joi.string().trim().required(), // destination ID or slug
    location: Joi.alternatives().try(Joi.object(), Joi.string()).optional(),
    rooms: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    amenities: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    policies: Joi.alternatives().try(Joi.object(), Joi.string()).optional(),
    images: Joi.alternatives().try(Joi.array(), Joi.string()).optional(),
    contact: Joi.alternatives().try(Joi.object(), Joi.string()).optional(),
    featured: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
    isActive: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
});

// Public Search Query Validation (?destination=...&city=...&page=...)
export const hotelSearchQuerySchema = Joi.object({
    destination: Joi.string().trim().optional(),
    city: Joi.string().trim().optional(),
    minPrice: Joi.number().min(0).optional(),
    maxPrice: Joi.number().min(0).optional(),
    starCategory: Joi.number().integer().min(1).max(5).optional(),
    propertyType: Joi.string().trim().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
    sort: Joi.string().trim().optional(),
});
