import RefreshTokenUseCase from "domain/usecases/authentication/refresh-token-usecase";
import RefreshTokenRouter from "presentation/routers/authentication/refresh-token-router";
import FindRefreshTokenRepository from "infra/repositories/authentication/find-refresh-token-repository";
import JwtHelper from "infra/helpers/jwt-helper";
import { UnauthorizedError } from "presentation/errors";
import { accessTokenSecret, refreshTokenSecret } from "../../configs/env";
import IComposer from "../@interfaces/composer.interfaces"

export default class RefreshTokenRouterComposer implements IComposer {
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
