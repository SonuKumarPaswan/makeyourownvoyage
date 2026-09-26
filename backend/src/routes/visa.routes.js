import express from "express";
import {
    getAllVisas,
    getVisaByIdOrSlug,
    createVisa,
    updateVisa,
    deleteVisa,
} from "../controllers/visa.controller.js";
import { verifyAdmin } from "../middleware/role.js";

const router = express.Router();

// Public Routes
router.get("/", getAllVisas);
router.get("/:id", getVisaByIdOrSlug);

// Admin Protected Routes
router.post("/", verifyAdmin, createVisa);
router.put("/:id", verifyAdmin, updateVisa);
router.delete("/:id", verifyAdmin, deleteVisa);

export default router;
