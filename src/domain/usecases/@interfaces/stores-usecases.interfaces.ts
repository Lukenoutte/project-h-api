import { ISignUpStoreRepository } from "infra/repositories/@interfaces/stores-repository.interfaces";


export interface IRefreshTokenUseCase {
  signUpStoreRepository: ISignUpStoreRepository;
  execute: (params: ISignUpStoreUseCaseParams) => Promise<object>;
}

interface ISignUpStoreUseCaseParams {
  name: string;
  address: string;
  city: string;
  country: string;
}