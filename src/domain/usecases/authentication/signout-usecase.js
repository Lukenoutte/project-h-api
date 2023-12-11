export default class SignOutUseCase {
  /**
   * @param {DeleteRefreshTokenRepository} deleteRefreshTokenRepository
   */
  constructor({ deleteRefreshTokenRepository }) {
    this.deleteRefreshTokenRepository = deleteRefreshTokenRepository;
  }

  /**
   * @param {string} userId
   */
  async execute({ userId }) {
    await this.deleteRefreshTokenRepository.execute({ userId });
  }
}
