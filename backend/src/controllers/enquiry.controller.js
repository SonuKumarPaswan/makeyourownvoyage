import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Enquiry from "../models/enquiry.model.js";
import Hotel from "../models/hotel.model.js";
import Package from "../models/package.model.js";
import Transport from "../models/transport.model.js";
import { sendEnquiryConfirmationEmail } from "../utils/sendEmail.js";

// Helper to optionally associate user if a token is present, without requiring login
const getOptionalUserId = (req) => {
    try {
        const token =
            req.cookies?.token ||
            (req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : null);

        if (token && process.env.JWT_SECRET) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded?.id || null;
        }
    } catch {
        return null;
    }
    return null;
};

// 1. POST /api/enquiries/hotel - Specific Hotel Form Submission (No login required)
export const submitHotelEnquiry = async (req, res) => {
    try {
        const cName = req.body.customerName || req.body.name;
        const cEmail = req.body.customerEmail || req.body.email;
        const cPhone = req.body.customerPhone || req.body.phoneNumber || req.body.phone;

        if (!cName || !cEmail || !cPhone) {
            return res.status(400).json({
                success: false,
                message: "Customer name, email, and phone number are required.",
            });
        }

        const hData = req.body.hotelDetails || {};

        // Intelligent fallback: If client posted package payload to /hotel
        if (
            (req.body.packageId || req.body.packageSlug || req.body.packageDetails || req.body.corporateFacilitiesNeeded || req.body.enquiryType === "package" || req.body.enquiryType === "weekend_trip") &&
            !req.body.hotelId && !req.body.hotelSlug && !req.body.roomType && !hData.hotelId && !hData.hotelSlug
        ) {
            return submitPackageEnquiry(req, res);
        }

        // Intelligent fallback: If client posted transport payload to /hotel
        if (
            (req.body.transportId || req.body.transportSlug || req.body.transportDetails || req.body.vehicleCategory || req.body.enquiryType === "transport") &&
            !req.body.hotelId && !req.body.hotelSlug && !hData.hotelId && !hData.hotelSlug
        ) {
            return submitTransportEnquiry(req, res);
        }

        // Intelligent fallback: If client posted flight payload to /hotel
        if (
            (req.body.flightDetails || req.body.fromCity || req.body.toCity || req.body.enquiryType === "flight") &&
            !req.body.hotelId && !req.body.hotelSlug && !hData.hotelId && !hData.hotelSlug
        ) {
            return submitFlightEnquiry(req, res);
        }

        const hotelIdentifier =
            req.body.hotelSlug ||
            hData.hotelSlug ||
            req.body.slug ||
            hData.slug ||
            req.body.hotelId ||
            hData.hotelId;

        const rawHotelName = req.body.hotelName || hData.hotelName || "";
        const roomType = req.body.roomType || hData.roomType || "";
        const roomsCount = req.body.roomsCount || hData.roomsCount || req.body.numberOfRooms || hData.numberOfRooms || 1;
        const checkInDate = req.body.checkInDate || hData.checkInDate;
        const checkOutDate = req.body.checkOutDate || hData.checkOutDate;
        const mealPlan = req.body.mealPlan || hData.mealPlan || "";
        const city = req.body.city || hData.city || "";
        const specialRequests = req.body.specialRequests || hData.specialRequests || "";

        const rawGuests = req.body.guests || hData.guests || {};
        const adults = Number(rawGuests.adults || req.body.adults || hData.adults) || 1;
        const children = Number(rawGuests.children || req.body.children || hData.children) || 0;

        let hotelDoc = null;
        if (hotelIdentifier) {
            if (mongoose.isValidObjectId(hotelIdentifier)) {
                hotelDoc = await Hotel.findById(hotelIdentifier);
            } else {
                hotelDoc = await Hotel.findOne({ slug: String(hotelIdentifier).toLowerCase().trim() });
            }
        }
        if (!hotelDoc && rawHotelName) {
            hotelDoc = await Hotel.findOne({ name: { $regex: new RegExp(`^${rawHotelName.trim()}$`, "i") } });
        }

        const validHotelId = hotelDoc ? hotelDoc._id : (mongoose.isValidObjectId(hotelIdentifier) ? hotelIdentifier : null);
        const resolvedHotelName = hotelDoc?.name || rawHotelName || "Selected Property";
        const resolvedHotelSlug = hotelDoc?.slug || (typeof hotelIdentifier === "string" && !mongoose.isValidObjectId(hotelIdentifier) ? hotelIdentifier.toLowerCase().trim() : "");
        const resolvedLocation = hotelDoc?.location?.city
            ? `${hotelDoc.location.city.charAt(0).toUpperCase() + hotelDoc.location.city.slice(1)}${hotelDoc.location.state ? `, ${hotelDoc.location.state}` : ""}`
            : (city || "");
        const starRating = hotelDoc?.starRating ? `${hotelDoc.starRating}★ Star Luxury` : "";

        const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
        const hotelPageUrl = resolvedHotelSlug ? `${clientUrl}/hotels/${resolvedHotelSlug}` : "";

        // Calculate stay duration (nights) if both dates exist
        let stayDuration = "";
        if (checkInDate && checkOutDate) {
            const diffMs = Math.abs(new Date(checkOutDate) - new Date(checkInDate));
            const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
            if (nights > 0) stayDuration = `${nights} Night(s)`;
        }

        const enquiry = await Enquiry.create({
            enquiryType: "hotel",
            user: getOptionalUserId(req),
            customerName: String(cName).trim(),
            customerEmail: String(cEmail).trim().toLowerCase(),
            customerPhone: String(cPhone).trim(),
            city: resolvedLocation || (city ? String(city).trim() : ""),
            specialRequests: specialRequests ? String(specialRequests).trim() : "",
            hotelDetails: {
                hotelId: validHotelId,
                hotelName: resolvedHotelName,
                roomType: roomType,
                roomsCount: Number(roomsCount) || 1,
                checkInDate: checkInDate ? new Date(checkInDate) : undefined,
                checkOutDate: checkOutDate ? new Date(checkOutDate) : undefined,
                guests: {
                    adults,
                    children,
                },
                mealPlan: mealPlan,
            },
        });

        // Trigger branded colorful confirmation email with logo
        sendEnquiryConfirmationEmail({
            customerName: enquiry.customerName,
            customerEmail: enquiry.customerEmail,
            enquiryCode: enquiry.enquiryCode,
            enquiryType: "hotel",
            specialRequests: enquiry.specialRequests,
            detailsSummary: [
                {
                    label: "Hotel / Property",
                    value: `${enquiry.hotelDetails.hotelName}${starRating ? ` (${starRating})` : ""}`,
                },
                ...(resolvedLocation ? [{ label: "Location / City", value: resolvedLocation }] : []),
                ...(resolvedHotelSlug
                    ? [
                          {
                              label: "Hotel Page & Slug",
                              value: `<a href="${hotelPageUrl}" target="_blank" style="color: #38bdf8; text-decoration: underline; font-weight: 600;">/hotels/${resolvedHotelSlug}</a>`,
                          },
                      ]
                    : []),
                { label: "Room Type Booked", value: enquiry.hotelDetails.roomType || "Standard Room" },
                { label: "Rooms Count", value: `${enquiry.hotelDetails.roomsCount} Room(s)` },
                {
                    label: "Check-in Date",
                    value: enquiry.hotelDetails.checkInDate
                        ? new Date(enquiry.hotelDetails.checkInDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
                        : "To be decided",
                },
                {
                    label: "Check-out Date",
                    value: enquiry.hotelDetails.checkOutDate
                        ? new Date(enquiry.hotelDetails.checkOutDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
                        : "To be decided",
                },
                ...(stayDuration ? [{ label: "Stay Duration", value: stayDuration }] : []),
                {
                    label: "Guests Split",
                    value: `${enquiry.hotelDetails.guests.adults} Adult(s)${enquiry.hotelDetails.guests.children ? `, ${enquiry.hotelDetails.guests.children} Child(ren)` : ""}`,
                },
                { label: "Meal Plan", value: enquiry.hotelDetails.mealPlan || "As per hotel policy" },
            ],
        }).catch((err) => console.error("[Hotel Enquiry Email Error]:", err.message));

        return res.status(201).json({
            success: true,
            message: "Hotel enquiry submitted successfully! A confirmation has been sent to your email and our travel specialist will contact you soon.",
            enquiryCode: enquiry.enquiryCode,
            enquiry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 2. POST /api/enquiries/flight - Specific Flight Form Submission (No login required)
export const submitFlightEnquiry = async (req, res) => {
    try {
        const cName = req.body.customerName || req.body.name;
        const cEmail = req.body.customerEmail || req.body.email;
        const cPhone = req.body.customerPhone || req.body.phoneNumber || req.body.phone;

        if (!cName || !cEmail || !cPhone) {
            return res.status(400).json({
                success: false,
                message: "Customer name, email, and phone number are required.",
            });
        }

        const fData = req.body.flightDetails || {};
        const fromCity = req.body.fromCity || fData.fromCity;
        const toCity = req.body.toCity || fData.toCity;
        const departureDate = req.body.departureDate || fData.departureDate;
        const returnDate = req.body.returnDate || fData.returnDate;
        const rawTripType = req.body.tripType || fData.tripType || (returnDate ? "round_trip" : "one_way");
        const tripType = String(rawTripType).toLowerCase().includes("round") ? "round_trip" : "one_way";
        const travelClass = req.body.travelClass || fData.travelClass || "Economy";
        const city = req.body.city || fData.city || "";
        const specialRequests = req.body.specialRequests || fData.specialRequests || "";

        const rawPassengers = req.body.passengers || fData.passengers || {};
        const adults = Number(rawPassengers.adults || req.body.adults || fData.adults) || 1;
        const children = Number(rawPassengers.children || req.body.children || fData.children) || 0;
        const infants = Number(rawPassengers.infants || req.body.infants || fData.infants) || 0;

        if (!fromCity || !toCity || !departureDate) {
            return res.status(400).json({
                success: false,
                message: "Departure city, destination city, and departure date are required for flight inquiry.",
            });
        }

        const enquiry = await Enquiry.create({
            enquiryType: "flight",
            user: getOptionalUserId(req),
            customerName: String(cName).trim(),
            customerEmail: String(cEmail).trim().toLowerCase(),
            customerPhone: String(cPhone).trim(),
            city: city ? String(city).trim() : "",
            specialRequests: specialRequests ? String(specialRequests).trim() : "",
            flightDetails: {
                fromCity: String(fromCity).trim(),
                toCity: String(toCity).trim(),
                tripType,
                departureDate: new Date(departureDate),
                returnDate: returnDate ? new Date(returnDate) : undefined,
                travelClass: travelClass || "Economy",
                passengers: {
                    adults,
                    children,
                    infants,
                },
            },
        });

        // Trigger branded colorful confirmation email with logo
        sendEnquiryConfirmationEmail({
            customerName: enquiry.customerName,
            customerEmail: enquiry.customerEmail,
            enquiryCode: enquiry.enquiryCode,
            enquiryType: "flight",
            specialRequests: enquiry.specialRequests,
            detailsSummary: [
                { label: "Flight Route", value: `${enquiry.flightDetails.fromCity} ➔ ${enquiry.flightDetails.toCity}` },
                { label: "Trip Mode", value: enquiry.flightDetails.tripType === "round_trip" ? "Round Trip" : "One Way" },
                {
                    label: "Departure Date",
                    value: enquiry.flightDetails.departureDate
                        ? new Date(enquiry.flightDetails.departureDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : "",
                },
                {
                    label: "Return Date",
                    value: enquiry.flightDetails.returnDate
                        ? new Date(enquiry.flightDetails.returnDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : "N/A (One Way)",
                },
                { label: "Cabin Class", value: enquiry.flightDetails.travelClass },
                {
                    label: "Passengers",
                    value: `${enquiry.flightDetails.passengers.adults} Adults${enquiry.flightDetails.passengers.children ? `, ${enquiry.flightDetails.passengers.children} Children` : ""}${enquiry.flightDetails.passengers.infants ? `, ${enquiry.flightDetails.passengers.infants} Infants` : ""}`,
                },
            ],
        }).catch((err) => console.error("[Flight Enquiry Email Error]:", err.message));

        return res.status(201).json({
            success: true,
            message: "Flight enquiry submitted successfully! A confirmation has been sent to your email and our ticketing team will contact you soon.",
            enquiryCode: enquiry.enquiryCode,
            enquiry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 3. POST /api/enquiries/package - Holiday / Weekend Trip Form Submission (No login required)
export const submitPackageEnquiry = async (req, res) => {
    try {
        const cName = req.body.customerName || req.body.name;
        const cEmail = req.body.customerEmail || req.body.email;
        const cPhone = req.body.customerPhone || req.body.phoneNumber || req.body.phone;

        if (!cName || !cEmail || !cPhone) {
            return res.status(400).json({
                success: false,
                message: "Customer name, email, and phone number are required.",
            });
        }

        const pData = req.body.packageDetails || {};

        // Intelligent fallback: If client mistakenly posted hotel/transport/flight payload to /package
        if (
            (req.body.hotelId || req.body.hotelSlug || req.body.hotelDetails || req.body.roomType || req.body.enquiryType === "hotel") &&
            !req.body.packageId && !req.body.packageSlug && !pData.packageId && !pData.packageSlug
        ) {
            return submitHotelEnquiry(req, res);
        }
        if (
            (req.body.transportId || req.body.transportSlug || req.body.transportDetails || req.body.vehicleCategory || req.body.enquiryType === "transport") &&
            !req.body.packageId && !req.body.packageSlug && !pData.packageId && !pData.packageSlug
        ) {
            return submitTransportEnquiry(req, res);
        }

        const packageIdentifier =
            req.body.packageId ||
            pData.packageId ||
            req.body.packageSlug ||
            pData.packageSlug ||
            req.body.slug ||
            pData.slug;
        const destinationId = req.body.destinationId || pData.destinationId;
        const rawPackageTitle = req.body.packageTitle || pData.packageTitle || pData.destination || "";
        const packageCategory = req.body.packageCategory || pData.packageCategory || (pData.isWeekendTrip ? "weekend_trip" : "holiday");
        const travelDate = req.body.travelDate || pData.travelDate || req.body.departureDate || pData.departureDate;
        const durationDays = req.body.durationDays || pData.durationDays || req.body.duration || pData.duration || 3;
        const corporateFacilitiesNeeded = req.body.corporateFacilitiesNeeded || pData.corporateFacilitiesNeeded || {};
        const city = req.body.city || pData.city || "";
        const specialRequests = req.body.specialRequests || pData.specialRequests || "";

        const rawTravelers = req.body.travelers || pData.travelers || {};
        const adults = Number(rawTravelers.adults || req.body.travelersCount || pData.travelersCount) || 1;
        const children = Number(rawTravelers.children) || 0;

        let resolvedTitle = rawPackageTitle || "";
        let validPkgId = null;
        let resolvedPkgSlug = "";
        let pkgDoc = null;

        if (packageIdentifier) {
            if (mongoose.isValidObjectId(packageIdentifier)) {
                pkgDoc = await Package.findById(packageIdentifier).populate("destination", "name state country");
            } else {
                pkgDoc = await Package.findOne({ slug: String(packageIdentifier).toLowerCase().trim() }).populate("destination", "name state country");
            }
            if (pkgDoc) {
                validPkgId = pkgDoc._id;
                resolvedTitle = pkgDoc.title;
                resolvedPkgSlug = pkgDoc.slug || "";
            }
        }
        if (!pkgDoc && rawPackageTitle) {
            pkgDoc = await Package.findOne({ title: { $regex: new RegExp(`^${rawPackageTitle.trim()}$`, "i") } }).populate("destination", "name state country");
            if (pkgDoc) {
                validPkgId = pkgDoc._id;
                resolvedTitle = pkgDoc.title;
                resolvedPkgSlug = pkgDoc.slug || "";
            }
        }

        const isWeekendTrip = packageCategory === "weekend_trip" || pData.isWeekendTrip === true || pkgDoc?.packageType === "weekend";
        const enquiryCategory = isWeekendTrip ? "weekend_trip" : "package";
        const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
        const packagePageUrl = resolvedPkgSlug ? `${clientUrl}/packages/${resolvedPkgSlug}` : "";

        const enquiry = await Enquiry.create({
            enquiryType: enquiryCategory,
            user: getOptionalUserId(req),
            customerName: String(cName).trim(),
            customerEmail: String(cEmail).trim().toLowerCase(),
            customerPhone: String(cPhone).trim(),
            city: city ? String(city).trim() : (pkgDoc?.region || ""),
            specialRequests: specialRequests ? String(specialRequests).trim() : "",
            packageDetails: {
                packageId: validPkgId,
                destinationId: pkgDoc?.destination?._id || (mongoose.isValidObjectId(destinationId) ? destinationId : null),
                packageTitle: resolvedTitle || "Customized Holiday Package",
                packageCategory: packageCategory || "holiday",
                travelDate: travelDate ? new Date(travelDate) : undefined,
                durationDays: Number(durationDays) || pkgDoc?.days || 3,
                travelers: {
                    adults,
                    children,
                },
                corporateFacilitiesNeeded: corporateFacilitiesNeeded || {},
            },
        });

        // Trigger branded colorful confirmation email with logo
        sendEnquiryConfirmationEmail({
            customerName: enquiry.customerName,
            customerEmail: enquiry.customerEmail,
            enquiryCode: enquiry.enquiryCode,
            enquiryType: enquiryCategory,
            specialRequests: enquiry.specialRequests,
            detailsSummary: [
                { label: "Tour Package", value: enquiry.packageDetails.packageTitle || "Customized Travel Itinerary" },
                ...(resolvedPkgSlug
                    ? [
                          {
                              label: "Package Page & Slug",
                              value: `<a href="${packagePageUrl}" target="_blank" style="color: #38bdf8; text-decoration: underline; font-weight: 600;">/packages/${resolvedPkgSlug}</a>`,
                          },
                      ]
                    : []),
                ...(pkgDoc?.destination?.name
                    ? [{ label: "Destination", value: `${pkgDoc.destination.name}${pkgDoc.destination.state ? `, ${pkgDoc.destination.state}` : ""}` }]
                    : []),
                { label: "Trip Category", value: (enquiry.packageDetails.packageCategory || "holiday").toUpperCase() },
                {
                    label: "Tentative Date",
                    value: enquiry.packageDetails.travelDate
                        ? new Date(enquiry.packageDetails.travelDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : "Flexible Dates",
                },
                { label: "Duration", value: `${enquiry.packageDetails.durationDays} Days` },
                {
                    label: "Travelers",
                    value: `${enquiry.packageDetails.travelers.adults} Adults${enquiry.packageDetails.travelers.children ? `, ${enquiry.packageDetails.travelers.children} Children` : ""}`,
                },
            ],
        }).catch((err) => console.error("[Package Enquiry Email Error]:", err.message));

        return res.status(201).json({
            success: true,
            message: "Package enquiry submitted successfully! A confirmation has been sent to your email and our itinerary specialist will contact you soon.",
            enquiryCode: enquiry.enquiryCode,
            enquiry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 4. POST /api/enquiries/transport - Cab / Bus / Bike / Traveller Form Submission (No login required)
export const submitTransportEnquiry = async (req, res) => {
    try {
        const cName = req.body.customerName || req.body.name;
        const cEmail = req.body.customerEmail || req.body.email;
        const cPhone = req.body.customerPhone || req.body.phoneNumber || req.body.phone;

        if (!cName || !cEmail || !cPhone) {
            return res.status(400).json({
                success: false,
                message: "Customer name, email, and phone number are required.",
            });
        }

        const tData = req.body.transportDetails || {};

        // Intelligent fallback: If client mistakenly posted hotel/package/flight payload to /transport
        if (
            (req.body.hotelId || req.body.hotelSlug || req.body.hotelDetails || req.body.roomType || req.body.enquiryType === "hotel") &&
            !req.body.transportId && !req.body.transportSlug && !tData.transportId && !tData.transportSlug
        ) {
            return submitHotelEnquiry(req, res);
        }
        if (
            (req.body.packageId || req.body.packageSlug || req.body.packageDetails || req.body.enquiryType === "package" || req.body.enquiryType === "weekend_trip") &&
            !req.body.transportId && !req.body.transportSlug && !tData.transportId && !tData.transportSlug
        ) {
            return submitPackageEnquiry(req, res);
        }

        const transportId =
            req.body.transportId ||
            tData.transportId ||
            req.body.transportSlug ||
            tData.transportSlug ||
            req.body.slug ||
            tData.slug;
        const category = req.body.category || tData.category || tData.vehicleCategory || "Cab";
        const vehicleType = req.body.vehicleType || tData.vehicleType || tData.vehicleModel || "";
        const pickupLocation = req.body.pickupLocation || tData.pickupLocation || "";
        const dropLocation = req.body.dropLocation || tData.dropLocation || "";
        const serviceType = req.body.serviceType || tData.serviceType || "Outstation One-Way";
        const pickupDate = req.body.pickupDate || tData.pickupDate || tData.pickupDateTime;
        const pickupTime = req.body.pickupTime || tData.pickupTime || "";
        const returnDate = req.body.returnDate || tData.returnDate;
        const passengersCount = req.body.passengersCount || tData.passengersCount || req.body.passengers || tData.passengers || 1;
        const city = req.body.city || tData.city || "";
        const specialRequests = req.body.specialRequests || tData.specialRequests || "";

        let validTransportId = null;
        let resolvedVehicleType = vehicleType || "";
        let resolvedVehicleSlug = "";

        if (transportId) {
            if (mongoose.isValidObjectId(transportId)) {
                validTransportId = transportId;
                const vehicleDoc = await Transport.findById(transportId).select("vehicleType brand modelName slug");
                if (vehicleDoc) {
                    if (!resolvedVehicleType) {
                        resolvedVehicleType = `${vehicleDoc.brand || ""} ${vehicleDoc.modelName || ""}`.trim();
                    }
                    resolvedVehicleSlug = vehicleDoc.slug || "";
                }
            } else {
                const vehicleDoc = await Transport.findOne({ slug: String(transportId).toLowerCase().trim() }).select("vehicleType brand modelName slug");
                if (vehicleDoc) {
                    validTransportId = vehicleDoc._id;
                    if (!resolvedVehicleType) {
                        resolvedVehicleType = `${vehicleDoc.brand || ""} ${vehicleDoc.modelName || ""}`.trim();
                    }
                    resolvedVehicleSlug = vehicleDoc.slug || "";
                }
            }
        }

        const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
        const transportPageUrl = resolvedVehicleSlug ? `${clientUrl}/transport/${resolvedVehicleSlug}` : "";

        const enquiry = await Enquiry.create({
            enquiryType: "transport",
            user: getOptionalUserId(req),
            customerName: String(cName).trim(),
            customerEmail: String(cEmail).trim().toLowerCase(),
            customerPhone: String(cPhone).trim(),
            city: city ? String(city).trim() : "",
            specialRequests: specialRequests ? String(specialRequests).trim() : "",
            transportDetails: {
                transportId: validTransportId,
                category: category || "Cab",
                vehicleType: resolvedVehicleType,
                pickupLocation: pickupLocation || "",
                dropLocation: dropLocation || "",
                serviceType: serviceType || "Outstation One-Way",
                pickupDate: pickupDate ? new Date(pickupDate) : undefined,
                pickupTime: pickupTime || "",
                returnDate: returnDate ? new Date(returnDate) : undefined,
                passengersCount: Number(passengersCount) || 1,
            },
        });

        // Trigger branded colorful confirmation email with logo
        sendEnquiryConfirmationEmail({
            customerName: enquiry.customerName,
            customerEmail: enquiry.customerEmail,
            enquiryCode: enquiry.enquiryCode,
            enquiryType: "transport",
            specialRequests: enquiry.specialRequests,
            detailsSummary: [
                { label: "Category", value: enquiry.transportDetails.category },
                { label: "Vehicle Model", value: enquiry.transportDetails.vehicleType || "Selected Category Fleet" },
                ...(resolvedVehicleSlug
                    ? [
                          {
                              label: "Vehicle Details Link",
                              value: `<a href="${transportPageUrl}" target="_blank" style="color: #38bdf8; text-decoration: underline; font-weight: 600;">/transport/${resolvedVehicleSlug}</a>`,
                          },
                      ]
                    : []),
                { label: "Service Type", value: enquiry.transportDetails.serviceType },
                { label: "Pickup City / Location", value: enquiry.transportDetails.pickupLocation || "As agreed" },
                { label: "Drop Destination", value: enquiry.transportDetails.dropLocation || "As agreed / Local Rental" },
                {
                    label: "Pickup Schedule",
                    value: `${enquiry.transportDetails.pickupDate ? new Date(enquiry.transportDetails.pickupDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "TBD"} ${enquiry.transportDetails.pickupTime || ""}`.trim(),
                },
                { label: "Passengers", value: `${enquiry.transportDetails.passengersCount} Person(s)` },
            ],
        }).catch((err) => console.error("[Transport Enquiry Email Error]:", err.message));

        return res.status(201).json({
            success: true,
            message: "Transport enquiry submitted successfully! A confirmation has been sent to your email and our logistics team will contact you soon.",
            enquiryCode: enquiry.enquiryCode,
            enquiry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 5. POST /api/enquiries/custom or /contact - General Contact Us / Custom Voyage Request (No login required)
export const submitCustomEnquiry = async (req, res) => {
    try {
        const cName = req.body.customerName || req.body.name;
        const cEmail = req.body.customerEmail || req.body.email;
        const cPhone = req.body.customerPhone || req.body.phoneNumber || req.body.phone;
        const message = req.body.message || req.body.specialRequests || req.body.query || req.body.comments || "";
        const subject = req.body.subject || req.body.tripType || "General Travel Inquiry";
        const city = req.body.city || "";

        if (!cName || !cEmail || !cPhone) {
            return res.status(400).json({
                success: false,
                message: "Customer name, email, and phone number are required.",
            });
        }

        const enquiry = await Enquiry.create({
            enquiryType: "custom",
            user: getOptionalUserId(req),
            customerName: String(cName).trim(),
            customerEmail: String(cEmail).trim().toLowerCase(),
            customerPhone: String(cPhone).trim(),
            city: city ? String(city).trim() : "",
            specialRequests: message ? String(message).trim() : (subject ? String(subject).trim() : ""),
        });

        // Trigger branded colorful confirmation email with logo
        sendEnquiryConfirmationEmail({
            customerName: enquiry.customerName,
            customerEmail: enquiry.customerEmail,
            enquiryCode: enquiry.enquiryCode,
            enquiryType: "custom",
            specialRequests: enquiry.specialRequests,
            detailsSummary: [
                { label: "Inquiry Nature", value: subject || "Custom Voyage / General Inquiry" },
                ...(city ? [{ label: "Customer City / Origin", value: city }] : []),
                { label: "Message / Request", value: enquiry.specialRequests || "Requested travel consultation" },
            ],
        }).catch((err) => console.error("[Custom Enquiry Email Error]:", err.message));

        return res.status(201).json({
            success: true,
            message: "Your message has been sent successfully! A confirmation has been sent to your email and our travel desk will get back to you shortly.",
            enquiryCode: enquiry.enquiryCode,
            enquiry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 6. GET /api/enquiries/my-enquiries - Customer inquiry tracking (No login required - lookup by ?email= or ?phone=)
export const getMyEnquiries = async (req, res) => {
    try {
        const { email, phone } = req.query;
        const optionalUserId = getOptionalUserId(req);

        const filter = {};
        if (email) {
            filter.customerEmail = email.trim().toLowerCase();
        } else if (phone) {
            filter.customerPhone = phone.trim();
        } else if (optionalUserId) {
            filter.user = optionalUserId;
        } else {
            return res.status(400).json({
                success: false,
                message: "Please provide your email or phone (e.g. ?email=you@example.com or ?phone=9876543210) to view your enquiries.",
            });
        }

        const enquiries = await Enquiry.find(filter)
            .populate("hotelDetails.hotelId", "name slug location.city starCategory images")
            .populate("packageDetails.packageId", "title slug startingPrice duration image")
            .populate("transportDetails.transportId", "title vehicleType category brand")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: enquiries.length,
            enquiries,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 6. GET /api/enquiries/admin/all - Admin Dashboard Listing with Filters & Pagination
export const getAllEnquiriesAdmin = async (req, res) => {
    try {
        const { enquiryType, status, search, page = 1, limit = 10 } = req.query;
        const query = {};

        if (enquiryType) {
            query.enquiryType = enquiryType;
        }

        if (status) {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { customerName: { $regex: search.trim(), $options: "i" } },
                { customerEmail: { $regex: search.trim(), $options: "i" } },
                { customerPhone: { $regex: search.trim(), $options: "i" } },
                { enquiryCode: { $regex: search.trim(), $options: "i" } },
            ];
        }

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.max(1, parseInt(limit, 10) || 10);
        const skip = (pageNum - 1) * limitNum;

        const [enquiries, total] = await Promise.all([
            Enquiry.find(query)
                .populate("hotelDetails.hotelId", "name location.city starCategory")
                .populate("packageDetails.packageId", "title duration packageType")
                .populate("transportDetails.transportId", "title category vehicleType")
                .populate("user", "name email phoneNumber")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum),
            Enquiry.countDocuments(query),
        ]);

        return res.status(200).json({
            success: true,
            totalEnquiries: total,
            totalPages: Math.ceil(total / limitNum),
            currentPage: pageNum,
            count: enquiries.length,
            enquiries,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 7. GET /api/enquiries/admin/:id - Admin Single Inquiry View
export const getEnquiryByIdAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid inquiry ID format",
            });
        }

        const enquiry = await Enquiry.findById(id)
            .populate("hotelDetails.hotelId")
            .populate("packageDetails.packageId")
            .populate("packageDetails.destinationId")
            .populate("transportDetails.transportId")
            .populate("user", "name email phoneNumber");

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        return res.status(200).json({
            success: true,
            enquiry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 8. PATCH /api/enquiries/admin/:id - Update Status, Quoted Price, or Add Admin Note
export const updateEnquiryAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, quotedPrice, adminNote } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid inquiry ID format",
            });
        }

        const updates = {};
        if (status) updates.status = status;
        if (quotedPrice !== undefined) updates.quotedPrice = Number(quotedPrice);

        const updateOperation = { $set: updates };

        if (adminNote && adminNote.trim()) {
            updateOperation.$push = {
                adminNotes: {
                    note: adminNote.trim(),
                    addedBy: req.user?.id || null,
                    createdAt: new Date(),
                },
            };
        }

        const updatedEnquiry = await Enquiry.findByIdAndUpdate(
            id,
            updateOperation,
            { new: true, runValidators: true }
        );

        if (!updatedEnquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Enquiry updated successfully",
            enquiry: updatedEnquiry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 9. DELETE /api/enquiries/admin/:id - Delete Spam / Cancelled Inquiry
export const deleteEnquiryAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid inquiry ID format",
            });
        }

        const deleted = await Enquiry.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Enquiry deleted successfully",
            deletedId: id,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 10. POST /api/enquiries - Universal Enquiry Endpoint (Auto-detects category from payload)
export const submitUniversalEnquiry = async (req, res) => {
    const type = (req.body.enquiryType || "").toLowerCase();
    if (
        type === "package" ||
        type === "weekend_trip" ||
        req.body.packageId ||
        req.body.packageSlug ||
        req.body.packageDetails ||
        req.body.corporateFacilitiesNeeded
    ) {
        return submitPackageEnquiry(req, res);
    }
    if (
        type === "transport" ||
        req.body.transportId ||
        req.body.transportSlug ||
        req.body.transportDetails ||
        req.body.vehicleCategory
    ) {
        return submitTransportEnquiry(req, res);
    }
    if (
        type === "flight" ||
        req.body.flightDetails ||
        req.body.fromCity ||
        req.body.toCity
    ) {
        return submitFlightEnquiry(req, res);
    }
    if (
        type === "custom" ||
        type === "contact" ||
        req.body.subject ||
        (req.body.message && !req.body.roomType && !req.body.hotelId)
    ) {
        return submitCustomEnquiry(req, res);
    }
    return submitHotelEnquiry(req, res);
};

