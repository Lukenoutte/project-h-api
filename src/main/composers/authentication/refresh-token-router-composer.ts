import RefreshTokenUseCase from "src/domain/usecases/authentication/refresh-token-usecase";
import RefreshTokenRouter from "src/presentation/routers/authentication/refresh-token-router";
import FindRefreshTokenRepository from "src/infra/repositories/authentication/find-refresh-token-repository";
import JwtHelper from "src/infra/helpers/jwt-helper";
import { UnauthorizedError } from "src/presentation/errors";
import { accessTokenSecret, refreshTokenSecret } from "../../configs/env";

export default class RefreshTokenRouterComposer {
  static compose() {
    const findRefreshTokenRepository = new FindRefreshTokenRepository();
    const jwtHelperAccessToken = new JwtHelper(accessTokenSecret);
    const jwtHelperRefreshToken = new JwtHelper(refreshTokenSecret);
    const unauthorizedError = new UnauthorizedError();
    const refreshTokenUseCase = new RefreshTokenUseCase({
      findRefreshTokenRepository,
      jwtHelperRefreshToken,
      jwtHelperAccessToken,
      unauthorizedError,
    });
    return new RefreshTokenRouter({ refreshTokenUseCase });
  }
}
