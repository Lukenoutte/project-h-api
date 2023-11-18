import LoginUseCase from "../../../domain/usecase/authentication/login-usecase";
import LoginRouter from "../../../presentation/routers/authentication/login-router";
import BcryptHelper from "../../../infra/helpers/bcrypt-helper";
import FindUserRepository from "../../../infra/repositories/users/find-user-repository";
import CreateRefreshTokenRepository from "../../../infra/repositories/authentication/create-refresh-token-repository";
import FindRefreshTokenRepository from "../../../infra/repositories/authentication/find-refresh-token-repository";
import { UnauthorizedError } from "../../../presentation/errors";
import JwtHelper from "../../../infra/helpers/jwt-helper";
import { accessTokenSecret, refreshTokenSecret } from "../../config/env";

export default class LoginRouterComposer {
  static compose() {
    const bcryptHelper = new BcryptHelper();
    const findUserRepository = new FindUserRepository();
    const createRefreshTokenRepository = new CreateRefreshTokenRepository();
    const findRefreshTokenRepository = new FindRefreshTokenRepository();
    const jwtHelperAccessToken = new JwtHelper(accessTokenSecret);
    const jwtHelperRefreshToken = new JwtHelper(refreshTokenSecret);
    const unauthorizedError = new UnauthorizedError();
    const loginUseCase = new LoginUseCase({
      bcryptHelper,
      findUserRepository,
      unauthorizedError,
      jwtHelperAccessToken,
      jwtHelperRefreshToken,
      createRefreshTokenRepository,
      findRefreshTokenRepository,
    });
    return new LoginRouter({ loginUseCase });
  }
}
