import express from "express";
import {
    createTemplate,
    getAllTemplates,
    getTemplateById,
    updateTemplate,
    deleteTemplate,
} from "../controllers/itineraryTemplate.controller.js";
import { verifyAdmin } from "../middleware/role.js";

const router = express.Router();

// Admin Only (Create / Edit / Delete)
router.post('/', verifyAdmin, createTemplate);
router.post('/create', verifyAdmin, createTemplate);
router.put('/:id', verifyAdmin, updateTemplate);
router.delete('/:id', verifyAdmin, deleteTemplate);

// Public Read (Fetch Templates - no login required)
router.get('/', getAllTemplates);
router.get('/get-all-templates', getAllTemplates);
router.get('/:id', getTemplateById);

export default router;
