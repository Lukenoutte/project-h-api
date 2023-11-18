import CreateUserUseCase from "../../../domain/usecase/users/create-user-usecase";
import CreateUserRouter from "../../../presentation/routers/users/create-user-router";
import CreateUserRepository from "../../../infra/repositories/users/create-user-repository";
import BcryptHelper from "../../../infra/helpers/bcrypt-helper";
import FindUserRepository from "../../../infra/repositories/users/find-user-repository";

export default class CreateUserRouterComposer {
  static compose() {
    const bcryptHelper = new BcryptHelper();
    const findUserRepository = new FindUserRepository();
    const createUserUseCase = new CreateUserUseCase({
      createUserRepository: new CreateUserRepository(),
      bcryptHelper,
      findUserRepository,
    });
    return new CreateUserRouter({ createUserUseCase });
  }
}
