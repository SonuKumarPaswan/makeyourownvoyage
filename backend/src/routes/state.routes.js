import express from "express";
import {
    createState,
    getAllStates,
    getStateBySlug,
    updateState,
    deleteState,
} from "../controllers/state.controller.js";
import { verifyAdmin } from "../middleware/role.js";

const router = express.Router();

router.get("/", getAllStates);
router.post("/", verifyAdmin, createState);
router.get("/:slug", getStateBySlug);
router.put("/:id", verifyAdmin, updateState);
router.delete("/:id", verifyAdmin, deleteState);

export default router;
