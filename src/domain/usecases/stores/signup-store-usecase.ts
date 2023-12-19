import { IStore } from "domain/entities/@interfaces/store-entity.interfaces";
import StoreEntity from "domain/entities/store-entity";
import { ISignUpStoreRepository } from "infra/repositories/@interfaces/stores-repository.interfaces";

export default class ISignUpStoreUseCase {
  signUpStoreRepository: ISignUpStoreRepository
  constructor({ signUpStoreRepository }: { signUpStoreRepository: ISignUpStoreRepository }) {
    this.signUpStoreRepository = signUpStoreRepository;
  }

  async execute(params: IStore) {
    const storeEntity = new StoreEntity(params);
    await this.signUpStoreRepository.execute(storeEntity);
    return storeEntity;
  }
}
