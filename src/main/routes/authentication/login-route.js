import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import LoginRouterComposer from "../../composers/authentication/login-router-composer";

export default (router) => {
  router.post(
    "/login",
    ExpressRouterAdapter.adapt(LoginRouterComposer.compose()),
  );
};
