import SignUpStoreUseCase from "domain/usecases/stores/signup-store-usecase";
import SignUpStoreRouter from "presentation/routers/stores/signup-store-router";
import SignUpStoreRepository from "infra/repositories/stores/signup-store-repository";

export default class SignUpStoreRouterComposer {
  static compose() {
    const signUpStoreUseCase = new SignUpStoreUseCase({
      signUpStoreRepository: new SignUpStoreRepository(),
    });
    return new SignUpStoreRouter({ signUpStoreUseCase });
  }
}
