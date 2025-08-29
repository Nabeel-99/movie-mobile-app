import express from "express";
import { getUserMovies, saveMovie } from "../controllers/movieController.js";
import { verifyUser } from "../middleware.js";

const router = express.Router();

router.post("/save", verifyUser, saveMovie);
router.get("/", verifyUser, getUserMovies);
export default router;
