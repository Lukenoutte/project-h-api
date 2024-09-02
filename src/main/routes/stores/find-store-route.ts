import FindStoreRouterComposer from "main/composers/stores/find-store-router-composer";
import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import { Router } from "express";

export default (router: Router) => {
  router.get(
    "/store",
    ExpressRouterAdapter.adapt(FindStoreRouterComposer.compose()),
  );
};
