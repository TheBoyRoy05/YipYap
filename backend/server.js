import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDatabase from "./database/connect.js";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  connectDatabase();
  console.log("Server running on port " + port);
});
