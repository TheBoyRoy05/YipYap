import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  addYapper,
  createConversation,
  getConversation,
  getMyConversations,
  sendMessage,
} from "../controllers/conversationController.js";

const router = express.Router();

router.post("/create", protectRoute, createConversation);
router.get("/my-conversations", protectRoute, getMyConversations);
router.get("/:convoID", protectRoute, getConversation);
router.post("/add-yapper/:convoID", protectRoute, addYapper);
router.post("/send-message/:convoID", protectRoute, sendMessage);

export default router;
