import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import CreateStoreRouterComposer from "../../composers/stores/create-store-router-composer";

export default (router) => {
  router.post(
    "/create/store",
    ExpressRouterAdapter.adapt(CreateStoreRouterComposer.compose()),
  );
};
