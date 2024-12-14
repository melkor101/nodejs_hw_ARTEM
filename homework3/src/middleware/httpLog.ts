import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger"
const { onLog } = logger("app");


const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  onLog(`${req.method} ${req.url}`);
  next();
};

export default httpLogger;