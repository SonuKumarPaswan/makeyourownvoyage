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