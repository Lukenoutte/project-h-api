import { IFindRefreshTokenRepository } from "infra/repositories/@interfaces/authentication-repository.interfaces";
import { IJwtHelper } from "infra/helpers/@interfaces/helper.interfaces";
import { IRefreshTokenUseCase } from "../@interfaces/authentication-usecases.interfaces";

interface IRefreshTokenUseCaseConstructor {
  findRefreshTokenRepository: IFindRefreshTokenRepository, 
  jwtHelperRefreshToken: IJwtHelper,
  jwtHelperAccessToken: IJwtHelper,
  unauthorizedError: Error
}

export default class RefreshTokenUseCase implements IRefreshTokenUseCase {
  findRefreshTokenRepository: IFindRefreshTokenRepository;
  jwtHelperRefreshToken: IJwtHelper;
  jwtHelperAccessToken: IJwtHelper;
  unauthorizedError: Error;
  
  constructor({
    findRefreshTokenRepository,
    jwtHelperRefreshToken,
    jwtHelperAccessToken,
    unauthorizedError,
  }: IRefreshTokenUseCaseConstructor) {
    this.findRefreshTokenRepository = findRefreshTokenRepository;
    this.jwtHelperRefreshToken = jwtHelperRefreshToken;
    this.jwtHelperAccessToken = jwtHelperAccessToken;
    this.unauthorizedError = unauthorizedError;
  }

  async execute({ refreshToken, userId }: { refreshToken: string, userId: string}): Promise<string> {
    const refreshTokenExist = await this.findRefreshTokenRepository.execute({
      token: refreshToken,
      userId: ""
    });
    if (!refreshTokenExist) throw this.unauthorizedError;
    const isValidRefreshToken =
      this.jwtHelperRefreshToken.verifyToken(refreshToken);
    if (!isValidRefreshToken) throw this.unauthorizedError;
    return this.jwtHelperAccessToken.generateToken({ userId });
  }
}
