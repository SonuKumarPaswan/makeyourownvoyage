import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getUserById,
    updateUser,
} from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.js";
import { verifyAdmin } from "../middleware/role.js";
import { isLoggedIn } from "../middleware/user.js";
import {
    registerSchema,
    loginSchema,
    updateUserSchema,
} from "../validations/user.validation.js";

const router = express.Router();



router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", isLoggedIn, logoutUser);

router.get("/get-all", verifyAdmin, getAllUsers);
router.get("/:id", isLoggedIn, getUserById);
router.put("/:id", validate(updateUserSchema), isLoggedIn, updateUser);

export default router;