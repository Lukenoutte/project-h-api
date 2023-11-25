import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import SignUpUserRouterComposer from "../../composers/users/signup-user-router-composer";

export default (router) => {
  router.post(
    "/create/user",
    ExpressRouterAdapter.adapt(SignUpUserRouterComposer.compose()),
  );
};
