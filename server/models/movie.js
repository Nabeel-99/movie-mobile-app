import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    vote_average: {
      type: Number,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    runtime: {
      type: String,
      required: true,
    },
    vote_count: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    genres: {
      type: [String],
      required: true,
    },
    production_countries: {
      type: [String],
      required: true,
    },
    production_companies: {
      type: [String],
      required: true,
    },
    popularity: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    revenue: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    homepage: {
      type: String,
      required: true,
    },
    isSaved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
