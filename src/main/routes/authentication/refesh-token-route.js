import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import RefreshTokenRouterComposer from "../../composers/authentication/refresh-token-router-composer";

export default (router) => {
  router.post(
    "/token",
    ExpressRouterAdapter.adapt(RefreshTokenRouterComposer.compose()),
  );
};
