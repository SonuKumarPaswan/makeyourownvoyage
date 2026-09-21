import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
    getAllUsers,
    getUserById,
    updateUser,
} from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.js";
import { verifyAdmin } from "../middleware/role.js";
import {
    registerSchema,
    loginSchema,
    updateUserSchema,
} from "../validations/user.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", logoutUser);

// User profile lookup (no login required)
router.get("/me", getMe);

// Admin user management (Admin protected)
router.get("/", verifyAdmin, getAllUsers);
router.get("/get-all", verifyAdmin, getAllUsers);

// Single user management (no login required)
router.get("/:id", getUserById);
router.put("/:id", validate(updateUserSchema), updateUser);

export default router;