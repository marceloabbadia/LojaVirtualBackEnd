import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routers/productRoutes.js";
import authRoute from "./routers/authRoutes.js";
import utilizadorRoutes from "./routers/utilizadorRoutes.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(json());
app.use(express.static(path.join(process.cwd(), "public")));

app.use((req, res, next) => {
  console.log(`Request to ${req.url}`);
  next();
});

app.use("/product", productRoutes);
app.use("/auth", authRoute);
app.use("/utilizadores", utilizadorRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
