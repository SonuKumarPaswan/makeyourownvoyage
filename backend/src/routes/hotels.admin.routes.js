import express from "express";
import { verifyAdmin } from "../middleware/role.js";
import { upload } from "../middleware/upload.js";
import {
    addHotel,
    getAllHotelsAdmin,
    getHotelByIdAdmin,
    updateHotel,
    deleteHotel,
} from "../controllers/hotel.controller.js";
import { validate } from "../middleware/validate.js";
import {
    createHotelSchema,
    hotelIdParamSchema,
} from "../validations/hotel.validation.js";

const router = express.Router();

router.post("/", verifyAdmin, upload.array("images", 20), validate(createHotelSchema), addHotel);
router.post("/create", verifyAdmin, upload.array("images", 20), validate(createHotelSchema), addHotel);
router.get("/", verifyAdmin, getAllHotelsAdmin);
router.get("/get-all", verifyAdmin, getAllHotelsAdmin);
router.get("/:id", verifyAdmin, validate(hotelIdParamSchema, "params"), getHotelByIdAdmin);
router.put("/:id", verifyAdmin, validate(hotelIdParamSchema, "params"), upload.array("images", 20), updateHotel);
router.delete("/:id", verifyAdmin, validate(hotelIdParamSchema, "params"), deleteHotel);

export default router;