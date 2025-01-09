import User from "./../model/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiResponse from "../utils/Api-response.js";
import ResetToken from "./../model/reset-model.js";
import { sendMail } from "../utils/Mail.js";

const generateToken = (user, expiry) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: expiry,
  });
};

export const Register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Email and password are required."));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json(new ApiResponse(409, null, "Email already in use."));
    }

    //const hashedPassword = await bcrypt.hash(password, 10);
    //const user = await User.create({ email, password: hashedPassword });
    const user = await User.create(req.body);

    const token = generateToken(user, "7d");
    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { ...user.toJSON(), token },
          "User Registered successfully!"
        )
      );
  } catch (error) {
    res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json(new ApiResponse(404, null, "User not found!"));
    }

    console.log("Hashed Password:", user.password);
    console.log("Provided Password:", password);

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    console.log("Password Match:", isPasswordCorrect);

    if (!isPasswordCorrect) {
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

export const ForgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "User not found!"));
    }
    const token = generateToken(user, "7d");
    const resetToken = new ResetToken({ token });
    await resetToken.save();
    sendMail(user.email, resetToken._id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Reset password email sent"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

export const UpdatePassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.query;
  console.log(password);
  console.log(token);
  try {
    if (!token) {
      return res
        .status(404)
        .json(new ApiResponse(400, null, "Token is required!"));
    }
    const resetTokenData = await ResetToken.findById(token);
    if (!resetTokenData) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Token not found"));
    }
    try {
      const tokenData = jwt.verify(
        resetTokenData.token,
        process.env.JWT_SECRET
      );
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.findByIdAndUpdate(tokenData.id, { password: hashedPassword });

      await ResetToken.findByIdAndDelete(resetTokenData._id);
      return res
        .status(200)
        .json(new ApiResponse(200, null, "Password updated successfully"));
    } catch (error) {
      console.error("Error verifying JWT:", error);
      return res.status(401).json(new ApiResponse(401, null, "Invalid Token"));
    }
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

export const GetUserDetails = async (req, res) => {
  try {
    //console.log(req.headers.authorization);
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json(
          new ApiResponse(401, null, "Unauthorized:Missing or invalid token")
        );
    }
    const token = authorizationHeader.split(" ")[1];
    try {
      const verify_token = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(verify_token.id).select("-password");
      if (!user) {
        return res
          .status(404)
          .json(new ApiResponse(404, null, "User not found"));
      }
      return res
        .status(200)
        .json(new ApiResponse(200, user, "User retrieved successfully"));
    } catch (error) {
      console.error("Error decoding token:", err.message);
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Unauthorized: Invalid token"));
    }
  } catch (error) {
    //console.log(error.message);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};
