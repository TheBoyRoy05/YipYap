import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import connectDatabase from "./database/connect.js";
import { app, server } from "./socket/socket.js";

const port = process.env.PORT || 3000;
const _dirname = path.resolve();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.use(express.static(path.join(_dirname, "frontend/dist")));

app.get(("*"), (req, res) => {
  res.sendFile(path.join(_dirname, "frontend/dist/index.html"));
});

server.listen(port, () => {
  connectDatabase();
  console.log("Server running on port " + port);
});
