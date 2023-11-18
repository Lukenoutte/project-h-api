import UserEntity from "../../entities/user-entity";

export default class CreateUserUseCase {
  constructor({ createUserRepository, bcryptHelper, findUserRepository }) {
    this.createUserRepository = createUserRepository;
    this.bcryptHelper = bcryptHelper;
    this.findUserRepository = findUserRepository;
  }

  async execute(params) {
    const userOnDatabase = await this.findUserRepository.execute(params);
    if (userOnDatabase) throw new Error("Já existe fí");
    const userEntity = new UserEntity({
      ...params,
      bcryptHelper: this.bcryptHelper,
    });
    await userEntity.encryptPassword();
    await this.createUserRepository.execute(userEntity);
  }
}
