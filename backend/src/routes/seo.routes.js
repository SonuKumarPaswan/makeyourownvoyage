// src/routes/seo.routes.js
import { Router } from "express";
import {
    getIndexNowVerificationKey,
    getRobotsTxt,
    getDynamicSitemap,
    getPageSeoMetadata,
    triggerFullSiteIndexing,
} from "../controllers/seo.controller.js";
import { verifyAdmin } from "../middleware/role.js";

const router = Router();

// 1. IndexNow Verification Key Route (Handles exact key from Bing Webmaster)
router.get("/f20cf068aabc4a5c87d6fd39b71f7bcf.txt", getIndexNowVerificationKey);

// 2. Generic dynamic route in case INDEXNOW_KEY changes in .env
const dynamicKey = process.env.INDEXNOW_KEY || "f20cf068aabc4a5c87d6fd39b71f7bcf";
router.get(`/${dynamicKey}.txt`, getIndexNowVerificationKey);

// 3. Search Engine & Crawler Files
router.get("/robots.txt", getRobotsTxt);
router.get("/sitemap.xml", getDynamicSitemap);

// 4. Frontend SEO & Schema API
router.get("/api/seo/metadata/:type/:slug", getPageSeoMetadata);

// 5. Admin Trigger Endpoint
router.post("/api/admin/seo/trigger-index", verifyAdmin, triggerFullSiteIndexing);

export default router;