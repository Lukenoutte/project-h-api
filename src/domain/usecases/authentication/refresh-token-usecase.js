export default class RefreshTokenUseCase {
  /**
   * @param {FindRefreshTokenRepository} findRefreshTokenRepository
   * @param {JwtHelperRefreshToken} jwtHelperRefreshToken
   * @param {JwtHelperAccessToken} jwtHelperAccessToken
   * @param {UnauthorizedError} unauthorizedError
   */
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

  /**
   * @param {string} refreshToken
   * @param {string} userId
   * @returns {string}
   */
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
