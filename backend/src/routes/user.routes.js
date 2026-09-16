import express from "express";

// Controllers
import { registerUser, loginUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";

// Middlewares
import { validateBody, validateParams } from "../middleware/validate.js";
import { verifyAdmin } from "../middleware/role.js";

// Validations
import {
    registerSchema,
    loginSchema,
    updateUserSchema,
    idParamSchema,
} from "../validations/user.validation.js";

const router = express.Router();


router.post("/register", validateBody(registerSchema), registerUser);
router.post("/login", validateBody(loginSchema), loginUser);
router.get("/get-all", verifyAdmin, getAllUsers);
router.get("/:id", validateParams(idParamSchema, "params"), getUserById);
router.put(
    "/:id",
    validateParams(idParamSchema, "params"),
    validateBody(updateUserSchema),
    updateUser
);

export default router;