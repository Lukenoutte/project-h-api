import { IStore } from "domain/entities/@interfaces/store-entity.interfaces";
import { ISignUpStoreRepository } from "infra/repositories/@interfaces/stores-repository.interfaces";


export interface ISignUpStoreUseCase {
  signUpStoreRepository: ISignUpStoreRepository;
  execute: (params: IStore) => Promise<object>;
}