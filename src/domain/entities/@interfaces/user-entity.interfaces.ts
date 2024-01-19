import { IBcryptHelper } from "infra/helpers/@interfaces/helper.interfaces";

export interface IUserEntity {
  name: string;
  email: string;
  password: string;
  level: number;
  bcryptHelper: IBcryptHelper;
  getArray: () => any[];
  encryptPassword: () => void;
}