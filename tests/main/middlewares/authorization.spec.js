import express from "express";
import JwtHelper from "src/infra/helpers/jwt-helper";
import authorization from "src/main/middlewares/authorization";
import { accessTokenSecret } from "src/main/configs/env";

const app = express();
app.use(authorization);

describe("Middleware authentication", () => {
  const next = jest.fn();
  const req = {
    path: "/protected-route",
    headers: {
      authorization: `Bearer ${new JwtHelper(accessTokenSecret).generateToken({
        userId: "123",
      })}`,
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  it("Should return 401 when dont have token", async () => {
    const reqWithoutToken = { ...req, headers: {} };
    await authorization(reqWithoutToken, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("Should return 401 when token is invalid", async () => {
    const reqWithInvalidToken = {
      ...req,
      headers: { authorization: "Bearer invalidToken" },
    };
    await authorization(reqWithInvalidToken, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("Should allow when token is valid", async () => {
    await authorization(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
