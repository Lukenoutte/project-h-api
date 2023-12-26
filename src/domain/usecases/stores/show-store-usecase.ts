import { IStore } from "domain/entities/@interfaces/store-entity.interfaces";
import { IFindStoreBySubdomainRepository } from "infra/repositories/@interfaces/stores-repository.interfaces";

interface IShowStoreCosntructor {
  findStoreBySubdomainRepository: IFindStoreBySubdomainRepository 
}

export default class ShowStoreUseCase {
  findStoreBySubdomainRepository: IFindStoreBySubdomainRepository

  constructor({ findStoreBySubdomainRepository }: IShowStoreCosntructor) {
    this.findStoreBySubdomainRepository = findStoreBySubdomainRepository;
  }

  execute(params: { subdomain: string }): Promise<IStore>{
    return this.findStoreBySubdomainRepository.execute(params);
  }
}
