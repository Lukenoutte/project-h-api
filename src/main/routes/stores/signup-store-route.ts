import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import SignUpStoreRouterComposer from "../../composers/stores/signup-store-router-composer";
import { Router } from "express";

export default (router: Router) => {
  router.post(
    "/create/store",
    () => {  ExpressRouterAdapter.adapt(SignUpStoreRouterComposer.compose()) },
  );
};
