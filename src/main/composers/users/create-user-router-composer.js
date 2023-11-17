import CreateUserUseCase from "../../../domain/usecase/users/create-user-usecase";
import CreateUserRouter from "../../../presentation/routers/users/create-user-router";
import CreateUserRepository from "../../../infra/repositories/users/create-user-repository";
import BcryptHelper from "../../../infra/helpers/bcrypt-helper";

export default class CreateUserRouterComposer {
  static compose() {
    const bcryptHelper = new BcryptHelper();
    const createUserUseCase = new CreateUserUseCase({
      createUserRepository: new CreateUserRepository(),
      bcryptHelper,
    });
    return new CreateUserRouter({ createUserUseCase });
  }
}
