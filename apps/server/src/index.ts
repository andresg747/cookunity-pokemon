import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { Application } from "express";
import apiRoutes from "./routes";
import { ValidationError } from "./errors/validation";
import { loggerMiddleware } from "./middlewares/logger";

const app: Application = express();
app.use(express.json());

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "./config/.env") });

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Logger middleware
app.use(loggerMiddleware);

// Define the API routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  // Here we usually log the error to a file or a service like Sentry or New Relic
  // to keep track of the errors that happen in our application in production
  console.error(err);

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message, details: err.details });
  }

  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
