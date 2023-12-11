export default class ExpressRouterAdapter {
  /**
   * @typedef {Object} PresentationRouter
   */

  /**
   * @param {PresentationRouter} router
   */
  static adapt(router) {
    return async (req, res) => {
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
