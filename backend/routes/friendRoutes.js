import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  handleFriendRequest,
  getFriendRequests,
  getFriends,
  sendFriendRequest,
} from "../controllers/friendsController.js";

const router = express.Router();

router.get("/", protectRoute, getFriends);
router.get("/requests/", protectRoute, getFriendRequests);
router.post("/requests/send/", protectRoute, sendFriendRequest);
router.delete("/requests/handle/:id", protectRoute, handleFriendRequest);

export default router;
