import express from "express";
import { searchHotels, getHotelDetailsBySlug } from "../controllers/hotel.public.controller.js";


const router = express.Router();

router.get("/", searchHotels);
router.get("/search", searchHotels);
router.get("/id/:slug", getHotelDetailsBySlug);
router.get("/:slug", getHotelDetailsBySlug);

export default router;