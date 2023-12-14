import RefreshTokenUseCase from "domain/usecases/authentication/refresh-token-usecase";
import RefreshTokenRouter from "presentation/routers/authentication/refresh-token-router";
import FindRefreshTokenRepository from "infra/repositories/authentication/find-refresh-token-repository";
import JwtHelper from "infra/helpers/jwt-helper";
import { UnauthorizedError } from "presentation/errors";
import RefreshTokenRouterComposer from "main/composers/authentication/refresh-token-router-composer";
import { accessTokenSecret, refreshTokenSecret } from "main/configs/env";

jest.mock("domain/usecases/authentication/refresh-token-usecase");
jest.mock("presentation/routers/authentication/refresh-token-router");
jest.mock(
  "infra/repositories/authentication/find-refresh-token-repository",
);
jest.mock("infra/helpers/jwt-helper");
jest.mock("presentation/errors");

describe("RefreshTokenRouterComposer", () => {
  it("Should compose a refresh token router", () => {
    const findRefreshTokenRepository = new FindRefreshTokenRepository();
    const jwtHelperAccessToken = new JwtHelper(accessTokenSecret);
    const jwtHelperRefreshToken = new JwtHelper(refreshTokenSecret);
    const unauthorizedError = new UnauthorizedError();
    const refreshTokenUseCase = new RefreshTokenUseCase({
      findRefreshTokenRepository,
      jwtHelperRefreshToken,
      jwtHelperAccessToken,
      unauthorizedError,
    });
    const refreshTokenRouter = new RefreshTokenRouter({ refreshTokenUseCase });
    jest
      .spyOn(RefreshTokenRouterComposer, "compose")
      .mockImplementation(() => refreshTokenRouter);
    expect(RefreshTokenRouterComposer.compose()).toBe(refreshTokenRouter);
  });
});
