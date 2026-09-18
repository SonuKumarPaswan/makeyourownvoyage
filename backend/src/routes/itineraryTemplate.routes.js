import express from "express";
import {
    createTemplate,
    getAllTemplates,
    getTemplateById,
} from "../controllers/itineraryTemplate.controller.js";
import { verifyAdmin } from "../middleware/role.js";

const router = express.Router();

router.post('/create', verifyAdmin, createTemplate);
router.get('/get-all-templates', verifyAdmin, getAllTemplates);
router.get('/:id', verifyAdmin, getTemplateById);

export default router;