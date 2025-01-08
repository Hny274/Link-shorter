import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/dbConnection.js";
import authRoute from "./routes/auth-routes.js";
import cors from "cors";
import linkRoute from "./routes/link-routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: [process.env.FRONTEND_LINK], credentials: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/link", linkRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
