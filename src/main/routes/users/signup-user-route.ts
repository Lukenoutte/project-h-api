import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import SignUpUserRouterComposer from "../../composers/users/signup-user-router-composer";
import { Router } from "express";

export default (router: Router) => {
  router.post(
    "/signup/user",
    ExpressRouterAdapter.adapt(SignUpUserRouterComposer.compose()),
  );
};
