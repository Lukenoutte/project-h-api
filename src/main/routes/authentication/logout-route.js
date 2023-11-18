import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import LogoutRouterComposer from "../../composers/authentication/logout-router-composer";

export default (router) => {
  router.post(
    "/logout",
    ExpressRouterAdapter.adapt(LogoutRouterComposer.compose()),
  );
};
