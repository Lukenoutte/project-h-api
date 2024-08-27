import { IFindStoreByMasterIdRespository } from "infra/repositories/@interfaces/stores-repository.interfaces";

export default class FindStoreUseCase {
  findStoreByMasterIdRespository: IFindStoreByMasterIdRespository
  
  constructor(
    { findStoreByMasterIdRespository }:
    { findStoreByMasterIdRespository: IFindStoreByMasterIdRespository }) {
    this.findStoreByMasterIdRespository = findStoreByMasterIdRespository;
  }

  async execute({ masterId }: { masterId: number}) {
    return this.findStoreByMasterIdRespository.execute(masterId);
  }
}
