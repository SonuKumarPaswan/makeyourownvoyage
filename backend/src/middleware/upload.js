// Graceful upload middleware (supports dynamic import if multer is not yet installed)
let multerModule = null;

try {
    const m = await import("multer");
    multerModule = m.default || m;
} catch {
    console.warn("[Upload] 'multer' is not yet installed in node_modules. Run 'npm i' to activate file uploads.");
}

let uploadInstance = null;

if (multerModule) {
    const storage = multerModule.memoryStorage();
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

        if (allowedMimeTypes.includes(file.mimetype?.toLowerCase())) {
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

    uploadInstance = multerModule({
        storage,
        fileFilter,
        limits: {
            fileSize: 25 * 1024 * 1024, // 25MB per file
            files: 20, // max 20 files per request
        },
    });
}

// Fallback no-op middleware if multer is pending installation
const noopMiddleware = (req, res, next) => next();
const createFallback = () => noopMiddleware;

export const upload = uploadInstance || {
    single: createFallback,
    array: createFallback,
    fields: createFallback,
    any: createFallback,
    none: createFallback,
};

export default upload;
