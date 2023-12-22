import {
  IRouter,
  IRequest,
  IResponse,
} from 'presentation/routers/@interfaces/router.interfaces';

type adapterResponse = (req: IRequest, res: IResponse) => Promise<void>;

export default class ExpressRouterAdapter {
  static adapt(router: IRouter): adapterResponse {
    return async (req: IRequest, res: IResponse): Promise<void> => {
      const httpResponse = await router.route(req);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}
