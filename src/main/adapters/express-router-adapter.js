export default class ExpressRouterAdapter {
  static adapt(router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        files: req.files,
      };
      const httpResponse = await router.route(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}
