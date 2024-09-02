import { IFindUserByIdRepository } from "infra/repositories/@interfaces/users-respository.interfaces";
import { IFindUserUseCase } from "../@interfaces/users-usecases.interfaces";
import { IKeyCaseHelper } from "infra/helpers/@interfaces/helper.interfaces";
import { IUserResponse } from "domain/entities/@interfaces/user-entity.interfaces";

export default class FindUserUseCase implements IFindUserUseCase {
  findUserByIdRepository: IFindUserByIdRepository;
  keyCaseHelper: IKeyCaseHelper;

  constructor({
    findUserByIdRepository,
    keyCaseHelper
  }: IFindUserConstructor) {
    this.findUserByIdRepository = findUserByIdRepository;
    this.keyCaseHelper = keyCaseHelper
  }

  async execute(params: { userId: number }) {
    const userOnDatabase = await this.findUserByIdRepository.execute(params);
    delete userOnDatabase.password;
    const formatedData = this.keyCaseHelper.snakeCaseToCamelCase(userOnDatabase)
    return formatedData as IUserResponse
  }
}

interface IFindUserConstructor {
  findUserByIdRepository: IFindUserByIdRepository,
  keyCaseHelper: IKeyCaseHelper
}