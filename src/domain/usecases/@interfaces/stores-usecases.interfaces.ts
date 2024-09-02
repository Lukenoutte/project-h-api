import { IStore, IStoreResponse } from "domain/entities/@interfaces/store-entity.interfaces";
import { IFindStoreByMasterIdRespository, ISignUpStoreRepository } from "infra/repositories/@interfaces/stores-repository.interfaces";


export interface ISignUpStoreUseCase {
  signUpStoreRepository: ISignUpStoreRepository;
  execute: (params: IStore) => Promise<void>;
}

export interface IFindStoreUseCase {
  findStoreByMasterIdRespository: IFindStoreByMasterIdRespository;
  execute: (params: { masterId: number }) => Promise<IStoreResponse>;
}