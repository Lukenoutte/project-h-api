import signUpStoreRoute from "./stores/signup-store-route";
import signUpUserRoute from "./users/signup-user-route";
import signInRoute from "./authentication/signin-route";
import signOutRoute from "./authentication/signout-route";
import refreshTokenRoute from "./authentication/refesh-token-route";

export default [
  signUpStoreRoute,
  signUpUserRoute,
  signInRoute,
  signOutRoute,
  refreshTokenRoute,
];
