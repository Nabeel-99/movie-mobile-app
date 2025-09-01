import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("err", error);
  }
};

connectDB();
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
