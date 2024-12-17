import config from "config";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import logger from './utils/logger';
import httpLogger from "./middleware/httpLog";

const { log } = logger('app');
const app = express();
const PORT = config.get("app.port");
const HOSTNAME = config.get("app.hostname");

app.use(httpLogger);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

const responseData = {
  "live": true,
  "timestamp": new Date().toUTCString()
};

app.get("/healthcheck", (req: Request, res: Response) => {
  res.json(responseData)
});

app.listen(PORT, HOSTNAME, () => {
  log(`Server is running on http://${HOSTNAME}:${PORT}`);
});