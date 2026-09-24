// src/validations/enquiry.validation.js
import Joi from "joi";

export const objectId = Joi.string().hex().length(24).messages({
    "string.length": "Invalid ID format",
    "string.hex": "Invalid ID format",
});

// Common Customer Contact Fields (Supports both customerName/name, customerPhone/phone)
const customerFields = {
    customerName: Joi.string().trim().min(2).max(60),
    name: Joi.string().trim().min(2).max(60),
    customerEmail: Joi.string().trim().email().lowercase(),
    email: Joi.string().trim().email().lowercase(),
    customerPhone: Joi.string()
        .trim()
        .pattern(/^(?:\+91)?[6-9]\d{9}$/)
        .messages({
            "string.pattern.base": "Please provide a valid 10-digit mobile number",
        }),
    phoneNumber: Joi.string().trim().pattern(/^(?:\+91)?[6-9]\d{9}$/),
    phone: Joi.string().trim().pattern(/^(?:\+91)?[6-9]\d{9}$/),
    city: Joi.string().trim().allow("").optional(),
    specialRequests: Joi.string().trim().max(1000).allow("").optional(),
    enquiryType: Joi.string().optional(),
};

// 1. HOTEL ENQUIRY VALIDATION
export const hotelEnquirySchema = Joi.object({
    ...customerFields,
    hotelId: objectId.allow("", null).optional(),
    hotelSlug: Joi.string().trim().allow("").optional(),
    slug: Joi.string().trim().allow("").optional(),
    hotelName: Joi.string().trim().allow("").optional(),
    roomType: Joi.string().trim().allow("").optional(),
    roomsCount: Joi.number().integer().min(1).default(1),
    numberOfRooms: Joi.number().integer().min(1).optional(),
    mealPlan: Joi.string().trim().allow("").optional(),
    checkInDate: Joi.date().iso().allow(null, "").optional(),
    checkOutDate: Joi.date().iso().allow(null, "").optional(),
    // Allow either guests object OR flat adults/children
    guests: Joi.object({
        adults: Joi.number().integer().min(1).default(1),
        children: Joi.number().integer().min(0).default(0),
    }).optional(),
    adults: Joi.number().integer().min(1).optional(),
    children: Joi.number().integer().min(0).optional(),
    hotelDetails: Joi.object().unknown(true).optional(),
}).or("customerName", "name").or("customerEmail", "email").or("customerPhone", "phoneNumber", "phone");

// 2. FLIGHT ENQUIRY VALIDATION
export const flightEnquirySchema = Joi.object({
    ...customerFields,
    tripType: Joi.string()
        .valid("one-way", "one_way", "round-trip", "round_trip", "multi-city", "multi_city")
        .default("one_way"),
    fromCity: Joi.string().trim().min(2).required(),
    toCity: Joi.string().trim().min(2).required(),
    departureDate: Joi.date().iso().required(),
    returnDate: Joi.date().iso().allow(null, "").optional(),
    passengers: Joi.object({
        adults: Joi.number().integer().min(1).default(1),
        children: Joi.number().integer().min(0).default(0),
        infants: Joi.number().integer().min(0).default(0),
    }).optional(),
    adults: Joi.number().integer().min(1).optional(),
    children: Joi.number().integer().min(0).optional(),
    infants: Joi.number().integer().min(0).optional(),
    travelClass: Joi.string().allow("").default("Economy"),
    flightDetails: Joi.object().unknown(true).optional(),
}).or("customerName", "name").or("customerEmail", "email").or("customerPhone", "phoneNumber", "phone");

// 3. PACKAGE ENQUIRY VALIDATION
export const packageEnquirySchema = Joi.object({
    ...customerFields,
    packageId: objectId.allow("", null).optional(),
    packageSlug: Joi.string().trim().allow("").optional(),
    slug: Joi.string().trim().allow("").optional(),
    packageTitle: Joi.string().trim().allow("").optional(),
    destinationId: objectId.allow("", null).optional(),
    packageCategory: Joi.string().valid("holiday", "weekend_trip", "corporate", "custom").optional(),
    travelDate: Joi.date().iso().allow(null, "").optional(),
    departureDate: Joi.date().iso().allow(null, "").optional(),
    durationDays: Joi.number().integer().min(1).optional(),
    travelersCount: Joi.number().integer().min(1).optional(),
    travelers: Joi.object({
        adults: Joi.number().integer().min(1).default(1),
        children: Joi.number().integer().min(0).default(0),
    }).optional(),
    adults: Joi.number().integer().min(1).optional(),
    children: Joi.number().integer().min(0).optional(),
    pricePerPerson: Joi.number().min(0).optional(),
    packageDetails: Joi.object().unknown(true).optional(),
}).or("customerName", "name").or("customerEmail", "email").or("customerPhone", "phoneNumber", "phone");

// 4. TRANSPORT ENQUIRY VALIDATION
export const transportEnquirySchema = Joi.object({
    ...customerFields,
    transportId: objectId.allow("", null).optional(),
    transportSlug: Joi.string().trim().allow("").optional(),
    slug: Joi.string().trim().allow("").optional(),
    category: Joi.string().allow("").optional(),
    vehicleType: Joi.string().allow("").optional(),
    serviceType: Joi.string().allow("").optional(),
    pickupLocation: Joi.string().trim().allow("").optional(),
    dropLocation: Joi.string().trim().allow("").optional(),
    pickupDate: Joi.date().iso().allow(null, "").optional(),
    pickupTime: Joi.string().allow("").optional(),
    passengersCount: Joi.number().integer().min(1).default(1),
    transportDetails: Joi.object().unknown(true).optional(),
}).or("customerName", "name").or("customerEmail", "email").or("customerPhone", "phoneNumber", "phone");

// 5. CUSTOM / CONTACT ENQUIRY VALIDATION
export const customEnquirySchema = Joi.object({
    ...customerFields,
    subject: Joi.string().trim().max(200).allow("").optional(),
    message: Joi.string().trim().max(2000).allow("").optional(),
    query: Joi.string().trim().max(2000).allow("").optional(),
    comments: Joi.string().trim().max(2000).allow("").optional(),
    tripType: Joi.string().trim().allow("").optional(),
}).or("customerName", "name").or("customerEmail", "email").or("customerPhone", "phoneNumber", "phone");

// 6. ADMIN STATUS & PRICE UPDATE VALIDATION
export const updateEnquiryStatusSchema = Joi.object({
    status: Joi.string().valid("pending", "contacted", "quoted", "confirmed", "cancelled").optional(),
    quotedPrice: Joi.number().min(0).optional(),
    adminNote: Joi.string().trim().max(1000).allow("").optional(),
    notes: Joi.string().trim().max(1000).allow("").optional(),
}).min(1); // At least one field is required to update

// 7. PARAM ID VALIDATION (e.g. /admin/:id)
export const enquiryIdParamSchema = Joi.object({
    id: objectId.required(),
});

// 8. QUERY VALIDATION FOR TRACKING ENQUIRY (?enquiryCode=... or ?email=...)
export const trackEnquiryQuerySchema = Joi.object({
    enquiryCode: Joi.string().trim().uppercase().optional(),
    email: Joi.string().trim().email().lowercase().optional(),
    phone: Joi.string().trim().pattern(/^(?:\+91)?[6-9]\d{9}$/).optional(),
});
