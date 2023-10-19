import ExpressRouterAdapter from "../adapters/express-router-adapter";
import CreateHotelRouterComposer from "../composers/create-hotel-router-composer";

export default (router) => {
  router.post(
    "/create/hotel",
    ExpressRouterAdapter.adapt(CreateHotelRouterComposer.compose()),
  );
};
