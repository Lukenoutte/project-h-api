import LogoutUseCase from "src/domain/usecases/authentication/logout-usecase";
import LogoutRouter from "src/presentation/routers/authentication/logout-router";
import DeleteRefreshTokenRepository from "src/infra/repositories/authentication/delete-refresh-token-repository";

export default class LogoutRouterComposer {
  static compose() {
    const deleteRefreshTokenRepository = new DeleteRefreshTokenRepository();
    const logoutUseCase = new LogoutUseCase({
      deleteRefreshTokenRepository,
    });
    return new LogoutRouter({ logoutUseCase });
  }
}
