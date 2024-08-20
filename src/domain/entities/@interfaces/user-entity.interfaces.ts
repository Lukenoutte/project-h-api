import { IBcryptHelper } from "infra/helpers/@interfaces/helper.interfaces";

export interface IUserEntity {
  name: string;
  email: string;
  password: string;
  bcryptHelper: IBcryptHelper;
  getArray: () => string[];
  encryptPassword: () => void;
}

export interface IUserResponse {
  name: string,
  email: string,
  password?: string
}

export interface IUser { email: string, password: string, id: string }