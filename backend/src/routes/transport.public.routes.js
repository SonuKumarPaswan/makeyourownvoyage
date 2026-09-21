import express from "express";
import {
    searchTransports,
    getTransportBySlug,
} from "../controllers/transport.public.controller.js";

const router = express.Router();




// Public listing & search: /api/transports or /api/transports/search?category=Cab&city=delhi
router.get("/", searchTransports);
router.get("/search", searchTransports);

// Public detail page: /api/transports/:slug or /api/transports/id/:id
router.get("/id/:slug", getTransportBySlug);
router.get("/:slug", getTransportBySlug);




export default router;