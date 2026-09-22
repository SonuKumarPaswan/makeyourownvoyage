import jwt from "jsonwebtoken";

// Optional auth helper: decodes user if token provided, but never blocks requests
export const isLoggedIn = (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            (req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : null);

        if (token && process.env.JWT_SECRET) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        }
    } catch (error) {
        // Silently continue without blocking
    }
    next();
};

/**
 * Mandatory auth helper: blocks request if no valid token is provided
 */
export const requireAuth = (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            (req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : null);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. Please log in to continue.",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "voyage_jwt_secret_fallback_key");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired authorization token.",
        });
    }
};

/**
 * Authorization helper: ensures the user is accessing/modifying their own record or is an admin
 */
export const verifySelfOrAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentication required.",
        });
    }

    const targetId = req.params.id || req.params.userId;
    const isOwner = String(req.user.id) === String(targetId);
    const isAdmin = req.user.role?.trim() === "admin";

    if (!isOwner && !isAdmin) {
        return res.status(403).json({
            success: false,
            message: "Access denied. You are only authorized to manage your own account.",
        });
    }

    next();
};

export default {
    isLoggedIn,
    requireAuth,
    verifySelfOrAdmin,
};