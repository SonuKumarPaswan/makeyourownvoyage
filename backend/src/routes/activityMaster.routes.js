import express from "express";
import { verifyAdmin } from "../middleware/role.js";
import {
    createActivity,
    getAllActivities,
} from "../controllers/activityMaster.controller.js";

const router = express.Router();

router.post('/create', verifyAdmin, createActivity);
router.get('/get-all-activities', getAllActivities);

export default router;