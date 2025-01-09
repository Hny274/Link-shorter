import {
  Register,
  Login,
  ForgetPassword,
  UpdatePassword,
  GetUserDetails,
} from "../controller/auth-controller.js";
import express from "express";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/forget-password", ForgetPassword);
router.post("/update-password", UpdatePassword);

router.get("/get-user", GetUserDetails);

export default router;
