import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blog.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", authRoutes);
app.use("/api/blogs", blogRoutes);

export default app;
