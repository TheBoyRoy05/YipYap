import User from "../models/userModel.js";
import Conversation from "../models/convoModel.js";
import { getReceiverSocketID, io } from "../socket.js";
import FriendRequest from "../models/friendRequestModel.js";

export const getFriends = async (req, res) => {
  try {
    const userID = req.user._id;
    const user = await User.findById(userID).populate("friends").lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.friends || []);
  } catch (error) {
    console.error("Error in getFriends controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const userID = req.user._id;

    // Get incoming and outgoing friend requests
    const [incoming, outgoing] = await Promise.all([
      FriendRequest.find({ receiverID: userID }).populate("senderID").lean(),
      FriendRequest.find({ senderID: userID }).populate("receiverID").lean(),
    ]);

    res.status(200).json({
      incoming,
      outgoing,
    });
  } catch (error) {
    console.error("Error in getFriendRequests controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const senderID = req.user._id;
    const { username } = req.query;

    // Find receiver by username
    const receiver = await User.findOne({ username }).lean();
    if (!receiver) {
      return res.status(404).json({ error: "Yapper not found" });
    }
    const receiverID = receiver._id;

    // Check if a friend request already exists
    const [youAlreadySent, theyAlreadySent] = await Promise.all([
      FriendRequest.findOne({ senderID, receiverID }).lean(),
      FriendRequest.findOne({ senderID: receiverID, receiverID: senderID }).lean(),
    ]);

    if (youAlreadySent || theyAlreadySent) {
      return res.status(400).json({ error: "Friend request already sent" });
    }

    // Create a new friend request
    const request = await FriendRequest.create({ senderID, receiverID });
    const [incomingRequest, outgoingRequest] = await Promise.all([
      FriendRequest.findById(request._id).populate("senderID").lean(),
      FriendRequest.findById(request._id).populate("receiverID").lean(),
    ]);

    // Send a notification to the receiver if they are online
    const receiverSocketID = getReceiverSocketID(receiverID);
    if (receiverSocketID) io.to(receiverSocketID).emit(`newFriendRequest`, incomingRequest);

    if (request) {
      res.status(201).json(outgoingRequest);
    }
  } catch (error) {
    console.error("Error in sendFriendRequest controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleFriendRequest = async (req, res) => {
  try {
    const userID = req.user._id;
    const { id } = req.params;
    const { action } = req.query;

    // Find the friend request
    const request = await FriendRequest.findById(id).lean();

    if (!request) return res.status(404).json({ error: "Friend request not found" });
    if (![request.senderID.toString(), request.receiverID.toString()].includes(userID.toString())) {
      return res.status(403).json({ error: `Unauthorized` });
    }

    let conversation;
    if (action === "accept") {
      conversation = await Conversation.create({ participants: [userID, request.senderID] });
      conversation = await Conversation.findById(conversation._id)
        .populate("participants")
        .populate("messages")
        .lean();

      // Add friends, and create conversation between the two users
      await Promise.all([
        User.findByIdAndUpdate(userID, {
          $push: { friends: request.senderID, conversations: conversation._id },
        }),
        User.findByIdAndUpdate(request.senderID, {
          $push: { friends: userID, conversations: conversation._id },
        }),
      ]);
    }

    // Send a notification to the receiver if they are online
    const receiverSocketID = getReceiverSocketID(
      action == "cancel" ? request.receiverID : request.senderID
    );
    if (receiverSocketID) {
      io.to(receiverSocketID).emit(`${action}FriendRequest`, { request, conversation });
    }

    await FriendRequest.findByIdAndDelete(request._id);
    res.status(200).json(conversation);
  } catch (error) {
    console.error("Error in handleFriendRequest controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
