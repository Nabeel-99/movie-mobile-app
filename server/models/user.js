import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profilePic: {
      type: String,
      required: false,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    savedMovies: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
