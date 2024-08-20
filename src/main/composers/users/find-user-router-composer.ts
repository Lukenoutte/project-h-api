import FindUserUseCase from "domain/usecases/users/find-user-usecase";
import FindUserRouter from "presentation/routers/users/find-user-router";
import FindUserByIdRepository from "infra/repositories/users/find-user-by-id-repository";

export default class FindUserRouterComposer {
  static compose() {
    const findUserByIdRepository = new FindUserByIdRepository();
    const findUserUseCase = new FindUserUseCase({
      findUserByIdRepository,
    });
    return new FindUserRouter({ findUserUseCase });
  }
}
