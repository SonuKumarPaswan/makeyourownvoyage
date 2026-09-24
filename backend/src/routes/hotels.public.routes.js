import express from "express";
import { searchHotels, getHotelDetailsBySlug } from "../controllers/hotel.public.controller.js";
import { validate } from "../middleware/validate.js";
import {
    hotelSearchQuerySchema,
    hotelSlugParamSchema,
} from "../validations/hotel.validation.js";

const router = express.Router();

router.get("/", validate(hotelSearchQuerySchema, "query"), searchHotels);
router.get("/search", validate(hotelSearchQuerySchema, "query"), searchHotels);
router.get("/id/:slug", validate(hotelSlugParamSchema, "params"), getHotelDetailsBySlug);
router.get("/:slug", validate(hotelSlugParamSchema, "params"), getHotelDetailsBySlug);

export default router;