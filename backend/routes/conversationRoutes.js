import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  addYapper,
  createConversation,
  getMessages,
  getMyConversations,
  sendMessage,
} from "../controllers/conversationController.js";

const router = express.Router();

router.get("/messages/:convoID", protectRoute, getMessages);
router.get("/my-conversations", protectRoute, getMyConversations);
router.post("/create", protectRoute, createConversation);
router.post("/add-yapper/:convoID", protectRoute, addYapper);
router.post("/send-message/:convoID", protectRoute, sendMessage);

export default router;
