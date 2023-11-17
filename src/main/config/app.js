import express from "express";
import { jsonParse, authorization } from "../middlewares";
import setupRoutes from "./routes";

const app = express();

app.use(jsonParse);
app.use(authorization);

setupRoutes(app);

export default app;
