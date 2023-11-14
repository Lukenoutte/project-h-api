import UserEntity from "../../entities/user-entity";

export default class CreateUserUseCase {
  constructor({ createUserRepository }) {
    this.createUserRepository = createUserRepository;
  }

  execute(params) {
    const userEntity = new UserEntity(params);
    this.createUserRepository.execute(userEntity);
    return userEntity;
  }
}
