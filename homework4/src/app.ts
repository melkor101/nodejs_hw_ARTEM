import config from "config";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import httpLogger from "./middleware/httpLog";
import userRouter from "./routes/userRouter";
import { databaseService } from "./services/DatabaseService";
import logger from "./utils/logger"
import postRouter from "./routes/postRouter";
const { log, error } = logger("app");

const app = express();
const PORT = config.get("app.port");
const HOSTNAME = config.get("app.hostname");

// Middleware for JSON parsing
app.use(express.json());

// Custom Middleware
app.use(httpLogger);

app.get("/", (req: Request, res: Response) => {
  res.send("Home work 04 Started!");
});

// Use the userRouter and set the base path to /api/v1/users
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);



// Global error handler
app.use((err, req: Request, res: Response, next: NextFunction) => {
  error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

// Start the server
app.listen(PORT, HOSTNAME, () => {
  log(`Server is running on http://${HOSTNAME}:${PORT}`);
});

// Handle graceful shutdown
process.on("SIGINT", handleShutdown);
process.on("SIGTERM", handleShutdown);

async function handleShutdown(signal: string): Promise<void> {
  log(`Received ${signal}. Closing MongoDB connection...`);
  await databaseService.disconnect();
  log(`${signal} handled. Exiting process.`);
  process.exit(0);
}