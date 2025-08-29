import express from "express";
import {
  createUser,
  getUser,
  loginUser,
} from "../controllers/authController.js";
import { verifyUser } from "../middleware.js";

const router = express.Router();

router.get("/", verifyUser, getUser);
router.post("/signup", createUser);
router.post("/signin", loginUser);
export default router;
