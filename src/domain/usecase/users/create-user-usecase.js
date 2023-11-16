import UserEntity from "../../entities/user-entity";
import BcryptHelper from "../../../infra/helpers/bcrypt-helper";

export default class CreateUserUseCase {
  constructor({ createUserRepository }) {
    this.createUserRepository = createUserRepository;
  }

  async execute(params) {
    const bcryptHelper = new BcryptHelper();
    const userEntity = new UserEntity({ ...params, bcryptHelper });
    await userEntity.encryptPassword();
    this.createUserRepository.execute(userEntity);
  }
}
