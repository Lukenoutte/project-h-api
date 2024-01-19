import { IFindUserRepository } from 'infra/repositories/@interfaces/users-respository.interfaces';
import {
  IShowUserExecuteParams,
  IShowUserUseCase,
} from '../@interfaces/users-usecases.interfaces';

export default class ShowUserUseCase implements IShowUserUseCase {
  findUserRepository: IFindUserRepository;

  constructor({ findUserRepository }: IShowUserConstructor) {
    this.findUserRepository = findUserRepository;
  }

  async execute(params: IShowUserExecuteParams) {
    const userOnDatabase = await this.findUserRepository.execute({
      userId: params.userId,
      email: '',
    });
    delete userOnDatabase.password;
    return userOnDatabase;
  }
}

interface IShowUserConstructor {
  findUserRepository: IFindUserRepository;
}
