import express from "express";
import {
    createFaq,
    getFaqs,
    getFaqById,
    updateFaq,
    deleteFaq,
} from "../controllers/faq.controller.js";
import { verifyAdmin } from "../middleware/role.js";

const router = express.Router();

// 1. Public Read Routes (No login required)
router.get("/", getFaqs);
router.get("/id/:id", getFaqById);

// 2. Admin Write Routes (Protected with verifyAdmin)
router.post("/create", verifyAdmin, createFaq);
router.put("/:id", verifyAdmin, updateFaq);
router.patch("/:id", verifyAdmin, updateFaq);
router.delete("/:id", verifyAdmin, deleteFaq);

export default router;
