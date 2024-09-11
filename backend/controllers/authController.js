import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be 8 characters or more" });
    } else if (password != confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    if (await User.findOne({ username })) {
      return res.status(400).json({ error: "Username is taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: `https://api.dicebear.com/9.x/initials/svg?seed=${fullName.replace(" ", "+")}`,
    });

    if (user) {
      await user.save();
      res.status(201).json({
        token: generateToken(user._id),
        user,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(400).json({ error: "Username not found" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    res.status(200).json({
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    console.error("Error in login controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
