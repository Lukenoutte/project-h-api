import express from "express";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import { jsonParse, authorization, limiter } from "../middlewares";
import setupRoutes from "./routes";

const app = express();

app.use(limiter);
app.use(jsonParse);
app.use(helmet());
app.use(xss());
app.use(authorization);
app.use(cors({ origin: "http://localhost:3000" }));

setupRoutes(app);

export default app;
