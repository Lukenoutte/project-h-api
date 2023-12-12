import SignUpUserUseCase from "src/domain/usecases/users/signup-user-usecase";
import SignUpUserRouter from "src/presentation/routers/users/signup-user-router";
import SignUpUserRepository from "src/infra/repositories/users/create-user-repository";
import BcryptHelper from "src/infra/helpers/bcrypt-helper";
import FindUserRepository from "src/infra/repositories/users/find-user-repository";
import { AlreadyExistsError } from "src/presentation/errors";

export default class SignUpUserRouterComposer {
  static compose() {
    const bcryptHelper = new BcryptHelper();
    const findUserRepository = new FindUserRepository();
    const alreadyExistsError = new AlreadyExistsError();
    const signUpUserUseCase = new SignUpUserUseCase({
      signUpUserRepository: new SignUpUserRepository(),
      bcryptHelper,
      findUserRepository,
      alreadyExistsError,
    });
    return new SignUpUserRouter({ signUpUserUseCase });
  }
}
