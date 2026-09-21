import express from "express";
import { verifyAdmin } from "../middleware/role.js";
import { upload } from "../middleware/upload.js";
import {
    addTransport,
    getAllTransportsAdmin,
    getTransportByIdAdmin,
    updateTransport,
    deleteTransport,
} from "../controllers/transport.admin.controller.js";

const router = express.Router();

router.post("/", verifyAdmin, upload.array("images", 10), addTransport);
router.post("/create", verifyAdmin, upload.array("images", 10), addTransport);
router.get("/", verifyAdmin, getAllTransportsAdmin);
router.get("/get-all", verifyAdmin, getAllTransportsAdmin);
router.get("/:id", verifyAdmin, getTransportByIdAdmin);
router.put("/:id", verifyAdmin, upload.array("images", 10), updateTransport);
router.delete("/:id", verifyAdmin, deleteTransport);

export default router;