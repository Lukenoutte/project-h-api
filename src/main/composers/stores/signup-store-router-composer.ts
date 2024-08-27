import SignUpStoreUseCase from "domain/usecases/stores/signup-store-usecase";
import SignUpStoreRouter from "presentation/routers/stores/signup-store-router";
import SignUpStoreRepository from "infra/repositories/stores/signup-store-repository";
import SetUserStoreRepository from "infra/repositories/users/set-user-store-repository";

export default class SignUpStoreRouterComposer {
  static compose() {
    const signUpStoreUseCase = new SignUpStoreUseCase({
      signUpStoreRepository: new SignUpStoreRepository(),
      setUserStoreRepository: new SetUserStoreRepository()
    });
    return new SignUpStoreRouter({ signUpStoreUseCase });
  }
}
