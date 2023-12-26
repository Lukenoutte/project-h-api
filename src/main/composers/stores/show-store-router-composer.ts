import ShowStoreUseCase from "domain/usecases/stores/show-store-usecase";
import ShowStoreRouter from "presentation/routers/stores/show-store-router";
import FindStoreBySubdomainRepository from "infra/repositories/stores/find-store-by-subdomain-repository";

export default class ShowStoreRouterComposer {
  static compose() {
    const showStoreUseCase = new ShowStoreUseCase({
      findStoreBySubdomainRepository: new FindStoreBySubdomainRepository(),
    });
    return new ShowStoreRouter({ showStoreUseCase });
  }
}
