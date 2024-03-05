import { IStore, IStoreEntity } from "domain/entities/@interfaces/store-entity.interfaces"

export interface ISignUpStoreRepository {
  execute: (storeEntity: IStoreEntity) => Promise<number>;
}

export interface IFindStoreBySubdomainRepository {
  execute: (params: { subdomain: string }) => Promise<IStore>;
}

export interface IFindStoreByIdRepository {
  execute: (params: { storeId: number }) => Promise<IStore>;
}