import { Router } from "express";
import {
    getHomepageFeed,
    createCollection,
    getAllCollectionsAdmin,
    updateCollection,
    deleteCollection,
} from "../controllers/collection.controller.js";
import { verifyAdmin } from "../middleware/role.js";
import upload from "../middleware/upload.js"; // Aapka existing memory-storage multer middleware

const router = Router();


router.get("/homepage-feed", getHomepageFeed);

router.get("/admin/all", verifyAdmin, getAllCollectionsAdmin);
router.post("/admin/create", verifyAdmin,
    upload.fields([
        { name: "desktopImage", maxCount: 1 },
        { name: "mobileImage", maxCount: 1 },
    ]),
    createCollection
);

router.put("/admin/:id", verifyAdmin,
    upload.fields([
        { name: "desktopImage", maxCount: 1 },
        { name: "mobileImage", maxCount: 1 },
    ]),
    updateCollection
);

router.delete("/admin/:id", verifyAdmin, deleteCollection);

export default router;