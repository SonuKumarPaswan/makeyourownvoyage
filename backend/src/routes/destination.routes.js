import express from "express";
import {
    createDestination,
    getAllDestinations,
    getDestinationBySlug,
    updateDestination,
    deleteDestination,
    getDestinationPackages,
    getDestinationHotels,
    getDestinationActivities,
    getDestinationFaqs,
    getDestinationGuides,
} from "../controllers/destination.controller.js";
import { verifyAdmin } from "../middleware/role.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", verifyAdmin, upload.array("images", 20), createDestination);
router.put("/:id", verifyAdmin, upload.array("images", 20), updateDestination);
router.delete("/:id", verifyAdmin, deleteDestination);

// Public fetch routes
router.get("/", getAllDestinations);
router.get("/:destinationId/packages", getDestinationPackages);
router.get("/:destinationId/hotels", getDestinationHotels);
router.get("/:destinationId/activities", getDestinationActivities);
router.get("/:destinationId/faqs", getDestinationFaqs);
router.get("/:destinationId/guides", getDestinationGuides);
router.get("/:slug", getDestinationBySlug);

export default router;
