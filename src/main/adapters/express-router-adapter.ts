import { Response, Request } from 'express';
import { IRouter } from 'presentation/routers/@interfaces/router.interfaces';

type adapterResponse = (req: Request, res: Response) => Promise<void>;

export default class ExpressRouterAdapter {
  static adapt(router: IRouter): adapterResponse {
    return async (req: Request, res: Response): Promise<void> => {
      const httpResponse = await router.route(req);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}
