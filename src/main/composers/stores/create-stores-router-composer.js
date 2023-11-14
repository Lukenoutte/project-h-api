import CreateStoreUseCase from "../../../domain/usecase/stores/create-store-usecase";
import CreateStoreRouter from "../../../presentation/routers/stores/create-store-router";
import CreateStoreRepository from "../../../infra/repositories/stores/create-store-repository";

class CreateStoreRouterComposer {
  static compose() {
    const createStoreUseCase = new CreateStoreUseCase({
      createStoreRepository: new CreateStoreRepository(),
    });
    return new CreateStoreRouter({ createStoreUseCase });
  }
}
export default CreateStoreRouterComposer;
