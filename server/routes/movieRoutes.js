import express from "express";
import { getAllMovies, saveMovie } from "../controllers/movieController.js";

const router = express.Router();

router.post("/save", saveMovie);
router.get("/", getAllMovies);
export default router;
