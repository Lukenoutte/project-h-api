import { IStoreEntity } from "domain/entities/@interfaces/store-entity.interfaces"

export interface ISignUpStoreRepository {
  execute: (storeEntity: IStoreEntity) => Promise<void>;
}