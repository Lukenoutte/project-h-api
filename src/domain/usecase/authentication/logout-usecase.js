export default class LogoutUseCase {
  constructor({ deleteRefreshTokenRepository }) {
    this.deleteRefreshTokenRepository = deleteRefreshTokenRepository;
  }

  async execute({ token }) {
    await this.deleteRefreshTokenRepository.execute({ token });
  }
}
