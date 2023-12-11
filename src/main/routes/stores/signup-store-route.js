import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import SignUpStoreRouterComposer from "../../composers/stores/signup-store-router-composer";

/**
 * @typedef {object} ExpressRouter
 */

/**
 * @param {ExpressRouter} router
 */
export default (router) => {
  router.post(
    "/create/store",
    ExpressRouterAdapter.adapt(SignUpStoreRouterComposer.compose()),
  );
};
