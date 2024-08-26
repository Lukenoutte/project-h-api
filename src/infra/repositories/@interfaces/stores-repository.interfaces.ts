import { IStore, IStoreEntity } from "domain/entities/@interfaces/store-entity.interfaces"

export interface ISignUpStoreRepository {
  execute: (storeEntity: IStoreEntity) => Promise<number | undefined>;
}

export interface IFindStoreBySubdomainRepository {
  execute: (storeEntity: IStoreEntity) => Promise<IStore>;
}