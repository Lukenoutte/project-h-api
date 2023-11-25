import UserEntity from "src/domain/entities/user-entity";

export default class SignUpUserUseCase {
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
