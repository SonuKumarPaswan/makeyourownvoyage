import multer from "multer";

// Use in-memory storage so files are streamed directly to Cloudinary without saving to disk
const storage = multer.memoryStorage();

// Validate image file types
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
        "image/gif",
        "image/svg+xml",
        "image/avif",
    ];

    if (allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
        cb(null, true);
    } else {
        cb(
            new Error(
                `Unsupported image format: ${file.mimetype}. Allowed formats: JPG, JPEG, PNG, WEBP, AVIF, GIF.`
            ),
            false
        );
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB per file
        files: 20, // max 20 files per request
    },
});

export default upload;
