import { IFindUserRepository } from 'infra/repositories/@interfaces/users-respository.interfaces';
import {
  IShowUserExecuteParams,
  IShowUserStoreUseCase,
} from '../@interfaces/users-usecases.interfaces';
import { IFindStoreByIdRepository } from 'infra/repositories/@interfaces/stores-repository.interfaces';

export default class ShowUserStoreUseCase implements IShowUserStoreUseCase {
  findUserRepository: IFindUserRepository;
  findStoreByIdRepository: IFindStoreByIdRepository;
  invalidStoreError: Error;

  constructor({ 
    findUserRepository, 
    findStoreByIdRepository, 
    invalidStoreError 
  }: IShowUserStoreConstructor) {
    this.findUserRepository = findUserRepository;
    this.findStoreByIdRepository = findStoreByIdRepository;
    this.invalidStoreError = invalidStoreError;
  }

  async execute(params: IShowUserExecuteParams) {
    const userOnDatabase = await this.findUserRepository.execute({
      userId: params.userId, email: '',
    });
    if (!userOnDatabase.storeId) throw this.invalidStoreError
    const storeOnDatabase = await this.findStoreByIdRepository.execute({
      storeId: userOnDatabase.storeId,
    });
    return storeOnDatabase;
  }
}

interface IShowUserStoreConstructor {
  findUserRepository: IFindUserRepository;
  findStoreByIdRepository: IFindStoreByIdRepository;
  invalidStoreError: Error;
}
