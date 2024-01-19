import {
  IFindUserRepository,
  ISignUpUserRepository,
} from 'infra/repositories/@interfaces/users-respository.interfaces';
import { IBcryptHelper } from 'infra/helpers/@interfaces/helper.interfaces';

export interface ISignUpUserExecuteParams {
  name: string;
  email: string;
  level: number;
  password: string;
}

export interface ISignUpUserUseCase {
  signUpUserRepository: ISignUpUserRepository;
  bcryptHelper: IBcryptHelper;
  findUserRepository: IFindUserRepository;
  alreadyExistsError: Error;
  execute: (params: ISignUpUserExecuteParams) => Promise<void>;
}

export interface IShowUserUseCase {
  findUserRepository: IFindUserRepository;
  execute: (params: IShowUserExecuteParams) => Promise<Object>;
}

export interface IShowUserExecuteParams {
  userId: string;
}
