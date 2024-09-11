import mongoose from "mongoose";

const convoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", convoSchema);

export default Conversation;
