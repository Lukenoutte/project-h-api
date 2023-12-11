export default class SignInUseCase {
  /**
   * @param {FindUserRepository} findUserRepository
   * @param {BcryptHelper} bcryptHelper
   * @param {WrongCredentialsError} wrongCredentialsError
   * @param {JwtHelperAccessToken} jwtHelperAccessToken
   * @param {JwtHelperRefreshToken} jwtHelperRefreshToken
   * @param {FindRefreshTokenRepository} findRefreshTokenRepository
   * @param {UpdateRefreshTokenRepository} updateRefreshTokenRepository
   */
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

  /**
   * @typedef {object} ParamsSignIn
   * @property {string} email
   * @property {string} password
   */

  /**
   * @param {ParamsSignIn} params
   * @returns {object}
   */
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

  /**
   * @param {string} userId
   * @returns {string}
   */
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
