import { Router } from "express";
import routes from "../routes";

const router = Router();

export default (app) => {
  app.use("/", router);
  routes.forEach((route) => route(router));
};
