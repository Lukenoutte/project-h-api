import SignUpStoreUseCase from "src/domain/usecases/stores/signup-store-usecase";
import SignUpStoreRouter from "src/presentation/routers/stores/signup-store-router";
import SignUpStoreRepository from "src/infra/repositories/stores/create-store-repository";

export default class SignUpStoreRouterComposer {
  static compose() {
    const signUpStoreUseCase = new SignUpStoreUseCase({
      signUpStoreRepository: new SignUpStoreRepository(),
    });
    return new SignUpStoreRouter({ signUpStoreUseCase });
  }
}
