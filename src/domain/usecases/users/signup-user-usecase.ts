import UserEntity from 'domain/entities/user-entity';
import {
  IFindUserRepository,
  ISignUpUserRepository,
} from 'infra/repositories/@interfaces/users-respository.interfaces';
import { IBcryptHelper } from 'infra/helpers/@interfaces/helper.interfaces';
import {
  ISignUpUserExecuteParams,
  ISignUpUserUseCase,
} from '../@interfaces/users-usecases.interfaces';

export default class SignUpUserUseCase implements ISignUpUserUseCase {
  signUpUserRepository: ISignUpUserRepository;
  bcryptHelper: IBcryptHelper;
  findUserRepository: IFindUserRepository;
  alreadyExistsError: Error;

  constructor({
    signUpUserRepository,
    bcryptHelper,
    findUserRepository,
    alreadyExistsError,
  }: ISignUpUserConstructor) {
    this.signUpUserRepository = signUpUserRepository;
    this.bcryptHelper = bcryptHelper;
    this.findUserRepository = findUserRepository;
    this.alreadyExistsError = alreadyExistsError;
  }

  async execute(params: ISignUpUserExecuteParams) {
    const userOnDatabase = await this.findUserRepository.execute({
      email: params.email,
      userId: '',
    });
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
  signUpUserRepository: ISignUpUserRepository;
  bcryptHelper: IBcryptHelper;
  findUserRepository: IFindUserRepository;
  alreadyExistsError: Error;
}
