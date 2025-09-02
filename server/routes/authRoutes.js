import express from "express";
import {
  createUser,
  getUser,
  loginUser,
  updateUser,
} from "../controllers/authController.js";
import { verifyUser } from "../middleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer();
router.get("/", verifyUser, getUser);
router.post("/users/update", upload.single("file"), verifyUser, updateUser);
router.post("/signup", createUser);
router.post("/signin", loginUser);
export default router;
