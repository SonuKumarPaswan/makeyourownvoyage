import express from "express";
import {
    globalSearch,
    searchSuggestions,
    getTrendingSearches,
} from "../controllers/search.controller.js";

const router = express.Router();

// 1. Full Multi-Category Search: /api/search?q=manali&type=all&limit=6
router.get("/", globalSearch);

// 2. Fast Typeahead Autocomplete: /api/search/suggestions?q=man or /api/search/autocomplete?q=man
router.get("/suggestions", searchSuggestions);
router.get("/autocomplete", searchSuggestions);

// 3. Trending Search Chips: /api/search/trending
router.get("/trending", getTrendingSearches);

export default router;
