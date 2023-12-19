import { IDeleteRefreshTokenRepository } from "infra/repositories/@interfaces/authentication-repository.interfaces";
import { ISignOutUseCase } from "../@interfaces/authentication-usecases.interfaces";

export default class SignOutUseCase implements ISignOutUseCase{
  deleteRefreshTokenRepository: IDeleteRefreshTokenRepository
  constructor({ deleteRefreshTokenRepository }:
     { deleteRefreshTokenRepository: IDeleteRefreshTokenRepository}) {
    this.deleteRefreshTokenRepository = deleteRefreshTokenRepository;
  }

  async execute({ userId }: { userId: string }) {
    await this.deleteRefreshTokenRepository.execute({ userId });
  }
}
