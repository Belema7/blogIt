import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blog.js";

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://blogitbel.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());

// Monitoring route for Render
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

app.use("/api/users", authRoutes);
app.use("/api/blogs", blogRoutes);

export default app;
