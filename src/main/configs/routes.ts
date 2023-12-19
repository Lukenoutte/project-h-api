import { Router, Express } from "express";
import routes from "../routes";


const router = Router();

export default (app: Express) => {
  app.use("/", router);
  routes.forEach((route) => route(router));
};
