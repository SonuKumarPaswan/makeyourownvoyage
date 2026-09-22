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

const router = express.Router();

// 1. PUBLIC CATEGORY-SPECIFIC & UNIVERSAL FORM SUBMISSIONS (No login required)
router.post("/", submitUniversalEnquiry);
router.post("/hotel", submitHotelEnquiry);
router.post("/flight", submitFlightEnquiry);
router.post("/package", submitPackageEnquiry);
router.post("/transport", submitTransportEnquiry);
router.post("/custom", submitCustomEnquiry);
router.post("/contact", submitCustomEnquiry);

// 2. USER INQUIRY TRACKING (No login required - lookup by ?email=... or ?phone=...)
router.get("/my-enquiries", getMyEnquiries);

// 3. ADMIN CRM & LEAD MANAGEMENT (Admin protected)
router.get("/admin/all", verifyAdmin, getAllEnquiriesAdmin);
router.get("/admin/:id", verifyAdmin, getEnquiryByIdAdmin);
router.patch("/admin/:id", verifyAdmin, updateEnquiryAdmin);
router.delete("/admin/:id", verifyAdmin, deleteEnquiryAdmin);

export default router;
