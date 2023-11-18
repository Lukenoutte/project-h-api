import LogoutUseCase from "../../../domain/usecase/authentication/logout-usecase";
import LogoutRouter from "../../../presentation/routers/authentication/logout-router";
import DeleteRefreshTokenRepository from "../../../infra/repositories/authentication/delete-refresh-token-repository";

export default class LogoutRouterComposer {
  static compose() {
    const deleteRefreshTokenRepository = new DeleteRefreshTokenRepository();
    const logoutUseCase = new LogoutUseCase({
      deleteRefreshTokenRepository,
    });
    return new LogoutRouter({ logoutUseCase });
  }
}
