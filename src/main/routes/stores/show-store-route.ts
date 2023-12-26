import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import ShowStoreRouterComposer from "../../composers/stores/show-store-router-composer";
import { Router } from "express";

export default (router: Router) => {
  router.get(
    "/store/show",
    ExpressRouterAdapter.adapt(ShowStoreRouterComposer.compose()),
  );
};
