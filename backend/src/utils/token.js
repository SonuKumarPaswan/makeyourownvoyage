import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";

export const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const generateToken = (user) => {
    const secret = process.env.JWT_SECRET;
    if (!secret && isProduction) {
        throw new Error("[Security Alert] JWT_SECRET must be defined in production environment variables.");
    }
    return jwt.sign(
        { id: user._id, role: user.role },
        secret || "voyage_jwt_secret_fallback_key",
        { expiresIn: process.env.JWT_EXPIRE || "7d" }
    );
};