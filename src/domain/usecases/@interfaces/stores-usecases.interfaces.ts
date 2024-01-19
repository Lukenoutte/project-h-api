import { IStore } from "domain/entities/@interfaces/store-entity.interfaces";
import { ISignUpStoreRepository , IFindStoreBySubdomainRepository} from "infra/repositories/@interfaces/stores-repository.interfaces";

export interface ISignUpStoreUseCase {
  signUpStoreRepository: ISignUpStoreRepository;
  execute: (params: IStore) => Promise<void>;
}

export interface IShowStoreUseCase {
  findStoreBySubdomainRepository: IFindStoreBySubdomainRepository;
  execute: (params: { subdomain: string }) => Promise<IStore>;
}