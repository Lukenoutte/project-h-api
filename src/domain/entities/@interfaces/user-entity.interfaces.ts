import { IBcryptHelper } from "infra/helpers/@interfaces/helper.interfaces";

export interface IUser { name: string; email: string;  }

export interface IUserEntity extends IUser {
  password: string;
  bcryptHelper: IBcryptHelper;
  getArray: () => string[];
  encryptPassword: () => void;
}

export interface IUserResponse extends IUser {
  id: number;
  password?: string;
}

export interface IUserResponseWithPass extends IUser {
  id: number;
  password: string;
}