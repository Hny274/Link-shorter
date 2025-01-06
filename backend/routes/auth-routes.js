import {
  Register,
  Login,
  ForgotPassword,
  UpdatePassword,
} from "../controller/auth-controller.js";
import express from "express";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/forgot-password", ForgotPassword);
router.post("/update-password", UpdatePassword);

export default router;
