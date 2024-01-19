// Stores
import signUpStoreRoute from './stores/signup-store-route';
import showStoreRoute from './stores/show-store-route';

// Users
import signUpMasterRoute from './users/signup-master-route';
import showUserRoute from './users/show-user-route';

// Authentication
import signInRoute from './authentication/signin-route';
import signOutRoute from './authentication/signout-route';
import refreshTokenRoute from './authentication/refesh-token-route';


export default [
  showStoreRoute,
  signUpStoreRoute,
  signUpMasterRoute,
  showUserRoute,
  signInRoute,
  signOutRoute,
  refreshTokenRoute,
];
