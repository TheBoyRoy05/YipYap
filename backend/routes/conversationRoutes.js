import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  addYapper,
  createConversation,
  readConversation,
  getMessages,
  getMyConversations,
  sendMessage,
} from "../controllers/conversationController.js";

const router = express.Router();

router.post("/create", protectRoute, createConversation);
router.get("/get-all", protectRoute, getMyConversations);
router.post("/read/:id", protectRoute, readConversation);
router.get("/messages/:id", protectRoute, getMessages);
router.post("/add-yapper/:id", protectRoute, addYapper);
router.post("/send-message/:id", protectRoute, sendMessage);

export default router;
