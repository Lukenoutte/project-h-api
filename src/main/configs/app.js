import express from "express";
import cors from "cors";
import { jsonParse, authorization } from "../middlewares";
import setupRoutes from "./routes";

const app = express();

app.use(jsonParse);
app.use(authorization);
app.use(cors({ origin: "http://localhost:3000" }));

setupRoutes(app);

export default app;
