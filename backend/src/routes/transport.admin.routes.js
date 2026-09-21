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

router.post("/", verifyAdmin, addTransport);
router.post("/create", verifyAdmin, addTransport);
router.get("/", verifyAdmin, getAllTransportsAdmin);
router.get("/get-all", verifyAdmin, getAllTransportsAdmin);
router.get("/:id", verifyAdmin, getTransportByIdAdmin);
router.put("/:id", verifyAdmin, updateTransport);
router.delete("/:id", verifyAdmin, deleteTransport);

export default router;