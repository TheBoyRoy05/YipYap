import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    conversations: [
      {
        conversation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Conversation",
        },
        lastReadMessageID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Message",
        },
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        select: false,
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.conversations;
  delete obj.friends;
  return obj;
};

const User = mongoose.model("User", userSchema);

export default User;
