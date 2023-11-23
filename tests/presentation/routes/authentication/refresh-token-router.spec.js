import logger from "src/main/configs/logger";
import RefreshTokenUseCase from "src/domain/usecases/authentication/refresh-token-usecase";
import HttpResponse from "src/presentation/helpers/http-response";
import { MissingParamError } from "src/presentation/errors";
import RefreshTokenRouter from "src/presentation/routers/authentication/refresh-token-router";

jest.mock("src/main/configs/logger");
jest.mock("src/presentation/helpers/http-response");
jest.mock("src/presentation/errors");
jest.mock("src/domain/usecases/authentication/refresh-token-usecase");

describe("RefreshTokenRouter", () => {
  it("Should execute the refresh token use case and return a ok response", async () => {
    const refreshTokenUseCase = new RefreshTokenUseCase();
    const refreshTokenRouter = new RefreshTokenRouter({ refreshTokenUseCase });
    const httpRequest = { userId: "123", body: { refreshToken: "test" } };
    refreshTokenUseCase.execute = jest.fn().mockResolvedValue("testToken");
    const response = await refreshTokenRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.ok({ accessToken: "testToken" }));
  });

  it("Should log an error and return a server error response when an error occurs", async () => {
    const refreshTokenUseCase = new RefreshTokenUseCase();
    const refreshTokenRouter = new RefreshTokenRouter({ refreshTokenUseCase });
    const httpRequest = { userId: "123", body: { refreshToken: "test" } };
    const error = new Error("Test error");
    refreshTokenUseCase.execute = jest.fn().mockRejectedValue(error);
    const response = await refreshTokenRouter.route(httpRequest);
    expect(logger.error).toHaveBeenCalledWith("RefreshTokenError", error);
    expect(response).toEqual(HttpResponse.serverError(error));
  });

  it("Should return a bad request response when a required field is missing", async () => {
    const refreshTokenUseCase = new RefreshTokenUseCase();
    const refreshTokenRouter = new RefreshTokenRouter({ refreshTokenUseCase });
    const httpRequest = { userId: "123" };
    const error = new MissingParamError("refreshToken");
    const response = await refreshTokenRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.badRequest(error));
  });
});
