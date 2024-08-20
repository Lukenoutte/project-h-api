import { IUser, IUserEntity, IUserResponse } from "../../../domain/entities/@interfaces/user-entity.interfaces";

export interface IDeleteUserRepository {
  execute: ({ email }: { email: string }) => Promise<void>;
}

export interface IFindUserByEmailRepository {
  execute: ({ email }: { email: string }) => Promise<IUser>;
}

export interface IFindUserByIdRepository {
  execute: ({ userId }: { userId: string }) => Promise<IUserResponse>;
}

export interface ISignUpUserRepository {
  execute: (userEntity: IUserEntity) => Promise<void>;
}