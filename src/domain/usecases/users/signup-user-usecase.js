import UserEntity from "src/domain/entities/user-entity";

export default class SignUpUserUseCase {
  /**
   * @param {SignUpUserRepository} signUpUserRepository
   * @param {BcryptHelper} bcryptHelper
   * @param {FindUserRepository} findUserRepository
   * @param {AlreadyExistsError} alreadyExistsError
   */
  constructor({
    signUpUserRepository,
    bcryptHelper,
    findUserRepository,
    alreadyExistsError,
  }) {
    this.signUpUserRepository = signUpUserRepository;
    this.bcryptHelper = bcryptHelper;
    this.findUserRepository = findUserRepository;
    this.alreadyExistsError = alreadyExistsError;
  }

  /**
   * @typedef {object} ParamsSignUpUser
   * @property {string} name
   * @property {string} email
   * @property {string} password
   */

  /**
   * @param {ParamsSignUpUser} params
   */
  async execute(params) {
    const userOnDatabase = await this.findUserRepository.execute(params);
    if (userOnDatabase) throw this.alreadyExistsError;
    const userEntity = new UserEntity({
      ...params,
      bcryptHelper: this.bcryptHelper,
    });
    await userEntity.encryptPassword();
    await this.signUpUserRepository.execute(userEntity);
  }
}
