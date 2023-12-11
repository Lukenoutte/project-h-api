import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import RefreshTokenRouterComposer from "../../composers/authentication/refresh-token-router-composer";

export default (router) => {
  router.put(
    "/token/refresh",
    ExpressRouterAdapter.adapt(RefreshTokenRouterComposer.compose()),
  );
};
