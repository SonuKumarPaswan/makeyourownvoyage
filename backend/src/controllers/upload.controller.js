import {
    uploadToCloudinary,
    uploadMultipleToCloudinary,
    deleteFromCloudinary,
    extractPublicId,
    isCloudinaryConfigured,
} from "../services/cloudinary.service.js";

/**
 * 1. POST /api/upload/image
 * Upload a single image to Cloudinary (Admin only)
 * Accepts multipart file in field "image" or "file", or base64/url string in req.body.image
 */
export const uploadSingleImage = async (req, res) => {
    try {
        if (!isCloudinaryConfigured()) {
            return res.status(503).json({
                success: false,
                message: "Cloudinary service is not configured. Please set Cloudinary API keys in .env",
            });
        }

        const file = req.file || req.body.image || req.body.file;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No image file or image data provided. Send a file in 'image' field or a base64 string.",
            });
        }

        const folder = req.body.folder || "makeyourownvoyage";
        const result = await uploadToCloudinary(file, folder);

        return res.status(200).json({
            success: true,
            message: "Image uploaded successfully to Cloudinary",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to upload image to Cloudinary",
            error: error.message,
        });
    }
};

/**
 * 2. POST /api/upload/multiple
 * Upload multiple images to Cloudinary (Admin only)
 * Accepts multipart files in field "images" or "files", or array of base64/urls in req.body.images
 */
export const uploadMultipleImages = async (req, res) => {
    try {
        if (!isCloudinaryConfigured()) {
            return res.status(503).json({
                success: false,
                message: "Cloudinary service is not configured. Please set Cloudinary API keys in .env",
            });
        }

        let files = [];
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            files = req.files;
        } else if (Array.isArray(req.body.images) && req.body.images.length > 0) {
            files = req.body.images;
        } else if (req.file) {
            files = [req.file];
        }

        if (files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No images provided. Send files under field 'images' or an array in req.body.images.",
            });
        }

        const folder = req.body.folder || "makeyourownvoyage";
        const uploadedImages = await uploadMultipleToCloudinary(files, folder);

        return res.status(200).json({
            success: true,
            message: `${uploadedImages.length} image(s) uploaded successfully to Cloudinary`,
            count: uploadedImages.length,
            data: uploadedImages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to upload images to Cloudinary",
            error: error.message,
        });
    }
};

/**
 * 3. DELETE /api/upload
 * Delete an image from Cloudinary (Admin only)
 * Accepts { public_id: "..." } or { url: "..." }
 */
export const deleteImage = async (req, res) => {
    try {
        if (!isCloudinaryConfigured()) {
            return res.status(503).json({
                success: false,
                message: "Cloudinary service is not configured. Please set Cloudinary API keys in .env",
            });
        }

        let publicId = req.body.public_id || req.query.public_id;
        if (!publicId && (req.body.url || req.query.url)) {
            publicId = extractPublicId(req.body.url || req.query.url);
        }

        if (!publicId) {
            return res.status(400).json({
                success: false,
                message: "Cloudinary public_id or image URL is required for deletion.",
            });
        }

        const result = await deleteFromCloudinary(publicId);

        return res.status(200).json({
            success: true,
            message: "Image deleted successfully from Cloudinary",
            result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete image from Cloudinary",
            error: error.message,
        });
    }
};

export default {
    uploadSingleImage,
    uploadMultipleImages,
    deleteImage,
};
