import express from "express";
import {
    searchTransports,
    getTransportBySlug,
} from "../controllers/transport.public.controller.js";

const router = express.Router();




// Public search: /api/transports/search?category=Cab&city=delhi
router.get("/search", searchTransports);
// Public detail page: /api/transports/:slug
router.get("/:slug", getTransportBySlug);




export default router;