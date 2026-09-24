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
import { requireAuth, verifySelfOrAdmin } from "../middleware/user.js";
import {
    registerSchema,
    loginSchema,
    updateUserSchema,
    idParamSchema,
} from "../validations/user.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", logoutUser);

// User profile lookup (requires authentication)
router.get("/me", requireAuth, getMe);

// Admin user management (Admin protected)
router.get("/", verifyAdmin, getAllUsers);
router.get("/get-all", verifyAdmin, getAllUsers);

// Single user management (requires authentication & self-ownership or admin)
router.get("/:id", requireAuth, verifySelfOrAdmin, validate(idParamSchema, "params"), getUserById);
router.put(
    "/:id",
    requireAuth,
    verifySelfOrAdmin,
    validate(idParamSchema, "params"),
    validate(updateUserSchema, "body"),
    updateUser
);

export default router;