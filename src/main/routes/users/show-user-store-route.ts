import ExpressRouterAdapter from '../../adapters/express-router-adapter';
import ShowUserStoreRouterComposer from '../../composers/users/show-user-store-router-composer';
import { Router } from 'express';

export default (router: Router) => {
  router.get(
    '/user/store',
    ExpressRouterAdapter.adapt(ShowUserStoreRouterComposer.compose())
  );
};
