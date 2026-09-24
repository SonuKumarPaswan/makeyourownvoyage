import {
    uploadToCloudinary,
    uploadMultipleToCloudinary,
    isBase64Image,
    isCloudinaryConfigured,
} from "./cloudinary.service.js";

/**
 * Process uploaded Multer files and Base64 images for any resource (Hotels, Transports, etc.)
 * @param {Object} options
 * @param {Array} options.files - Multer files array (req.files)
 * @param {Array} options.existingImages - Existing images array from req.body
 * @param {string} options.folder - Destination folder in Cloudinary (e.g. "hotels", "transports")
 * @param {string} options.defaultAlt - Alt text for images
 * @returns {Promise<Array>} Array of formatted image objects
 */
export const processMediaUploads = async ({
    files = [],
    existingImages = [],
    folder = "general",
    defaultAlt = "Image",
}) => {
    let images = Array.isArray(existingImages) ? [...existingImages] : [];

    if (!isCloudinaryConfigured()) {
        return images;
    }

    // 1. Process files uploaded via Multer
    if (files && Array.isArray(files) && files.length > 0) {
        const uploaded = await uploadMultipleToCloudinary(files, `makeyourownvoyage/${folder}`);
        const formatted = uploaded.map((img, idx) => ({
            url: img.secure_url,
            alt: defaultAlt,
            type: idx === 0 && images.length === 0 ? "cover" : "room",
            order: images.length + idx + 1,
        }));
        images = [...images, ...formatted];
    }

    // 2. Process any Base64 strings sent directly in images array
    for (let i = 0; i < images.length; i++) {
        const item = images[i];
        if (typeof item === "string" && isBase64Image(item)) {
            const uploaded = await uploadToCloudinary(item, `makeyourownvoyage/${folder}`);
            images[i] = {
                url: uploaded.secure_url,
                alt: defaultAlt,
                type: i === 0 ? "cover" : "room",
                order: i + 1,
            };
        } else if (item && typeof item === "object" && isBase64Image(item.url)) {
            const uploaded = await uploadToCloudinary(item.url, `makeyourownvoyage/${folder}`);
            item.url = uploaded.secure_url;
        }
    }

    return images;
};

/**
 * Process single cover image from Multer or Base64 (e.g. Tour Packages)
 */
export const processSingleImage = async (fileOrString, folder = "general") => {
    if (!fileOrString || !isCloudinaryConfigured()) return fileOrString || "";
    if (typeof fileOrString === "string" && !isBase64Image(fileOrString)) return fileOrString;

    const uploaded = await uploadToCloudinary(fileOrString, `makeyourownvoyage/${folder}`);
    return uploaded?.secure_url || "";
};

/**
 * Process package-specific media (single cover image + gallery array)
 */
export const processPackageMedia = async ({
    coverFile = null,
    galleryFiles = [],
    existingCover = "",
    existingGallery = [],
    folder = "packages",
}) => {
    let cover = existingCover || "";
    let gallery = Array.isArray(existingGallery) ? [...existingGallery] : [];

    if (!isCloudinaryConfigured()) {
        return { cover, gallery };
    }

    // Cover image (Multer file or base64)
    if (coverFile) {
        const uploaded = await uploadToCloudinary(coverFile, `makeyourownvoyage/${folder}`);
        cover = uploaded?.secure_url || cover;
    } else if (typeof cover === "string" && isBase64Image(cover)) {
        const uploaded = await uploadToCloudinary(cover, `makeyourownvoyage/${folder}`);
        cover = uploaded?.secure_url || "";
    }

    // Gallery images (Multer files)
    if (galleryFiles && Array.isArray(galleryFiles) && galleryFiles.length > 0) {
        const uploadedGallery = await uploadMultipleToCloudinary(galleryFiles, `makeyourownvoyage/${folder}`);
        const urls = uploadedGallery.map((g) => g.secure_url);
        gallery = [...gallery, ...urls];
    }

    // Gallery images (Base64 strings in array)
    for (let i = 0; i < gallery.length; i++) {
        if (typeof gallery[i] === "string" && isBase64Image(gallery[i])) {
            const uploaded = await uploadToCloudinary(gallery[i], `makeyourownvoyage/${folder}`);
            gallery[i] = uploaded?.secure_url || gallery[i];
        }
    }

    return { cover, gallery };
};

