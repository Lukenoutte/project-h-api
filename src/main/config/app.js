import express from "express";
import { auth, jsonParse } from "../middlewares";
import setupRoutes from "./routes";

const app = express();

app.use(jsonParse);
app.use(auth);

setupRoutes(app);

export default app;
