import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import RefreshTokenRouterComposer from "../../composers/authentication/refresh-token-router-composer";
import { Router } from "express";

export default (router: Router) => {
  const compose = RefreshTokenRouterComposer.compose()
  const adapt = ExpressRouterAdapter.adapt(compose)
  router.put(
    "/token/refresh",
    ExpressRouterAdapter.adapt(adapt),
  );
};
