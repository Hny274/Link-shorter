import {
  AddLink,
  DeleteLink,
  GetAllLinks,
  GetLink,
  UpdateAnalytics,
} from "../controller/link-controller.js";
import express from "express";

const router = express.Router();

router.post("/add-link", AddLink);
router.get("/get-all-links/:userId", GetAllLinks);
router.get("/get-link/:uniqueId", GetLink);
router.delete("/delete-link/:uniqueId", DeleteLink);
router.patch("/update-click/:uniqueId", UpdateAnalytics);

export default router;
