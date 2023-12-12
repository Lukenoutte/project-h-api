import { IDeleteRefreshTokenRepository } from "infra/repositories/@interfaces/authentication-repository.interfaces";

export default class SignOutUseCase {
  deleteRefreshTokenRepository: IDeleteRefreshTokenRepository
  constructor({ deleteRefreshTokenRepository }:
     { deleteRefreshTokenRepository: IDeleteRefreshTokenRepository}) {
    this.deleteRefreshTokenRepository = deleteRefreshTokenRepository;
  }

  async execute({ userId }: { userId: string }) {
    await this.deleteRefreshTokenRepository.execute({ userId });
  }
}
