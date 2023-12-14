import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import SignInRouterComposer from "../../composers/authentication/signin-router-composer";
import { Router } from "express";

export default (router: Router) => {
  router.post(
    "/signin",
    ExpressRouterAdapter.adapt(SignInRouterComposer.compose()),
  );
};
