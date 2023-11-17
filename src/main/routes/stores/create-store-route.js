import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import CreateStoreRouterComposer from "../../composers/stores/create-stores-router-composer";
import { authorization } from "../../middlewares";

export default (router) => {
  router.post(
    "/create/store",
    authorization,
    ExpressRouterAdapter.adapt(CreateStoreRouterComposer.compose()),
  );
};
