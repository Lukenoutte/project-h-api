import { IJwtHelper, IBcryptHelper } from "infra/helpers/@interfaces/helper.interfaces";
import { IFindUserRepository } from "infra/repositories/@interfaces/users-respository.interfaces";
import { 
  ICreateRefreshTokenRepository, 
  IFindRefreshTokenRepository,
  IUpdateRefreshTokenRepository,
  IDeleteRefreshTokenRepository
} from "infra/repositories/@interfaces/authentication-repository.interfaces";

export interface IRefreshTokenUseCase {
  findRefreshTokenRepository: IFindRefreshTokenRepository;
  jwtHelperRefreshToken: IJwtHelper;
  jwtHelperAccessToken: IJwtHelper;
  unauthorizedError: Error;
  execute: ({ refreshToken, userId }: { refreshToken: string, userId: string}) => Promise<string>;
}

export interface ISignInUseCase {
  findUserRepository: IFindUserRepository;
  bcryptHelper: IBcryptHelper;
  wrongCredentialsError: Error;
  jwtHelperAccessToken: IJwtHelper;
  jwtHelperRefreshToken: IJwtHelper;
  createRefreshTokenRepository: ICreateRefreshTokenRepository;
  findRefreshTokenRepository: IFindRefreshTokenRepository;
  updateRefreshTokenRepository: IUpdateRefreshTokenRepository;
  execute: (params: { email: string, password: string }) => Promise<object>;
  handleRefreshToken: ({ userId }: { userId: string }) => Promise<string>
}

export interface ISignOutUseCase {
  deleteRefreshTokenRepository: IDeleteRefreshTokenRepository;
  execute: ({ userId }: { userId: string }) => Promise<void>;
}