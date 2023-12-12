import SignOutUseCase from "domain/usecases/authentication/signout-usecase";
import SignOutRouter from "presentation/routers/authentication/signout-router";
import DeleteRefreshTokenRepository from "infra/repositories/authentication/delete-refresh-token-repository";

export default class SignOutRouterComposer {
  static compose() {
    const deleteRefreshTokenRepository = new DeleteRefreshTokenRepository();
    const signOutUseCase = new SignOutUseCase({
      deleteRefreshTokenRepository,
    });
    return new SignOutRouter({ signOutUseCase });
  }
}
