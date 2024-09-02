import { IStoreResponse } from "domain/entities/@interfaces/store-entity.interfaces";
import { IKeyCaseHelper } from "infra/helpers/@interfaces/helper.interfaces";
import { IFindStoreByMasterIdRespository } from "infra/repositories/@interfaces/stores-repository.interfaces";

export default class FindStoreUseCase {
  findStoreByMasterIdRespository: IFindStoreByMasterIdRespository
  keyCaseHelper: IKeyCaseHelper;
  
  constructor(
    { findStoreByMasterIdRespository, keyCaseHelper }: IFindStoreConstructor) {
    this.findStoreByMasterIdRespository = findStoreByMasterIdRespository;
    this.keyCaseHelper = keyCaseHelper
  }

  async execute({ masterId }: { masterId: number}) {
    const store = await this.findStoreByMasterIdRespository.execute(masterId);
    return this.keyCaseHelper.snakeCaseToCamelCase(store) as IStoreResponse
  }
}

interface IFindStoreConstructor {
  findStoreByMasterIdRespository: IFindStoreByMasterIdRespository,
  keyCaseHelper: IKeyCaseHelper
}