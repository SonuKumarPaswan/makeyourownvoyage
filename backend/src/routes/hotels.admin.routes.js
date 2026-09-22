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

const router = express.Router();

router.post("/", verifyAdmin, upload.array("images", 20), addHotel);
router.post("/create", verifyAdmin, upload.array("images", 20), addHotel);
router.get("/", verifyAdmin, getAllHotelsAdmin);
router.get("/get-all", verifyAdmin, getAllHotelsAdmin);
router.get("/:id", verifyAdmin, getHotelByIdAdmin);
router.put("/:id", verifyAdmin, upload.array("images", 20), updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);

export default router;