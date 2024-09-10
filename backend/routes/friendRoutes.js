import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getFriendRequests, getFriends, sendFriendRequest } from "../controllers/friendsController.js";

const router = express.Router();

router.get("/", protectRoute, getFriends);
router.get("/requests/", protectRoute, getFriendRequests);
router.post("/requests/send/:username", protectRoute, sendFriendRequest);

export default router;