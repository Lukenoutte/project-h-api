import { IFindUserRepository, ISignUpUserRepository } from "infra/repositories/@interfaces/users-respository.interfaces";
import { IBcryptHelper } from "infra/helpers/@interfaces/helper.interfaces";


interface ISignUpUserExecuteParams {
  name: string,
  email: string,
  password: string
}

export interface ISignUpUserUseCase {
  signUpUserRepository: ISignUpUserRepository;
  bcryptHelper: IBcryptHelper;
  findUserRepository: IFindUserRepository;
  alreadyExistsError: Error;
  execute: (params: ISignUpUserExecuteParams) => Promise<void>;
}
