import signUpStoreRoute from "./stores/signup-store-route";
import findStoreRoute from "./stores/find-store-route";
import signUpUserRoute from "./users/signup-user-route";
import findUserRoute from "./users/find-user-route";
import signInRoute from "./authentication/signin-route";
import signOutRoute from "./authentication/signout-route";
import refreshTokenRoute from "./authentication/refesh-token-route";

export default [
  findStoreRoute,
  signUpStoreRoute,
  signUpUserRoute,
  findUserRoute,
  signInRoute,
  signOutRoute,
  refreshTokenRoute
];
