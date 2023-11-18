import LoginUseCase from "../../../domain/usecase/authentication/login-usecase";
import LoginRouter from "../../../presentation/routers/authentication/login-router";
import BcryptHelper from "../../../infra/helpers/bcrypt-helper";
import FindUserRepository from "../../../infra/repositories/users/find-user-repository";
import { UnauthorizedError } from "../../../presentation/errors";
import JwtHelper from "../../../infra/helpers/jwt-helper";
import { accessTokenSecret } from "../../config/env";

export default class LoginRouterComposer {
  static compose() {
    const bcryptHelper = new BcryptHelper();
    const findUserRepository = new FindUserRepository();
    const jwtHelper = new JwtHelper(accessTokenSecret);
    const unauthorizedError = new UnauthorizedError();
    const loginUseCase = new LoginUseCase({
      bcryptHelper,
      findUserRepository,
      unauthorizedError,
      jwtHelper,
    });
    return new LoginRouter({ loginUseCase });
  }
}
