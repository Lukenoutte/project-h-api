import SignInRouterComposer from "main/composers/authentication/signin-router-composer";
import SignInUseCase from "domain/usecases/authentication/signin-usecase";
import SignInRouter from "presentation/routers/authentication/signin-router";
import BcryptHelper from "infra/helpers/bcrypt-helper";
import FindUserRepository from "infra/repositories/users/find-user-repository";
import CreateRefreshTokenRepository from "infra/repositories/authentication/create-refresh-token-repository";
import FindRefreshTokenRepository from "infra/repositories/authentication/find-refresh-token-repository";
import UpdateRefreshTokenRepository from "infra/repositories/authentication/update-refresh-token-repository";
import { WrongCredentialsError } from "presentation/errors";
import JwtHelper from "infra/helpers/jwt-helper";
import { accessTokenSecret, refreshTokenSecret } from "main/configs/env";

jest.mock("domain/usecases/authentication/signin-usecase");
jest.mock("presentation/routers/authentication/signin-router");
jest.mock("infra/helpers/bcrypt-helper");
jest.mock("infra/repositories/users/find-user-repository");
jest.mock(
  "infra/repositories/authentication/create-refresh-token-repository",
);
jest.mock(
  "infra/repositories/authentication/find-refresh-token-repository",
);
jest.mock(
  "infra/repositories/authentication/update-refresh-token-repository",
);
jest.mock("presentation/errors");
jest.mock("infra/helpers/jwt-helper");

describe("SignInRouterComposer", () => {
  it("Should compose a Sign in router", () => {
    const bcryptHelper = new BcryptHelper();
    const findUserRepository = new FindUserRepository();
    const createRefreshTokenRepository = new CreateRefreshTokenRepository();
    const findRefreshTokenRepository = new FindRefreshTokenRepository();
    const updateRefreshTokenRepository = new UpdateRefreshTokenRepository();
    const jwtHelperAccessToken = new JwtHelper(accessTokenSecret);
    const jwtHelperRefreshToken = new JwtHelper(refreshTokenSecret);
    const wrongCredentialsError = new WrongCredentialsError();
    const signInUseCase = new SignInUseCase({
      bcryptHelper,
      findUserRepository,
      jwtHelperAccessToken,
      jwtHelperRefreshToken,
      createRefreshTokenRepository,
      findRefreshTokenRepository,
      updateRefreshTokenRepository,
      wrongCredentialsError,
    });
    const signInRouter = new SignInRouter({ signInUseCase });
    jest
      .spyOn(SignInRouterComposer, "compose")
      .mockImplementation(() => signInRouter);
    expect(SignInRouterComposer.compose()).toBe(signInRouter);
  });

});
