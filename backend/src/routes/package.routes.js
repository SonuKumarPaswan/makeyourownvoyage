import express from "express";
import { verifyAdmin } from "../middleware/role.js";
import {
    createPackage,
    getPackageBySlug,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage,
} from "../controllers/package.controller.js";

const router = express.Router();

// Admin Package management routes
router.post('/', verifyAdmin, createPackage);
router.post('/create', verifyAdmin, createPackage);
router.put('/:id', verifyAdmin, updatePackage);
router.delete('/:id', verifyAdmin, deletePackage);

// Public fetch routes (no login required)
router.get('/', getAllPackages);
router.get('/get-all-packages', getAllPackages);
router.get('/id/:id', getPackageById);
router.get('/:slug', getPackageBySlug);

export default router;