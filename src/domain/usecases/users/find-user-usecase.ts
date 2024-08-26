import { IFindUserByIdRepository } from "infra/repositories/@interfaces/users-respository.interfaces";
import { IFindUserUseCase } from "../@interfaces/users-usecases.interfaces";

export default class FindUserUseCase implements IFindUserUseCase {
  findUserByIdRepository: IFindUserByIdRepository;

  constructor({
    findUserByIdRepository,
  }: IFindUserConstructor) {
    this.findUserByIdRepository = findUserByIdRepository;
  }

  async execute(params: { userId: number }) {
    const userOnDatabase = await this.findUserByIdRepository.execute(params);
    delete userOnDatabase.password;
    return userOnDatabase
  }
}

interface IFindUserConstructor {
  findUserByIdRepository: IFindUserByIdRepository
}