import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import SignUpUserRouterComposer from "../../composers/users/signup-user-router-composer";

/**
 * @typedef {object} ExpressRouter
 */

/**
 * @param {ExpressRouter} router
 */
export default (router) => {
  router.post(
    "/signup/user",
    ExpressRouterAdapter.adapt(SignUpUserRouterComposer.compose()),
  );
};
