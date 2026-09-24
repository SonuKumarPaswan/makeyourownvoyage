import express from "express";
import {
    submitHotelEnquiry,
    submitFlightEnquiry,
    submitPackageEnquiry,
    submitTransportEnquiry,
    submitCustomEnquiry,
    submitUniversalEnquiry,
    getMyEnquiries,
    getAllEnquiriesAdmin,
    getEnquiryByIdAdmin,
    updateEnquiryAdmin,
    deleteEnquiryAdmin,
} from "../controllers/enquiry.controller.js";
import { verifyAdmin } from "../middleware/role.js";
import { validate } from "../middleware/validate.js";
import {
    hotelEnquirySchema,
    flightEnquirySchema,
    packageEnquirySchema,
    transportEnquirySchema,
    customEnquirySchema,
    updateEnquiryStatusSchema,
    enquiryIdParamSchema,
    trackEnquiryQuerySchema,
} from "../validations/enquiry.validation.js";

const router = express.Router();

// 1. PUBLIC CATEGORY-SPECIFIC FORM SUBMISSIONS
router.post("/", submitUniversalEnquiry);
router.post("/hotel", validate(hotelEnquirySchema), submitHotelEnquiry);
router.post("/flight", validate(flightEnquirySchema), submitFlightEnquiry);
router.post("/package", validate(packageEnquirySchema), submitPackageEnquiry);
router.post("/transport", validate(transportEnquirySchema), submitTransportEnquiry);
router.post("/custom", validate(customEnquirySchema), submitCustomEnquiry);
router.post("/contact", validate(customEnquirySchema), submitCustomEnquiry);

// 2. USER INQUIRY TRACKING
router.get("/my-enquiries", validate(trackEnquiryQuerySchema, "query"), getMyEnquiries);

// 3. ADMIN CRM & LEAD MANAGEMENT
router.get("/admin/all", verifyAdmin, getAllEnquiriesAdmin);
router.get("/admin/:id", verifyAdmin, validate(enquiryIdParamSchema, "params"), getEnquiryByIdAdmin);
router.patch(
    "/admin/:id",
    verifyAdmin,
    validate(enquiryIdParamSchema, "params"),
    validate(updateEnquiryStatusSchema, "body"),
    updateEnquiryAdmin
);
router.delete("/admin/:id", verifyAdmin, validate(enquiryIdParamSchema, "params"), deleteEnquiryAdmin);

export default router;
