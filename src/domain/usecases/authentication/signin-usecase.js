export default class SignInUseCase {
  constructor({
    findUserRepository,
    bcryptHelper,
    wrongCredentialsError,
    jwtHelperAccessToken,
    jwtHelperRefreshToken,
    createRefreshTokenRepository,
    findRefreshTokenRepository,
    updateRefreshTokenRepository,
  }) {
    this.findUserRepository = findUserRepository;
    this.bcryptHelper = bcryptHelper;
    this.wrongCredentialsError = wrongCredentialsError;
    this.jwtHelperAccessToken = jwtHelperAccessToken;
    this.jwtHelperRefreshToken = jwtHelperRefreshToken;
    this.createRefreshTokenRepository = createRefreshTokenRepository;
    this.findRefreshTokenRepository = findRefreshTokenRepository;
    this.updateRefreshTokenRepository = updateRefreshTokenRepository;
  }

  async execute(params) {
    const userOnDatabase = await this.findUserRepository.execute(params);
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

  async handleRefreshToken({ userId }) {
    const existTokenRefresh = await this.findRefreshTokenRepository.execute({
      userId,
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
