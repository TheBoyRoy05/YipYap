import express from "express";
import { getResponses } from "../controllers/AIController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/responses", protectRoute, getResponses);

export default router;
