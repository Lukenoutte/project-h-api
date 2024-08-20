import SignInUseCase from "domain/usecases/authentication/signin-usecase";
import SignInRouter from "presentation/routers/authentication/signin-router";
import BcryptHelper from "infra/helpers/bcrypt-helper";
import FindUserByEmailRepository from "infra/repositories/users/find-user-by-email-repository";
import CreateRefreshTokenRepository from "infra/repositories/authentication/create-refresh-token-repository";
import FindRefreshTokenRepository from "infra/repositories/authentication/find-refresh-token-repository";
import UpdateRefreshTokenRepository from "infra/repositories/authentication/update-refresh-token-repository";
import { WrongCredentialsError } from "presentation/errors";
import JwtHelper from "infra/helpers/jwt-helper";
import { accessTokenSecret, refreshTokenSecret } from "main/configs/env";

export default class SignInRouterComposer {
  static compose() {
    const bcryptHelper = new BcryptHelper();
    const findUserByEmailRepository = new FindUserByEmailRepository();
    const createRefreshTokenRepository = new CreateRefreshTokenRepository();
    const findRefreshTokenRepository = new FindRefreshTokenRepository();
    const updateRefreshTokenRepository = new UpdateRefreshTokenRepository();
    const jwtHelperAccessToken = new JwtHelper(accessTokenSecret);
    const jwtHelperRefreshToken = new JwtHelper(refreshTokenSecret);
    const wrongCredentialsError = new WrongCredentialsError();
    const signInUseCase = new SignInUseCase({
      bcryptHelper,
      findUserByEmailRepository,
      jwtHelperAccessToken,
      jwtHelperRefreshToken,
      createRefreshTokenRepository,
      findRefreshTokenRepository,
      updateRefreshTokenRepository,
      wrongCredentialsError,
    });
    return new SignInRouter({ signInUseCase });
  }
}
