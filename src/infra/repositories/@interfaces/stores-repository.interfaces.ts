import IStoreEntity from "src/domain/entities/interfaces/store-entity.interface"

export interface ISignUpStoreRepository {
  execute: (storeEntity: IStoreEntity) => Promise<void>;
}