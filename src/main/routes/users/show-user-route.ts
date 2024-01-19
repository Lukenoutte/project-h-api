import ExpressRouterAdapter from '../../adapters/express-router-adapter';
import ShowUserRouterComposer from '../../composers/users/show-user-router-composer';
import { Router } from 'express';

export default (router: Router) => {
  router.get(
    '/user',
    ExpressRouterAdapter.adapt(ShowUserRouterComposer.compose())
  );
};
