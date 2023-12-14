import { IBcryptHelper } from "infra/helpers/@interfaces/helper.interfaces"
import { IUserEntity } from "./@interfaces/user-entity.interfaces"

interface IUserConstructor {
  name: string;
  email: string;
  password: string;
  bcryptHelper: IBcryptHelper;
}

export default class UserEntity implements IUserEntity{
  name: string;
  email: string;
  password: string;
  bcryptHelper: IBcryptHelper;

  constructor({ name, email, password, bcryptHelper }: IUserConstructor) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.bcryptHelper = bcryptHelper;
  }

  async encryptPassword() {
    const encryptedPassword = await this.bcryptHelper.hashPassword(
      this.password,
    );
    this.password = encryptedPassword;
  }

  getArray(): string[]  {
    return [
      this.name,
      this.email,
      this.password
    ];
  }
}
