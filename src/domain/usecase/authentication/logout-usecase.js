export default class LogoutUseCase {
  constructor({ deleteRefreshTokenRepository }) {
    this.deleteRefreshTokenRepository = deleteRefreshTokenRepository;
  }

  async execute({ userId }) {
    await this.deleteRefreshTokenRepository.execute({ userId });
  }
}
