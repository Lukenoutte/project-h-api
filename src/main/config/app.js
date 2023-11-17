import express from "express";
import { jsonParse } from "../middlewares";
import setupRoutes from "./routes";

const app = express();

app.use(jsonParse);

setupRoutes(app);

export default app;
