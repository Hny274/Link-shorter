import User from "./../model/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiResponse from "../utils/Api-response.js";

const generateToken = (user, expiry) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: expiry,
  });
};

export const Register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = generateToken(user, "7d");
    res
      .status(201)
      .json(
        new ApiResponse(201, { user, token }, "User Registered successfully!")
      );
  } catch (error) {
    res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Invalid Credentials"));
    }
    const token = generateToken(user, "7d");
    const data = {
      _id: user._id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: token,
    };
    res
      .status(200)
      .json(new ApiResponse(200, { ...data }, "Login successful!"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, null, error.message));
  }
};
