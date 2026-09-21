import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken, cookieOptions } from "../utils/token.js";
import { sendWelcomeEmail } from "../utils/sendEmail.js";

// POST /register
export const registerUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, password } = req.body;

        const normalizedEmail = email ? email.toLowerCase().trim() : "";
        const normalizedPhone = phoneNumber ? phoneNumber.trim() : "";
        const trimmedName = name ? name.trim() : "";

        const existingUser = await User.findOne({
            $or: [{ email: normalizedEmail }, { phoneNumber: normalizedPhone }],
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email or phone number already exists.",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name: trimmedName,
            email: normalizedEmail,
            phoneNumber: normalizedPhone,
            password: hashedPassword,
            role: "user",
        });

        // Send luxury welcome email to the newly registered user
        sendWelcomeEmail({
            name: newUser.name,
            email: newUser.email,
        }).catch((emailErr) => {
            console.error("[Register] Error triggering welcome email:", emailErr.message);
        });

        const token = generateToken(newUser);

        return res
            .status(201)
            .cookie("token", token, cookieOptions)
            .json({
                message: "User registered successfully",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    phoneNumber: newUser.phoneNumber,
                    role: newUser.role,
                },
            });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// POST /login
export const loginUser = async (req, res) => {
    try {
        const { email, phoneNumber, password } = req.body;

        const normalizedEmail = email ? email.toLowerCase().trim() : undefined;
        const normalizedPhone = phoneNumber ? phoneNumber.trim() : undefined;

        const query = normalizedEmail ? { email: normalizedEmail } : { phoneNumber: normalizedPhone };

        const user = await User.findOne(query).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials.",
            });
        }

        const token = generateToken(user);

        return res
            .status(200)
            .cookie("token", token, cookieOptions)
            .json({
                message: "Login successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                },
            });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// POST /logout
export const logoutUser = (req, res) => {
    res.clearCookie("token", cookieOptions);
    return res.status(200).json({
        message: "Logged out successfully",
    });
};

// GET / (Admin only) - Supports search, role filter, pagination
export const getAllUsers = async (req, res) => {
    try {
        const { search, role, page, limit } = req.query;
        const query = {};

        if (role) {
            query.role = role;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search.trim(), $options: "i" } },
                { email: { $regex: search.trim(), $options: "i" } },
                { phoneNumber: { $regex: search.trim(), $options: "i" } },
            ];
        }

        if (page || limit) {
            const pageNum = Math.max(1, parseInt(page, 10) || 1);
            const limitNum = Math.max(1, parseInt(limit, 10) || 10);
            const skip = (pageNum - 1) * limitNum;

            const [users, totalUsers] = await Promise.all([
                User.find(query).select("-password").sort({ createdAt: -1 }).skip(skip).limit(limitNum),
                User.countDocuments(query),
            ]);

            return res.status(200).json({
                success: true,
                totalUsers,
                totalPages: Math.ceil(totalUsers / limitNum),
                currentPage: pageNum,
                count: users.length,
                data: users,
            });
        }

        const users = await User.find(query).select("-password").sort({ createdAt: -1 });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// GET /me - User profile lookup (optional auth or query/body fallback)
export const getMe = async (req, res) => {
    try {
        const userId = req.user?.id || req.query.id || req.query.userId || req.body?.userId;
        if (!userId) {
            return res.status(200).json({
                success: true,
                message: "No user session or ID provided.",
                user: null,
            });
        }

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format.",
            });
        }

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET /:id
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format.",
            });
        }

        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// PUT /:id
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format.",
            });
        }

        const { name, phoneNumber, email, password } = req.body;
        const safeUpdates = {};

        if (name) safeUpdates.name = name.trim();

        if (email) {
            const cleanEmail = email.toLowerCase().trim();
            const emailClash = await User.findOne({ email: cleanEmail, _id: { $ne: id } });
            if (emailClash) {
                return res.status(409).json({ success: false, message: "Email is already taken." });
            }
            safeUpdates.email = cleanEmail;
        }

        if (phoneNumber) {
            const cleanPhone = phoneNumber.trim();
            const phoneClash = await User.findOne({ phoneNumber: cleanPhone, _id: { $ne: id } });
            if (phoneClash) {
                return res.status(409).json({ success: false, message: "Phone number is already taken." });
            }
            safeUpdates.phoneNumber = cleanPhone;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            safeUpdates.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: safeUpdates },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};