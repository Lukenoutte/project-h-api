import express from "express";
import JwtHelper from "infra/helpers/jwt-helper";
import authorization from "main/middlewares/authorization";
import { accessTokenSecret } from "main/configs/env";
import { Request, Response } from "express";

const app = express();
app.use(authorization);

describe("Middleware authentication", () => {
  const next = jest.fn();

  const mockRequest = (authorization: string): Partial<Request> => {
    const req: Partial<Request> = {
      path: "/protected-route",
      body: {},
      params: {},
      query: {},
      headers: {
        authorization,
      },
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
  const res = mockResponse() as Response;

  it("Should return 401 when token is invalid", async () => {
    const reqWithInvalidToken = mockRequest("Bearer invalidToken") as Request;
    await authorization(reqWithInvalidToken, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("Should allow when token is valid", async () => {
    const token = `Bearer ${new JwtHelper(accessTokenSecret).generateToken({ userId: "123", })}`
    const req = mockRequest(token) as Request;
    await authorization(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
