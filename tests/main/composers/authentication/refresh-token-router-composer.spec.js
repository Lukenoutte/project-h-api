import RefreshTokenUseCase from "src/domain/usecases/authentication/refresh-token-usecase";
import RefreshTokenRouter from "src/presentation/routers/authentication/refresh-token-router";
import FindRefreshTokenRepository from "src/infra/repositories/authentication/find-refresh-token-repository";
import JwtHelper from "src/infra/helpers/jwt-helper";
import { UnauthorizedError } from "src/presentation/errors";
import RefreshTokenRouterComposer from "src/main/composers/authentication/refresh-token-router-composer";
import { accessTokenSecret, refreshTokenSecret } from "src/main/configs/env";

jest.mock("src/domain/usecases/authentication/refresh-token-usecase");
jest.mock("src/presentation/routers/authentication/refresh-token-router");
jest.mock(
  "src/infra/repositories/authentication/find-refresh-token-repository",
);
jest.mock("src/infra/helpers/jwt-helper");
jest.mock("src/presentation/errors");

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
