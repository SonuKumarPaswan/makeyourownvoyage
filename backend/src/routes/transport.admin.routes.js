import express from "express";
import { verifyAdmin } from "../middleware/role.js";
import {
    addTransport,
    getAllTransportsAdmin,
    getTransportByIdAdmin,
    updateTransport,
    deleteTransport,
} from "../controllers/transport.admin.controller.js";

const router = express.Router();


// Admin protection on all routes
router.post("/create", verifyAdmin, addTransport);
router.get("/get-all", verifyAdmin, getAllTransportsAdmin);
router.get("/:id", verifyAdmin, getTransportByIdAdmin);
router.put("/:id", verifyAdmin, updateTransport);
router.delete("/:id", verifyAdmin, deleteTransport);

export default router;