import express from "express";
import { verifyAdmin } from "../middleware/role.js";
import {
    createActivity,
    getAllActivities,
    getActivityById,
    updateActivity,
    deleteActivity,
} from "../controllers/activityMaster.controller.js";

const router = express.Router();

router.post('/', verifyAdmin, createActivity);
router.post('/create', verifyAdmin, createActivity);
router.get('/', getAllActivities);
router.get('/get-all-activities', getAllActivities);
router.get('/:id', getActivityById);
router.put('/:id', verifyAdmin, updateActivity);
router.delete('/:id', verifyAdmin, deleteActivity);

export default router;