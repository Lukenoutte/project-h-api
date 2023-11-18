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

  async execute({ token, userId }) {
    const refreshTokenExist = await this.findRefreshTokenRepository.execute({
      token,
    });
    const isValidRefreshToken =
      this.jwtHelperRefreshToken.verifyToken(refreshTokenExist);
    if (!isValidRefreshToken) throw this.unauthorizedError();
    return this.jwtHelperAccessToken.generateToken({ userId });
  }
}
