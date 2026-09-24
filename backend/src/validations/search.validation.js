import Joi from "joi";

export const globalSearchQuerySchema = Joi.object({
    q: Joi.string().trim().min(1).max(100).required().messages({
        "string.empty": "Search query cannot be empty",
        "any.required": "Search query parameter 'q' is required",
    }),
    type: Joi.string()
        .valid("all", "hotel", "hotels", "package", "packages", "destination", "destinations", "transport")
        .default("all"),
    limit: Joi.number().integer().min(1).max(50).default(6),
    page: Joi.number().integer().min(1).default(1),
});

export const suggestionsQuerySchema = Joi.object({
    q: Joi.string().trim().min(1).max(50).required().messages({
        "string.empty": "Search suggestion query cannot be empty",
        "any.required": "Parameter 'q' is required",
    }),
    limit: Joi.number().integer().min(1).max(20).default(5),
});
