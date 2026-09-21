import express from "express";
import {
    createState,
    getAllStates,
    getStateBySlug,
    updateState,
    deleteState,
    getStateFullDetails
} from "../controllers/state.controller.js";
import { verifyAdmin } from "../middleware/role.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllStates);
router.post("/", verifyAdmin, upload.single("image"), createState);
router.get("/:slug", getStateBySlug);
router.put("/:id", verifyAdmin, upload.single("image"), updateState);
router.delete("/:id", verifyAdmin, deleteState);

router.get("/:slug/explore", getStateFullDetails);

export default router;
