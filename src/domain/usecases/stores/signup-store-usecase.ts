import StoreEntity from "domain/entities/store-entity";
import { ISignUpStoreRepository } from "infra/repositories/@interfaces/stores-repository.interfaces";

interface ISignUpStoreUseCaseParams {
  name: string;
  address: string;
  city: string;
  country: string;
}

export default class ISignUpStoreUseCase {
  signUpStoreRepository: ISignUpStoreRepository
  constructor({ signUpStoreRepository }: { signUpStoreRepository: ISignUpStoreRepository }) {
    this.signUpStoreRepository = signUpStoreRepository;
  }

  async execute(params: ISignUpStoreUseCaseParams) {
    const storeEntity = new StoreEntity(params);
    await this.signUpStoreRepository.execute(storeEntity);
    return storeEntity;
  }
}
