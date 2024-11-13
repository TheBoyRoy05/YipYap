import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  handleFriendRequest,
  getFriendRequests,
  getFriends,
  sendFriendRequest,
} from "../controllers/friendsController.js";

const router = express.Router();

router.get("/get-friends/", protectRoute, getFriends);
router.get("/get-requests/", protectRoute, getFriendRequests);
router.post("/send-request/", protectRoute, sendFriendRequest);
router.delete("/handle-request/:id", protectRoute, handleFriendRequest);

export default router;
