/**
 * Centralized Global Error Handling Middleware
 */
export const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message || "Internal Server Error";

    // Log full error on the server for debugging
    console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

    // 1. Mongoose bad ObjectId (CastError)
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid identifier: ${err.value}`;
        return res.status(404).json({
            success: false,
            message,
        });
    }

    // 2. Mongoose duplicate key error (code: 11000)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || "field";
        const message = `Duplicate value entered for '${field}'. Please use another value.`;
        return res.status(409).json({
            success: false,
            message,
        });
    }

    // 3. Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message).join(", ");
        return res.status(400).json({
            success: false,
            message: message || "Validation Error",
        });
    }

    // 4. JWT Authentication errors
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            success: false,
            message: "Invalid authorization token.",
        });
    }
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "Authorization token expired. Please log in again.",
        });
    }

    // 5. Multer file upload errors
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
            success: false,
            message: "File is too large. Maximum file size allowed is 25MB.",
        });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
            success: false,
            message: `Unexpected upload field: ${err.field || "file"}. Check your upload form fields.`,
        });
    }

    // 6. Generic or custom status error
    const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);

    return res.status(statusCode).json({
        success: false,
        message: error.message || "An unexpected server error occurred.",
        // Only show stack trace in development
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    });
};

/**
 * 404 Route Not Found Middleware
 */
export const notFoundHandler = (req, res) => {
    return res.status(404).json({
        success: false,
        message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
    });
};

export default {
    errorHandler,
    notFoundHandler,
};
