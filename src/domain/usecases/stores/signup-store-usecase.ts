import StoreEntity from "src/domain/entities/store-entity";

export default class SignUpStoreUseCase {
  constructor({ signUpStoreRepository }) {
    this.signUpStoreRepository = signUpStoreRepository;
  }

  async execute(params) {
    const storeEntity = new StoreEntity(params);
    await this.signUpStoreRepository.execute(storeEntity);
    return storeEntity;
  }
}
