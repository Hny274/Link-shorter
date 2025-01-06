import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/dbConnection.js";
import authRoute from "./routes/auth-routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
