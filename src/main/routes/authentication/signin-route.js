import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import SignInRouterComposer from "../../composers/authentication/signin-router-composer";

export default (router) => {
  router.post(
    "/signin",
    ExpressRouterAdapter.adapt(SignInRouterComposer.compose()),
  );
};
