import express from "express";
import { verifyAdmin } from "../middleware/role.js";
import {
    addHotel,
    getAllHotelsAdmin,
    getHotelByIdAdmin,
    updateHotel,
    deleteHotel,
} from "../controllers/hotel.controller.js";

const router = express.Router();

// Sirf Admin dashboard ke liye
router.post("/create", verifyAdmin, addHotel);
router.get("/get-all", verifyAdmin, getAllHotelsAdmin);
router.get("/:id", verifyAdmin, getHotelByIdAdmin);
router.put("/:id", verifyAdmin, updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);

export default router;