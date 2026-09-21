import Joi from "joi";

// Reusable MongoDB ObjectId validator
const objectId = Joi.string()
    .hex()
    .length(24)
    .messages({
        "string.length": "Invalid ID format",
        "string.hex": "Invalid ID format",
    });

// Register validation (name, email, phoneNumber, password)
export const registerSchema = Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().trim().email().lowercase().required(),
    phoneNumber: Joi.string()
        .pattern(/^[0-9+]{10,15}$/)
        .required()
        .messages({
            "string.pattern.base": "Please provide a valid phone number (10-15 digits)",
        }),
    password: Joi.string().min(6).required(),
});

// Login validation (email OR phone + password)
export const loginSchema = Joi.object({
    email: Joi.string().trim().email().lowercase().empty(""),
    phoneNumber: Joi.string().pattern(/^[0-9+]{10,15}$/).empty(""),
    password: Joi.string().required(),
}).xor("email", "phoneNumber"); // requires either email or phoneNumber

export const updateUserSchema = Joi.object({
    name: Joi.string().trim().min(2).max(50),
    email: Joi.string().trim().email().lowercase().empty(""),
    phoneNumber: Joi.string().pattern(/^[0-9+]{10,15}$/).empty(""),
    password: Joi.string().min(6).empty(""),
}).min(1); // at least one field is required to update

// Param ID validation
export const idParamSchema = Joi.object({
    id: objectId.required(),
});
