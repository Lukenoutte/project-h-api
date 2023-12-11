import StoreEntity from "src/domain/entities/store-entity";

export default class SignUpStoreUseCase {
  /**
   * @param {SignUpStoreRepository} signUpStoreRepository
   */
  constructor({ signUpStoreRepository }) {
    this.signUpStoreRepository = signUpStoreRepository;
  }

  /**
   * @typedef {object} ParamsSignUpStore
   * @property {string} name
   * @property {string} address
   * @property {string} city
   * @property {string} country
   */

  /**
   * @param {ParamsSignUpStore} params
   * @returns {StoreEntity}
   */
  async execute(params) {
    const storeEntity = new StoreEntity(params);
    await this.signUpStoreRepository.execute(storeEntity);
    return storeEntity;
  }
}
