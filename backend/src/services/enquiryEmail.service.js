import { sendEnquiryConfirmationEmail } from "../utils/sendEmail.js";

/**
 * Service to format and dispatch confirmation emails for different enquiry types
 */

export const sendHotelConfirmation = async (enquiry, details = {}) => {
    try {
        const {
            starRating = "",
            resolvedLocation = "",
            resolvedHotelSlug = "",
            hotelPageUrl = "",
            stayDuration = "",
            resolvedPricePerNight = 0,
            resolvedTotalEstimatedPrice = 0,
            totalRooms = 1,
            nightsCount = 1,
        } = details;

        await sendEnquiryConfirmationEmail({
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
                ...(resolvedPricePerNight > 0
                    ? [
                          { label: "Rate per Night", value: `₹${resolvedPricePerNight.toLocaleString("en-IN")}` },
                          ...(resolvedTotalEstimatedPrice > 0
                              ? [{ label: "Estimated Total Price", value: `₹${resolvedTotalEstimatedPrice.toLocaleString("en-IN")} (${totalRooms} Room(s) × ${nightsCount} Night(s))` }]
                              : []),
                      ]
                    : []),
            ],
        });
    } catch (err) {
        console.error("[Hotel Enquiry Email Error]:", err.message);
    }
};

export const sendFlightConfirmation = async (enquiry) => {
    try {
        await sendEnquiryConfirmationEmail({
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
        });
    } catch (err) {
        console.error("[Flight Enquiry Email Error]:", err.message);
    }
};

export const sendPackageConfirmation = async (enquiry, details = {}) => {
    try {
        const {
            packagePageUrl = "",
            resolvedPkgSlug = "",
            pkgDoc = null,
            resolvedPricePerPerson = 0,
            resolvedTotalEstimatedPrice = 0,
            totalTravelers = 1,
        } = details;

        await sendEnquiryConfirmationEmail({
            customerName: enquiry.customerName,
            customerEmail: enquiry.customerEmail,
            enquiryCode: enquiry.enquiryCode,
            enquiryType: "package",
            specialRequests: enquiry.specialRequests,
            detailsSummary: [
                { label: "Package / Trip Name", value: enquiry.packageDetails.packageTitle || "Curated Tour Package" },
                ...(resolvedPkgSlug
                    ? [
                          {
                              label: "Package Itinerary Link",
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
                ...(resolvedPricePerPerson > 0
                    ? [
                          { label: "Price per Person", value: `₹${resolvedPricePerPerson.toLocaleString("en-IN")}` },
                          ...(resolvedTotalEstimatedPrice > 0
                              ? [{ label: "Estimated Package Total", value: `₹${resolvedTotalEstimatedPrice.toLocaleString("en-IN")} (${totalTravelers} Traveler${totalTravelers > 1 ? "s" : ""})` }]
                              : []),
                      ]
                    : []),
            ],
        });
    } catch (err) {
        console.error("[Package Enquiry Email Error]:", err.message);
    }
};

export const sendTransportConfirmation = async (enquiry, details = {}) => {
    try {
        const {
            transportPageUrl = "",
            resolvedVehicleSlug = "",
            resolvedEstimatedPrice = 0,
        } = details;

        await sendEnquiryConfirmationEmail({
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
                ...(resolvedEstimatedPrice > 0
                    ? [{ label: "Estimated Rental / Fare", value: `₹${resolvedEstimatedPrice.toLocaleString("en-IN")}` }]
                    : []),
            ],
        });
    } catch (err) {
        console.error("[Transport Enquiry Email Error]:", err.message);
    }
};

export const sendCustomConfirmation = async (enquiry, details = {}) => {
    try {
        const { subject = "General Travel Inquiry", city = "" } = details;

        await sendEnquiryConfirmationEmail({
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
        });
    } catch (err) {
        console.error("[Custom Enquiry Email Error]:", err.message);
    }
};
