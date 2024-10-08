import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import AIRoutes from "./routes/AIRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";

import connectDatabase from "./database/connect.js";
import { app, server } from "./socket.js";

const port = process.env.PORT || 3000;
const _dirname = path.resolve();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/AI", AIRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/conversation", conversationRoutes);

app.use(express.static(path.join(_dirname, "frontend/dist")));

app.get(("*"), (req, res) => {
  res.sendFile(path.join(_dirname, "frontend/dist/index.html"));
});

server.listen(port, () => {
  connectDatabase();
  console.log("Server running on port " + port);
});
