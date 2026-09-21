import express from "express";
import { verifyAdmin } from "../middleware/role.js";
import { upload } from "../middleware/upload.js";
import {
    uploadSingleImage,
    uploadMultipleImages,
    deleteImage,
} from "../controllers/upload.controller.js";

const router = express.Router();

// 1. Upload single image (field: "image" or "file")
router.post(
    "/image",
    verifyAdmin,
    upload.single("image"),
    uploadSingleImage
);

// 2. Upload multiple images (field: "images", up to 20 images)
router.post(
    "/multiple",
    verifyAdmin,
    upload.array("images", 20),
    uploadMultipleImages
);

// 3. Delete image from Cloudinary
router.delete(
    "/",
    verifyAdmin,
    deleteImage
);

export default router;
