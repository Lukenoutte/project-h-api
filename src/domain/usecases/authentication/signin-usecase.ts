import { IFindUserByEmailRepository } from "infra/repositories/@interfaces/users-respository.interfaces";
import { 
  ICreateRefreshTokenRepository, 
  IFindRefreshTokenRepository,
  IUpdateRefreshTokenRepository
} from "infra/repositories/@interfaces/authentication-repository.interfaces";
import { IBcryptHelper, IJwtHelper } from "infra/helpers/@interfaces/helper.interfaces";
import { ISignInUseCase } from "../@interfaces/authentication-usecases.interfaces";

export default class SignInUseCase implements ISignInUseCase {
  findUserByEmailRepository: IFindUserByEmailRepository;
  bcryptHelper: IBcryptHelper;
  wrongCredentialsError: Error;
  jwtHelperAccessToken: IJwtHelper;
  jwtHelperRefreshToken: IJwtHelper;
  createRefreshTokenRepository: ICreateRefreshTokenRepository;
  findRefreshTokenRepository: IFindRefreshTokenRepository;
  updateRefreshTokenRepository: IUpdateRefreshTokenRepository;
  
  constructor({
    findUserByEmailRepository,
    bcryptHelper,
    wrongCredentialsError,
    jwtHelperAccessToken,
    jwtHelperRefreshToken,
    createRefreshTokenRepository,
    findRefreshTokenRepository,
    updateRefreshTokenRepository,
  }: ISignInUseCaseConstructor) {
    this.findUserByEmailRepository = findUserByEmailRepository;
    this.bcryptHelper = bcryptHelper;
    this.wrongCredentialsError = wrongCredentialsError;
    this.jwtHelperAccessToken = jwtHelperAccessToken;
    this.jwtHelperRefreshToken = jwtHelperRefreshToken;
    this.createRefreshTokenRepository = createRefreshTokenRepository;
    this.findRefreshTokenRepository = findRefreshTokenRepository;
    this.updateRefreshTokenRepository = updateRefreshTokenRepository;
  }

  async execute(params: { email: string, password: string }): Promise<object> {
    const userOnDatabase = await this.findUserByEmailRepository.execute(params);
    if (!userOnDatabase) throw this.wrongCredentialsError;
    const isPassCorrect = await this.bcryptHelper.comparePassword(
      params.password,
      userOnDatabase.password,
    );
    if (!isPassCorrect) throw this.wrongCredentialsError;
    const { id } = userOnDatabase;
    const refreshToken = await this.handleRefreshToken({ userId: id });
    const accessToken = this.jwtHelperAccessToken.generateToken({ userId: id });
    return { refreshToken, accessToken };
  }

  async handleRefreshToken({ userId }: { userId: string }): Promise<string> {
    const existTokenRefresh = await this.findRefreshTokenRepository.execute({
      userId,
      token: ""
    });
    const refreshToken = this.jwtHelperRefreshToken.generateToken({ userId });
    if (existTokenRefresh) {
      await this.updateRefreshTokenRepository.execute({
        currentToken: existTokenRefresh.token,
        newToken: refreshToken,
      });
      return refreshToken;
    }
    await this.createRefreshTokenRepository.execute({
      userId,
      token: refreshToken,
    });
    return refreshToken;
  }
}

interface ISignInUseCaseConstructor {
  findUserByEmailRepository: IFindUserByEmailRepository,
  bcryptHelper: IBcryptHelper,
  wrongCredentialsError: Error,
  jwtHelperAccessToken: IJwtHelper,
  jwtHelperRefreshToken: IJwtHelper,
  createRefreshTokenRepository: ICreateRefreshTokenRepository,
  findRefreshTokenRepository: IFindRefreshTokenRepository,
  updateRefreshTokenRepository: IUpdateRefreshTokenRepository
}
