import ExpressRouterAdapter from "../../adapters/express-router-adapter";
import CreateUserRouterComposer from "../../composers/users/create-user-router-composer";

export default (router) => {
  router.post(
    "/create/user",
    ExpressRouterAdapter.adapt(CreateUserRouterComposer.compose()),
  );
};
