import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const currentUserID = req.user._id;
    const allUsers = await User.find({ _id: { $ne: currentUserID } }).select(
      "-password"
    );
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error in getUsers controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
