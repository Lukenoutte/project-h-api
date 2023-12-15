import { IBcryptHelper } from "infra/helpers/@interfaces/helper.interfaces";

export interface IUserEntity {
  name: string;
  email: string;
  password: string;
  bcryptHelper: IBcryptHelper;
  getArray: () => string[];
  encryptPassword: () => void;
}