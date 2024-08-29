import { IUserEntity, IUserResponse, IUserResponseWithPass } from "../../../domain/entities/@interfaces/user-entity.interfaces";

export interface IDeleteUserRepository {
  execute: ({ email }: { email: string }) => Promise<void>;
}

export interface IFindUserByEmailRepository {
  execute: ({ email }: { email: string }) => Promise<IUserResponseWithPass>;
}

export interface IFindUserByIdRepository {
  execute: ({ userId }: { userId: number }) => Promise<IUserResponse>;
}

export interface ISignUpUserRepository {
  execute: (userEntity: IUserEntity) => Promise<void>;
}

export interface ISetUserStoreRepository {
  execute: ({ userId, storeId }: { userId: number, storeId: number }) => Promise<void>;
}