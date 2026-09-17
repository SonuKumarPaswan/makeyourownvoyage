import express from "express";
import { verifyAdmin } from "../middleware/role.js";
import {
    createPackage,
    getPackageBySlug,
    getAllPackages,
} from "../controllers/package.controller.js";

const router = express.Router();

router.post('/create', verifyAdmin, createPackage);
router.get('/get-all-packages', getAllPackages);
router.get('/:slug', getPackageBySlug);

export default router;