import express from "express";
import { searchHotels , getHotelDetailsBySlug} from "../controllers/hotel.public.controller.js";


const router = express.Router();

// Aam user ke liye (No login/admin check required)
router.get("/search", searchHotels);
router.get("/:slug", getHotelDetailsBySlug);

export default router;