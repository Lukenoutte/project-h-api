import { IUserEntity } from "../../../domain/entities/@interfaces/user-entity.interfaces";

export interface IDeleteUserRepository {
  execute: ({ email }: { email: string }) => Promise<void>;
}

export interface IFindUserRepository {
  execute: ({ email }: { email: string }) => Promise<object>;
}

export interface ISignUpUserRepository {
  execute: (userEntity: IUserEntity) => Promise<void>;
}