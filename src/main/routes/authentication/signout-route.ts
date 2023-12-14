import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import SignOutRouterComposer from "../../composers/authentication/signout-router-composer";
import { Router } from "express";

export default (router: Router) => {
  router.delete(
    "/signout",
    ExpressRouterAdapter.adapt(SignOutRouterComposer.compose()),
  );
};
