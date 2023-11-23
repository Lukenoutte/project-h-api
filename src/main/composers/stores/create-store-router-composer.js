import CreateStoreUseCase from "src/domain/usecases/stores/create-store-usecase";
import CreateStoreRouter from "src/presentation/routers/stores/create-store-router";
import CreateStoreRepository from "src/infra/repositories/stores/create-store-repository";

export default class CreateStoreRouterComposer {
  static compose() {
    const createStoreUseCase = new CreateStoreUseCase({
      createStoreRepository: new CreateStoreRepository(),
    });
    return new CreateStoreRouter({ createStoreUseCase });
  }
}
