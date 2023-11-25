import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import SignOutRouterComposer from "../../composers/authentication/signout-router-composer";

export default (router) => {
  router.delete(
    "/signout",
    ExpressRouterAdapter.adapt(SignOutRouterComposer.compose()),
  );
};
