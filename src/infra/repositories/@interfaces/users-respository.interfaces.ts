import { IUserEntity } from "../../../domain/entities/@interfaces/user-entity.interfaces";

export interface IDeleteUserRepository {
  execute: ({ email }: { email: string }) => Promise<void>;
}

export interface IUser { email: string, password: string, id: string }

export interface IFindUserRepository {
  execute: ({ email }: { email: string }) => Promise<IUser>;
}

export interface ISignUpUserRepository {
  execute: (userEntity: IUserEntity) => Promise<void>;
}