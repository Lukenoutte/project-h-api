import signUpStoreRoute from "./stores/signup-store-route";
import signUpUserRoute from "./users/signup-user-route";
import signinRoute from "./authentication/signin-route";
import signoutRoute from "./authentication/signout-route";
import refreshTokenRoute from "./authentication/refesh-token-route";

export default [
  signUpStoreRoute,
  signUpUserRoute,
  signinRoute,
  signoutRoute,
  refreshTokenRoute,
];
