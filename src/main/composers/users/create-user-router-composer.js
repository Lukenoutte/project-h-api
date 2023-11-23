import CreateUserUseCase from "src/domain/usecases/users/create-user-usecase";
import CreateUserRouter from "src/presentation/routers/users/create-user-router";
import CreateUserRepository from "src/infra/repositories/users/create-user-repository";
import BcryptHelper from "src/infra/helpers/bcrypt-helper";
import FindUserRepository from "src/infra/repositories/users/find-user-repository";
import { AlreadyExistsError } from "src/presentation/errors";

export default class CreateUserRouterComposer {
  static compose() {
    const bcryptHelper = new BcryptHelper();
    const findUserRepository = new FindUserRepository();
    const alreadyExistsError = new AlreadyExistsError();
    const createUserUseCase = new CreateUserUseCase({
      createUserRepository: new CreateUserRepository(),
      bcryptHelper,
      findUserRepository,
      alreadyExistsError,
    });
    return new CreateUserRouter({ createUserUseCase });
  }
}
