import Message from "../models/messageModel.js";
import Conversation from "../models/convoModel.js";
import { getReceiverSocketID, io } from "../socket.js";
import User from "../models/userModel.js";

// TODO: convert participants from string[] to mongoose.Types.ObjectId[]
export const createConversation = async (req, res) => {
  try {
    const senderID = req.user._id;
    const { participantIDs } = req.body;

    const newConversation = await Conversation.create({
      participants: [...participantIDs, senderID],
    });

    const populatedConvo = await Conversation.findById(newConversation._id)
      .populate("messages")
      .populate("participants")
      .lean();

    for (const participantID of newConversation.participants) {
      await User.findByIdAndUpdate(participantID, {
        $push: { conversations: newConversation._id },
      });

      if (participantID.toString() !== senderID.toString()) {
        const participantSocketID = getReceiverSocketID(participantID);
        if (participantSocketID) {
          io.to(participantSocketID).emit("newGroupChat", populatedConvo);
        }
      }
    }

    res.status(201).json(populatedConvo);
  } catch (error) {
    console.error("Error in createConversation controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMyConversations = async (req, res) => {
  try {
    const userID = req.user._id;

    const user = await User.findById(userID)
      .populate({
        path: "conversations",
        populate: [
          {
            path: "participants",
            model: "User",
          },
          {
            path: "messages",
            model: "Message",
          },
        ],
      })
      .lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.conversations || []);
  } catch (error) {
    console.error("Error in getConversation controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { convoID } = req.params;

    const conversation = await Conversation.findById(convoID)
      .populate("messages")
      .populate("participants")
      .lean();
    if (!conversation) return res.status(404).json({ error: "Conversation not found" });

    res.status(200).json(conversation);
  } catch (error) {
    console.error("Error in getConversation controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addYapper = async (req, res) => {
  try {
    const { convoID } = req.params;
    const { username } = req.body;

    const conversation = await Conversation.findById(convoID);
    if (!conversation) return res.status(404).json({ error: "Conversation not found" });

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (conversation.participants.includes(user._id)) {
      return res.status(400).json({ error: "User already in conversation" });
    }

    conversation.participants.push(user._id);
    await conversation.save();

    res.status(200).json(conversation);
  } catch (error) {
    console.error("Error in addYapper controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { convoID } = req.params;
    const senderID = req.user._id;

    let conversation = await Conversation.findById(convoID);
    if (!conversation) res.status(404).json({ error: "Conversation not found" });

    const newMessage = new Message({
      senderID,
      message,
      conversationID: conversation._id,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    conversation.participants.forEach((participantID) => {
      if (participantID.toString() !== senderID.toString()) {
        const participantSocketID = getReceiverSocketID(participantID);
        if (participantSocketID) {
          io.to(participantSocketID).emit("newMessage", newMessage);
        }
      }
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
