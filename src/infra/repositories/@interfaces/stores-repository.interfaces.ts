import { IStore, IStoreEntity } from "domain/entities/@interfaces/store-entity.interfaces"

export interface ISignUpStoreRepository {
  execute: (storeEntity: IStoreEntity) => Promise<void>;
}

export interface IFindStoreBySubdomainRepository {
  execute: (params: { subdomain: string }) => Promise<IStore>;
}