import CreateUserUseCase from "../../../domain/usecase/users/create-user-usecase";
import CreateUserRouter from "../../../presentation/routers/users/create-user-router";
import CreateUserRepository from "../../../infra/repositories/users/create-user-repository";

export default class CreateUserRouterComposer {
  static compose() {
    const createUserUseCase = new CreateUserUseCase({
      createUserRepository: new CreateUserRepository(),
    });
    return new CreateUserRouter({ createUserUseCase });
  }
}