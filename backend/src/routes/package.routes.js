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
import { validate } from "../middleware/validate.js";
import {
    createPackageSchema,
    packageIdParamSchema,
    packageSlugParamSchema,
} from "../validations/package.validation.js";

const router = express.Router();

const packageUpload = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 20 },
]);

// Admin Package management routes
router.post('/create', verifyAdmin, packageUpload, validate(createPackageSchema), createPackage);
router.put('/:id', verifyAdmin, validate(packageIdParamSchema, 'params'), packageUpload, updatePackage);
router.delete('/:id', verifyAdmin, validate(packageIdParamSchema, 'params'), deletePackage);

// Public fetch routes (no login required)
router.get('/', getAllPackages);
router.get('/get-all-packages', getAllPackages);
router.get('/id/:id', validate(packageIdParamSchema, 'params'), getPackageById);
router.get('/:slug', validate(packageSlugParamSchema, 'params'), getPackageBySlug);

export default router;