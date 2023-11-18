import createHotelRoute from "./stores/create-store-route";
import createUserRoute from "./users/create-user-route";
import loginRoute from "./authentication/login-route";
import logoutRoute from "./authentication/logout-route";
import refreshTokenRoute from "./authentication/refesh-token-route";

export default [
  createHotelRoute,
  createUserRoute,
  loginRoute,
  logoutRoute,
  refreshTokenRoute,
];
