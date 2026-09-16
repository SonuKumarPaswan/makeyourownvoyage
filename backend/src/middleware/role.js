import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
    try {
        // Check cookie first, fallback to header
        const token =
            req.cookies?.token ||
            (req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : null);

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role?.trim() !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};