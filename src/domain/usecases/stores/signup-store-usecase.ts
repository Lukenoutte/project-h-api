import { IStore } from "domain/entities/@interfaces/store-entity.interfaces";
import StoreEntity from "domain/entities/store-entity";
import { ISignUpStoreRepository } from "infra/repositories/@interfaces/stores-repository.interfaces";
import { ISetUserStoreRepository } from "infra/repositories/@interfaces/users-respository.interfaces";

export default class SignUpStoreUseCase {
  signUpStoreRepository: ISignUpStoreRepository
  setUserStoreRepository: ISetUserStoreRepository
  
  constructor(
    { signUpStoreRepository, setUserStoreRepository }:
    { signUpStoreRepository: ISignUpStoreRepository,
      setUserStoreRepository: ISetUserStoreRepository }) {
    this.signUpStoreRepository = signUpStoreRepository;
    this.setUserStoreRepository = setUserStoreRepository;
  }

  async execute(params: IStore) {
    const storeEntity = new StoreEntity({ ...params });
    const storeId = await this.signUpStoreRepository.execute(storeEntity);
    if (storeId === undefined) throw new Error('SignUpStoreError')
    await this.setUserStoreRepository.execute({
      userId: params.masterId,
      storeId
    })
    return { id: storeId, ...storeEntity }; 
  }
}
