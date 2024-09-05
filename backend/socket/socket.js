import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [`http://localhost:5173`],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketID = (receiverID) => {
  return userSocketMap[receiverID];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
  const userID = socket.handshake.query.userID;
  if (userID != "undefined") userSocketMap[userID] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
    delete userSocketMap[userID];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server };
