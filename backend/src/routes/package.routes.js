import express from "express";
import { verifyAdmin } from "../middleware/role.js";
import { upload } from "../middleware/upload.js";
import {
    createPackage,
    getPackageBySlug,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage,
} from "../controllers/package.controller.js";

const router = express.Router();

const packageUpload = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 20 },
]);

// Admin Package management routes
router.post('/create', verifyAdmin, packageUpload, createPackage);
router.put('/:id', verifyAdmin, packageUpload, updatePackage);
router.delete('/:id', verifyAdmin, deletePackage);

// Public fetch routes (no login required)
router.get('/', getAllPackages);
router.get('/get-all-packages', getAllPackages);
router.get('/id/:id', getPackageById);
router.get('/:slug', getPackageBySlug);

export default router;