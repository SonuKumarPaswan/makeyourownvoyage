import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken, cookieOptions } from "../utils/token.js";

// POST /register
export const registerUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, role } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { phoneNumber }],
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email or phone number already exists.",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            phoneNumber,
            password: hashedPassword,
            role: role || "user",
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
        return res.status(500).json({ message: error.message });
    }
};

// POST /login

export const loginUser = async (req, res) => {
    try {
        const { email, phoneNumber, password } = req.body;

        // +password add karein taaki hidden password fetch ho sake
        const user = await User.findOne({
            ...(email ? { email } : { phoneNumber }),
        }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
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
        return res.status(500).json({ message: error.message });
    }
};

// POST /logout
export const logoutUser = (req, res) => {
    res.clearCookie("token", cookieOptions);
    return res.status(200).json({ message: "Logged out successfully" });
};

// GET / (Admin only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GET /:id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// PUT /:id
export const updateUser = async (req, res) => {
    try {
        const updates = { ...req.body };
        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};