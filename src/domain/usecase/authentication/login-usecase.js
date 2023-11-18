export default class LoginUseCase {
  constructor({
    findUserRepository,
    bcryptHelper,
    unauthorizedError,
    jwtHelperAccessToken,
    jwtHelperRefreshToken,
    createRefreshTokenRepository,
    findRefreshTokenRepository,
  }) {
    this.findUserRepository = findUserRepository;
    this.bcryptHelper = bcryptHelper;
    this.unauthorizedError = unauthorizedError;
    this.jwtHelperAccessToken = jwtHelperAccessToken;
    this.jwtHelperRefreshToken = jwtHelperRefreshToken;
    this.createRefreshTokenRepository = createRefreshTokenRepository;
    this.findRefreshTokenRepository = findRefreshTokenRepository
  }

  async execute(params) {
    const userOnDatabase = await this.findUserRepository.execute(params);
    if (!userOnDatabase) throw this.unauthorizedError;
    const isPassCorrect = await this.bcryptHelper.comparePassword(
      params.password,
      userOnDatabase.password,
    );
    if (!isPassCorrect) throw this.unauthorizedError;
    const { id } = userOnDatabase;
    await this.handleRefreshToken({ userId: id });
    return this.jwtHelperAccessToken.generateToken({ userId: id });
  }

  async handleRefreshToken({ userId }) {
    const existTokenRefresh = await this.findRefreshTokenRepository.execute({
      userId,
    });
    if (existTokenRefresh) return;
    const refreshToken = this.jwtHelperRefreshToken.generateToken({ userId });
    await this.createRefreshTokenRepository.execute({
      userId,
      token: refreshToken,
    });
  }
}
