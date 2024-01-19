import { IStore } from "domain/entities/@interfaces/store-entity.interfaces";
import StoreEntity from "domain/entities/store-entity";
import { ISignUpStoreRepository } from "infra/repositories/@interfaces/stores-repository.interfaces";
import { ISetUserStoreRepository } from "infra/repositories/@interfaces/users-respository.interfaces";

export default class ISignUpStoreUseCase {
  signUpStoreRepository: ISignUpStoreRepository
  setUserStoreRepository: ISetUserStoreRepository

  constructor({ signUpStoreRepository, setUserStoreRepository }:
    {
      signUpStoreRepository: ISignUpStoreRepository,
      setUserStoreRepository: ISetUserStoreRepository 
    }) {
    this.signUpStoreRepository = signUpStoreRepository;
    this.setUserStoreRepository = setUserStoreRepository;
  }

  async execute(params: IStore) {
    const storeEntity = new StoreEntity(params);
    const storeId = await this.signUpStoreRepository.execute(storeEntity);
    if (!storeId) throw new Error('InvalidStoreOnSignUpError')
    await this.setUserStoreRepository.execute({ storeId, userId: storeEntity.userId })
  }
}
