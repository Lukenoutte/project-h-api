import StoreEntity from "../../entities/store-entity";

export default class CreateStoreUseCase {
  constructor({ createStoreRepository }) {
    this.createStoreRepository = createStoreRepository;
  }

  execute(params) {
    const storeEntity = new StoreEntity(params);
    this.createStoreRepository.execute(storeEntity);
    return storeEntity;
  }
}
