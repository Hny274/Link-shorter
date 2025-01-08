import { AddLink } from "../controller/link-controller";
import express from "express";

const router = express.Router();

router.post("/add-link", AddLink);

export default router;
