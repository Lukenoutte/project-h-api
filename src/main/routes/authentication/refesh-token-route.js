import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import RefreshTokenRouterComposer from "../../composers/authentication/refresh-token-router-composer";

/**
 * @typedef {object} ExpressRouter
 */

/**
 * @param {ExpressRouter} router
 */
export default (router) => {
  router.put(
    "/token/refresh",
    ExpressRouterAdapter.adapt(RefreshTokenRouterComposer.compose()),
  );
};
