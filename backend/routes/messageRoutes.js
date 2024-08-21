import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);

export default router;
