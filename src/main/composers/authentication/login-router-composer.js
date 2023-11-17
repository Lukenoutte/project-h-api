import LoginUseCase from "../../../domain/usecase/authentication/login-usecase";
import LoginRouter from "../../../presentation/routers/authentication/login-router";
import BcryptHelper from "../../../infra/helpers/bcrypt-helper";
import FindUserRepository from "../../../infra/repositories/users/find-user-repository";
import { UnauthorizedError } from "../../../presentation/errors";

export default class LoginRouterComposer {
  static compose() {
    const bcryptHelper = new BcryptHelper();
    const findUserRepository = new FindUserRepository();
    const loginUseCase = new LoginUseCase({
      bcryptHelper,
      findUserRepository,
      UnauthorizedError,
    });
    return new LoginRouter({ loginUseCase });
  }
}
