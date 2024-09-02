import FindStoreUseCase from "domain/usecases/stores/find-store-usecase";
import KeyCaseHelper from "infra/helpers/key-case-helper";
import FindStoreByMasterIdRespository from "infra/repositories/stores/find-store-by-master-id-repository";
import FindStoreRouter from "presentation/routers/stores/find-store-router";


export default class FindStoreRouterComposer {
  static compose() {
    const findStoreUseCase = new FindStoreUseCase({
      findStoreByMasterIdRespository: new FindStoreByMasterIdRespository(),
      keyCaseHelper: new KeyCaseHelper()
    });
    return new FindStoreRouter({ findStoreUseCase });
  }
}
