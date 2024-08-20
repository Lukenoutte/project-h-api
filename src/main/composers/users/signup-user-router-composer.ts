import SignUpUserUseCase from "domain/usecases/users/signup-user-usecase";
import SignUpUserRouter from "presentation/routers/users/signup-user-router";
import SignUpUserRepository from "infra/repositories/users/signup-user-repository";
import BcryptHelper from "infra/helpers/bcrypt-helper";
import FindUserByEmailRepository from "infra/repositories/users/find-user-by-email-repository";
import { AlreadyExistsError } from "presentation/errors";

export default class SignUpUserRouterComposer {
  static compose() {
    const bcryptHelper = new BcryptHelper();
    const findUserByEmailRepository = new FindUserByEmailRepository();
    const alreadyExistsError = new AlreadyExistsError();
    const signUpUserUseCase = new SignUpUserUseCase({
      signUpUserRepository: new SignUpUserRepository(),
      bcryptHelper,
      findUserByEmailRepository,
      alreadyExistsError,
    });
    return new SignUpUserRouter({ signUpUserUseCase });
  }
}
