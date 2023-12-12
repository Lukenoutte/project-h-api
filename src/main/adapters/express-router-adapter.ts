import { Request, Response } from 'express';

export default class ExpressRouterAdapter {
  static adapt(router) {
    return async (req: Request, res: Response) => {
      const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        files: req.files,
        userId: req.userId,
      };
      const httpResponse = await router.route(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}
