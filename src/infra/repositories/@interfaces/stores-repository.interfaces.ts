import { IStore, IStoreEntity, IStoreResponse } from "domain/entities/@interfaces/store-entity.interfaces"

export interface ISignUpStoreRepository {
  execute: (storeEntity: IStoreEntity) => Promise<number | undefined>;
}

export interface IFindStoreBySubdomainRepository {
  execute: (storeEntity: IStoreEntity) => Promise<IStoreResponse>;
}

export interface IFindStoreByMasterIdRespository {
  execute: (masterId: number) => Promise<IStoreResponse>;
}