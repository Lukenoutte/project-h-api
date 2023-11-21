import UserEntity from "../../entities/user-entity";

export default class CreateUserUseCase {
  constructor({
    createUserRepository,
    bcryptHelper,
    findUserRepository,
    alreadyExistsError,
  }) {
    this.createUserRepository = createUserRepository;
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
    await this.createUserRepository.execute(userEntity);
  }
}
