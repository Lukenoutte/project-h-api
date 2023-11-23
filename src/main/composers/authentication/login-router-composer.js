import LoginUseCase from "src/domain/usecases/authentication/login-usecase";
import LoginRouter from "src/presentation/routers/authentication/login-router";
import BcryptHelper from "src/infra/helpers/bcrypt-helper";
import FindUserRepository from "src/infra/repositories/users/find-user-repository";
import CreateRefreshTokenRepository from "src/infra/repositories/authentication/create-refresh-token-repository";
import FindRefreshTokenRepository from "src/infra/repositories/authentication/find-refresh-token-repository";
import UpdateRefreshTokenRepository from "src/infra/repositories/authentication/update-refresh-token-repository";
import { WrongCredentialsError } from "src/presentation/errors";
import JwtHelper from "src/infra/helpers/jwt-helper";
import { accessTokenSecret, refreshTokenSecret } from "src/main/configs/env";

export default class LoginRouterComposer {
  static compose() {
    const bcryptHelper = new BcryptHelper();
    const findUserRepository = new FindUserRepository();
    const createRefreshTokenRepository = new CreateRefreshTokenRepository();
    const findRefreshTokenRepository = new FindRefreshTokenRepository();
    const updateRefreshTokenRepository = new UpdateRefreshTokenRepository();
    const jwtHelperAccessToken = new JwtHelper(accessTokenSecret);
    const jwtHelperRefreshToken = new JwtHelper(refreshTokenSecret);
    const wrongCredentialsError = new WrongCredentialsError();
    const loginUseCase = new LoginUseCase({
      bcryptHelper,
      findUserRepository,
      jwtHelperAccessToken,
      jwtHelperRefreshToken,
      createRefreshTokenRepository,
      findRefreshTokenRepository,
      updateRefreshTokenRepository,
      wrongCredentialsError,
    });
    return new LoginRouter({ loginUseCase });
  }
}
