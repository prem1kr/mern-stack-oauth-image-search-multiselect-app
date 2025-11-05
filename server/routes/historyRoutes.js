import express from "express";
import { getHistory } from "../controllers/historyController.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/history", ensureAuthenticated, getHistory);

export default router;
