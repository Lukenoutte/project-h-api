import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from 'express-rate-limit'
import xss from "xss-clean";
import { jsonParse, authorization } from "../middlewares";
import setupRoutes from "./routes";

const app = express();

const limiter = rateLimit({
  max: 100, // max requests
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: "You have touched the maximum limit of request.",
});

app.use(limiter);
app.use(jsonParse);
app.use(helmet());
app.use(xss());
app.use(authorization);
app.use(cors({ origin: "http://localhost:3000" }));

setupRoutes(app);

export default app;
