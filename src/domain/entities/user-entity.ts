import { IBcryptHelper } from "infra/helpers/@interfaces/helper.interfaces"
import { IUserEntity } from "./@interfaces/user-entity.interfaces"

interface IUserConstructor {
  name: string;
  email: string;
  password: string;
  level: number;
  bcryptHelper: IBcryptHelper;
}

export default class UserEntity implements IUserEntity{
  name: string;
  email: string;
  password: string;
  level: number;
  bcryptHelper: IBcryptHelper;

  constructor({ name, email, password, bcryptHelper, level }: IUserConstructor) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.level = level;
    this.bcryptHelper = bcryptHelper;
  }

  async encryptPassword() {
    const encryptedPassword = await this.bcryptHelper.hashPassword(
      this.password,
    );
    this.password = encryptedPassword;
  }

  getArray(): any[]  {
    return [
      this.name,
      this.email,
      this.password,
      this.level
    ];
  }
}
