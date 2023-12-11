import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import SignInRouterComposer from "../../composers/authentication/signin-router-composer";

/**
 * @typedef {object} ExpressRouter
 */

/**
 * @param {ExpressRouter} router
 */
export default (router) => {
  router.post(
    "/signin",
    ExpressRouterAdapter.adapt(SignInRouterComposer.compose()),
  );
};
