import { Response } from 'express';
import { IRequest } from './@interfaces/express-router-adapter.interfaces'
import { IRouter } from 'presentation/routers/@interfaces/router.interfaces';

export default class ExpressRouterAdapter {
  static adapt(router: IRouter) {
    return async (req: IRequest, res: Response): Promise<void> => {
      const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        userId: req.userId,
      };
      const httpResponse = await router.route(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}
