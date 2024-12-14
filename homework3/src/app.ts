import config from "config";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import logger from './utils/logger';
import httpLogger from "./middleware/httpLog";

const { onLog } = logger('app');
const app = express();
const PORT = config.get("app.port");
const HOSTNAME = config.get("app.hostname");

app.use(httpLogger);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

const responseData = JSON.stringify({
  "live": true,
  "timestamp": new Date().toUTCString()
});

app.get("/healthcheck", (req: Request, res: Response) => {
  res.send(responseData);
});

app.listen(PORT, HOSTNAME, () => {
  onLog(`Server is running on http://${HOSTNAME}:${PORT}`);
});