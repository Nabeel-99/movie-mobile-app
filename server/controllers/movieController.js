import Movie from "../models/movie.js";

export const saveMovie = async (req, res) => {
  try {
    const { data } = req.body;
    const foundMovie = await Movie.findOne({ title: data.title });
    if (foundMovie) {
      return res.status(400).json({ message: "Movie already exists" });
    }
    const newMovie = await Movie.create({
      ...data,
      genres: data.genres.map((g) => g.name),
      production_companies: data.production_companies.map((p) => p.name),
      production_countries: data.production_countries.map((c) => c.name),
    });

    return res.status(200).json(newMovie);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json(error);
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    if (!movies) {
      return res.status(404).json({ message: "No movies found" });
    }
    return res.status(200).json(movies);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json(error);
  }
};
