import SignOutUseCase from "src/domain/usecases/authentication/signout-usecase";
import SignOutRouter from "src/presentation/routers/authentication/signout-router";
import DeleteRefreshTokenRepository from "src/infra/repositories/authentication/delete-refresh-token-repository";

export default class SignOutRouterComposer {
  static compose() {
    const deleteRefreshTokenRepository = new DeleteRefreshTokenRepository();
    const signoutUseCase = new SignOutUseCase({
      deleteRefreshTokenRepository,
    });
    return new SignOutRouter({ signoutUseCase });
  }
}
