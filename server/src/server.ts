import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import contactRoutes from "./routes/contactRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 5000;

const allowedOrigins = ["http://localhost:5173"];

app.disable("x-powered-by");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS"));
    },

    methods: ["GET", "POST"],
  }),
);

app.use(
  express.json({
    limit: "25kb",
  }),
);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Portfolio server is running",
  });
});

app.use("/api/contact", contactRoutes);

app.use("/api/ai", aiRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
