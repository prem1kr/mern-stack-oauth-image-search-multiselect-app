import express from "express";
import { handleSearch, getTopSearches } from "../controllers/searchController.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/search", ensureAuthenticated, handleSearch);
router.get("/top-searches", getTopSearches);

export default router;
