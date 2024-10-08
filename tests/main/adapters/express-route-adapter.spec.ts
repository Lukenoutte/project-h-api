import ExpressRouterAdapter from "main/adapters/express-router-adapter";
import { Request, Response } from "express";

describe("ExpressRouterAdapter", () => {
  const mockRequest = (): Partial<Request> => {
    const req: Partial<Request> = {
      body: {},
      params: {},
      query: {},
    };
    return req;
  };

  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {
      send: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    return res;
  };
  
  const req = mockRequest() as Request;
  const res = mockResponse() as Response;
  it("adapt should call the correct methods with the correct arguments", async () => {
    const router = {
      route: jest.fn().mockResolvedValue({
        statusCode: 200,
        body: "body",
      }),
      validate: jest.fn()
    };

    const adaptedRouter = ExpressRouterAdapter.adapt(router);
    await adaptedRouter(req, res);

    expect(router.route).toHaveBeenCalledWith({
      body: req.body,
      query: req.query,
      params: req.params,
      userId: req.userId,
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("body");
  });

  it("adapt should handle non-200 status codes", async () => {
    const router = {
      route: jest.fn().mockResolvedValue({
        statusCode: 404,
        body: "Not found",
      }),
      validate: jest.fn()
    };

    const adaptedRouter = ExpressRouterAdapter.adapt(router);
    await adaptedRouter(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("Not found");
  });

  it("adapt should handle rejected promise from router.route", async () => {
    const router = {
      route: jest.fn().mockRejectedValue(new Error("Network error")),
      validate: jest.fn()
    };

    const adaptedRouter = ExpressRouterAdapter.adapt(router);
    await expect(adaptedRouter(req, res)).rejects.toThrow("Network error");

    expect(router.route).toHaveBeenCalledWith({
      body: req.body,
      query: req.query,
      params: req.params,
      userId: req.userId,
    });
  });

  it("adapt should handle 500 status codes", async () => {
    const router = {
      route: jest.fn().mockResolvedValue({
        statusCode: 500,
        body: "Internal server error",
      }),
      validate: jest.fn()
    };

    const adaptedRouter = ExpressRouterAdapter.adapt(router);
    await adaptedRouter(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Internal server error");
  });
});
