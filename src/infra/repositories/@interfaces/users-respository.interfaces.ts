import { IUser, IUserEntity } from '../../../domain/entities/@interfaces/user-entity.interfaces';

export interface IDeleteUserRepository {
  execute: ({ email }: { email: string }) => Promise<void>;
}

export interface IFindUserRepository {
  execute: ({
    email,
    userId,
  }: {
    email: string;
    userId: string;
  }) => Promise<IUser>;
}

export interface ISignUpUserRepository {
  execute: (userEntity: IUserEntity) => Promise<void>;
}

export interface ISetUserStoreRepository {
  execute: ({ storeId, userId }: { storeId: number, userId: number }) => Promise<void>;
}