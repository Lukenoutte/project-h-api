import { IFindUserByEmailRepository, IFindUserByIdRepository, ISignUpUserRepository } from "infra/repositories/@interfaces/users-respository.interfaces";
import { IBcryptHelper } from "infra/helpers/@interfaces/helper.interfaces";
import { IUserResponse } from "domain/entities/@interfaces/user-entity.interfaces";

interface ISignUpUserExecuteParams {
  name: string,
  email: string,
  password: string
}

export interface ISignUpUserUseCase {
  signUpUserRepository: ISignUpUserRepository;
  bcryptHelper: IBcryptHelper;
  findUserByEmailRepository: IFindUserByEmailRepository;
  alreadyExistsError: Error;
  execute: (params: ISignUpUserExecuteParams) => Promise<void>;
}

export interface IFindUserUseCase {
  findUserByIdRepository: IFindUserByIdRepository;
  execute: (params: { userId: string }) => Promise<IUserResponse>;
}

