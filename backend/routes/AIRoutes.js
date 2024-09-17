import express from "express";
import { getTopics } from "../controllers/AIController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/topics", protectRoute, getTopics);

export default router;
