import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import FindUserRouterComposer from "../../composers/users/find-user-router-composer";
import { Router } from "express";

export default (router: Router) => {
  router.get(
    "/user",
    ExpressRouterAdapter.adapt(FindUserRouterComposer.compose()),
  );
};
