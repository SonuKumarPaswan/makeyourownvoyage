import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

/**
 * Check if Cloudinary credentials are configured
 */
export const isCloudinaryConfigured = () => {
    return Boolean(
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
    );
};

/**
 * Upload a single file (Buffer from Multer, Base64 data URI, or URL/path) to Cloudinary
 * @param {Buffer|string|object} file - Multer file object, Buffer, Base64 data URL, or file path
 * @param {string} folder - Cloudinary directory (default: "makeyourownvoyage")
 * @param {object} customOptions - Extra Cloudinary upload parameters
 * @returns {Promise<{ url: string, secure_url: string, public_id: string, format: string, bytes: number, width?: number, height?: number }>}
 */
export const uploadToCloudinary = async (file, folder = "makeyourownvoyage", customOptions = {}) => {
    if (!isCloudinaryConfigured()) {
        throw new Error(
            "Cloudinary credentials missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env"
        );
    }

    // Extract buffer if file is a multer file object
    const target = file && file.buffer ? file.buffer : file;

    const uploadOptions = {
        folder: folder || "makeyourownvoyage",
        resource_type: "auto",
        ...customOptions,
    };

    // If target is a Buffer (e.g. from multer.memoryStorage)
    if (Buffer.isBuffer(target)) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) return reject(error);
                    resolve({
                        url: result.secure_url,
                        secure_url: result.secure_url,
                        public_id: result.public_id,
                        format: result.format,
                        bytes: result.bytes,
                        width: result.width,
                        height: result.height,
                    });
                }
            );

            const readable = Readable.from(target);
            readable.pipe(uploadStream);
        });
    }

    // If target is a string (base64 data-uri, URL, or local path)
    if (typeof target === "string" && target.trim().length > 0) {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(target, uploadOptions, (error, result) => {
                if (error) return reject(error);
                resolve({
                    url: result.secure_url,
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                    format: result.format,
                    bytes: result.bytes,
                    width: result.width,
                    height: result.height,
                });
            });
        });
    }

    throw new Error("Invalid file format. Expected a file Buffer, Multer file object, or base64/URL string.");
};

/**
 * Upload multiple files (buffers, file objects, or base64 strings) to Cloudinary
 * @param {Array} files - Array of multer files, buffers, or base64 strings
 * @param {string} folder - Target folder in Cloudinary
 * @param {object} customOptions - Extra Cloudinary upload parameters
 * @returns {Promise<Array<{ url: string, secure_url: string, public_id: string }>>}
 */
export const uploadMultipleToCloudinary = async (files, folder = "makeyourownvoyage", customOptions = {}) => {
    if (!Array.isArray(files) || files.length === 0) {
        return [];
    }

    const uploadPromises = files.map((file) => uploadToCloudinary(file, folder, customOptions));
    return await Promise.all(uploadPromises);
};

/**
 * Delete a file from Cloudinary by its publicId
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<object>}
 */
export const deleteFromCloudinary = async (publicIdOrUrl) => {
    if (!isCloudinaryConfigured()) {
        throw new Error("Cloudinary credentials missing in .env");
    }
    if (!publicIdOrUrl) {
        throw new Error("Cloudinary public_id or URL is required for deletion");
    }

    const targetId = (typeof publicIdOrUrl === "string" && publicIdOrUrl.startsWith("http"))
        ? extractPublicId(publicIdOrUrl)
        : publicIdOrUrl;

    if (!targetId) {
        throw new Error("Could not extract valid public_id for deletion");
    }

    return await cloudinary.uploader.destroy(targetId);
};

/**
 * Extract publicId from a Cloudinary URL
 * Example: https://res.cloudinary.com/xyz/image/upload/v12345/makeyourownvoyage/hotels/sample.webp
 * Output: "makeyourownvoyage/hotels/sample"
 * @param {string} url
 * @returns {string|null}
 */
export const extractPublicId = (url) => {
    if (!url || typeof url !== "string") return null;
    try {
        const matches = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);
        return matches ? matches[1] : null;
    } catch {
        return null;
    }
};

/**
 * Check if a string is a base64 image data URI
 * @param {string} str
 * @returns {boolean}
 */
export const isBase64Image = (str) => {
    return typeof str === "string" && str.startsWith("data:image/");
};

/**
 * Safely parse JSON if provided as string (e.g. from multipart form-data)
 * @param {any} val
 * @param {any} fallback
 * @returns {any}
 */
export const parseJsonField = (val, fallback = undefined) => {
    if (typeof val === "string") {
        try {
            return JSON.parse(val);
        } catch {
            return fallback !== undefined ? fallback : val;
        }
    }
    return val !== undefined ? val : fallback;
};

export const uploadBufferToCloudinary = uploadToCloudinary;

export default {
    cloudinary,
    isCloudinaryConfigured,
    uploadToCloudinary,
    uploadBufferToCloudinary,
    uploadMultipleToCloudinary,
    deleteFromCloudinary,
    extractPublicId,
    isBase64Image,
    parseJsonField,
};
