import StoreEntity from "../../entities/store-entity";

export default class CreateStoreUseCase {
  constructor({ createStoreRepository }) {
    this.createStoreRepository = createStoreRepository;
  }

  async execute(params) {
    const storeEntity = new StoreEntity(params);
    await this.createStoreRepository.execute(storeEntity);
    return storeEntity;
  }
}
