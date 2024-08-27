import FindStoreUseCase from "domain/usecases/stores/find-store-usecase";
import FindStoreByMasterIdRespository from "infra/repositories/stores/find-store-by-master-id-repository";
import FindStoreRouter from "presentation/routers/stores/find-store-router";


export default class FindStoreRouterComposer {
  static compose() {
    const findStoreUseCase = new FindStoreUseCase({
      findStoreByMasterIdRespository: new FindStoreByMasterIdRespository()
    });
    return new FindStoreRouter({ findStoreUseCase });
  }
}
