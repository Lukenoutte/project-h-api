import LoginUseCase from "../../../domain/usecase/authentication/login-usecase";
import LoginRouter from "../../../presentation/routers/authentication/login-router";
import BcryptHelper from "../../../infra/helpers/bcrypt-helper";
import FindUserRepository from "../../../infra/repositories/users/find-user-repository";
import CreateRefreshTokenRepository from "../../../infra/repositories/authentication/create-refresh-token-repository";
import FindRefreshTokenRepository from "../../../infra/repositories/authentication/find-refresh-token-repository";
import UpdateRefreshTokenRepository from "../../../infra/repositories/authentication/update-refresh-token-repository";
import {
  UnauthorizedError,
  WrongCredentialsError,
} from "../../../presentation/errors";
import JwtHelper from "../../../infra/helpers/jwt-helper";
import { accessTokenSecret, refreshTokenSecret } from "../../config/env";

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
