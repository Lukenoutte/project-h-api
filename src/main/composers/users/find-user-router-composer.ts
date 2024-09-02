import FindUserUseCase from "domain/usecases/users/find-user-usecase";
import FindUserRouter from "presentation/routers/users/find-user-router";
import FindUserByIdRepository from "infra/repositories/users/find-user-by-id-repository";
import KeyCaseHelper from "infra/helpers/key-case-helper";

export default class FindUserRouterComposer {
  static compose() {
    const findUserByIdRepository = new FindUserByIdRepository();
    const keyCaseHelper = new KeyCaseHelper()
    const findUserUseCase = new FindUserUseCase({
      findUserByIdRepository,
      keyCaseHelper
    });
    return new FindUserRouter({ findUserUseCase });
  }
}
