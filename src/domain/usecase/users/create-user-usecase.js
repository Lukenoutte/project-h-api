import UserEntity from "../../entities/user-entity";

export default class CreateUserUseCase {
  constructor({ createUserRepository, bcryptHelper }) {
    this.createUserRepository = createUserRepository;
    this.bcryptHelper = bcryptHelper;
  }

  async execute(params) {
    const userEntity = new UserEntity({
      ...params,
      bcryptHelper: this.bcryptHelper,
    });
    await userEntity.encryptPassword();
    this.createUserRepository.execute(userEntity);
  }
}
