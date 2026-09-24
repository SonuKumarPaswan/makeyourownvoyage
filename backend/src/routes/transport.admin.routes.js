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
import { validate } from "../middleware/validate.js";
import {
    createTransportSchema,
    transportIdParamSchema,
} from "../validations/transport.validation.js";

const router = express.Router();

router.post("/", verifyAdmin, upload.array("images", 10), validate(createTransportSchema), addTransport);
router.post("/create", verifyAdmin, upload.array("images", 10), validate(createTransportSchema), addTransport);
router.get("/", verifyAdmin, getAllTransportsAdmin);
router.get("/get-all", verifyAdmin, getAllTransportsAdmin);
router.get("/:id", verifyAdmin, validate(transportIdParamSchema, "params"), getTransportByIdAdmin);
router.put("/:id", verifyAdmin, validate(transportIdParamSchema, "params"), upload.array("images", 10), updateTransport);
router.delete("/:id", verifyAdmin, validate(transportIdParamSchema, "params"), deleteTransport);

export default router;