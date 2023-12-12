export default class RefreshTokenUseCase {
  constructor({
    findRefreshTokenRepository,
    jwtHelperRefreshToken,
    jwtHelperAccessToken,
    unauthorizedError,
  }) {
    this.findRefreshTokenRepository = findRefreshTokenRepository;
    this.jwtHelperRefreshToken = jwtHelperRefreshToken;
    this.jwtHelperAccessToken = jwtHelperAccessToken;
    this.unauthorizedError = unauthorizedError;
  }

  async execute({ refreshToken, userId }) {
    const refreshTokenExist = await this.findRefreshTokenRepository.execute({
      token: refreshToken,
    });
    if (!refreshTokenExist) throw this.unauthorizedError;
    const isValidRefreshToken =
      this.jwtHelperRefreshToken.verifyToken(refreshToken);
    if (!isValidRefreshToken) throw this.unauthorizedError;
    return this.jwtHelperAccessToken.generateToken({ userId });
  }
}
