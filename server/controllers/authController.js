import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
console.log("cloud name", process.env.CLOUDINARY_CLOUD_NAME);
console.log("secret", process.env.CLOUDINARY_SECRET);

export const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const foundEmail = await User.findOne({ email });
    if (foundEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log("error", error);
    return res.status(500), json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req;
    console.log("userId", userId);
    const { name } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let avatarUri = user.profilePic || "";
    if (req.file) {
      const buffer = req.file.buffer;
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: process.env.CLOUDINARY_FOLDER_NAME,
              public_id: user._id,
              overwrite: true,
            },
            (err, result) => {
              err ? reject(err) : resolve(result);
            }
          )
          .end(buffer);
      });

      avatarUri = uploadResult.secure_url;
    }
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        firstname: name && `${name.split(" ")[0]}`,
        lastname: name && `${name.split(" ")[1] || ""}`,
        profilePic: avatarUri,
      },

      { new: true }
    );
    return res
      .status(200)
      .json({ message: "User updated successfully", user: updateUser });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
