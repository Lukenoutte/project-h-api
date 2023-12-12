import { IFindRefreshTokenRepository } from "infra/repositories/@interfaces/authentication-repository.interfaces";
import { IJwtHelper } from "infra/helpers/@interfaces/helper.interfaces";

interface IRefreshTokenUseCaseParams {
  findRefreshTokenRepository: IFindRefreshTokenRepository, 
  jwtHelperRefreshToken: IJwtHelper,
  jwtHelperAccessToken: IJwtHelper,
  unauthorizedError: Error
}

export default class RefreshTokenUseCase {
  findRefreshTokenRepository: IFindRefreshTokenRepository;
  jwtHelperRefreshToken: IJwtHelper;
  jwtHelperAccessToken: IJwtHelper;
  unauthorizedError: Error;
  
  constructor({
    findRefreshTokenRepository,
    jwtHelperRefreshToken,
    jwtHelperAccessToken,
    unauthorizedError,
  }: IRefreshTokenUseCaseParams) {
    this.findRefreshTokenRepository = findRefreshTokenRepository;
    this.jwtHelperRefreshToken = jwtHelperRefreshToken;
    this.jwtHelperAccessToken = jwtHelperAccessToken;
    this.unauthorizedError = unauthorizedError;
  }

  async execute({ refreshToken, userId }: { refreshToken: string, userId: string}) {
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
