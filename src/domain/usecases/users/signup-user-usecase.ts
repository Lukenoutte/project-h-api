import UserEntity from "domain/entities/user-entity";
import { IFindUserByEmailRepository, ISignUpUserRepository } from "infra/repositories/@interfaces/users-respository.interfaces";
import { IBcryptHelper } from "infra/helpers/@interfaces/helper.interfaces";
import { ISignUpUserUseCase } from "../@interfaces/users-usecases.interfaces";

export default class SignUpUserUseCase implements ISignUpUserUseCase {
  signUpUserRepository: ISignUpUserRepository;
  bcryptHelper: IBcryptHelper;
  findUserByEmailRepository: IFindUserByEmailRepository;
  alreadyExistsError: Error;

  constructor({
    signUpUserRepository,
    bcryptHelper,
    findUserByEmailRepository,
    alreadyExistsError,
  }: ISignUpUserConstructor) {
    this.signUpUserRepository = signUpUserRepository;
    this.bcryptHelper = bcryptHelper;
    this.findUserByEmailRepository = findUserByEmailRepository;
    this.alreadyExistsError = alreadyExistsError;
  }

  async execute(params: ISignUpUserExecuteParams) {
    const userOnDatabase = await this.findUserByEmailRepository.execute(params);
    if (userOnDatabase) throw this.alreadyExistsError;
    const userEntity = new UserEntity({
      ...params,
      bcryptHelper: this.bcryptHelper,
    });
    await userEntity.encryptPassword();
    await this.signUpUserRepository.execute(userEntity);
  }
}

interface ISignUpUserConstructor {
  signUpUserRepository: ISignUpUserRepository,
  bcryptHelper: IBcryptHelper,
  findUserByEmailRepository: IFindUserByEmailRepository,
  alreadyExistsError: Error
}

interface ISignUpUserExecuteParams {
  name: string,
  email: string,
  password: string
}
