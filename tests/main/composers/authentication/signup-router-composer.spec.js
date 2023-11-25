import SignInRouterComposer from "src/main/composers/authentication/signin-router-composer";
import SignInUseCase from "src/domain/usecases/authentication/signin-usecase";
import SignInRouter from "src/presentation/routers/authentication/signin-router";
import BcryptHelper from "src/infra/helpers/bcrypt-helper";
import FindUserRepository from "src/infra/repositories/users/find-user-repository";
import CreateRefreshTokenRepository from "src/infra/repositories/authentication/create-refresh-token-repository";
import FindRefreshTokenRepository from "src/infra/repositories/authentication/find-refresh-token-repository";
import UpdateRefreshTokenRepository from "src/infra/repositories/authentication/update-refresh-token-repository";
import { WrongCredentialsError } from "src/presentation/errors";
import JwtHelper from "src/infra/helpers/jwt-helper";
import { accessTokenSecret, refreshTokenSecret } from "src/main/configs/env";

jest.mock("src/domain/usecases/authentication/signin-usecase");
jest.mock("src/presentation/routers/authentication/signin-router");
jest.mock("src/infra/helpers/bcrypt-helper");
jest.mock("src/infra/repositories/users/find-user-repository");
jest.mock(
  "src/infra/repositories/authentication/create-refresh-token-repository",
);
jest.mock(
  "src/infra/repositories/authentication/find-refresh-token-repository",
);
jest.mock(
  "src/infra/repositories/authentication/update-refresh-token-repository",
);
jest.mock("src/presentation/errors");
jest.mock("src/infra/helpers/jwt-helper");

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
