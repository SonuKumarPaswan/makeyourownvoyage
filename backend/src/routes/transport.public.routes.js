import express from "express";
import {
    searchTransports,
    getTransportBySlug,
} from "../controllers/transport.public.controller.js";
import { validate } from "../middleware/validate.js";
import { transportSlugParamSchema } from "../validations/transport.validation.js";

const router = express.Router();

// Public listing & search: /api/transports or /api/transports/search?category=Cab&city=delhi
router.get("/", searchTransports);
router.get("/search", searchTransports);

// Public detail page: /api/transports/:slug or /api/transports/id/:id
router.get("/id/:slug", validate(transportSlugParamSchema, "params"), getTransportBySlug);
router.get("/:slug", validate(transportSlugParamSchema, "params"), getTransportBySlug);




export default router;