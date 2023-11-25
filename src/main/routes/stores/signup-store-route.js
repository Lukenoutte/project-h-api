import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import SignUpStoreRouterComposer from "../../composers/stores/signup-store-router-composer";

export default (router) => {
  router.post(
    "/create/store",
    ExpressRouterAdapter.adapt(SignUpStoreRouterComposer.compose()),
  );
};
