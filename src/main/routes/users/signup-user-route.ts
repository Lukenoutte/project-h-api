import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import SignUpUserRouterComposer from "../../composers/users/signup-user-router-composer";
import { Router } from "express";

export default (router: Router) => {
  router.post(
    "/user/signup",
    ExpressRouterAdapter.adapt(SignUpUserRouterComposer.compose()),
  );
};
