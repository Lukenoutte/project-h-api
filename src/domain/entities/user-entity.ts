import IBcryptHelper from "src/infra/helpers/interfaces/bcrypt-helper.interface"
import IUserEntity from "./interfaces/user-entity.interface"

interface IUser {
  name: string;
  email: string;
  password: string;
  address: string;
  city: string;
  country: string;
  bcryptHelper: IBcryptHelper;
}

export default class UserEntity implements IUserEntity{
  name: string;
  email: string;
  password: string;
  address: string;
  city: string;
  country: string;
  bcryptHelper: IBcryptHelper;

  constructor({ name, email, password, address, city, country, bcryptHelper }: IUser) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
    this.city = city;
    this.country = country;
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
      this.password,
      this.address,
      this.city,
      this.country,
    ];
  }
}
